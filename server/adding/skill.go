package adding

import (
	"github.com/gosimple/slug"
	"github.com/tvday/dqm-helper/server/models"
)

type SkillInput struct {
	models.Skill
	Name string `json:"name" binding:"required"`
}

// AddSkill queries the repository to add a new skill (name, description, mp cost).
// If data does not contain a unique name an error will be returned.
// Returns the data of the added row: name, id, description, mp cost, and slug.
func (s *Service) AddSkill(data SkillInput) (*models.Skill, error) {
	data.Slug = slug.Make(data.Name)

	row := s.db.QueryRow(`
		INSERT INTO skill (name, description, mp_cost, slug)
		VALUES ($1, $2, $3, $4)
		RETURNING name, skill_id, description, mp_cost, slug;`,
		data.Name, data.Description, data.MPCost, data.Slug)
	if err := row.Err(); err != nil {
		return nil, err
	}

	var skill models.Skill
	if err := row.Scan(&skill.Name, &skill.ID, &skill.Description, &skill.MPCost, &skill.Slug); err != nil {
		return nil, err
	}

	return &skill, nil
}
