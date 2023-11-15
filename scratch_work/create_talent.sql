-- create talent while also creating new skills and traits
WITH
    -- create new talent
    new_talent AS
        (INSERT INTO talent (name, slug) VALUES ('Talent3', 'talent3') RETURNING talent_id),
    -- create new traits
    new_traits AS
        (INSERT INTO trait (name, description, slug)
            VALUES ('Trait63', 'trait63 des', 'trait63'),
                   ('Trait64', 'trait64 des', 'trait64'),
                   ('Trait65', 'trait65 des', 'trait65')
            RETURNING trait_id, name),
    -- create new talent_traits relations
    new_tt AS
        (INSERT INTO talent_trait (talent_id, trait_id, required_points)
            SELECT talent_id, trait_id, points
            FROM new_talent,
                 LATERAL (
                     -- combine old and new traits and their required points
                     ( -- new traits
                         SELECT new_traits.trait_id AS trait_id, new_traits_rp.points AS points
                         FROM new_traits
                                  JOIN LATERAL
                             ( SELECT unnest(ARRAY ['Trait63', 'Trait64', 'Trait65']) AS name,
                                      unnest(ARRAY [630, 640, 650])                   AS points) new_traits_rp
                                       ON new_traits.name = new_traits_rp.name)
                     UNION
                     ( -- existing traits
                         SELECT unnest(ARRAY [61, 62]) AS trait_id, unnest(ARRAY [610, 620]) AS points)
                     ) trait_points),
    -- create new skills
    new_skills AS
        (INSERT INTO skill (name, description, mp_cost, slug)
            VALUES ('Skill14', 'skill d14', 14, 'skill16'),
                   ('Skill15', 'skill d15', 15, 'skill15')
            RETURNING skill_id, name),
    -- create new talent_skills relations
    new_ts AS
        (INSERT INTO talent_skill (talent_id, skill_id, required_points)
            SELECT talent_id, skill_id, points
            FROM new_talent,
                 LATERAL (
                     -- combine old and new skills and their required points
                     ( -- new skills
                         SELECT skill_id, points
                         FROM new_skills
                                  JOIN LATERAL (
                             SELECT unnest(ARRAY ['Skill14', 'Skill15']) AS name,
                                    unnest(ARRAY [140, 150])             AS points) new_skills_rp
                                       ON new_skills.name = new_skills_rp.name)
                     UNION
                     (-- existing skills
                         SELECT unnest(ARRAY [10, 11, 12, 13])     AS skill_id,
                                unnest(ARRAY [100, 110, 120, 130]) AS points)
                     ) skill_points)
SELECT talent_id
FROM new_talent;


-- without other inserts
WITH
    -- create new talent
    new_talent AS
        (INSERT INTO talent (name, slug) VALUES ('Talent3', 'talent3') RETURNING talent_id),
    -- create new talent_traits relations
    new_tt AS
        (INSERT INTO talent_trait (talent_id, trait_id, required_points)
            SELECT talent_id, trait_id, points
            FROM new_talent,
                 LATERAL (
                     -- combine existing traits with their points
                     SELECT unnest(ARRAY [61, 62])   AS trait_id,
                            unnest(ARRAY [610, 620]) AS points
                     ) trait_points),
    -- create new talent_skills relations
    new_ts AS
        (INSERT INTO talent_skill (talent_id, skill_id, required_points)
            SELECT talent_id, skill_id, points
            FROM new_talent,
                 LATERAL (
                     -- combine existing skills with their points
                     SELECT unnest(ARRAY [10, 11, 12, 13])     AS skill_id,
                            unnest(ARRAY [100, 110, 120, 130]) AS points
                     ) skill_points)
SELECT talent_id
FROM new_talent;