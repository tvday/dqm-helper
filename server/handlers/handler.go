package handlers

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/server/adding"
	"github.com/tvday/dqm-helper/server/listing"
	"net/http"
)

func Handler(l listing.Service, a adding.Service) *gin.Engine {
	router := gin.Default()

	router.Use(cors.Default())

	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	//router.GET("/", homePage)
	router.Static("/icons", "./assets/icons")

	group := router.Group("api/v1")
	{
		group.GET("/monsters", getMonsters(l))
		group.GET("/monsters/:slug", getMonster(l))
		group.POST("/monsters", addMonster(a))

		group.GET("/skills", getSkills(l))
		group.GET("/skills/:slug", getSkill(l))
		group.POST("/skills", addSkill(a))

		group.GET("/traits", getTraits(l))
		group.GET("/traits/:slug", getTrait(l))
		group.POST("/traits", addTrait(a))

		group.GET("/talents", getTalents(l))
		group.GET("/talents/:slug", getTalent(l))
		group.POST("/talents", addTalent(a))

		group.GET("/ranks", getRanks(l))
		group.GET("/ranks/:slug", getRank(l))

		group.GET("/families", getFamilies(l))
		group.GET("/families/:slug", getFamily(l))
	}

	return router
}

func homePage(c *gin.Context) {
	c.String(http.StatusOK, "This is my home page")
}
