import React from "react";
import {SharedNodeProps} from "./SynthTree";

interface SynthComboNodeProps {
    nodeProps: SharedNodeProps
}

const SynthComboNode = ({nodeProps}: SynthComboNodeProps) => {
    const {toggleNode} = nodeProps

    return (
        <div className='synth-node align-content-center'>
            <div className=''>
                <button className='synth-node-btn'
                        onClick={toggleNode}
                    >
                    Synth Combo
                </button>
            </div>
        </div>
    );
};

export default SynthComboNode;