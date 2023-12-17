import Tree, {NodeData, RenderNodeProps} from "../tree/Tree";
import {MonsterSimpleData} from "../../interfaces/monster";
import MonsterNode from "./MonsterNode";
import SynthComboNode from "./SynthComboNode";
import {useEffect, useState} from "react";
import {fetchData, fetchSetData} from "../../utils/api";
import {convertToNodes} from "./util";

export interface NodeContent {
    synthCombo?: boolean
    location?: boolean
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
    const {monster, synthCombo} = props.data.content

    return (
        <>
            {monster && <MonsterNode monster={monster} nodeProps={props}/>}
            {synthCombo && <SynthComboNode nodeProps={props} parentExpanded={true}/>}
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
                newRoot.children = convertToNodes(resData)
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