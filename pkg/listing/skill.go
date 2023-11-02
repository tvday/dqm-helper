package listing

import (
	"backend/pkg/models"
	"errors"
	"fmt"
	_ "github.com/lib/pq"
)

func (s *Service) GetSkills() ([]models.Skill, error) {
	var skills []models.Skill

	rows, err := s.db.Query(`SELECT name, skill_id, mp_cost, description, slug FROM skill ORDER BY name;`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var skill models.Skill
		if err := rows.Scan(&skill.Name, &skill.ID, &skill.MPCost, &skill.Description, &skill.Slug); err != nil {
			return nil, err
		}
		skills = append(skills, skill)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return skills, nil
}

func (s *Service) GetSkill() (*models.Skill, error) {
	// TODO: write me
	return &models.Skill{}, errors.New("method not implemented")
}

func (s *Service) GetSkillByID(id int) (*models.Skill, error) {
	return s.getSkillData(pID, id)
}

func (s *Service) GetSkillByName(name string) (*models.Skill, error) {
	return s.getSkillData(pNAME, name)
}

func (s *Service) GetSkillBySlug(slug string) (*models.Skill, error) {
	return s.getSkillData(pSLUG, slug)
}

func (s *Service) getSkillData(predType searchPredicate, value any) (*models.Skill, error) {
	var predicate string
	switch predType {
	case pID:
		predicate = "skill_id"
	case pNAME:
		predicate = "name"
	case pSLUG:
		predicate = "slug"
	default:
		return nil, errors.New("unsupported predicate")
	}
	print(predicate)

	var skill models.Skill

	stmt := fmt.Sprintf("SELECT name, skill_id, mp_cost, description, slug FROM skill WHERE %s = $1;", predicate)
	row := s.db.QueryRow(stmt, value)
	if err := row.Scan(&skill.Name, &skill.ID, &skill.MPCost, &skill.Description, &skill.Slug); err != nil {
		// record not found
		return nil, err
	}

	return &skill, nil
}

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
