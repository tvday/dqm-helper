package adding

import (
	"errors"
	"fmt"
	"github.com/gosimple/slug"
	"github.com/lib/pq"
	"github.com/tvday/dqm-helper/server/listing"
	"github.com/tvday/dqm-helper/server/models"
)

type ExistingTalentSkillInput struct {
	SkillID        int `json:"id" binding:"required"`
	RequiredPoints int `json:"requiredPoints"`
}

type NewTalentSkillInput struct {
	SkillInput
	RequiredPoints int `json:"requiredPoints"`
}

type ExistingTalentTraitInput struct {
	TraitID        int `json:"id" binding:"required"`
	RequiredPoints int `json:"requiredPoints"`
}

type NewTalentTraitInput struct {
	TalentInput
	RequiredPoints int `json:"requiredPoints"`
}

type TalentInput struct {
	models.Talent
	Name string `json:"name" binding:"required"`

	NewSkills      []NewTalentSkillInput      `json:"newSkills" binding:"dive"`
	ExistingSkills []ExistingTalentSkillInput `json:"existingSkills" binding:"dive"`
	NewTraits      []NewTalentTraitInput      `json:"newTraits" binding:"dive"`
	ExistingTraits []ExistingTalentTraitInput `json:"existingTraits" binding:"dive"`
}

func (s *Service) AddTalent(data *TalentInput) (*listing.TalentOutput, error) {
	if len(data.NewSkills) > 0 || len(data.NewTraits) > 0 {
		return nil, errors.New("currently does not support inserting new traits or skills, create them first")
	}

	if data.Name == "" {
		return nil, errors.New("missing name")
	}
	data.Slug = slug.Make(data.Name)

	create_talent := "new_talent AS (INSERT INTO talent (name, slug) VALUES ($1, $2) RETURNING talent_id)"
	create_talent_skills := ""
	create_talent_traits := ""
	args := []any{data.Name, data.Slug}

	if len(data.ExistingSkills) > 0 {
		create_talent_skills = fmt.Sprintf(
			`,
				new_ts AS
					(INSERT INTO talent_skill (talent_id, skill_id, required_points)
						SELECT talent_id, skill_id, points
						FROM new_talent,
							 LATERAL (
								 -- combine existing skills with their points
								 SELECT unnest($%d::int[]) AS skill_id,
										unnest($%d::int[]) AS points
								 ) skill_points)`,
			len(args)+1, len(args)+2)

		// extracting parameter args
		skillIds := make([]int, len(data.ExistingSkills))
		requiredPoints := make([]int, len(data.ExistingSkills))
		for i, s := range data.ExistingSkills {
			skillIds[i] = s.SkillID
			requiredPoints[i] = s.RequiredPoints
		}
		args = append(args, pq.Array(skillIds), pq.Array(requiredPoints))
	}
	if len(data.ExistingTraits) > 0 {
		create_talent_traits = fmt.Sprintf(
			`,
				new_tt AS
					(INSERT INTO talent_trait (talent_id, trait_id, required_points)
						SELECT talent_id, trait_id, points
						FROM new_talent,
							 LATERAL (
								 -- combine existing traits with their points
								 SELECT unnest($%d::int[]) AS trait_id,
										unnest($%d::int[]) AS points
								 ) trait_points)`,
			len(args)+1, len(args)+2)

		// extracting parameter args
		traitsIds := make([]int, len(data.ExistingTraits))
		requiredPoints := make([]int, len(data.ExistingTraits))
		for i, s := range data.ExistingTraits {
			traitsIds[i] = s.TraitID
			requiredPoints[i] = s.RequiredPoints
		}
		args = append(args, pq.Array(traitsIds), pq.Array(requiredPoints))
	}

	stmt := "WITH\n\t" + create_talent + create_talent_skills + create_talent_traits + "\nSELECT talent_id FROM new_talent;"

	row := s.db.QueryRow(stmt, args...)
	if err := row.Err(); err != nil {
		return nil, err
	}
	var result models.Talent
	if err := row.Scan(&result.ID); err != nil {
		return nil, err
	}

	return listing.NewService(s.db).QueryTalent(result)
}
