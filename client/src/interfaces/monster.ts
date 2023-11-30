import {MonsterTraitData} from "./trait";
import {TalentData} from "./talent";
import {ResistanceData} from "./resistance";
import {GrowthRateData} from "./growthRate";

export interface MonsterSimpleData {
    id: number
    name: string
    monsterNo: number
    slug: string
    rank: string
    family: string
    imgURL: string
}

export interface MonsterData {
    id: number
    name: string
    monsterNo: number
    slug: string
    rank: string
    family: string
    imgURL: string

    growthRates: GrowthRateData[]
    resistances: ResistanceData[]

    traits: MonsterTraitData[]
    talents: TalentData[]
}