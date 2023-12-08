package listing

import (
	"encoding/json"
	"github.com/tvday/dqm-helper/server/models"
)

type LocationOutput struct {
	models.Location
	SubName *string         `json:"subName,omitempty"`
	Seasons []models.Season `json:"seasons,omitempty"`
}

func (s *Service) GetLocationOfMonster(monsterID int) ([]LocationOutput, error) {
	rows, err := s.db.Query(`
		SELECT 	l.location_id,
				l.name,
				l.sub_name,
				jsonb_agg(
               		jsonb_build_object(
                       	'id', s.season_id,
                       	'name', s.name,
                       	'imageSlug', s.image_slug
               		) ORDER BY s.season_id
       			) AS seasons
		FROM monster_location_season mls
         	JOIN location l ON mls.location_id = l.location_id
         	JOIN season s ON mls.season_id = s.season_id
		WHERE monster_id = $1
		GROUP BY l.location_id;`,
		monsterID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []LocationOutput
	for rows.Next() {
		var loc LocationOutput
		var seasonsBytes []byte
		if err := rows.Scan(&loc.ID, &loc.Name, &loc.SubName, &seasonsBytes); err != nil {
			return nil, err
		}

		//var season SeasonOutput
		if err := json.Unmarshal(seasonsBytes, &loc.Seasons); err != nil {
			return nil, err
		}

		result = append(result, loc)
	}

	return result, nil
}
