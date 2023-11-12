package models

type Trait struct {
	Name        string `json:"name,omitempty"`
	Slug        string `json:"slug,omitempty"`
	ID          int    `json:"id,omitempty"`
	Description string `json:"description,omitempty"`
	//IsLargeTrait   bool `json:"isLargeTrait,omitempty"`
	//RequiredPoints int    `json:"requiredPoints,omitempty"`
	//RequiredLevel  int    `json:"requiredLevel,omitempty"`
}
