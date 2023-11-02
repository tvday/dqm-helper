package listing

import (
	"backend/pkg/models"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
)

func (s *Service) GetTalents() ([]models.Talent, error) {
	var talents []models.Talent
	rows, err := s.db.Query(`SELECT name, talent_id FROM talent;`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var talent models.Talent
		if err := rows.Scan(&talent.Name, &talent.ID); err != nil {
			return nil, err
		}
		talents = append(talents, talent)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return talents, nil
}

func (s *Service) GetTalentsOfMonster(monsterID int) ([]models.Talent, error) {
	talents, err := s.getTalentDataOfMonster(monsterID)
	if err != nil {
		return nil, err
	}
	return talents, nil
}

func (s *Service) GetTalentsOfMonsterDetailed(monsterID int) ([]models.Talent, error) {
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

func (s *Service) GetTalent() (*models.Talent, error) {
	// TODO: write me
	return &models.Talent{}, errors.New("method not implemented")
}

func (s *Service) GetTalentByID(id int) (*models.Talent, error) {
	return s.getTalentData(pID, id)
}

func (s *Service) GetTalentByName(name string) (*models.Talent, error) {
	return s.getTalentData(pNAME, name)
}

func (s *Service) GetTalentBySlug(slug string) (*models.Talent, error) {
	return s.getTalentData(pSLUG, slug)
}

func (s *Service) GetTalentByEntryNo(entryNo string) (*models.Talent, error) {
	return s.getTalentData(pENTRYNO, entryNo)
}

func (s *Service) getTalentData(predType searchPredicate, value any) (*models.Talent, error) {
	var predicate string
	switch predType {
	case pID:
		predicate = "talent_id"
	case pNAME:
		predicate = "name"
	case pSLUG:
		predicate = "slug"
	default:
		return nil, errors.New("unsupported predicate")
	}

	var talent models.Talent
	row := s.db.QueryRow(fmt.Sprintf("SELECT name, talent_id FROM talent WHERE %s = $1;", predicate), value)
	if err := row.Scan(&talent.Name, &talent.ID); err != nil {
		return nil, err
	}

	return &talent, nil
}

func (s *Service) getTalentDataOfMonster(monsterID int) ([]models.Talent, error) {
	var talents []models.Talent
	rows, err := s.db.Query(`
		SELECT name, t.talent_id, is_inherent 
		FROM talent t JOIN monster_talent mt ON t.talent_id = mt.talent_id
		WHERE monster_id = $1;`, monsterID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var talent models.Talent
		if err := rows.Scan(&talent.Name, &talent.ID, &talent.IsInherent); err != nil {
			return nil, err
		}
		talents = append(talents, talent)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return talents, nil
}
