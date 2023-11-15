package models

type Rank struct {
	ID   int    `json:"ID,omitempty"`
	Name string `json:"name,omitempty"`
	Slug string `json:"slug,omitempty"`
	//Monsters []Monster `json:"monster,omitempty"`
}
