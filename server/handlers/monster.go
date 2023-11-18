package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/server/adding"
	"github.com/tvday/dqm-helper/server/listing"
	"github.com/tvday/dqm-helper/server/models"
	"net/http"
)

func getMonsters(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		monsters, err := s.GetMonsters()
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, monsters)
	}
}

func getMonster(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		monster, err := s.QueryMonster(models.Monster{Slug: c.Param("slug")})

		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
			return
		}

		c.IndentedJSON(http.StatusOK, monster)
	}
}

func addMonster(a adding.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		var input adding.MonsterInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, input)

		//result, err := a.AddTrait(input)
		//if err != nil {
		//	c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": inputErr.Error()})
		//}
		//c.IndentedJSON(http.StatusOK, result)
	}
}
