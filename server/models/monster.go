package models

type Monster struct {
	Name      string `json:"name,omitempty"`
	ID        int    `json:"id,omitempty"`
	Slug      string `json:"slug,omitempty"`
	MonsterNo int    `json:"monsterNo,omitempty"`
	Family    string `json:"family,omitempty"`
	FamilyID  int    `json:"familyID,omitempty"`
	Rank      string `json:"rank,omitempty"`
	RankID    int    `json:"rankID,omitempty"`
	ImageURL  string `json:"imageURL,omitempty"`
}
