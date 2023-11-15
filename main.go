package main

import (
	"database/sql"
	"fmt"
	"github.com/tvday/dqm-helper/server/adding"
	"github.com/tvday/dqm-helper/server/handlers"
	"github.com/tvday/dqm-helper/server/listing"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	//"github.com/gosimple/slug"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "thomas"
	password = "<password>"
	dbname   = "dragonquest"
)

func CheckError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	// connect to db and check connection
	psqlConn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlConn)
	CheckError(err)
	defer db.Close()
	CheckError(db.Ping())

	lister := *listing.NewService(db)
	adder := *adding.NewService(db)

	router := handlers.Handler(lister, adder)

	log.Fatal(router.Run(fmt.Sprintf(":%v", 8080)))

}

func homePage(c *gin.Context) {
	c.String(http.StatusOK, "This is my home page")
}
