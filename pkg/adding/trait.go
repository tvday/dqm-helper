package adding

import (
	"errors"
	"github.com/tvday/dqm-helper/pkg/models"

	"github.com/gosimple/slug"
)

// AddTrait queries the repository to add a new trait (name, and description).
// If data does not contain a unique name an error will be returned.
// Returns the data of the added row: name, id, description and slug.
func (s *Service) AddTrait(data models.Trait) (*models.Trait, error) {
	if data.Name == "" {
		return nil, errors.New("missing name field")
	}
	if data.Description == "" {
		return nil, errors.New("missing description field")
	}

	data.Slug = slug.Make(data.Name)

	row := s.db.QueryRow(`
		INSERT INTO trait (name, description, slug)
		VALUES ($1, $2, $3)
		RETURNING name, trait_id, description, slug;`,
		data.Name, data.ID, data.Description, data.Slug)
	if err := row.Err(); err != nil {
		return nil, err
	}

	var trait models.Trait
	if err := row.Scan(&trait.Name, &trait.ID, &trait.Description, &trait.Slug); err != nil {
		return nil, err
	}

	return &trait, nil
}
