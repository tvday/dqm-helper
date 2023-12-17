import {ReactNode, useState} from "react";
import {NodeData, RenderNodeProps} from "./Tree";
import NodeContent from "./NodeContent";
import NodeChildren from "./NodeChildren";

interface NodeProps<T> {
    data: NodeData<T>
    renderNode: (nodeProps: RenderNodeProps<T>) => ReactNode
    isRoot?: boolean
    isOnlyChild?: boolean
    isRightEdge?: boolean
    isLeftEdge?: boolean
}

const Node = <T, >({data, renderNode, isRoot, isRightEdge, isLeftEdge}: NodeProps<T>) => {
    const [isExpanded, setIsExpanded] = useState(!!data.startExpanded);
    const [children, setChildren] = useState<NodeData<T>[]>(data.children);

    const toggleNode = () => setIsExpanded(!isExpanded);
    const addChildren = (data: NodeData<T>[]) => setChildren(children.concat(data));

    return (
        <div className={`tree-node 
                        ${isRoot && 'tree-node-root'}
                        ${isRightEdge && 'tree-node-right'}
                        ${isLeftEdge && 'tree-node-left'}`}>
            <NodeContent>
                {renderNode({
                    data: data,
                    toggleNode: toggleNode,
                    addChildren: addChildren,
                    isLeaf: children.length === 0,
                    isExpanded: isExpanded
                })}
            </NodeContent>
            {children.length > 0 &&
                <NodeChildren isExpanded={isExpanded}>
                    {children.map((child, index) =>
                        <Node data={child}
                              renderNode={renderNode}
                              isLeftEdge={index === 0}
                              isRightEdge={index === children.length - 1}
                              key={index}/>)}
                </NodeChildren>
            }
        </div>
    );
};

export default Node;