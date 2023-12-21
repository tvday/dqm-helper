import {useEffect, useState} from "react";
import {MonsterSimpleData} from "../../interfaces/monster";
import {fetchData, IconsAPI} from "../../utils/api";
import {AutoTextSize} from 'auto-text-size'
import React from "react";
import {MonsterParentsData} from "../../interfaces/synth";
import {convertLocsToNode, convertParentsToNodes} from "./util";
import {NodeContent, SharedNodeProps} from "./SynthTree";
import {NodeData} from "../tree/Tree";
import {Link} from "react-router-dom";

interface MonsterNodeProps {
    monster: MonsterSimpleData
    nodeProps: SharedNodeProps
}

const MonsterNode = ({monster, nodeProps}: MonsterNodeProps) => {
    const {isLeaf, isExpanded, toggleNode, addChildren} = nodeProps

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const expandLeaf = () => {
        setLoading(true)
        let children: NodeData<NodeContent>[] = []

        fetchData(`/monsters/${monster.slug}/locations`)
            .then((locData) => {
                if (locData.length > 0) {
                    children.push(convertLocsToNode(locData))
                }
                return fetchData(`/monsters/${monster.slug}/parents`)
            })
            .then((parentData) => {
                let res = convertParentsToNodes(parentData as MonsterParentsData[])
                children.push(...res)
                addChildren(children)
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
                if (!isExpanded) toggleNode()
            })
    }

    return (
        <div className="synth-node">
            <a href={`/monsters/${monster.slug}`} target='_blank' style={{textDecoration: 'unset'}}>
                <div className='synth-node-body'>
                    <img src={require('../../images/slime.png.jpeg')} className="synth-node-img" alt="..."/>
                    <div className="synth-node-content">
                        <div className="synth-node-rank">
                            <AutoTextSize mode='box'>
                                {monster.rank}
                            </AutoTextSize>
                        </div>
                        <img className="synth-node-family"
                             src={`${IconsAPI}/${monster.familyImageSlug}`}
                             alt={monster.family}/>
                    </div>
                    <div className='synth-node-title'>
                        <AutoTextSize mode='box'>
                            {monster.name}
                        </AutoTextSize>
                    </div>
                </div>
            </a>
            <button className='synth-node-btn mt-1'
                    onClick={!isLeaf ? toggleNode : expandLeaf}
                    disabled={loading}
            >
                {loading
                    ? 'Loading...'
                    : isLeaf
                        ? 'Expand'
                        : isExpanded ? 'Collapse' : 'Expand'}
            </button>
        </div>
    );
};

export default MonsterNode;
