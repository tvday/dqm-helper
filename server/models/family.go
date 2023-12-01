package models

type Family struct {
	ID        int    `json:"ID,omitempty"`
	Name      string `json:"name,omitempty"`
	Slug      string `json:"slug,omitempty"`
	ImageSlug string `json:"imageSlug,omitempty"`
}
