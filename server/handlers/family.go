package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/server/listing"
	"github.com/tvday/dqm-helper/server/models"
	"net/http"
)

func getFamilies(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		ranks, err := s.GetFamilies()
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, ranks)
	}
}

func getFamily(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		rank, err := s.QueryFamilies(models.Family{Slug: c.Param("slug")})

		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, rank)
	}
}
