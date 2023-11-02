package listing

import (
	"backend/pkg/models"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
)

func (s *Service) GetMonsters() (*[]models.Monster, error) {
	var monsters []models.Monster

	rows, err := s.db.Query(`
		SELECT m.name as name, entry_no, f.name as family, r.name as rank, m.slug, image
		FROM monster m
		JOIN family f ON m.family_id = f.family_id
		JOIN rank r ON m.rank_id = r.rank_id;`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var m models.Monster
		if err := rows.Scan(&m.Name, &m.MonsterNo, &m.Family, &m.Rank, &m.Slug, &m.ImageURL); err != nil {
			return nil, err
		}
		monsters = append(monsters, m)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return &monsters, nil
}

func (s *Service) GetMonster() (*models.Monster, error) {
	// TODO: write me
	return &models.Monster{}, errors.New("method not implemented")
}

func (s *Service) GetMonsterByID(id int) (*models.Monster, error) {
	return s.getMonsterData(pID, id)
}

func (s *Service) GetMonsterByName(name string) (*models.Monster, error) {
	return s.getMonsterData(pNAME, name)
}

func (s *Service) GetMonsterBySlug(slug string) (*models.Monster, error) {
	return s.getMonsterData(pSLUG, slug)
}

func (s *Service) GetMonsterByEntryNo(entryNo string) (*models.Monster, error) {
	return s.getMonsterData(pENTRYNO, entryNo)
}

func (s *Service) getMonsterData(predType searchPredicate, value any) (*models.Monster, error) {
	var predicate string
	switch predType {
	case pID:
		predicate = "m.monster_id"
	case pNAME:
		predicate = "m.name"
	case pSLUG:
		predicate = "m.slug"
	case pENTRYNO:
		predicate = "m.entry_no"
	default:
		return nil, errors.New("unsupported predicate")
	}
	print(predicate)

	var m models.Monster

	// Top level attributes
	stmt := fmt.Sprintf(`
		SELECT m.name as name, monster_id, entry_no, f.name as family, r.name as rank, m.slug, image,
		   growth_rate_hp, growth_rate_mp, growth_rate_attack, growth_rate_defense, growth_rate_agility, growth_rate_wisdom,
		   resistance_fire, resistance_water, resistance_wind, resistance_earth, resistance_explosions, resistance_ice,
		   resistance_electricity, resistance_light, resistance_dark, resistance_debilitation, resistance_bedazzlement,
		   resistance_antimagic, resistance_mp_absorption, resistance_confusion, resistance_sleep, resistance_paralysis,
		   resistance_stun, resistance_poison, resistance_instant_death
		FROM monster m
		JOIN family f ON m.family_id = f.family_id
		JOIN rank r ON m.rank_id = r.rank_id
		WHERE %s = $1;`, predicate)
	row := s.db.QueryRow(stmt, value)
	if err := row.Err(); err != nil {
		return nil, err
	}
	if err := row.Scan(
		&m.Name, &m.ID, &m.MonsterNo, &m.Family, &m.Rank, &m.Slug, &m.ImageURL,
		&m.GrowthRateHP, &m.GrowthRateMP, &m.GrowthRateAttack, &m.GrowthRateDefense, &m.GrowthRateAgility, &m.GrowthRateWisdom,
		&m.ResistanceFire, &m.ResistanceWater, &m.ResistanceWind, &m.ResistanceEarth, &m.ResistanceExplosions, &m.ResistanceIce,
		&m.ResistanceElectricity, &m.ResistanceLight, &m.ResistanceDark, &m.ResistanceDebilitation, &m.ResistanceBedazzlement,
		&m.ResistanceAntimagic, &m.ResistanceMpAbsorption, &m.ResistanceConfusion, &m.ResistanceSleep, &m.ResistanceParalysis,
		&m.ResistanceStun, &m.ResistancePoison, &m.ResistanceInstantDeath,
	); err != nil {
		// record not found
		return nil, err
	}

	var err error
	m.Traits, err = s.GetTraitsOfMonster(m.ID)
	if err != nil {
		return nil, err
	}
	m.Talents, err = s.GetTalentsOfMonsterDetailed(m.ID)
	if err != nil {
		return nil, err
	}

	return &m, nil
}
