package listing

import (
	"errors"
	_ "github.com/lib/pq"
	"github.com/tvday/dqm-helper/pkg/models"
	"github.com/tvday/dqm-helper/pkg/util"
)

// GetSkillsOfTalent executes a query to return a list of all skills in the repository of a particular talent, by id.
func (s *Service) GetSkillsOfTalent(talentID int) ([]models.Skill, error) {
	var skills []models.Skill

	rows, err := s.db.Query(`
		SELECT name, s.skill_id, description, required_points, slug
       	FROM skill s JOIN talent_skill ts ON s.skill_id = ts.skill_id
       	WHERE talent_id = $1
       	ORDER BY required_points, name;`, talentID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var skill models.Skill
		if err := rows.Scan(&skill.Name, &skill.ID, &skill.Description, &skill.RequiredPoints, &skill.Slug); err != nil {
			return nil, err
		}
		skills = append(skills, skill)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return skills, nil
}

// GetSkills executes a query to return a list of all skills in the repository.
func (s *Service) GetSkills() ([]models.Skill, error) {
	return s.getSkillData()
}

// QuerySkills creates and executes a query based on the provided data.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QuerySkills(data models.Skill) ([]models.Skill, error) {
	return s.getSkillData(data)
}

// QuerySkill creates and executes a query based on the provided data. Returns the first result.
// Use non-default values in data for search parameters. Returns first result.
// A struct with no non-default fields will return an error.
func (s *Service) QuerySkill(data models.Skill) (*models.Skill, error) {
	result, err := s.getSkillData(data)
	if err != nil {
		return nil, err
	} else if len(result) > 0 {
		return &result[0], err
	} else {
		return nil, errors.New("record not found")
	}
}

// getSkillData creates and executes a query based on the provided data.
// Use non-default values in data for search parameters. No parameters mean there will be no filters.
// A struct with no non-default fields will return an error.
func (s *Service) getSkillData(data ...models.Skill) ([]models.Skill, error) {
	query := util.NewQuery(`SELECT name, skill_id, mp_cost, description, slug FROM skill`)

	if len(data) == 0 {
		// do nothing
	} else if len(data) == 1 {
		var err error
		query, err = extractSkillPredicates(query, data[0])
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

	var skills []models.Skill
	for rows.Next() {
		var skill models.Skill
		if err := rows.Scan(&skill.Name, &skill.ID, &skill.MPCost, &skill.Description, &skill.Slug); err != nil {
			// record not found
			return nil, err
		}

		skills = append(skills, skill)
	}

	return skills, nil
}

// extractSkillPredicates looks for non-default fields in data to add WHERE clauses to the query.
func extractSkillPredicates(q *util.Query, data models.Skill) (*util.Query, error) {
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
