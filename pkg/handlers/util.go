package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/pkg/listing"
	"net/http"
)

func Handler(l listing.Service) *gin.Engine {
	router := gin.Default()

	router.GET("/", homePage)

	group := router.Group("api/v1")
	{
		group.GET("/monsters", getMonsters(l))
		group.GET("/monsters/:name", getMonster(l))

		group.GET("/skills", getSkills(l))
		group.GET("/skills/:name", getSkill(l))

		group.GET("/traits", getTraits(l))
		group.GET("/traits/:name", getTrait(l))

		group.GET("/talents", getTalents(l))
		group.GET("/talents/:name", getTalent(l))
	}

	return router
}

func homePage(c *gin.Context) {
	c.String(http.StatusOK, "This is my home page")
}
