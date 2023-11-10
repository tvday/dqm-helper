package adding

import "github.com/tvday/dqm-helper/pkg/models"

type ExistingMonsterTraitInput struct {
	TraitID        int `json:"traitID" binding:"required"`
	RequiredLevel  int `json:"requiredLevel"`
	RequiredPoints int `json:"requiredPoints"`
}

type NewMonsterTraitInput struct {
	TraitInput
	RequiredLevel  int `json:"requiredLevel"`
	RequiredPoints int `json:"requiredPoints"`
}

type ExistingMonsterTalentInput struct {
	TalentID   int  `json:"talentID" binding:"required"`
	IsInherent bool `json:"isInherent" binding:"required"`
}

type NewMonsterTalentInput struct {
	TalentInput
	IsInherent bool `json:"isInherent" binding:"required"`
}

type MonsterInput struct {
	models.Monster
	Name      string `json:"name" binding:"required"`
	MonsterNo int    `json:"monsterNo" binding:"required"`

	NewTraits       []NewMonsterTraitInput       `json:"newTraits" binding:"dive"`
	ExistingTraits  []ExistingMonsterTraitInput  `json:"existingTraits" binding:"dive"`
	NewTalents      []NewMonsterTalentInput      `json:"newTalents" binding:"dive"`
	ExistingTalents []ExistingMonsterTalentInput `json:"existingTalents" binding:"dive"`
}
