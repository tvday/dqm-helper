import {PropsWithChildren} from "react";

interface NodeChildrenProps {
    isExpanded: boolean
}

const NodeChildren = ({children, isExpanded}: PropsWithChildren<NodeChildrenProps>) => {
    return (
        <>
            <div className={`tree-node-children ${isExpanded ? '' : 'd-none'}`}>
                {children}
            </div>
        </>
    );
};

export default NodeChildren;