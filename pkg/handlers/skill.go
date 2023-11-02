package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) GetSkills(c *gin.Context) {
	skills, err := h.service.GetSkills()
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, skills)
}

func (h *Handler) GetSkill(c *gin.Context) {
	skill, err := h.service.GetSkillBySlug(c.Param("name"))

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"data": skill})
}
