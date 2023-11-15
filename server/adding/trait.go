package adding

import (
	"github.com/tvday/dqm-helper/server/models"

	_ "github.com/gin-gonic/gin/binding"
	"github.com/gosimple/slug"
)

type TraitInput struct {
	models.Trait
	Name string `json:"name" binding:"required"`
}

// AddTrait queries the repository to add a new trait (name, and description).
// If data does not contain a unique name an error will be returned.
// Returns the data of the added row: name, id, description and slug.
func (s *Service) AddTrait(data TraitInput) (*models.Trait, error) {
	data.Slug = slug.Make(data.Name)

	row := s.db.QueryRow(`
		INSERT INTO trait (name, description, slug)
		VALUES ($1, $2, $3)
		RETURNING name, trait_id, description, slug;`,
		data.Name, data.Description, data.Slug)
	if err := row.Err(); err != nil {
		return nil, err
	}

	var trait models.Trait
	if err := row.Scan(&trait.Name, &trait.ID, &trait.Description, &trait.Slug); err != nil {
		return nil, err
	}

	return &trait, nil
}
