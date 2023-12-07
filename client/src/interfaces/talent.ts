import {TalentSkillData} from "./skill";
import {TalentTraitData} from "./trait";

export interface TalentData {
    name: string
    slug: string
    id: number
    isInherent: boolean
    skills: TalentSkillData[]
    traits: TalentTraitData[]
}