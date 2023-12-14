import {useEffect, useState} from "react";
import {MonsterSimpleData} from "../../interfaces/monster";
import {fetchData, IconsAPI} from "../../utils/api";
import {AutoTextSize} from 'auto-text-size'
import {SharedNodeProps} from "./interfaces";
import {convertToNodes} from "./utils";

interface MonsterNodeProps {
    monster: MonsterSimpleData
    nodeProps: SharedNodeProps
}

const MonsterNode = ({monster, nodeProps}: MonsterNodeProps) => {
    const {collapsed, leafNode, toggleNode, addChildren} = nodeProps

    const [expanding, setExpanding] = useState<boolean>(false)
    const [expandingError, setExpandingError] = useState<string | null>(null)

    const expandLeaf = () => {
        setExpanding(true)
        fetchData(`/monsters/${monster.slug}/parents`)
            .then((resData) => {
                return convertToNodes(resData)
            })
            .then((children) => {
                addChildren(children)
            })
            .catch((err) => {
                console.log(err.message);
                setExpandingError(err.message);
            })
            .finally(() => {
                setExpanding(false)
                // toggleNode()
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
                    onClick={!leafNode ? toggleNode : expandLeaf}
                    disabled={expanding}
            >
                {expanding
                    ? 'Loading...'
                    : leafNode
                        ? 'Expand'
                        : collapsed ? 'Expand' : 'Collapse'}
            </button>
        </div>
    );
};

export default MonsterNode;
