package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
    "fmt"
	_ "github.com/go-sql-driver/mysql"
)

type Post struct {
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

	insert, err := db.Exec("INSERT INTO posts(Content) VALUES (?)", newPost.Content)
	fmt.Println("log",newPost.Content)
	if err != nil {
		panic(err.Error())
	}
	affected, err := insert.RowsAffected()
if err != nil {
	panic(err.Error())
}
fmt.Println("Inserted post. Rows affected:", affected)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(newPost)

}

func main() {
	http.HandleFunc("/posts", createPost)
	http.ListenAndServe(":8080", nil)
}
