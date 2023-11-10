package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/pkg/adding"
	"github.com/tvday/dqm-helper/pkg/listing"
	"github.com/tvday/dqm-helper/pkg/models"
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

		c.IndentedJSON(http.StatusOK, input)

		//result, err := a.AddTrait(input)
		//if err != nil {
		//	c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": inputErr.Error()})
		//}
		//c.IndentedJSON(http.StatusOK, result)
	}
}
