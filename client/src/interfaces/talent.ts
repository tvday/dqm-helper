import {SkillOfTalentData} from "./skill";
import {TraitOfTalentData} from "./trait";
import {MonsterWithTalentData} from "./monster";

export interface TalentData {
    name: string
    slug: string
    id: number
    skills: SkillOfTalentData[]
    traits: TraitOfTalentData[]
}

export interface TalentOfMonsterData {
    name: string
    slug: string
    id: number
    isInnate: boolean
    skills: SkillOfTalentData[]
    traits: TraitOfTalentData[]
}