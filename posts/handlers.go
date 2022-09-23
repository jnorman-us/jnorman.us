package posts

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"html/template"
	"jnorman.us/util"
	"log"
	"net/http"
)

func (m *Manager) ServeBlogList(w http.ResponseWriter, r *http.Request) {
	posts := m.getPosts()

	var data string
	if bytes, err := json.Marshal(posts); err != nil {
		log.Printf("Error marshalling Meta %v\n", err)
	} else {
		data = string(bytes)
	}

	meta := util.Meta{
		Title:       "Blog - jnorman.us",
		Description: "This is my blog, where I keep track of things I am working on and discuss topics that I've been studying",
		JSONData:    template.HTML(data),
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

func (m *Manager) ServeBlogPost(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	name := params["name"]
	post, ok := m.posts[name]

	if !ok {
		http.Error(w, "Blog post not found", http.StatusNotFound)
		return
	}
	meta, metaErr := post.Meta()
	if metaErr != nil {
		log.Printf("Error loading post %v\n", metaErr)
		http.Error(w, "Error loading post", http.StatusInternalServerError)
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

func (m *Manager) GetBlogPost(w http.ResponseWriter, r *http.Request) {
	fmt.Println("REST")
	params := mux.Vars(r)
	name := params["name"]
	post, ok := m.posts[name]

	if !ok {
		http.Error(w, "Blog post not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(post); err != nil {
		http.Error(w, "Error encoding post", http.StatusInternalServerError)
	}
}

func (m *Manager) GetBlogPosts(w http.ResponseWriter, r *http.Request) {
	posts := m.getPosts()
	fmt.Println("TEST")

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(posts); err != nil {
		http.Error(w, "Error encoding posts", http.StatusInternalServerError)
	}
}
