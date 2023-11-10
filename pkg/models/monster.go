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

	//Traits  []Trait  `json:"traits,omitempty"`
	//Talents []Talent `json:"talents,omitempty"`

	GrowthRateHP      int `json:"growthRateHP,omitempty"`
	GrowthRateMP      int `json:"growthRateMP,omitempty"`
	GrowthRateAttack  int `json:"growthRateAttack,omitempty"`
	GrowthRateDefense int `json:"growthRateDefense,omitempty"`
	GrowthRateAgility int `json:"growthRateAgility,omitempty"`
	GrowthRateWisdom  int `json:"growthRateWisdom,omitempty"`

	ResistanceFire         string `json:"resistanceFire,omitempty"`
	ResistanceWater        string `json:"resistanceWater,omitempty"`
	ResistanceWind         string `json:"resistanceWind,omitempty"`
	ResistanceEarth        string `json:"resistanceEarth,omitempty"`
	ResistanceExplosions   string `json:"resistanceExplosions,omitempty"`
	ResistanceIce          string `json:"resistanceIce,omitempty"`
	ResistanceElectricity  string `json:"resistanceElectricity,omitempty"`
	ResistanceLight        string `json:"resistanceLight,omitempty"`
	ResistanceDark         string `json:"resistanceDark,omitempty"`
	ResistanceDebilitation string `json:"resistanceDebilitation,omitempty"`
	ResistanceBedazzlement string `json:"resistanceBedazzlement,omitempty"`
	ResistanceAntimagic    string `json:"resistanceAntimagic,omitempty"`
	ResistanceMpAbsorption string `json:"resistanceMpAbsorption,omitempty"`
	ResistanceConfusion    string `json:"resistanceConfusion,omitempty"`
	ResistanceSleep        string `json:"resistanceSleep,omitempty"`
	ResistanceParalysis    string `json:"resistanceParalysis,omitempty"`
	ResistanceStun         string `json:"resistanceStun,omitempty"`
	ResistancePoison       string `json:"resistancePoison,omitempty"`
	ResistanceInstantDeath string `json:"resistanceInstantDeath,omitempty"`
}
