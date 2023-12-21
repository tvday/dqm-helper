import {MonsterParentsData} from "../../interfaces/synth";
import {NodeData} from "../tree/Tree";
import {NodeContent} from "./SynthTree";
import {LocationData} from "../../interfaces/location";


export const convertParentsToNodes = (data: MonsterParentsData[]): NodeData<NodeContent>[] => {
    return data.map((value): NodeData<NodeContent> => {
        let child: NodeData<NodeContent> = {content: {synthCombo: true}, children: [], startExpanded: true}
        if (value.parent1) {
            child.children?.push({
                children: [],
                content: {monster: value.parent1}
            })
        } else if (value.parent1Family) {
            child.children?.push({
                children: [],
                content: {family: value.parent1Family, rank: value.parentRank?.name}
            })
        }

        if (value.parent2) {
            child.children?.push({
                children: [],
                content: {monster: value.parent2}
            })
        } else if (value.parent2Family) {
            child.children?.push({
                children: [],
                content: {family: value.parent2Family, rank: value.parentRank?.name}
            })
        }

        if (value.parent3) {
            child.children?.push({
                children: [],
                content: {monster: value.parent3}
            })
        }
        if (value.parent4) {
            child.children?.push({
                children: [],
                content: {monster: value.parent4}
            })
        }

        return child
    })
}

export const convertLocsToNode = (data: LocationData[]): NodeData<NodeContent> => {
    return {
        content: {locationGroup: true},
        startExpanded: true,
        children: data.map((value): NodeData<NodeContent> => {
            return {children: [], content: {location: value}}
        })
    }
}