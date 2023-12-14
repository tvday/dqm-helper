import {PropsWithChildren} from "react";

const Node = ({children}: PropsWithChildren) => {
    return (
        <div className='border border-black p-3 border-3 node'>
            {children}
        </div>
    );
};

const NodeContent = ({children}: PropsWithChildren) => {
    return (
        <div className='border border-info border-3 p-3 node-content'>
            {children}
        </div>
    );
};

const NodeChildren = ({children}: PropsWithChildren) => {
    return (
        <>
            <div className='border border-danger border-5 branch-v-line'/>
            <div className='border border-success-subtle border-3 p-0 my-3 node-children'>
                <div className='border border-danger border-5 branch-h-line'/>
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
        <div className='container tree'>
            {/*<Row>*/}
            {/*    <Node>hi</Node>*/}
            {/*</Row>*/}
            {/*<Row>*/}
            {/*    <Node>hi</Node>*/}
            {/*    <Node>hi</Node>*/}
            {/*</Row>*/}
            <Node>
                <NodeContent>1</NodeContent>
                <NodeChildren>
                    <Node>
                        <NodeContent>2</NodeContent>
                        <NodeChildren>
                            <Node>
                                <NodeContent>3</NodeContent>
                            </Node>
                            <Node>
                                <NodeContent>3</NodeContent>
                                {/*<NodeChildren>*/}
                                {/*    <Node>*/}
                                {/*        <NodeContent>4</NodeContent>*/}
                                {/*        <NodeChildren>*/}
                                {/*            <Node>*/}
                                {/*                <NodeContent>5</NodeContent>*/}
                                {/*            </Node>*/}
                                {/*            <Node>*/}
                                {/*                <NodeContent>5</NodeContent>*/}
                                {/*            </Node>*/}
                                {/*        </NodeChildren>*/}
                                {/*    </Node>*/}
                                {/*    <Node>*/}
                                {/*        <NodeContent>4</NodeContent>*/}
                                {/*    </Node>*/}
                                {/*</NodeChildren>*/}
                            </Node>
                        </NodeChildren>
                    </Node>
                    <Node>
                        <NodeContent>2</NodeContent>

                    </Node>
                </NodeChildren>
            </Node>
        </div>
    );
};

export default Tree;