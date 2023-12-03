package listing

import (
	"errors"
	_ "github.com/lib/pq"
	"github.com/tvday/dqm-helper/server/models"
	"github.com/tvday/dqm-helper/server/util"
)

type MonsterOutput struct {
	models.Monster
	GrowthRates []AttributeOutput     `json:"growthRates,omitempty"`
	Resistances []ResistanceOutput    `json:"resistances,omitempty"`
	Traits      []MonsterTraitOutput  `json:"traits,omitempty"`
	Talents     []MonsterTalentOutput `json:"talents,omitempty"`
	ImageURL    *string               `json:"image,omitempty"`
}

// GetMonsters executes a query to return a list of all monsters in the repository.
func (s *Service) GetMonsters() ([]MonsterOutput, error) {
	return s.getMonsterData(true)
}

// GetMonstersOfFamily executes a query to return a list of all monsters in the repository with a specific family_id.
func (s *Service) GetMonstersOfFamily(id int) ([]MonsterOutput, error) {
	return s.getMonsterData(true, models.Monster{FamilyID: id})
}

// GetMonstersOfRank executes a query to return a list of all monsters in the repository with a specific rank_id.
func (s *Service) GetMonstersOfRank(id int) ([]MonsterOutput, error) {
	return s.getMonsterData(true, models.Monster{RankID: id})
}

// QueryMonsters creates and executes a query based on the provided data.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QueryMonsters(data models.Monster) ([]MonsterOutput, error) {
	return s.getMonsterData(false, data)
}

// QueryMonster creates and executes a query based on the provided data. Returns the first result.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QueryMonster(data models.Monster) (*MonsterOutput, error) {
	result, err := s.getMonsterData(false, data)
	if err != nil {
		return nil, err
	} else if len(result) > 0 {
		return &result[0], err
	} else {
		return nil, errors.New("record not found")
	}
}

// getMonsterData creates and executes a query based on the provided data.
// simple is a bool that dictates whether full data of the monster will be returned a simplified set.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) getMonsterData(simple bool, data ...models.Monster) ([]MonsterOutput, error) {
	query := util.NewQuery(`
			SELECT m.name as name, monster_id, entry_no, f.name as family, f.img_slug, r.name as rank, m.slug, image
			FROM monster m
			JOIN family f ON m.family_id = f.family_id
			JOIN rank r ON m.rank_id = r.rank_id `)

	if len(data) == 0 {
		// do nothing
	} else if len(data) == 1 {
		var err error
		query, err = extractMonsterPredicates(query, data[0])
		if err != nil {
			return nil, err
		}
	} else {
		return nil, errors.New("currently only support one comparison")
	}

	rows, err := s.db.Query(query.Build(), query.GetArgs()...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var monsters []MonsterOutput
	for rows.Next() {
		var m MonsterOutput
		if err := rows.Scan(&m.Name, &m.ID, &m.MonsterNo, &m.Family, &m.FamilyImageSlug, &m.Rank, &m.Slug, &m.ImageURL); err != nil {
			return nil, err
		}

		if !simple {
			m.GrowthRates, err = s.GetAttributesOfMonster(m.ID)
			if err != nil {
				return nil, err
			}

			m.Resistances, err = s.GetResistancesOfMonster(m.ID)
			if err != nil {
				return nil, err
			}

			m.Traits, err = s.GetTraitsOfMonster(m.ID)
			if err != nil {
				return nil, err
			}

			m.Talents, err = s.GetTalentsOfMonsterDetailed(m.ID)
			if err != nil {
				return nil, err
			}
		}

		monsters = append(monsters, m)
	}

	return monsters, nil
}

// extractMonsterPredicates looks for non-default fields in data to add WHERE clauses to the query.
func extractMonsterPredicates(q *util.Query, data models.Monster) (*util.Query, error) {
	if data.ID != 0 {
		q = q.Where("m.monster_id", data.ID)
	} else if data.Name != "" {
		q = q.Where("m.name", data.Name)
	} else if data.MonsterNo != 0 {
		q = q.Where("m.entry_no", data.MonsterNo)
	} else if data.Slug != "" {
		q = q.Where("m.slug", data.Slug)
	} else if data.FamilyID != 0 {
		q = q.Where("m.family_id", data.FamilyID)
	} else if data.Family != "" {
		q = q.Where("f.name", data.Family)
	} else if data.RankID != 0 {
		q = q.Where("m.rank_id", data.RankID)
	} else if data.Rank != "" {
		q = q.Where("r.name", data.Rank)
	} else {
		// TODO: error about not good search terms
		return nil, errors.New("TODO: error about not good search terms")
	}

	return q, nil
}
