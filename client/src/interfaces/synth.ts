import {MonsterSimpleData} from "./monster";

// interface SynthMonsterData extends MonsterSimpleData {
//     parents: SynthMonsterData
// }

export interface MonsterParentsData {
    parent1?: MonsterSimpleData
    parent2?: MonsterSimpleData

    parent1Family?: { name: string, imageSlug: string }
    parent2Family?: { name: string, imageSlug: string }

    ParentRank?: { name: string }
}