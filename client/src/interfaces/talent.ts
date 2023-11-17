import {SkillData} from "./skill";
import {TalentTraitData} from "./trait";

export interface TalentData {
    name: string
    slug: string
    id: number
    isInherent: boolean
    skills: SkillData[]
    traits: TalentTraitData[]
}