import {MouseEventHandler, useState} from "react";
import {SynthData} from "../../interfaces/synth";
import {MonsterSimpleData} from "../../interfaces/monster";
import {IconsAPI} from "../../utils/api";
import {AutoTextSize} from 'auto-text-size'

interface SynthNodeProps {
    monster: MonsterSimpleData
    onClick: MouseEventHandler<HTMLButtonElement>
    expanded: boolean
}

const SynthNode = ({monster, onClick, expanded}: SynthNodeProps) => {
    return (
        <div className="synth-node">
            <div className='synth-node-body'>
                <img src={require('../../images/slime.png.jpeg')} className="synth-node-img" alt="..."/>
                <div className="synth-node-content">
                    <div className="synth-node-rank">
                        <AutoTextSize mode='box'>
                            {monster.rank}
                        </AutoTextSize>
                    </div>
                    <img className="synth-node-family"
                         src={`${IconsAPI}/${monster.familyImageSlug}`}
                         alt={monster.family}/>
                </div>
                <div className='synth-node-title'>
                    <AutoTextSize mode='box'>
                        {monster.name}
                    </AutoTextSize>
                </div>
            </div>
            <button className='synth-node-btn btn btn-secondary border-black border-3'
                    onClick={onClick}
            >
                {expanded ? 'Expand' : 'Collapse'}
            </button>
        </div>
    );
};

export default SynthNode