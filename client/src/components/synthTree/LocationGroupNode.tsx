import {SharedNodeProps} from "./SynthTree";
import React from "react";

interface LocationGroupNodeProps {
    nodeProps: SharedNodeProps
}

const LocationGroupNode = ({nodeProps}: LocationGroupNodeProps) => {
    const {toggleNode} = nodeProps

    return (
        <div className='synth-node align-content-center'>
            <div className=''>
                <button className='synth-node-btn'
                        onClick={toggleNode}
                >
                    Locations
                </button>
            </div>
        </div>
    );
};

export default LocationGroupNode;