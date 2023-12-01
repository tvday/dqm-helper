package listing

import "github.com/tvday/dqm-helper/server/models"

type AttributeOutput struct {
	models.Attribute
	GrowthRate int `json:"growthRate,omitempty"`
}

func (s *Service) GetAttributesOfMonster(monsterID int) ([]AttributeOutput, error) {
	rows, err := s.db.Query(`
		SELECT a.name, a.attribute_id, ma.growth_rate
		FROM monster_attribute ma
		JOIN attribute a ON ma.attribute_id = a.attribute_id
		WHERE monster_id = $1
		ORDER BY a.attribute_id`,
		monsterID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []AttributeOutput
	for rows.Next() {
		var att AttributeOutput
		if err := rows.Scan(&att.Name, &att.ID, &att.GrowthRate); err != nil {
			return nil, err
		}
		result = append(result, att)
	}

	return result, nil
}
