package posts

import (
	"bufio"
	"encoding/json"
	"errors"
	"fmt"
	"html/template"
	"jnorman.us/util"
	"os"
	"strconv"
	"strings"
	"time"
)

type Post struct {
	ID          string `json:"id"`
	Time        int    `json:"time_published"`
	Title       string `json:"title"`
	Description string `json:"summary"`
	Contents    string `json:"contents"`
}

func loadFromFile(id string, path string) (*Post, error) {
	postFile, err := os.Open(path)
	if err != nil {
		return nil, err
	}

	scanner := bufio.NewScanner(postFile)
	scanner.Split(bufio.ScanLines)

	i := 0
	loadedPost := &Post{
		ID: id,
	}
	contentSB := strings.Builder{}
	for i = 0; scanner.Scan(); i++ {
		line := scanner.Text()
		if i == 0 {
			loadedPost.Title = line
		} else if i == 1 {
			loadedPost.Description = line
		} else if i == 2 {
			epochTime, err := strconv.Atoi(line)
			if err != nil {
				return nil, err
			}
			loadedPost.Time = epochTime
		} else {
			contentSB.WriteString(fmt.Sprintf("%s\n", line))
		}
	}
	loadedPost.Contents = contentSB.String()
	if i < 4 {
		return nil, errors.New("ill-formatted Post file")
	}
	return loadedPost, nil
}

func (p *Post) String() string {
	sb := strings.Builder{}
	sb.WriteString(fmt.Sprintf("Title: %s\n", p.Title))
	sb.WriteString(fmt.Sprintf("Description: %s\n", p.Description))

	formattedTime := time.Unix(int64(p.Time), 0).Format(time.UnixDate)
	sb.WriteString(fmt.Sprintf("Time: %s\n", formattedTime))
	sb.WriteString("%-----------------------------%\n")
	sb.WriteString(p.Contents)
	return sb.String()
}

func (p *Post) JSON() (string, error) {
	if bytes, err := json.Marshal(&p); err != nil {
		return "", err
	} else {
		return string(bytes), nil
	}
}

func (p *Post) Meta() (*util.Meta, error) {
	if data, err := p.JSON(); err != nil {
		return nil, err
	} else {
		return &util.Meta{
			Title:       p.Title,
			Description: p.Description,
			JSONData:    template.HTML(data),
		}, nil
	}
}
