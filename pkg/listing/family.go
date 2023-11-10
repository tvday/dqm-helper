package listing

import (
	"errors"
	"github.com/tvday/dqm-helper/pkg/models"
	"github.com/tvday/dqm-helper/pkg/util"
)

type FamilyOutput struct {
	models.Family
	Monsters []models.Monster `json:"monsters,omitempty"`
}

// GetFamilies executes a query to return a list of all families in the repository.
func (s *Service) GetFamilies() ([]FamilyOutput, error) {
	return s.getFamilyData()
}

// QueryFamilies creates and executes a query based on the provided data.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QueryFamilies(data models.Family) ([]FamilyOutput, error) {
	return s.getFamilyData(data)
}

// QueryFamily creates and executes a query based on the provided data. Returns the first result.
// Use non-default values in data for search parameters. Returns first result.
// A struct with no non-default fields will return an error.
func (s *Service) QueryFamily(data models.Family) (*FamilyOutput, error) {
	result, err := s.getFamilyData(data)
	if err != nil {
		return nil, err
	} else if len(result) > 0 {
		return &result[0], err
	} else {
		return nil, errors.New("record not found")
	}
}

// getFamilyData creates and executes a query based on the provided data.
// Use non-default values in data for search parameters. No parameters mean there will be no filters.
// A struct with no non-default fields will return an error.
func (s *Service) getFamilyData(data ...models.Family) ([]FamilyOutput, error) {
	query := util.NewQuery(`SELECT name, family_id, slug FROM family`).OrderBy("family_id")

	if len(data) == 0 {
		// do nothing
	} else if len(data) == 1 {
		var err error
		query, err = extractFamilyPredicates(query, data[0])
		if err != nil {
			return nil, err
		}
	} else {
		return nil, errors.New("currently only support one comparison")
	}

	rows, err := s.db.Query(query.Build(), query.GetArgs()...)
	defer rows.Close()
	if err != nil {
		return nil, err
	}

	var families []FamilyOutput
	for rows.Next() {
		var family FamilyOutput
		if err := rows.Scan(&family.Name, &family.ID, &family.Slug); err != nil {
			// record not found
			return nil, err
		}

		family.Monsters, err = s.GetMonstersOfFamily(family.ID)
		if err != nil {
			return nil, err
		}

		families = append(families, family)
	}

	return families, nil
}

// extractFamilyPredicates looks for non-default fields in data to add WHERE clauses to the query.
func extractFamilyPredicates(q *util.Query, data models.Family) (*util.Query, error) {
	if data.Name != "" {
		q = q.Where("name", data.Name)
	} else if data.Slug != "" {
		q = q.Where("slug", data.Slug)
	} else if data.ID != 0 {
		q = q.Where("family_id", data.ID)
	} else {
		// TODO: error about not good search terms
		return nil, errors.New("TODO: error about not good search terms")
	}

	return q, nil
}
