import {PropsWithChildren} from "react";

const NodeContent = ({children}: PropsWithChildren) => {
    return (
        // <div className='tree-node-content border border-info border-3 p-3'>
            <div className='tree-node-content'>
            {children}
        </div>
    );
};

export default NodeContent;