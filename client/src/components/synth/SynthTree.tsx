import Tree, {CustomNodeElementProps} from 'react-d3-tree';
import MonsterNode from "./MonsterNode";
import {MonsterSimpleData} from "../../interfaces/monster";
import {SynthNodeDatum, SynthTreeNodeDatum, NodeDimensionProps, SharedNodeProps} from "./interfaces";
import {useEffect, useState} from "react";
import {fetchSetData} from "../../utils/api";
import {MonsterParentsData} from "../../interfaces/synth";
import SynthComboNode from "./SynthComboNode";
import {convertToNodes} from "./utils";
import FamilyNode from "./FamilyNode";

const renderNode = ({nodeDatum, toggleNode, addChildren, hierarchyPointNode}: CustomNodeElementProps,
                    nodeDems: NodeDimensionProps) => {
    const content = (nodeDatum as SynthTreeNodeDatum).content
    const sharedNodeProps: SharedNodeProps = {
        collapsed: nodeDatum.__rd3t.collapsed,
        leafNode: !(nodeDatum.children && nodeDatum.children.length > 0),
        children: nodeDatum.children ? nodeDatum.children as SynthTreeNodeDatum[] : Array<SynthTreeNodeDatum>(),
        toggleNode: toggleNode,
        addChildren: addChildren,
    }

    return (
        <g>
            {/* `foreignObject` requires width & height to be explicitly set. */}
            <foreignObject {...nodeDems} style={nodeDems}>
                {content.monster ? <MonsterNode monster={content.monster}
                                                       nodeProps={sharedNodeProps}/>
                    : content.family ? <FamilyNode nodeProps={sharedNodeProps} family={content.family}/>
                        : content.synthCombo ? <SynthComboNode nodeProps={sharedNodeProps} parentExpanded={!hierarchyPointNode.parent?.data.__rd3t.collapsed}/>
                            : content.location ? <div>loc</div>
                                : <></>
                }
            </foreignObject>
        </g>
    );
};


const width = 100
const height = 182
const nodeProps: NodeDimensionProps = {
    width: width,
    height: height,
    x: width / -2,
    // y: 0
    y: height / -2
}

interface SynthTreeProps {
    monster: MonsterSimpleData
}

const SynthTree = ({monster}: SynthTreeProps) => {
    const [data, setData] = useState<SynthNodeDatum>({
        name: monster.slug,
        content: {monster: monster}
    })
    const [parentData, setParentData] = useState<MonsterParentsData[]>([])

    useEffect(() => {
        fetchSetData(`/monsters/${monster.slug}/parents`, [], setParentData)
    }, []);
    useEffect(() => {
        setData({name: data.name, content: data.content, children: convertToNodes(parentData)})
    }, [parentData]);

    return (
        <div style={{width: '100%', height: '50rem', background: 'lightcoral'}} className='justify-content-center'>
            <Tree
                data={data}
                pathFunc='step'
                orientation='vertical'
                renderCustomNodeElement={(rd3tNodeProps) => renderNode(rd3tNodeProps, nodeProps)}
                draggable={true}
                zoomable={false}
                nodeSize={{x: nodeProps.width + 10, y: nodeProps.height + 10}}
                translate={{x: 550, y: 200}}
            />
        </div>
    );
};

export default SynthTree