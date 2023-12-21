import {MonsterSimpleData} from "./monster";

// interface SynthMonsterData extends MonsterSimpleData {
//     parents: SynthMonsterData
// }

export interface MonsterParentsData {
    parent1?: MonsterSimpleData
    parent2?: MonsterSimpleData

    parent3?: MonsterSimpleData
    parent4?: MonsterSimpleData

    parent1Family?: { name: string, imageSlug: string }
    parent2Family?: { name: string, imageSlug: string }

    parentRank?: { name: string }
}