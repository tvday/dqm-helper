import {ReactNode} from "react"
import Node from "./Node"

export interface RenderNodeProps<T> {
    data: NodeData<T>
    toggleNode: () => void
    addChildren: (data: NodeData<T>[]) => void
    isLeaf: boolean
    isExpanded: boolean
}

export interface NodeData<T> {
    content: T
    children: NodeData<T>[]
    startExpanded?: boolean
}

export interface TreeProps<T> {
    rootData: NodeData<T>
    renderNode: (nodeProps: RenderNodeProps<T>) => ReactNode
}

const Tree = <T, >({rootData, renderNode}: TreeProps<T>) => {
    return (
        <div className='tree overflow-x-scroll'>
            <Node isRoot={true} data={rootData} renderNode={renderNode}/>
        </div>
    );
};

export default Tree;