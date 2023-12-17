import React, {useEffect} from "react";
import {SharedNodeProps} from "./SynthTree";

interface SynthComboNodeProps {
    nodeProps: SharedNodeProps
    parentExpanded: boolean
}

const SynthComboNode = ({nodeProps, parentExpanded}: SynthComboNodeProps) => {
    const {toggleNode, isExpanded} = nodeProps

    // if (parentExpanded && collapsed) {
    //     toggleNode()
    // }

    // useEffect(() => {
    //     if (isExpanded) {
    //         toggleNode()
    //     }
    //     console.log('yo')
    // });

    return (
        <div className='synth-node align-content-center'>
            <div className=''>
                <button className='synth-node-btn btn btn-secondary border-black border-3'
                        onClick={toggleNode}
                    >
                    Synth Combo
                </button>
            </div>
        </div>
    );
};

export default SynthComboNode;