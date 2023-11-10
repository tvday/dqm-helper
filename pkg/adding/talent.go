package adding

import (
	"errors"
	"github.com/gosimple/slug"
	"github.com/tvday/dqm-helper/pkg/models"
)

func (s *Service) AddTalent(data *models.Talent) (*models.Talent, error) {
	if data.Name == "" {
		return nil, errors.New("missing name")
	}
	data.Slug = slug.Make(data.Name)

	return nil, nil
}
