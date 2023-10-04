package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Post struct {
	ID      string `json:"id"`
	Content string `json:"content"`
}

func createPost(w http.ResponseWriter, r *http.Request) {
	var newPost Post
	json.NewDecoder(r.Body).Decode(&newPost)

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	insert, err := db.Query("INSERT INTO posts VALUES (?, ?)", newPost.ID, newPost.Content)
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()

	json.NewEncoder(w).Encode(newPost)
}

func main() {
	http.HandleFunc("/posts", createPost)
	http.ListenAndServe(":8080", nil)
}
