package models

type Talent struct {
	Name string `json:"name,omitempty"`
	Slug string `json:"slug,omitempty"`
	ID   int    `json:"id,omitempty"`
}
