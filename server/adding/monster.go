package adding

import "github.com/tvday/dqm-helper/server/models"

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

type GrowthRateInput struct {
}

type ResistanceInput struct {
}

type MonsterInput struct {
	models.Monster
	Name      string `json:"name" binding:"required"`
	MonsterNo int    `json:"monsterNo" binding:"required"`

	GrowthRates []GrowthRateInput `json:"growthRates" binding:"dive"`
	Resistances []ResistanceInput `json:"resistances" binding:"dive"`

	NewTraits       []NewMonsterTraitInput       `json:"newTraits" binding:"dive"`
	ExistingTraits  []ExistingMonsterTraitInput  `json:"existingTraits" binding:"dive"`
	NewTalents      []NewMonsterTalentInput      `json:"newTalents" binding:"dive"`
	ExistingTalents []ExistingMonsterTalentInput `json:"existingTalents" binding:"dive"`
}
