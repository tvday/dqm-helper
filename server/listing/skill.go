package listing

import (
	"errors"
	_ "github.com/lib/pq"
	"github.com/tvday/dqm-helper/server/models"
	"github.com/tvday/dqm-helper/server/util"
)

type SkillOutput struct {
	models.Skill
}

type TalentSkillOutput struct {
	SkillOutput
	RequiredPoints int `json:"requiredPoints,omitempty"`
}

// GetSkillsOfTalent executes a query to return a list of all skills in the repository of a particular talent, by id.
func (s *Service) GetSkillsOfTalent(talentID int) ([]TalentSkillOutput, error) {
	var skills []TalentSkillOutput

	rows, err := s.db.Query(`
		SELECT s.name, s.skill_id, mp_cost, description, required_points, slug, st.name, st.img_slug
       	FROM skill s JOIN talent_skill ts ON s.skill_id = ts.skill_id JOIN skill_type st ON s.skill_type_id = st.skill_type_id
       	WHERE talent_id = $1
       	ORDER BY required_points, s.name;`, talentID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var skill TalentSkillOutput
		if err := rows.Scan(&skill.Name, &skill.ID, &skill.MPCost, &skill.Description,
			&skill.RequiredPoints, &skill.Slug, &skill.SkillType, &skill.SkillTypeImageSlug); err != nil {
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
func (s *Service) GetSkills() ([]SkillOutput, error) {
	return s.getSkillData()
}

// QuerySkills creates and executes a query based on the provided data.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QuerySkills(data models.Skill) ([]SkillOutput, error) {
	return s.getSkillData(data)
}

// QuerySkill creates and executes a query based on the provided data. Returns the first result.
// Use non-default values in data for search parameters. Returns first result.
// A struct with no non-default fields will return an error.
func (s *Service) QuerySkill(data models.Skill) (*SkillOutput, error) {
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
func (s *Service) getSkillData(data ...models.Skill) ([]SkillOutput, error) {
	query := util.NewQuery(`
		SELECT s.name, skill_id, mp_cost, description, slug, st.name, st.img_slug
		FROM skill s JOIN skill_type st ON s.skill_type_id = st.skill_type_id`)

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
	defer rows.Close()

	var skills []SkillOutput
	for rows.Next() {
		var skill SkillOutput
		if err := rows.Scan(&skill.Name, &skill.ID, &skill.MPCost, &skill.Description, &skill.Slug,
			&skill.SkillType, &skill.SkillTypeImageSlug); err != nil {
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
