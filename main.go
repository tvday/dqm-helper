package main

import (
	"backend/pkg/handlers"
	"backend/pkg/listing"
	"database/sql"
	"fmt"
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

	handler := handlers.NewHandler(db, listing.NewService(db))

	router := gin.Default()

	router.GET("/", homePage)

	group := router.Group("api/v1")
	{
		group.GET("/monsters", handler.GetMonsters)
		group.GET("/monsters/:name", handler.GetMonster)

		group.GET("/skills", handler.GetSkills)
		group.GET("/skills/:name", handler.GetSkill)

		group.GET("/traits", handler.GetTraits)
		group.GET("/traits/:name", handler.GetTrait)

		group.GET("/talents", handler.GetTalents)
		group.GET("/talents/:name", handler.GetTalent)
	}

	log.Fatal(router.Run(fmt.Sprintf(":%v", 8080)))

}

func homePage(c *gin.Context) {
	c.String(http.StatusOK, "This is my home page")
}
