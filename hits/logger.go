package hits

import (
	"log"
	"net/http"
)

type Logger struct {
	handler http.Handler
}

func NewLogger(wrapped http.Handler) *Logger {
	return &Logger{
		handler: wrapped,
	}
}

func (l *Logger) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	url := r.URL.RequestURI()
	log.Printf("Received Request for jnorman.us%s\n", url)
	l.handler.ServeHTTP(w, r)
}
