package posts

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type Post struct {
	time.Time
	Title       string
	Description string
	Contents    string
}

func loadFromFile(path string) (*Post, error) {
	postFile, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer postFile.Close()

	scanner := bufio.NewScanner(postFile)
	scanner.Split(bufio.ScanLines)

	i := 0
	loadedPost := &Post{}
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
			loadedPost.Time = time.Unix(int64(epochTime), 0)
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

	formattedTime := p.Time.Format(time.UnixDate)
	sb.WriteString(fmt.Sprintf("Time: %s\n", formattedTime))
	sb.WriteString("%-----------------------------%\n")
	sb.WriteString(p.Contents)
	return sb.String()
}
