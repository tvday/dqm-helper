package listing

import (
	"errors"
	"github.com/tvday/dqm-helper/server/models"
	"github.com/tvday/dqm-helper/server/util"

	_ "github.com/lib/pq"
)

type TalentOutput struct {
	models.Talent
	Skills []TalentSkillOutput `json:"skills,omitempty"`
	Traits []TalentTraitOutput `json:"traits,omitempty"`
}

type MonsterTalentOutput struct {
	TalentOutput
	IsInherent bool `json:"isInherent,omitempty"`
}

// GetTalents executes a query to return a list of all talents in the repository.
func (s *Service) GetTalents() ([]TalentOutput, error) {
	return s.getTalentData()
}

// QueryTalents creates and executes a query based on the provided data.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QueryTalents(data models.Talent) ([]TalentOutput, error) {
	return s.getTalentData(data)
}

// QueryTalent creates and executes a query based on the provided data.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QueryTalent(data models.Talent) (*TalentOutput, error) {
	result, err := s.getTalentData(data)
	if err != nil {
		return nil, err
	} else if len(result) > 0 {
		return &result[0], err
	} else {
		return nil, errors.New("record not found")
	}
}

// getTalentData creates and executes a query based on the provided data.
// Use non-default values in data for search parameters. No parameters mean there will be no filters.
// A struct with no non-default fields will return an error.
func (s *Service) getTalentData(data ...models.Talent) ([]TalentOutput, error) {
	query := util.NewQuery("SELECT name, talent_id, slug FROM talent")

	if len(data) == 0 {
		// do nothing
	} else if len(data) == 1 {
		var err error
		query, err = extractTalentPredicates(query, data[0])
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

	var talents []TalentOutput

	for rows.Next() {
		var talent TalentOutput
		if err := rows.Scan(&talent.Name, &talent.ID, &talent.Slug); err != nil {
			return nil, err
		}

		var err error
		talent.Skills, err = s.GetSkillsOfTalent(talent.ID)
		if err != nil {
			return nil, err
		}
		talent.Traits, err = s.GetTraitsOfTalent(talent.ID)
		if err != nil {
			return nil, err
		}

		talents = append(talents, talent)
	}

	return talents, nil
}

// extractSkillPredicates looks for non-default fields in data to add WHERE clauses to the query.
func extractTalentPredicates(q *util.Query, data models.Talent) (*util.Query, error) {
	if data.Name != "" {
		q = q.Where("name", data.Name)
	} else if data.Slug != "" {
		q = q.Where("slug", data.Slug)
	} else if data.ID != 0 {
		q = q.Where("talent_id", data.ID)
	} else {
		// TODO: error about not good search terms
		return nil, errors.New("TODO: error about not good search terms")
	}

	return q, nil
}

// GetTalentsOfMonster executes a query to return a list of all talents in the repository of a particular monster, by id.
func (s *Service) GetTalentsOfMonster(monsterID int) ([]MonsterTalentOutput, error) {
	talents, err := s.getTalentDataOfMonster(monsterID)
	if err != nil {
		return nil, err
	}
	return talents, nil
}

// GetTalentsOfMonsterDetailed executes a query to return a list of all talents, and their skills and traits, in the repository of a particular monster, by id.
func (s *Service) GetTalentsOfMonsterDetailed(monsterID int) ([]MonsterTalentOutput, error) {
	talents, err := s.getTalentDataOfMonster(monsterID)
	if err != nil {
		return nil, err
	}

	for i := range talents {
		t := &talents[i]
		t.Skills, err = s.GetSkillsOfTalent(t.ID)
		if err != nil {
			return nil, err
		}
		t.Traits, err = s.GetTraitsOfTalent(t.ID)
		if err != nil {
			return nil, err
		}
	}

	return talents, nil
}

// getTalentDataOfMonster executes a query to return a list of all talents in the repository of a particular monster, by id.
func (s *Service) getTalentDataOfMonster(monsterID int) ([]MonsterTalentOutput, error) {
	var talents []MonsterTalentOutput
	rows, err := s.db.Query(`
		SELECT name, t.talent_id, is_inherent, slug 
		FROM talent t JOIN monster_talent mt ON t.talent_id = mt.talent_id
		WHERE monster_id = $1;`, monsterID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var talent MonsterTalentOutput
		if err := rows.Scan(&talent.Name, &talent.ID, &talent.IsInherent, &talent.Slug); err != nil {
			return nil, err
		}
		talents = append(talents, talent)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return talents, nil
}
