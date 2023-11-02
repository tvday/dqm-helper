package models

type Trait struct {
	Name           string `json:"name,omitempty"`
	Slug           string `json:"slug,omitempty"`
	ID             int    `json:"ID,omitempty"`
	Description    string `json:"description,omitempty"`
	IsLargeTrait   string `json:"isLargeTrait,omitempty"`
	RequiredPoints int    `json:"requiredPoints,omitempty"`
	RequiredLevel  *int   `json:"requiredLevel,omitempty"`
}
