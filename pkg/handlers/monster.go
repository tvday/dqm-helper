package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/pkg/listing"
	"github.com/tvday/dqm-helper/pkg/models"
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
		monster, err := s.QueryMonsters(models.Monster{Slug: c.Param("name")})

		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
			return
		}

		c.IndentedJSON(http.StatusOK, monster)
	}
}
