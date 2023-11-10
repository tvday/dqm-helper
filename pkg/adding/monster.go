package adding

import "github.com/tvday/dqm-helper/pkg/models"

type ExistingMonsterTraitInput struct {
	TraitID        int  `json:"id" binding:"required"`
	IsLargeTrait   bool `json:"isLargeTrait"`
	RequiredLevel  int  `json:"requiredLevel"`
	RequiredPoints int  `json:"requiredPoints"`
}

type NewMonsterTraitInput struct {
	TraitInput
	IsLargeTrait   bool `json:"isLargeTrait"`
	RequiredLevel  int  `json:"requiredLevel"`
	RequiredPoints int  `json:"requiredPoints"`
}

type ExistingMonsterTalentInput struct {
	TalentID   int  `json:"id" binding:"required"`
	IsInherent bool `json:"isInherent"`
}

type NewMonsterTalentInput struct {
	TalentInput
	IsInherent bool `json:"isInherent"`
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
