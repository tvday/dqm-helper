import {MonsterSimpleData} from "./monster";

interface MonsterSynthData extends MonsterSimpleData {
    synths: MonsterSynthData
}

export interface SynthData {
    parent1?: MonsterSynthData
    parent2?: MonsterSynthData

    parent1Family?: { name: string, imageSlug: string }
    parent2Family?: { name: string, imageSlug: string }

    ParentRank?: { name: string }
}