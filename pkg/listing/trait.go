package listing

import (
	"errors"
	_ "github.com/lib/pq"
	"github.com/tvday/dqm-helper/pkg/models"
	"github.com/tvday/dqm-helper/pkg/util"
)

// GetTraits executes a query to return a list of all traits in the repository.
func (s *Service) GetTraits() ([]models.Trait, error) {
	return s.getTraitData()
}

// QueryTraits creates and executes a query based on the provided data.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QueryTraits(data models.Trait) ([]models.Trait, error) {
	return s.getTraitData(data)
}

// QueryTrait creates and executes a query based on the provided data.
// Use non-default values in data for search parameters. Returns the first result.
// A struct with no non-default fields will return an error.
func (s *Service) QueryTrait(data models.Trait) (*models.Trait, error) {
	result, err := s.getTraitData(data)
	if err != nil {
		return nil, err
	} else if len(result) > 0 {
		return &result[0], err
	} else {
		return nil, errors.New("record not found")
	}
}

// getTraitData creates and executes a query based on the provided data.
// Use non-default values in data for search parameters. No parameters mean there will be no filters.
// A struct with no non-default fields will return an error.
func (s *Service) getTraitData(data ...models.Trait) ([]models.Trait, error) {
	query := util.NewQuery("SELECT name, trait_id, description, slug FROM trait")

	if len(data) == 0 {
		// do nothing
	} else if len(data) == 1 {
		var err error
		query, err = extractTraitPredicates(query, data[0])
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

	var traits []models.Trait
	for rows.Next() {
		var trait models.Trait
		if err := rows.Scan(&trait.Name, &trait.ID, &trait.Description, &trait.Slug); err != nil {
			// record not found
			return nil, err
		}
		traits = append(traits, trait)
	}

	return traits, nil
}

// extractSkillPredicates looks for non-default fields in data to add WHERE clauses to the query.
func extractTraitPredicates(q *util.Query, data models.Trait) (*util.Query, error) {
	if data.Name != "" {
		q = q.Where("name", data.Name)
	} else if data.Slug != "" {
		q = q.Where("slug", data.Slug)
	} else if data.ID != 0 {
		q = q.Where("skill_id", data.ID)
	} else {
		// TODO: error about not good search terms
		return nil, errors.New("TODO: error about not good search terms")
	}

	return q, nil
}

// GetTraitsOfMonster executes a query to return a list of all traits in the repository of a particular monster, by id.
func (s *Service) GetTraitsOfMonster(monsterID int) ([]models.Trait, error) {
	var traits []models.Trait

	rows, err := s.db.Query(`
		SELECT name, t.trait_id, description, is_large_trait, required_level, slug
       	FROM trait t JOIN monster_trait mt ON t.trait_id = mt.trait_id
       	WHERE monster_id = $1
       	ORDER BY is_large_trait, required_level;`, monsterID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var trait models.Trait
		if err := rows.Scan(&trait.Name, &trait.ID, &trait.Description, &trait.IsLargeTrait, &trait.RequiredLevel, &trait.Slug); err != nil {
			return nil, err
		}
		traits = append(traits, trait)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return traits, nil
}

// GetTraitsOfTalent executes a query to return a list of all traits in the repository of a particular talent, by id.
func (s *Service) GetTraitsOfTalent(talentID int) ([]models.Trait, error) {
	var traits []models.Trait

	rows, err := s.db.Query(`
		SELECT name, t.trait_id, description, required_points, slug
       	FROM trait t JOIN talent_trait tt ON t.trait_id = tt.trait_id
       	WHERE talent_id = $1
       	ORDER BY required_points, name;`, talentID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var trait models.Trait
		if err := rows.Scan(&trait.Name, &trait.ID, &trait.Description, &trait.RequiredPoints, &trait.Slug); err != nil {
			return nil, err
		}
		traits = append(traits, trait)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return traits, nil
}
