package models

type Skill struct {
	Name        string `json:"name,omitempty"`
	Slug        string `json:"slug,omitempty"`
	ID          int    `json:"ID,omitempty"`
	Description string `json:"description,omitempty"`
	MPCost      int    `json:"mpCost,omitempty"`
	//RequiredPoints int    `json:"requiredPoints,omitempty"`
}
