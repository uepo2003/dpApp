package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
    "fmt"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
	"github.com/gorilla/sessions"
)

type Post struct {
	Content string `json:"content"`
}

type SignUp struct {
	Email string `json:"email"`
	Password string `json:"password"`

}

type User struct {
	Email string `json:"email"`
	Password string `json:"password"`

}


func createSignUp(w http.ResponseWriter, r *http.Request) {
	var newSignUp SignUp
	json.NewDecoder(r.Body).Decode(&newSignUp)
    
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newSignUp.Password),4)
	if err != nil {
		panic(err.Error())
	}
	newSignUp.Password = string(hashedPassword)

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	insert, err := db.Exec("INSERT INTO signups(Email, Password) VALUES (?,?)", newSignUp.Email, newSignUp.Password)
	fmt.Println("log",newSignUp.Email, newSignUp.Password)
	if err != nil {
		panic(err.Error())
	}
	affected, err := insert.RowsAffected()
if err != nil {
	panic(err.Error())
}
fmt.Println("Inserted post. Rows affected:", affected)

w.Header().Set("Access-Control-Allow-Headers", "*")
w.Header().Set("Access-Control-Allow-Origin", "*")
w.Header().Set( "Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS" )
	json.NewEncoder(w).Encode(newSignUp)

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

w.Header().Set("Access-Control-Allow-Headers", "*")
w.Header().Set("Access-Control-Allow-Origin", "*")
w.Header().Set( "Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS" )
	json.NewEncoder(w).Encode(newPost)

}


var (
	key = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

func createLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

	
	var user User
	json.NewDecoder(r.Body).Decode(&user)

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	
	defer db.Close()
	fmt.Println(user.Email)
	fmt.Println(user.Password)
	credential := db.QueryRow("SELECT Password FROM signups WHERE Email = ?", user.Email)
  
	var hashedPassword string
	credential.Scan(&hashedPassword)
	fmt.Println(hashedPassword)
	
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(user.Password))
	fmt.Println(err)
	
	json.NewEncoder(w).Encode(user)
	
	session, _ := store.Get(r, "cookie-name")
	fmt.Println(session)
	session.Values["authenticated"] = true
	session.Save(r, w)

}

func logout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")


    session, _ := store.Get(r, "cookie-name")
    fmt.Println(session)
    session.Values["authenticated"] = false
    session.Save(r, w)
    

}



func main() {
	http.HandleFunc("/posts", createPost)
	http.HandleFunc("/logouts", logout)
	http.HandleFunc("/logins", createLogin)
	http.HandleFunc("/signups", createSignUp)
	http.ListenAndServe(":8080", nil)
}