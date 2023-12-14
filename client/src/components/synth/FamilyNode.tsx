import {MonsterSimpleData} from "../../interfaces/monster";
import {SharedNodeProps} from "./interfaces";
import {useState} from "react";
import {fetchData, IconsAPI} from "../../utils/api";
import {convertToNodes} from "./utils";
import {AutoTextSize} from "auto-text-size";

interface FamilyNodeProps {
    family: {name: string, imageSlug: string}
    nodeProps: SharedNodeProps
}

const FamilyNode = ({family, nodeProps}: FamilyNodeProps) => {
    const {collapsed, leafNode, toggleNode, addChildren} = nodeProps

    return (
        <div className="synth-node">
            <div className='synth-node-body'>
                <img src={`${IconsAPI}/${family.imageSlug}`} className="synth-node-img" alt="..."/>
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