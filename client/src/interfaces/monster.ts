import {TraitOfMonsterData} from "./trait";
import {TalentOfMonsterData} from "./talent";
import {ResistanceData} from "./resistance";
import {GrowthRateData} from "./growthRate";
import {LocationData} from "./location";

export interface MonsterSimpleData {
    id: number
    name: string
    monsterNo: number
    slug: string
    rank: string
    family: string
    familyImageSlug: string
    imgURL: string
}

export interface MonsterWithTalentData {
    id: number
    name: string
    monsterNo: number
    slug: string
    rank: string
    family: string
    familyImageSlug: string
    imgURL: string

    talentIsInnate: boolean
    locations: LocationData[]
}

export interface MonsterData {
    id: number
    name: string
    monsterNo: number
    slug: string
    rank: string
    family: string
    familyImageSlug: string
    imgURL: string

    growthRates: GrowthRateData[]
    resistances: ResistanceData[]

    traits: TraitOfMonsterData[]
    talents: TalentOfMonsterData[]

    locations: LocationData[]
}