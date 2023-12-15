import {PropsWithChildren} from "react";

interface NodeProps {
    root?: boolean
    right?: boolean
    left?: boolean
}

const Node = ({children, root, right, left}: PropsWithChildren<NodeProps>) => {
    return (
        // <div className={`tree-node ${root ? 'tree-node-root' : right ? 'tree-node-right' : left ? 'tree-node-left' : ''}
        //                 border border-black p-3 border-3`}>
        <div className={`tree-node ${root ? 'tree-node-root' : right ? 'tree-node-right' : left ? 'tree-node-left' : ''}`}>
            {children}
        </div>
    );
};

const NodeContent = ({children}: PropsWithChildren) => {
    return (
        <div className='tree-node-content border border-info border-3 p-3'>
        {/*<div className='tree-node-content'>*/}
            {children}
        </div>
    );
};

const NodeChildren = ({children}: PropsWithChildren) => {
    return (
        <>
            {/*<div className='border border-danger border-5 branch-v-line'/>*/}
            {/*<div className='tree-node-children border border-success-subtle border-3 p-0 my-3'>*/}
            <div className='tree-node-children'>
                {/*<div className='border border-danger border-5 branch-h-line'/>*/}
                {children}
            </div>
        </>
    );
};

const Row = ({children}: PropsWithChildren) => {
    return (
        <div className='border border-danger p-3 tree-row'>
            {children}
        </div>
    );
};


const Tree = () => {
    return (
        <div className='container tree overflow-x-scroll '>
            {/*<Row>*/}
            {/*    <Node>hi</Node>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*    <Node>hi</Node>*/}
            {/*    <Node>hi</Node>*/}
            {/*</Row>*/}
            <Node root={true}>
                <NodeContent>1</NodeContent>
                <NodeChildren>
                    <Node left={true}>
                        <NodeContent>2</NodeContent>
                        <NodeChildren>
                            <Node left={true}>
                                <NodeContent>3</NodeContent>
                            </Node>
                            <Node right={true}>
                                <NodeContent>3</NodeContent>
                                <NodeChildren>
                                    <Node left={true}>
                                        <NodeContent>4</NodeContent>
                                        <NodeChildren>
                                            <Node left={true}>
                                                <NodeContent>5</NodeContent>
                                            </Node>
                                            <Node right={true}>
                                                <NodeContent>5</NodeContent>
                                            </Node>
                                        </NodeChildren>
                                    </Node>
                                    <Node right={true}>
                                        <NodeContent>4</NodeContent>
                                    </Node>
                                </NodeChildren>
                            </Node>
                        </NodeChildren>
                    </Node>
                    <Node>
                        <NodeContent>2</NodeContent>
                    </Node>
                    <Node right={true}>
                        <NodeContent>2</NodeContent>
                    </Node>
                </NodeChildren>
            </Node>
        </div>
    );
};

export default Tree;