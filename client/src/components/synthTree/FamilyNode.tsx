import {IconsAPI} from "../../utils/api";
import {AutoTextSize} from "auto-text-size";
import {SharedNodeProps} from "./SynthTree";
import React from "react";

interface FamilyNodeProps {
    family: { name: string, imageSlug: string }
    rank?: string
    nodeProps: SharedNodeProps
}

const FamilyNode = ({family, rank}: FamilyNodeProps) => {
    return (
        <div className="synth-node">
            <div className='synth-node-body'>
                <img src={`${IconsAPI}/${family.imageSlug}`} className="synth-node-img" alt="..."/>
                {rank &&
                    <div className='synth-node-content'>
                        <div className='synth-node-rank'>
                            <AutoTextSize mode='box'>
                                {`${rank}*`}
                            </AutoTextSize>
                        </div>
                    </div>
                }
                <div className='synth-node-title'>
                    <AutoTextSize mode='box'>
                        {family.name}
                    </AutoTextSize>
                </div>
            </div>
        </div>
    );
};

export default FamilyNode;