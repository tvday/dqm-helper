package models

type Talent struct {
	Name string `json:"name,omitempty"`
	Slug string `json:"slug,omitempty"`
	ID   int    `json:"ID,omitempty"`
	//IsInherent bool   `json:"isInherent,omitempty"`
	//Skills     []Skill `json:"skills,omitempty"`
	//Traits     []Trait `json:"traits,omitempty"`
}
