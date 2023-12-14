import {SharedNodeProps} from "./interfaces";
import React, {useEffect} from "react";

interface SynthComboNodeProps {
    nodeProps: SharedNodeProps
    parentExpanded: boolean
}

const SynthComboNode = ({nodeProps, parentExpanded}: SynthComboNodeProps) => {
    const {toggleNode, collapsed} = nodeProps

    // if (parentExpanded && collapsed) {
    //     toggleNode()
    // }

    useEffect(() => {
        if (collapsed) {
            toggleNode()
        }
        console.log('yo')
    });

    return (
        <div className='synth-node align-content-center'>
            <div className=''>
                <button className='synth-node-btn btn btn-secondary border-black border-3'
                        // onClick={toggleNode}
                    >
                    Synth Combo
                </button>
            </div>
        </div>
    );
};

export default SynthComboNode;