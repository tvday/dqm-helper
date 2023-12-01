import {MonsterData} from "../../interfaces/monster";
import React from "react";
import {ResistanceData} from "../../interfaces/resistance";
import {ImageBase} from "../../utils/api";

interface ResistanceProps {
    name: string
    img: string
}

const Resistance = ({name, img}: ResistanceProps) => {
    return (
        <div className='badge rounded-pill text-bg-dark'>
            <img src={`${ImageBase}/${img}`}/> {name}
        </div>
    );
};

interface ResistanceGroupProps {
    resistances: ResistanceData[]
    strengthCaption: string
    strengthValue: string
}

const ResistanceGroup = ({resistances, strengthCaption, strengthValue}: ResistanceGroupProps) => {
    return (
        <div className="list-group list-group-horizontal">
            <div className='list-group-item list-group-item-primary'>{strengthCaption}</div>
            <div className='list-group-item flex-fill'>
                {resistances
                    .filter((res) => res.value === strengthValue)
                    .map((res, index) => <Resistance name={res.damageType} img={res.imageSlug} key={index}/>)
                }
            </div>
        </div>
    );
};

interface ResistancesProps {
    resistances: ResistanceData[]
}

const Resistances = ({resistances}: ResistancesProps) => {
    return (
        <div className='container'>
            <div className='h3'>
                Resistances
            </div>
            {resistances ?
                <>
                    <ResistanceGroup resistances={resistances} strengthCaption='Very Strong'
                                     strengthValue='Very Strong'/>
                    <ResistanceGroup resistances={resistances} strengthCaption='Strong' strengthValue='Strong'/>
                    <ResistanceGroup resistances={resistances} strengthCaption='Normal' strengthValue='Normal'/>
                    <ResistanceGroup resistances={resistances} strengthCaption='Weak' strengthValue='Weak'/>
                </>
                : <div>Error Loading Resistances...</div>
            }
        </div>
    )
        ;
};

export default Resistances;