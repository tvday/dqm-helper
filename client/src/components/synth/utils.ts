import {SynthNodeDatum} from "./interfaces";
import {useState} from "react";
import {MonsterParentsData} from "../../interfaces/synth";

export const convertToNodes = (data: MonsterParentsData[]): SynthNodeDatum[] => {
    return data.map((value): SynthNodeDatum => {
        let child: SynthNodeDatum = {content: {synthCombo: true}, name: "synth", children: []}
        if (value.parent1) {
            child.children?.push({
                name: value.parent1.name,
                children: [],
                content: {monster: value.parent1}
            })
        } else if (value.parent1Family) {
            child.children?.push({
                name: value.parent1Family.name,
                children: [],
                content: {family: value.parent1Family, rank: value.parentRank?.name}
            })
        }

        if (value.parent2) {
            child.children?.push({
                name: value.parent2.name,
                children: [],
                content: {monster: value.parent2}
            })
        } else if (value.parent2Family) {
            child.children?.push({
                name: value.parent2Family.name,
                children: [],
                content: {family: value.parent2Family, rank: value.parentRank?.name}
            })
        }

        return child
    })
}