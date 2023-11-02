package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) GetMonsters(c *gin.Context) {
	monsters, err := h.service.GetMonsters()
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, monsters)
}

func (h *Handler) GetMonster(c *gin.Context) {
	monster, err := h.service.GetMonsterBySlug(c.Param("name"))

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"data": monster})
}
