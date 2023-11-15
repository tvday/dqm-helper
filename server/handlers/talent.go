package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/server/adding"
	"github.com/tvday/dqm-helper/server/listing"
	"github.com/tvday/dqm-helper/server/models"
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
		talent, err := s.QueryTalent(models.Talent{Slug: c.Param("slug")})

		if err != nil {
			//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, talent)
	}
}

func addTalent(a adding.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		var input adding.TalentInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		output, err := a.AddTalent(&input)
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.Header("Location", "/talents/"+output.Slug)
		c.IndentedJSON(http.StatusCreated, output)
	}
}
