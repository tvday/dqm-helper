package listing

import "github.com/tvday/dqm-helper/server/models"

type SeasonOutput struct {
	models.Season
}

func (s *Service) GetSeasonData(seasonID int) (*SeasonOutput, error) {
	return nil, nil
}
