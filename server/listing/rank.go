package listing

import (
	"errors"
	"github.com/tvday/dqm-helper/server/models"
	"github.com/tvday/dqm-helper/server/util"
)

type RankOutput struct {
	models.Rank
	Monsters []MonsterOutput `json:"monster,omitempty"`
}

// GetRanks executes a query to return a list of all ranks in the repository.
func (s *Service) GetRanks() ([]RankOutput, error) {
	return s.getRankData()
}

// QueryRanks creates and executes a query based on the provided data.
// Use non-default values in data for search parameters.
// A struct with no non-default fields will return an error.
func (s *Service) QueryRanks(data models.Rank) ([]RankOutput, error) {
	return s.getRankData(data)
}

// QueryRank creates and executes a query based on the provided data. Returns the first result.
// Use non-default values in data for search parameters. Returns first result.
// A struct with no non-default fields will return an error.
func (s *Service) QueryRank(data models.Rank) (*RankOutput, error) {
	result, err := s.getRankData(data)
	if err != nil {
		return nil, err
	} else if len(result) > 0 {
		return &result[0], err
	} else {
		return nil, errors.New("record not found")
	}
}

// getRankData creates and executes a query based on the provided data.
// Use non-default values in data for search parameters. No parameters mean there will be no filters.
// A struct with no non-default fields will return an error.
func (s *Service) getRankData(data ...models.Rank) ([]RankOutput, error) {
	query := util.NewQuery(`SELECT name, rank_id, slug FROM rank`).OrderBy("rank_id")

	if len(data) == 0 {
		// do nothing
	} else if len(data) == 1 {
		var err error
		query, err = extractRankPredicates(query, data[0])
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

	var ranks []RankOutput
	for rows.Next() {
		var rank RankOutput
		if err := rows.Scan(&rank.Name, &rank.ID, &rank.Slug); err != nil {
			// record not found
			return nil, err
		}

		rank.Monsters, err = s.GetMonstersOfRank(rank.ID)
		if err != nil {
			return nil, err
		}

		ranks = append(ranks, rank)
	}

	return ranks, nil
}

// extractRankPredicates looks for non-default fields in data to add WHERE clauses to the query.
func extractRankPredicates(q *util.Query, data models.Rank) (*util.Query, error) {
	if data.Name != "" {
		q = q.Where("name", data.Name)
	} else if data.Slug != "" {
		q = q.Where("slug", data.Slug)
	} else if data.ID != 0 {
		q = q.Where("rank_id", data.ID)
	} else {
		// TODO: error about not good search terms
		return nil, errors.New("TODO: error about not good search terms")
	}

	return q, nil
}
