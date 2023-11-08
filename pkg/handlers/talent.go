package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/pkg/listing"
	"github.com/tvday/dqm-helper/pkg/models"
	"net/http"
)

func getTalents(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		talents, err := s.GetTalents()
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, talents)
	}
}

func getTalent(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		talent, err := s.QueryTalent(models.Talent{Slug: c.Param("name")})

		if err != nil {
			//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, talent)
	}
}
