import {useEffect, useState} from "react";
import {MonsterSimpleData} from "../../interfaces/monster";
import {fetchData, IconsAPI} from "../../utils/api";
import {AutoTextSize} from 'auto-text-size'
import React from "react";
import {MonsterParentsData} from "../../interfaces/synth";
import {convertToNodes} from "./util";
import {SharedNodeProps} from "./SynthTree";
// import {SharedNodeProps} from "./interfaces";
// import {convertToNodes} from "./utils";

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
        fetchData(`/monsters/${monster.slug}/parents`)
            .then((resData) => {
                addChildren(convertToNodes(resData))
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
                toggleNode()
            })
    }

    // useEffect(() => {
    //     if (!collapsed && leafNode) {
    //         toggleNode()
    //     }
    // }, [leafNode, collapsed]);

    return (
        <div className="synth-node">
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
            <button className='synth-node-btn btn btn-secondary border-black border-3 mt-2'
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
