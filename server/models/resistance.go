package models

type DamageType struct {
	Name string `json:"damageType,omitempty"`
	ID   int    `json:"damageTypeID,omitempty"`
}

type Resistance struct {
	Value string `json:"value,omitempty"`
	ID    int    `json:"resistanceValueID,omitempty"`
}
