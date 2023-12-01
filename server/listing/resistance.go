package listing

import "github.com/tvday/dqm-helper/server/models"

type ResistanceOutput struct {
	models.DamageType
	models.Resistance
}

func (s *Service) GetResistancesOfMonster(monsterID int) ([]ResistanceOutput, error) {
	rows, err := s.db.Query(`
		SELECT dt.name, dt.damage_type_id, r.name, r.resistance_value_id, dt.img_slug
		FROM monster_damage_resistance mdr
		JOIN damage_type dt ON mdr.damage_type_id = dt.damage_type_id
		JOIN resistance_value r ON mdr.resistance_value_id = r.resistance_value_id
		WHERE mdr.monster_id = $1
		ORDER BY dt.damage_type_id`,
		monsterID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []ResistanceOutput
	for rows.Next() {
		var res ResistanceOutput
		if err := rows.Scan(
			&res.DamageType.Name, &res.DamageType.ID, &res.Resistance.Value, &res.Resistance.ID, &res.ImageSlug); err != nil {
			return nil, err
		}
		result = append(result, res)
	}

	return result, nil
}
