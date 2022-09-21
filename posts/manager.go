package posts

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

type Manager struct {
	folderPath string
	posts      map[string]*Post
}

func NewManager(folderPath string) (*Manager, error) {
	manager := &Manager{
		folderPath: folderPath,
		posts:      map[string]*Post{},
	}
	if posts, err := loadDirectory(folderPath); err == nil {
		manager.posts = posts
	}
	return manager, nil
}

func (m *Manager) ServeBlogList(w http.ResponseWriter, r *http.Request) {

}

func (m *Manager) ServeBlogPost(w http.ResponseWriter, r *http.Request) {

}

const ReloadInterval = time.Minute * 10

func (m *Manager) Reload() {
	for range time.Tick(ReloadInterval) {
		if posts, err := loadDirectory(m.folderPath); err == nil {
			m.posts = posts
		}
	}
}

func loadDirectory(folderPath string) (map[string]*Post, error) {
	log.Printf("Loading Directory %s\n", folderPath)
	posts := map[string]*Post{}
	files, dirError := os.ReadDir(folderPath)
	if dirError != nil {
		return posts, dirError
	}
	for _, file := range files {
		name := file.Name()
		fullPath := fmt.Sprintf("%s/%s", folderPath, name)
		if post, err := loadFromFile(fullPath); err == nil {
			posts[name] = post
		} else {
			log.Printf("Error loading %s: %v\n", fullPath, err)
		}
	}
	log.Printf("Successfully loaded %d posts\n", len(posts))
	return posts, nil
}
