import {SeasonData} from "./season";

export interface LocationData {
    name: string
    subName: string | null
    seasons: SeasonData[]
    id: number
}