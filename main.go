package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")

	r := mux.NewRouter()
	r.PathPrefix("/blog").HandlerFunc(handleReact)
	r.PathPrefix("/blog/{name}").HandlerFunc(handleReact)
	r.PathPrefix("/about").HandlerFunc(handleReact)
	r.PathPrefix("/write").HandlerFunc(handleReact)

	r.PathPrefix("/").HandlerFunc(handleFrontend)

	log.Printf("Running Server on port: %s\n", port)
	err := http.ListenAndServe(":"+port, r)
	if err != nil {
		log.Fatal(err)
	}
}

func handleReact(w http.ResponseWriter, r *http.Request) {
	url := r.URL.RequestURI()
	log.Printf("Received Request for jnorman.us%s\n", url)

	http.ServeFile(w, r, "./frontend/build/index.html")
}

func handleFrontend(w http.ResponseWriter, r *http.Request) {
	url := r.URL.RequestURI()
	log.Printf("Received Request for jnorman.us%s\n", url)
	server := http.FileServer(http.Dir("./frontend/build"))
	server.ServeHTTP(w, r)
}
