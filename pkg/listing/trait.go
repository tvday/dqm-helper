package listing

import (
	"backend/pkg/models"
	"errors"
	"fmt"
	_ "github.com/lib/pq"
)

func (s *Service) GetTraits() ([]models.Trait, error) {
	var traits []models.Trait

	rows, err := s.db.Query(`SELECT name, trait_id, description, slug FROM trait ORDER BY name;`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var trait models.Trait
		if err := rows.Scan(&trait.Name, &trait.ID, &trait.Description, &trait.Slug); err != nil {
			return nil, err
		}
		traits = append(traits, trait)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return traits, nil
}

func (s *Service) GetTrait() (*models.Trait, error) {
	// TODO: write me
	return &models.Trait{}, errors.New("method not implemented")
}

func (s *Service) GetTraitByID(id int) (*models.Trait, error) {
	return s.getTraitData(pID, id)
}

func (s *Service) GetTraitByName(name string) (*models.Trait, error) {
	return s.getTraitData(pNAME, name)
}

func (s *Service) GetTraitBySlug(slug string) (*models.Trait, error) {
	return s.getTraitData(pSLUG, slug)
}

func (s *Service) getTraitData(predType searchPredicate, value any) (*models.Trait, error) {
	var predicate string
	switch predType {
	case pID:
		predicate = "trait_id"
	case pNAME:
		predicate = "name"
	case pSLUG:
		predicate = "slug"
	default:
		return nil, errors.New("unsupported predicate")
	}

	var trait models.Trait

	stmt := fmt.Sprintf("SELECT name, trait_id, description, slug FROM trait WHERE %s = $1 ;", predicate)
	row := s.db.QueryRow(stmt, value)
	if err := row.Scan(&trait.Name, &trait.ID, &trait.Description, &trait.Slug); err != nil {
		// record not found
		return nil, err
	}

	return &trait, nil
}

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
