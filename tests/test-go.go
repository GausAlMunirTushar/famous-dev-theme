// Go Test File - Famous Dev Theme Enhanced Support
// This file demonstrates Go syntax highlighting

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// User struct with JSON tags
type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	Active    bool      `json:"active"`
}

// UserService interface
type UserService interface {
	GetUser(id int) (*User, error)
	CreateUser(user *User) error
	UpdateUser(user *User) error
	DeleteUser(id int) error
}

// Concrete implementation
type userService struct {
	db *sql.DB
}

// Constructor function
func NewUserService(db *sql.DB) UserService {
	return &userService{db: db}
}

// Methods on struct
func (s *userService) GetUser(id int) (*User, error) {
	query := "SELECT id, name, email, created_at, active FROM users WHERE id = ?"
	row := s.db.QueryRow(query, id)

	var user User
	err := row.Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt, &user.Active)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (s *userService) CreateUser(user *User) error {
	query := "INSERT INTO users (name, email, created_at, active) VALUES (?, ?, ?, ?)"
	result, err := s.db.Exec(query, user.Name, user.Email, user.CreatedAt, user.Active)
	if err != nil {
		return err
	}

	lastInsertID, err := result.LastInsertId()
	if err != nil {
		return err
	}

	user.ID = int(lastInsertID)
	return nil
}

func (s *userService) UpdateUser(user *User) error {
	query := "UPDATE users SET name = ?, email = ?, active = ? WHERE id = ?"
	_, err := s.db.Exec(query, user.Name, user.Email, user.Active, user.ID)
	return err
}

func (s *userService) DeleteUser(id int) error {
	query := "DELETE FROM users WHERE id = ?"
	_, err := s.db.Exec(query, id)
	return err
}

// Handler functions for HTTP
func getUserHandler(service UserService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get ID from URL parameters
		id := 1 // In a real app, this would come from URL params

		user, err := service.GetUser(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(user); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

// Generic function (Go 1.18+)
func GenericMax[T comparable](a, b T) T {
	if a > b {
		return a
	}
	return b
}

// Channels and goroutines
func worker(id int, jobs <-chan int, results chan<- int) {
	for job := range jobs {
		fmt.Printf("Worker %d processing job %d\n", id, job)
		time.Sleep(time.Second) // Simulate work
		results <- job * 2
	}
}

// Main function
func main() {
	// Database connection (example)
	db, err := sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/dbname")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create service
	service := NewUserService(db)

	// Example user
	user := &User{
		Name:      "John Doe",
		Email:     "john@example.com",
		CreatedAt: time.Now(),
		Active:    true,
	}

	// Create user
	if err := service.CreateUser(user); err != nil {
		log.Printf("Error creating user: %v", err)
	} else {
		fmt.Printf("Created user: %+v\n", user)
	}

	// HTTP server example
	http.HandleFunc("/users", getUserHandler(service))
	
	// Run server in goroutine
	go func() {
		fmt.Println("Server starting on :8080")
		if err := http.ListenAndServe(":8080", nil); err != nil {
			log.Fatal(err)
		}
	}()

	// Channels example
	const numJobs = 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	// Start workers
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	// Send jobs
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)

	// Collect results
	for a := 1; a <= numJobs; a++ {
		<-results
	}

	// Wait for user input before exiting
	fmt.Println("Press Enter to exit...")
	fmt.Scanln()

	fmt.Println("Go syntax highlighting test complete")
}