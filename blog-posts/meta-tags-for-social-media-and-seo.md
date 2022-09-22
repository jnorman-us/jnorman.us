Meta Tags for Social Media and SEO
How I integrated my personal blog with Open Graph and made embedded links prettier in Discord.
1663861456
Having a personal website is pretty cool. It's a great one stop shop for all of my thoughts and ideas, and I've carved a nice, cozy corner on the internet just for me. I have blog posts with titles, timestamps, and brief summaries nicely displayed on my site, but it's really hard to get people to navigate to them when my links look like:

>https://jnorman.us/blog/dbd57771-c428-4e3c-b4f6-117a2dd849a4

So I dedicated my past week to integrating my website with Social Media networks so that my links turn into something like this:

![Discord automatically renders the link as a pretty card](https://external-preview.redd.it/8b8Cvc1uc2eBzhThtd1uLXsYT1YbnBDqSIgRx3lKBpo.png?auto=webp&s=ea7f682383758207305b905506eebffba4751f8c)

## Open Graph protocol
The [Open Graph](https://ogp.me/) protocol is the way that an HTML website can describe itself on Social Media. By adding a few tags into your website reporting metadata like the title, description, and icon for your website, Social Media sites will automatically know how to create the pretty card for your URL.

Here are the tags that I put into my `index.html`:

	<meta property="og:title" content="My Website" />
	<meta property="og:description" content="A brief description of my website" />

> Many more tags are available on the Open Graph Protocol [website](https://ogp.me/).

This is easy enough for a simple, single-page website. But my blog is a dynamic website that has several pages with their respective URLs, titles and descriptions. I need the tags' `content` to be different based on the blog post I'm trying to link to.

## Failing with React-Helmet
My blog site was written in React.JS, a great frontend framework for creating Dynamic websites with a huge community of support and libraries. Using React.JS is why this website looks as good as it does (it's not terribly beautiful, but it could have been a lot worse). I didn't have to write any styling, I just imported Material UI and a bunch of other libraries to do all the heavy lifting of design for me.

Since the Open Graph `<meta>` tags need to be placed in the `<head>` of my HTML file, I first tried to use `react-helmet` to populate my `<head>`. Anything that's put into the `<Helmet>` tags are automatically put into the `<head>` upon loading the website. Here's some barebones React code for using helmet:

	import { Helmet } from 'react-helmet';
	import { useState } from 'react';

	export default function Page() {
		const [ title, setTitle ] = useState("");
	
		// logic for loading the title here

		return (
			<Helmet>
				<meta property="og:title" content={ title } />
			</Helmet>
		);
	}

By calling the `react-helmet` library, we are setting the Open Graph `<meta>` tag for the title of this webpage. Once the title of the blog post is loaded, it is set as the content of the `<meta>` tag, and should be able to present this crucial metadata to the Social Media site.

### Why React Helmet Failed
The Open Graph protocol doesn't bother to run any of the Javascript on the client side. It is only capable of scanning the bare `index.html` for the appropriate `<meta>` tags. Remember React is a fully client side library, where all of the logic is performed in Javascript and run on the client side. By definition, none of the code I wrote above is even being considered by Open Graph, so none of the metadata is recognized.

## Server Side Rendering
When you visit a URL from a browser, you are presented with a `.html` file sent your way by the server. Server Side Rendering is the process of customizing the `.html` file before it is presented to your users. In other words, it's the best way to dynamically change the Open Graph `<meta>` tags on a per page basis.

So how did I combine Server Side Rendering with a preexisting React page? because I had no intention of rewriting the entire website in a Server Side framework! The easiest, hackiest way I could think of was to use the Go (Golang) `html/template` library.

I'd already been using Go for the server with very limited functionality: just respond to requests for the website by spitting out my built React website. This simple example serves an HTTP server with a single route to my `index.html`:

	r := mux.NewRouter()
	r.Path("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./index.html")
	})
	http.ListenAndServe(":80", r)

Any React website starts in an `index.html` file, which loads in the React Javascript code to begin running the actual website. For a typical React site, this file doesn't need to be changed, but I decided to use the Go `html/template` library to modify the Open Graph tags before sending it off to the user. Here's our modified `index.html` turned template.

	<!DOCTYPE html>
	<html>
		<head>
			<meta property="og:title" content="{{ .Title }}" />
			<meta property="og:description" content="{{ .Description }}" />
		</head>
		...
		...
	</html>
>Notice the `{{ .Title }}` and `{{ .Description }}`. Those are markers that tell the Go `html/template` library to fill in with our Title and Description.

Then on the Go program side, I integrate the `html/template` library and populate the contents of the `index.html` turned template.

	type Meta struct {
		Title       string
		Description string
	}
	
	func handleAbout(w http.ResponseWriter, r *http.Request) {  
		meta := Meta{  
			Title:       "About - jnorman.us",  
			Description: "A brief About Me page for me to summarize how I got into Software Engineering",
		}  
  
		indexPath := "./index.html"  
		index, htmlErr := template.ParseFiles(indexPath)  
		if htmlErr != nil {  
			http.Error(w, "Error parsing HTML", http.StatusInternalServerError)  
			return  
		}  
		if err := index.Execute(w, meta); err != nil { 
			http.Error(w, "Error rendering post", http.StatusInternalServerError)  
		}  
	}

Finally I can use this function to display the modified `index.html` template whenever someone requests the `/about` page.

	r := mux.NewRouter()  
	r.Path("/about").HandlerFunc(handleAbout)
	http.ListenAndServe(":"+port, r)

The result is that the Open Graph `<meta>` tags are populated with the title `"About - jnorman.us"` and the description `"A brief About Me page for me to summarize how I got into Software Engineering"` without any Javascript needing to be run on the Client. Now the Open Graph protocol can instantly recognize the metadata from our page through the power of Server Side Rendering.

## Conclusion
The solution I worked out is obviously a bit niche since I already had a React website that I needed to retrofit with Open Graph `<meta>` tags. But the key takeaway is that the `<meta>` tags need to be placed in the `index.html` way before any Javascript runs, and the best way to dynamically populate these tags is by using Server Side Rendering.

With this integration, my website has better presence on the internet and a more welcoming doormat on Social Media sites. If you just navigated to this site through a new, pretty, Social Media link, welcome and thanks for reading.

>The code for this blog is available [here](https://github.com/jnorman-us/blog). It contains my latest changes and everything I talked about here.