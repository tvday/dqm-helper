package listing

import (
	"database/sql"
)

type Service struct {
	db *sql.DB
}

func NewService(db *sql.DB) *Service {
	return &Service{db: db}
}

type searchPredicate int

const (
	pID searchPredicate = iota
	pNAME
	pSLUG
	pENTRYNO
)