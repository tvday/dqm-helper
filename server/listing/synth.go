package listing

import (
	"github.com/tvday/dqm-helper/server/models"
	"github.com/tvday/dqm-helper/server/util"
)

type SynthOutput struct {
	Parent1 *MonsterOutput `json:"parent1,omitempty"`
	Parent2 *MonsterOutput `json:"parent2,omitempty"`

	Parent1Family *FamilyOutput `json:"parent1Family,omitempty"`
	Parent2Family *FamilyOutput `json:"parent2Family,omitempty"`

	ParentRank *RankOutput `json:"parentRank,omitempty"`
}

func (s *Service) GetParentsOfMonster(monster models.Monster) ([]SynthOutput, error) {
	mms, err := s.getMonsterMonsterSynths(monster)
	if err != nil {
		return nil, err
	}
	mfs, err := s.getMonsterFamilySynths(monster)
	if err != nil {
		return nil, err
	}
	ffs, err := s.getFamilyFamilySynths(monster)
	if err != nil {
		return nil, err
	}

	return append(mms, append(mfs, ffs...)...), nil
}

func (s *Service) getMonsterMonsterSynths(monster models.Monster) ([]SynthOutput, error) {
	query := util.NewQuery(`
		SELECT 	p1.name, p1.monster_id, p1.entry_no, p1.slug, f1.name, f1.img_slug, r1.name,
       			p2.name, p2.monster_id, p2.entry_no, p2.slug, f2.name, f2.img_slug, r2.name
		FROM monster m
			JOIN monster_monster_synth mms ON m.monster_id = mms.synth_result
				JOIN monster p1 ON mms.parent_1 = p1.monster_id
					JOIN family f1 ON p1.family_id = f1.family_id
					JOIN rank r1 ON p1.rank_id = r1.rank_id
				JOIN monster p2 ON mms.parent_2 = p2.monster_id
					JOIN family f2 ON p2.family_id = f2.family_id
					JOIN rank r2 ON p2.rank_id = r2.rank_id`)
	query, err := extractMonsterPredicates(query, monster)
	if err != nil {
		return nil, err
	}

	rows, err := s.db.Query(query.Build(), query.GetArgs()...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []SynthOutput
	for rows.Next() {
		synth := SynthOutput{Parent1: &MonsterOutput{}, Parent2: &MonsterOutput{}}
		if err := rows.Scan(
			&synth.Parent1.Name, &synth.Parent1.ID, &synth.Parent1.MonsterNo, &synth.Parent1.Slug,
			&synth.Parent1.Family, &synth.Parent1.FamilyImageSlug, &synth.Parent1.Rank,
			&synth.Parent2.Name, &synth.Parent2.ID, &synth.Parent2.MonsterNo, &synth.Parent2.Slug,
			&synth.Parent2.Family, &synth.Parent2.FamilyImageSlug, &synth.Parent2.Rank,
		); err != nil {
			return nil, err
		}
		result = append(result, synth)
	}

	return result, nil
}

func (s *Service) getMonsterFamilySynths(monster models.Monster) ([]SynthOutput, error) {
	query := util.NewQuery(`
		SELECT 	p1.name, p1.monster_id, p1.entry_no, p1.slug, f1.name, f1.img_slug, r1.name,
		   		f2.name, f2.img_slug
		FROM monster m
			 JOIN monster_family_synth mfs ON m.monster_id = mfs.synth_result
				 JOIN monster p1 ON mfs.parent_1 = p1.monster_id
					 JOIN family f1 ON p1.family_id = f1.family_id
					 JOIN rank r1 ON p1.rank_id = r1.rank_id
				 JOIN family f2 ON mfs.parent_2_family = f2.family_id`)
	query, err := extractMonsterPredicates(query, monster)
	if err != nil {
		return nil, err
	}

	rows, err := s.db.Query(query.Build(), query.GetArgs()...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []SynthOutput
	for rows.Next() {
		synth := SynthOutput{Parent1: &MonsterOutput{}, Parent2Family: &FamilyOutput{}}
		if err := rows.Scan(
			&synth.Parent1.Name, &synth.Parent1.ID, &synth.Parent1.MonsterNo, &synth.Parent1.Slug,
			&synth.Parent1.Family, &synth.Parent1.FamilyImageSlug, &synth.Parent1.Rank,
			&synth.Parent2Family.Name, &synth.Parent2Family.ImageSlug,
		); err != nil {
			return nil, err
		}
		result = append(result, synth)
	}

	return result, nil
}

func (s *Service) getFamilyFamilySynths(monster models.Monster) ([]SynthOutput, error) {
	query := util.NewQuery(`
		SELECT 	f1.name, f1.img_slug,
       			f2.name, f2.img_slug,
       			r.name
		FROM monster m
         	JOIN family_family_synth ffs ON m.monster_id = ffs.synth_result
            JOIN family f1 ON ffs.parent_1_family = f1.family_id
            JOIN family f2 ON ffs.parent_2_family = f2.family_id
            JOIN rank r ON ffs.parent_rank = r.rank_id`)
	query, err := extractMonsterPredicates(query, monster)
	if err != nil {
		return nil, err
	}

	rows, err := s.db.Query(query.Build(), query.GetArgs()...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []SynthOutput
	for rows.Next() {
		synth := SynthOutput{Parent1Family: &FamilyOutput{}, Parent2Family: &FamilyOutput{}, ParentRank: &RankOutput{}}
		if err := rows.Scan(
			&synth.Parent1Family.Name, &synth.Parent1Family.ImageSlug,
			&synth.Parent2Family.Name, &synth.Parent2Family.ImageSlug,
			&synth.ParentRank.Name,
		); err != nil {
			return nil, err
		}
		result = append(result, synth)
	}

	return result, nil
}
