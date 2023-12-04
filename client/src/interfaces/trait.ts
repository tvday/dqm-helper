export interface TraitData {
    name: string
    slug: string
    id: number
    description: string
}

export interface MonsterTraitData {
    name: string
    slug: string
    id: number
    description: string
    isLargeTrait: boolean
    requiredLevel: number
}

export interface TalentTraitData {
    name: string
    slug: string
    id: number
    description: string
    requiredPoints: number
}