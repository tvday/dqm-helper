package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/pkg/adding"
	"github.com/tvday/dqm-helper/pkg/listing"
	"github.com/tvday/dqm-helper/pkg/models"
	"net/http"
)

func getSkills(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		skills, err := s.GetSkills()
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, skills)
	}
}

func getSkill(s listing.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		skill, err := s.QuerySkill(models.Skill{Slug: c.Param("slug")})

		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
			return
		}

		c.IndentedJSON(http.StatusOK, skill)
	}
}

func addSkill(s adding.Service) func(c *gin.Context) {
	return func(c *gin.Context) {
		var input models.Skill
		if err := c.ShouldBindJSON(&input); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		iErr := NewInputError()
		if input.Name == "" {
			iErr.addMissingField("name")
		}
		if input.Description == "" {
			iErr.addMissingField("description")
		}
		if input.MPCost == 0 {
			iErr.addMissingField("mpCost")
		}
		if iErr.isError() {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": iErr.Error()})
		}

		result, err := s.AddSkill(input)
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		c.IndentedJSON(http.StatusOK, result)
	}
}
