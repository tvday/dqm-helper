package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) GetTraits(c *gin.Context) {
	traits, err := h.service.GetTraits()
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, traits)
}

func (h *Handler) GetTrait(c *gin.Context) {
	trait, err := h.service.GetTraitBySlug(c.Param("name"))

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		//c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Record not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"data": trait})
}
