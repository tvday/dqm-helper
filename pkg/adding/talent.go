package adding

import (
	"encoding/json"
	"errors"
	"github.com/gosimple/slug"
	"github.com/tvday/dqm-helper/pkg/models"
	"log"
)

type ExistingTalentSkillInput struct {
	SkillID        int `json:"skillID" binding:"required"`
	RequiredPoints int `json:"requiredPoints"`
}

type NewTalentSkillInput struct {
	SkillInput
	RequiredPoints int `json:"requiredPoints"`
}

type ExistingTalentTraitInput struct {
	TraitID        int `json:"traitID" binding:"required"`
	RequiredPoints int `json:"requiredPoints"`
}

type NewTalentTraitInput struct {
	TalentInput
	RequiredPoints int `json:"requiredPoints"`
}

type TalentInput struct {
	models.Talent
	Name string `json:"name" binding:"required"`

	NewSkills      []NewTalentSkillInput      `json:"newSkills" binding:"dive"`
	ExistingSkills []ExistingTalentSkillInput `json:"existingSkills" binding:"dive"`
	NewTraits      []NewTalentTraitInput      `json:"newTraits" binding:"dive"`
	ExistingTraits []ExistingTalentTraitInput `json:"existingTraits" binding:"dive"`
}

func (s *Service) AddTalent(data *TalentInput) (*models.Talent, error) {
	if data.Name == "" {
		return nil, errors.New("missing name")
	}
	data.Slug = slug.Make(data.Name)

	b, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		log.Println(err)
	}
	log.Println(string(b))

	return nil, nil
}
