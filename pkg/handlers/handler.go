package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/pkg/adding"
	"github.com/tvday/dqm-helper/pkg/listing"
	"net/http"
)

func Handler(l listing.Service, a adding.Service) *gin.Engine {
	router := gin.Default()

	router.GET("/", homePage)

	group := router.Group("api/v1")
	{
		group.GET("/monsters", getMonsters(l))
		group.GET("/monsters/:slug", getMonster(l))

		group.GET("/skills", getSkills(l))
		group.GET("/skills/:slug", getSkill(l))
		group.POST("/skills", addSkill(a))

		group.GET("/traits", getTraits(l))
		group.GET("/traits/:slug", getTrait(l))
		group.POST("/traits", addTrait(a))

		group.GET("/talents", getTalents(l))
		group.GET("/talents/:slug", getTalent(l))

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
