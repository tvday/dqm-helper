package listing

import (
	"encoding/json"
	"github.com/tvday/dqm-helper/server/models"
	"github.com/tvday/dqm-helper/server/util"
)

type LocationOutput struct {
	models.Location
	SubName *string         `json:"subName,omitempty"`
	Seasons []models.Season `json:"seasons,omitempty"`
}

func (s *Service) GetLocationsOfMonster(monster models.Monster) ([]LocationOutput, error) {
	query := util.NewQuery(`
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
		FROM monster m
			JOIN monster_location_season mls ON m.monster_id = mls.monster_id
         	JOIN location l ON mls.location_id = l.location_id
         	JOIN season s ON mls.season_id = s.season_id`).
		GroupBy("GROUP BY l.location_id")

	query, err := extractMonsterPredicates(query, monster)

	rows, err := s.db.Query(query.Build(), query.GetArgs()...)
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
