export interface TraitData {
    name: string
    slug: string
    id: number
    description: string
}

export interface TraitOfMonsterData {
    name: string
    slug: string
    id: number
    description: string
    isLargeTrait: boolean
    requiredLevel: number
}

export interface TraitOfTalentData {
    name: string
    slug: string
    id: number
    description: string
    requiredPoints: number
}