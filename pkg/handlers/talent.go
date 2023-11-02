package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) GetTalents(c *gin.Context) {
	talents, err := h.service.GetTalents()
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, talents)
}

func (h *Handler) GetTalent(c *gin.Context) {
	talent, err := h.service.GetTalentBySlug(c.Param("name"))

	if err != nil {
		//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"data": talent})
}
