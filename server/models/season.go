package models

type Season struct {
	Name      string `json:"name,omitempty"`
	ID        int    `json:"id,omitempty"`
	ImageSlug string `json:"imageSlug,omitempty"`
}
