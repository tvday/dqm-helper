package handlers

import (
	"backend/pkg/listing"
	"database/sql"
)

type Handler struct {
	db      *sql.DB
	service *listing.Service
}

func NewHandler(db *sql.DB, service *listing.Service) *Handler {
	return &Handler{
		db:      db,
		service: service,
	}
}
