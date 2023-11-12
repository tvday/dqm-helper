package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/server/adding"
	"github.com/tvday/dqm-helper/server/listing"
	"github.com/tvday/dqm-helper/server/models"
	"net/http"
)

func getTraits(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		traits, err := s.GetTraits()
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, traits)
	}
}

func getTrait(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		trait, err := s.QueryTrait(models.Trait{Slug: c.Param("slug")})

		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
			return
		}

		c.IndentedJSON(http.StatusOK, trait)
	}
}

func addTrait(a adding.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		var input adding.TraitInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		result, err := a.AddTrait(input)
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.Header("Location", fmt.Sprintf("/traits/%s", result.Slug))
		c.IndentedJSON(http.StatusCreated, result)
	}
}
