import Tree, {NodeData, RenderNodeProps} from "../tree/Tree";
import {MonsterSimpleData} from "../../interfaces/monster";
import MonsterNode from "./MonsterNode";
import SynthComboNode from "./SynthComboNode";
import {useEffect, useState} from "react";
import {fetchData, fetchSetData} from "../../utils/api";
import {convertParentsToNodes} from "./util";
import FamilyNode from "./FamilyNode";
import {LocationData} from "../../interfaces/location";
import LocationNode from "./LocationNode";
import LocationGroupNode from "./LocationGroupNode";

export interface NodeContent {
    synthCombo?: boolean
    locationGroup?: boolean
    location?: LocationData
    monster?: MonsterSimpleData
    family?: { name: string, imageSlug: string }
    rank?: string
}

export interface SharedNodeProps {
    toggleNode: () => void
    addChildren: (data: NodeData<NodeContent>[]) => void
    isLeaf: boolean
    isExpanded: boolean
}


const renderNode = (props: RenderNodeProps<NodeContent>) => {
    const {
        monster,
        synthCombo,
        family,
        rank,
        location,
        locationGroup
    } = props.data.content

    return (
        <>
            {monster && <MonsterNode monster={monster} nodeProps={props}/>}
            {synthCombo && <SynthComboNode nodeProps={props}/>}
            {family && <FamilyNode family={family} rank={rank} nodeProps={props}/>}
            {locationGroup && <LocationGroupNode nodeProps={props}/>}
            {location && <LocationNode location={location} nodeProps={props}/>}
        </>
    );
};

interface SynthTreeProps {
    rootMonster: MonsterSimpleData
}

const SynthTree = ({rootMonster}: SynthTreeProps) => {
    const [root, setRoot] = useState<NodeData<NodeContent> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        fetchData(`/monsters/${rootMonster.slug}/parents`)
            .then((resData) => {
                let newRoot: NodeData<NodeContent> = {
                    content: {monster: rootMonster},
                    startExpanded: true,
                    children: []
                }
                newRoot.children = convertParentsToNodes(resData)
                setRoot(newRoot)
            })
            .catch((err) => {
                console.log(err.message)
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    return (
        <>
            {/*<MonsterNode monster={monster} nodeProps={}/>*/}
            {root && <Tree rootData={root} renderNode={renderNode}/>}
        </>
    );
};

export default SynthTree;