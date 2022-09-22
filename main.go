package main

import (
	"github.com/gorilla/mux"
	"html/template"
	"jnorman.us/posts"
	"jnorman.us/util"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	postsPath := os.Getenv("POSTS_PATH")

	postsManager, postsErr := posts.NewManager(postsPath)
	if postsErr != nil {
		log.Fatal(postsErr)
	}
	go postsManager.Reload()

	r := mux.NewRouter()
	r.PathPrefix("/blog/{name}").HandlerFunc(postsManager.ServeBlogPost)
	r.PathPrefix("/blog").HandlerFunc(postsManager.ServeBlogList)
	r.PathPrefix("/about").HandlerFunc(handleAbout)

	r.PathPrefix("/").HandlerFunc(handleFrontend)

	log.Printf("Running Server on port: %s\n", port)
	err := http.ListenAndServe(":"+port, r)
	if err != nil {
		log.Fatal(err)
	}
}

func handleAbout(w http.ResponseWriter, r *http.Request) {
	meta := util.Meta{
		Title:       "About - jnorman.us",
		Description: "A brief About Me page for me to summarize how I got into Software Engineering",
		JSONData:    template.HTML(""),
	}

	indexPath := "./frontend/build/index.html"
	index, htmlErr := template.ParseFiles(indexPath)
	if htmlErr != nil {
		log.Printf("Error parsing HTML %v\n", htmlErr)
		http.Error(w, "Error parsing HTML", http.StatusInternalServerError)
		return
	}
	if err := index.Execute(w, meta); err != nil {
		log.Printf("Error rendering post %v\n", err)
		http.Error(w, "Error rendering post", http.StatusInternalServerError)
	}
}

func handleFrontend(w http.ResponseWriter, r *http.Request) {
	url := r.URL.RequestURI()
	log.Printf("Received Request for jnorman.us%s\n", url)
	server := http.FileServer(http.Dir("./frontend/build"))
	server.ServeHTTP(w, r)
}
