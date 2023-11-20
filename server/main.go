package main

import (
	"cloud.google.com/go/storage"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/api/option"
	"io"
	"golang.org/x/oauth2/google"
	"net/http"
    "os"
	"time"
)

 
type SignUp struct {
	ID       string `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	IsLoggedIn bool   `json:"is_logged_in"`
	UserName string   `json:"username"`
	Image string   `json:"image"`
}


type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type IsLoggedIn struct {
	ID         string `json:"id"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	IsLoggedIn bool    `json:"is_logged_in"`
}

type Following struct  {
	Followed_id  string `json:"followed_id"`
	Is_following  bool    `json:"is_following"`
}

type GetPosts struct {
	PostID  int    `json:"postId"`
	UserID  string `json:"userId"`
	Content string `json:"content"`
	Url string `json:"url"`
	ID       string `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	IsLoggedIn bool   `json:"is_logged_in"`
	UserName string   `json:"username"`
	Image string   `json:"image"`
}

type ID struct {
	ID string `json:"userId"`
}

type Cookie struct {
	Name  string
	Value string
}

func createSignUp(w http.ResponseWriter, r *http.Request) {

	r.ParseMultipartForm(1000 << 20)
	file, handler, err := r.FormFile("file")
    email := r.FormValue("email")
	username := r.FormValue("username")
	password := r.FormValue("password")
    fmt.Println(username)
	fmt.Println(file)
	if err != nil {
		http.Error(w, "File error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	bucketName := "toaru2003"                               // GCSバケット名
	gcsFileName := handler.Filename                          // GCSバケットのアップロード先のパス
	credentialsFile := "avid-life-402901-6ec841ab4945.json" // サービスアカウント鍵ファイルのパス


	ctx := context.Background()
	client, err := storage.NewClient(ctx, option.WithCredentialsFile(credentialsFile))
	if err != nil {
		http.Error(w, "GCS client error: "+err.Error(), http.StatusInternalServerError)
		return
	}


	bucket := client.Bucket(bucketName)


	obj := bucket.Object(gcsFileName)


	wc := obj.NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		http.Error(w, "Upload error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := wc.Close(); err != nil {
		http.Error(w, "Upload error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("File upload successful")

	serviceAccountKey, err := os.ReadFile("avid-life-402901-6ec841ab4945.json")
	if err != nil {
	  fmt.Println(err)
	}

	config, err := google.JWTConfigFromJSON(serviceAccountKey)
	if err != nil {
	fmt.Println(err)
	}

	nipo, err := storage.SignedURL(bucketName, gcsFileName, &storage.SignedURLOptions{
		GoogleAccessID: "nipo-95@avid-life-402901.iam.gserviceaccount.com",
		PrivateKey:     config.PrivateKey,
		Method:         "GET",
		Expires:        time.Now().Add(360 * time.Minute),
	})



	fmt.Println("niko")
	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 4)
	if err != nil {
		fmt.Println(err)
	}
	HashPassword := string(hashedPassword)
    ID := uuid.New().String()

	fmt.Println(HashPassword)
	fmt.Println(ID)
	_, err = db.Exec("INSERT INTO users(ID, Email, Password, IsLoggedIn,username,image) VALUES (?,?,?,?,?,?)", ID, email, HashPassword, false, username, nipo)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("seiko")
}

func IsFollowing(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT followed_id,is_following  FROM follows")
	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	var followings []Following
	for rows.Next() {
		var f Following
		err := rows.Scan(&f.Followed_id,&f.Is_following )
		if err != nil {
			fmt.Println(err)
		}
		followings = append(followings, f)
		fmt.Println(followings)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
	}
	json.NewEncoder(w).Encode(followings)

}

func getPosts(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT posts.*, users.image FROM posts JOIN users ON posts.UserID = users.ID")
	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	var posts []GetPosts
	for rows.Next() {
		var p GetPosts
		err := rows.Scan(&p.PostID, &p.UserID, &p.Content, &p.Url, &p.Image)
		if err != nil {
			fmt.Println(err)
		}
		posts = append(posts, p)
		fmt.Println(posts)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
	}
	json.NewEncoder(w).Encode(posts)

}

func createLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {

		var user User
		err := json.NewDecoder(r.Body).Decode(&user)
		fmt.Println(user)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer db.Close()

		fmt.Println(user.Email)
		fmt.Println(user.Password)
		db.Exec("UPDATE users SET IsLoggedIn = ? WHERE Email = ?", true, user.Email)
		credential := db.QueryRow("SELECT Password, ID FROM users WHERE Email = ?", user.Email)
		var hashedPassword string
		var userID string
		err = credential.Scan(&hashedPassword, &userID)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Println(userID)

		err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(user.Password))
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		expiration := time.Now().Add(24 * time.Hour)
		cookie := http.Cookie{
			Name:    "nipo",
			Value:   userID,
			Expires: expiration,
		}
		http.SetCookie(w, &cookie)
		w.WriteHeader(http.StatusOK)

	}

	fmt.Println("seiko")
}

func createFollows(w http.ResponseWriter, r *http.Request) {

	var id ID
	err := json.NewDecoder(r.Body).Decode(&id)
	fmt.Println(id.ID)

	cookie, err := r.Cookie("nipo")

	if err != nil {
		fmt.Println("Cookie: ", err)
	}

	v := cookie.Value
	fmt.Println(v)

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	db.Exec("INSERT INTO follows(follower_id, followed_id,  is_following) VALUES (?,?,?)", v, id.ID, 1)
	fmt.Println("seiko")
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func unFollows(w http.ResponseWriter, r *http.Request) {
	fmt.Println("chino")

	var nipo ID
	err := json.NewDecoder(r.Body).Decode(&nipo)
	fmt.Println(nipo.ID)

	
	fmt.Println("Unfollow User ID: ", nipo.ID)

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println("Database connection failed: ", err)
		return
	}
	defer db.Close()

	db.Exec("DELETE FROM follows WHERE followed_id = ?", nipo.ID)

	json.NewEncoder(w).Encode(map[string]bool{"success": false})
	fmt.Println("Unfollow successful")
}

func Delete(w http.ResponseWriter, r *http.Request) {
	 
	ID := r.URL.Query().Get("ID")

    fmt.Println(ID);
	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println("Database connection failed: ", err)
		return
	}
	defer db.Close()

	db.Exec("DELETE FROM posts WHERE postId = ?", ID)

	fmt.Println("Delete successful")
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		fmt.Println(err)
	}
	defer rows.Close()

	var users []SignUp
	for rows.Next() {
		var u SignUp
		err := rows.Scan(&u.ID, &u.Email, &u.Password, &u.IsLoggedIn, &u.UserName, &u.Image)
		if err != nil {
			fmt.Println(err)
		}
		users = append(users, u)
		fmt.Println(users, "nikoniko")
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
	}
	json.NewEncoder(w).Encode(users)

}

func logout(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("nipo")
	if err != nil {
		fmt.Println(err)
		return
	}

	value := cookie.Value
	fmt.Println(value)

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
		return
	}
	_, err = db.Exec("UPDATE users SET IsLoggedIn = ? WHERE ID = ?", false, value)
	if err != nil {
		fmt.Println(err)
		return
	}

	cookie = &http.Cookie{
		Name:    "nipo",
		Value:   "",
		Expires: time.Unix(0, 0),
	}
	http.SetCookie(w, cookie)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"success": false})
	
}

func setCookieHandler(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("nipo")

	if err != nil {
		fmt.Println("Cookie: ", err)
	}

	v := cookie.Value
	fmt.Println("", v)

	json.NewEncoder(w).Encode(v)

}
func isLoggedIn(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("nipo")

	if err != nil {
		fmt.Println("Cookie: ", err)
	}

	value := cookie.Value
	fmt.Println(value)

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	var isLoggedIn bool
	err = db.QueryRow("SELECT IsLoggedIn FROM users WHERE ID = ?", value).Scan(&isLoggedIn)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(isLoggedIn)
	if isLoggedIn == true {
		json.NewEncoder(w).Encode(map[string]bool{"success": true})
		return
	}
	if isLoggedIn == false {
		json.NewEncoder(w).Encode(map[string]bool{"success": false})
		return
	}

}

func Follower(w http.ResponseWriter, r *http.Request) { 
	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	cookie, err := r.Cookie("nipo")
	if err != nil {
		http.Error(w, "Cookie not found", http.StatusBadRequest)
		return
	}

	vpo := cookie.Value

	stmt, err := db.Prepare("SELECT u.* FROM follows f JOIN users u ON f.followed_id = u.ID WHERE f.follower_id = ?")
	if err != nil {
		panic(err.Error()) 
	}
	defer stmt.Close()

	rows, err := stmt.Query(vpo)
	if err != nil {
		panic(err.Error()) 
	}
	defer rows.Close()

	var results []SignUp
	for rows.Next() {
		var r SignUp
		if err := rows.Scan(&r.ID, &r.Email, &r.Password, &r.IsLoggedIn, &r.UserName, &r.Image); err != nil {
			fmt.Println(err)
			continue
		}
		results = append(results, r)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err)
		return
	}

	if err := json.NewEncoder(w).Encode(results); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}


// func Follower(w http.ResponseWriter, r *http.Request) {

// 	cookie, err := r.Cookie("nipo")

// 	if err != nil {
// 		fmt.Println("Cookie: ", err)
// 	}

// 	vpo := cookie.Value
// 	fmt.Println(vpo)

// 	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	defer db.Close()
 
//     rows := db.QueryRow("SELECT u.* FROM follows f JOIN users u ON f.followed_id = u.ID WHERE f.follower_id = ?", vpo)
// 	fmt.Println("seiko")
// 	defer rows.Close()

// 	var results []SignUp

// 	for rows.Next() {
// 		var r SignUp
// 		err := rows.Scan(&r.ID, &r.Email, &r.Password, &r.IsLoggedIn, &r.UserName, &r.Image)
// 		if err != nil {
// 			fmt.Println(err)
// 		}
// 		results = append(users, r)
// 		fmt.Println(users, "nikoniko")
// 	}

// 	if err = rows.Err(); err != nil {
// 		fmt.Println(err)
// 	}
	
// 	json.NewEncoder(w).Encode(result)
	
// } 

func edit(w http.ResponseWriter, r *http.Request) {
	
	id := r.FormValue("id")
	text := r.FormValue("text")
	fmt.Println("Text: ", text)
	
    fmt.Println(id)
	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	if text != "" {
        _, err := db.Exec("UPDATE posts SET Content = ? WHERE postId = ?", text , id)
		if err != nil {
		  fmt.Println(err)
        }
	}

	r.ParseMultipartForm(1000 << 20)
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "File error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer file.Close()

    if file != nil {
	bucketName := "toaru2003"                               // GCSバケット名
	gcsFileName := handler.Filename                          // GCSバケットのアップロード先のパス
	credentialsFile := "avid-life-402901-6ec841ab4945.json" // サービスアカウント鍵ファイルのパス


	ctx := context.Background()
	client, err := storage.NewClient(ctx, option.WithCredentialsFile(credentialsFile))
	if err != nil {
		http.Error(w, "GCS client error: "+err.Error(), http.StatusInternalServerError)
		return
	}


	bucket := client.Bucket(bucketName)


	obj := bucket.Object(gcsFileName)


	wc := obj.NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		http.Error(w, "Upload error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := wc.Close(); err != nil {
		http.Error(w, "Upload error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("File upload successful")

	serviceAccountKey, err := os.ReadFile("avid-life-402901-6ec841ab4945.json")
	if err != nil {
	  fmt.Println(err)
	}

	config, err := google.JWTConfigFromJSON(serviceAccountKey)
	if err != nil {
	fmt.Println(err)
	}

	url, err := storage.SignedURL(bucketName, gcsFileName, &storage.SignedURLOptions{
		GoogleAccessID: "nipo-95@avid-life-402901.iam.gserviceaccount.com",
		PrivateKey:     config.PrivateKey,
		Method:         "GET",
		Expires:        time.Now().Add(360 * time.Minute),
	})

	

	if err != nil {
		fmt.Println(err)
		http.Error(w, "署名付きURL生成エラー: "+err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("UPDATE posts SET Url = ? WHERE postId = ?", url, id)

	if err != nil {
		fmt.Println(err)
	}
 } 
 
}
func upLoad(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("nipo")

	if err != nil {
		fmt.Println("Cookie: ", err)
	}

	vo := cookie.Value
	fmt.Println(vo)

	text := r.FormValue("text")
	fmt.Println("Text: ", text)
	

	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	r.ParseMultipartForm(1000 << 20)
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "File error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	bucketName := "toaru2003"                               // GCSバケット名
	gcsFileName := handler.Filename                          // GCSバケットのアップロード先のパス
	credentialsFile := "avid-life-402901-6ec841ab4945.json" // サービスアカウント鍵ファイルのパス


	ctx := context.Background()
	client, err := storage.NewClient(ctx, option.WithCredentialsFile(credentialsFile))
	if err != nil {
		http.Error(w, "GCS client error: "+err.Error(), http.StatusInternalServerError)
		return
	}


	bucket := client.Bucket(bucketName)


	obj := bucket.Object(gcsFileName)


	wc := obj.NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		http.Error(w, "Upload error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if err := wc.Close(); err != nil {
		http.Error(w, "Upload error: "+err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println("File upload successful")

	serviceAccountKey, err := os.ReadFile("avid-life-402901-6ec841ab4945.json")
	if err != nil {
	  fmt.Println(err)
	}

	config, err := google.JWTConfigFromJSON(serviceAccountKey)
	if err != nil {
	fmt.Println(err)
	}

	url, err := storage.SignedURL(bucketName, gcsFileName, &storage.SignedURLOptions{
		GoogleAccessID: "nipo-95@avid-life-402901.iam.gserviceaccount.com",
		PrivateKey:     config.PrivateKey,
		Method:         "GET",
		Expires:        time.Now().Add(360 * time.Minute),
	})

	fmt.Println(url)

	if err != nil {
		fmt.Println(err)
		http.Error(w, "署名付きURL生成エラー: "+err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("INSERT INTO posts( UserID,  Content, Url) VALUES (?,?,?)", vo, text, url)

	if err != nil {
		fmt.Println(err)
	}


 
	json.NewEncoder(w).Encode(map[string]string{"fileUrl": url})
}

func likeTweet(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("nipo")
	if err != nil {
		http.Error(w, "Cookie not found: "+err.Error(), http.StatusBadRequest)
		return
	}
	user := cookie.Value

    fmt.Println(user)

	fmt.Println("nipo")
	ID := r.URL.Query().Get("ID")
	fmt.Println(ID)

	
	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
   
    var count int
    err = db.QueryRow("SELECT COUNT(*) FROM likes WHERE user_id = ? AND tweet_id = ?", user, ID).Scan(&count)
    if err != nil {
        http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
        return
    }

    if count > 0 {
        http.Error(w, "Already liked", http.StatusBadRequest)
        return
    }

	_, err = db.Exec("INSERT INTO likes (user_id, tweet_id) VALUES (?, ?)", user, ID)
	if err != nil {
		http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]bool{"status": true})
	
}

func unLikeTweet(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("nipo")
	if err != nil {
		http.Error(w, "Cookie not found: "+err.Error(), http.StatusBadRequest)
		return
	}
	user := cookie.Value

    fmt.Println(user)

	fmt.Println("nipo")
	ID := r.URL.Query().Get("ID")
	fmt.Println(ID)

	
	db, err := sql.Open("mysql", "kairiueno:Thousand1475@tcp(localhost:3306)/Twitter")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()
   
   

	_, err = db.Exec("delete from likes where user_id = ? and tweet_id = ?", user, ID)
	if err != nil {
		http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]bool{"status": false})
	
}

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTION, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {
	http.HandleFunc("/get/users", enableCORS(getUsers))
	http.HandleFunc("/follows", enableCORS(createFollows))
	http.HandleFunc("/unfollows", enableCORS(unFollows))
	http.HandleFunc("/isLoggedIn", enableCORS(isLoggedIn))
	http.HandleFunc("/get/posts", enableCORS(getPosts))
	http.HandleFunc("/upLoads", enableCORS(upLoad))
	http.HandleFunc("/edits", enableCORS(edit))
	http.HandleFunc("/followings", enableCORS(IsFollowing))
	// http.HandleFunc("/posts", enableCORS(createPost))
	http.HandleFunc("/logouts", enableCORS(logout))
	http.HandleFunc("/logins", enableCORS(createLogin))
	http.HandleFunc("/signups", enableCORS(createSignUp))
	http.HandleFunc("/set", enableCORS(setCookieHandler))
	http.HandleFunc("/get/cookies", enableCORS(setCookieHandler))
    http.HandleFunc("/followers", enableCORS(Follower))
	http.HandleFunc("/delete", enableCORS(Delete))
	http.HandleFunc("/likes", enableCORS(likeTweet))
	http.ListenAndServe(":8080", nil)

}

