package models

type Skill struct {
	Name               string `json:"name,omitempty"`
	Slug               string `json:"slug,omitempty"`
	ID                 int    `json:"id,omitempty"`
	Description        string `json:"description,omitempty"`
	MPCost             int    `json:"mpCost,omitempty"`
	SkillType          string `json:"skillType,omitempty"`
	SkillTypeImageSlug string `json:"skillTypeImageSlug,omitempty"`
}
