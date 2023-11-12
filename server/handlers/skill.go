package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/tvday/dqm-helper/server/adding"
	"github.com/tvday/dqm-helper/server/listing"
	"github.com/tvday/dqm-helper/server/models"
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
		var input adding.SkillInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		result, err := s.AddSkill(input)
		if err != nil {
			c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.Header("Location", fmt.Sprintf("/skills/%s", result.Slug))
		c.IndentedJSON(http.StatusCreated, result)
	}
}
