import {MonsterParentsData} from "../../interfaces/synth";
import {NodeData} from "../tree/Tree";
import {NodeContent} from "./SynthTree";

export const convertToNodes = (data: MonsterParentsData[]): NodeData<NodeContent>[] => {
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
                content: {family: value.parent1Family, rank: value.ParentRank?.name}
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
                content: {family: value.parent2Family, rank: value.ParentRank?.name}
            })
        }

        return child
    })
}