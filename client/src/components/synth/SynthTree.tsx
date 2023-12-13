import Tree, {CustomNodeElementProps, RawNodeDatum, TreeNodeDatum} from 'react-d3-tree';
import SynthNode from "./SynthNode";
import {MonsterSimpleData} from "../../interfaces/monster";
import assert from "assert";
import {type} from "os";

const dataTest1: RawNodeDatum = {
    name: 'CEO',
    children: [
        {
            name: 'Manager',
            attributes: {
                department: 'Production',
            },
            children: [
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Assembly',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
            ],
        },
    ],
}

interface CustomNodeDatum extends RawNodeDatum {
    monster: MonsterSimpleData
    children?: CustomNodeDatum[]
}

interface CustomTreeNodeDatum extends TreeNodeDatum {
    monster: MonsterSimpleData
}

const dataTest2: CustomNodeDatum = {
    name: 'monsterName',
    monster: {
        name: "Slime",
        id: 1,
        slug: "slime",
        monsterNo: 1,
        family: "Slime",
        familyImageSlug: "slime.png",
        rank: "G",
        imgURL: '',
    },
    children: [
        {
            name: 'monsterName',
            monster: {
                name: "Slime2",
                id: 1,
                slug: "slime",
                monsterNo: 1,
                family: "Slime",
                familyImageSlug: "slime.png",
                rank: "G",
                imgURL: '',
            }
        },
        {
            name: 'monsterName',
            monster: {
                name: "Slime3",
                id: 1,
                slug: "slime",
                monsterNo: 1,
                family: "Slime",
                familyImageSlug: "slime.png",
                rank: "G",
                imgURL: '',
            }
        },
    ]
}

interface NodeDimensionProps {
    width: number
    height: number
    // for translation
    x: number
    // for translation
    y: number
}

const renderNode = (nodeProps: CustomNodeElementProps,
                    nodeDems: NodeDimensionProps) => {
    const nodeDatum = nodeProps.nodeDatum as CustomTreeNodeDatum
    const {toggleNode} = nodeProps
    return (
        <g>
            {/*<circle r={15}></circle>*/}
            {/* `foreignObject` requires width & height to be explicitly set. */}
            <foreignObject {...nodeDems} style={nodeDems}>
                <SynthNode monster={nodeDatum.monster} onClick={toggleNode} expanded={nodeDatum.__rd3t.collapsed}/>
            </foreignObject>
        </g>
    );
};

interface SynthTreeProps {

}

const widthHeightRatio = 1.3;
const width = 100
const nodeProps: NodeDimensionProps = {
    width: width,
    height: 200,
    x: width / -2,
    y: -1 * width * widthHeightRatio
}

const SynthTree = () => {
    return (
        <div style={{width: '100%', height: '50rem', background: 'lightcoral'}} className='justify-content-center'>
            <Tree
                data={dataTest2}
                pathFunc='step'
                orientation='vertical'
                renderCustomNodeElement={(rd3tNodeProps) => renderNode(rd3tNodeProps, nodeProps)}
                draggable={true}
                zoomable={false}
                nodeSize={{x: nodeProps.width * 1.5, y: nodeProps.height * 1.5}}
            />
        </div>
    );
};

export default SynthTree