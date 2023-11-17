import {MonsterTraitData} from "./trait";
import {TalentData} from "./talent";

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

    growthRateHP: number
    growthRateMP: number
    growthRateAttack: number
    growthRateDefense: number
    growthRateAgility: number
    growthRateWisdom: number

    resistanceFire: string
    resistanceWater: string
    resistanceWind: string
    resistanceEarth: string
    resistanceExplosions: string
    resistanceIce: string
    resistanceElectricity: string
    resistanceLight: string
    resistanceDark: string
    resistanceDebilitation: string
    resistanceBedazzlement: string
    resistanceAntimagic: string
    resistanceMpAbsorption: string
    resistanceConfusion: string
    resistanceSleep: string
    resistanceParalysis: string
    resistanceStun: string
    resistancePoison: string
    resistanceInstantDeath: string

    traits: MonsterTraitData[]
    talents: TalentData[]
}