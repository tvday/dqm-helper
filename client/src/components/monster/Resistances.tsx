import {MonsterData} from "../../interfaces/monster";
import React from "react";

interface ResistanceCardProps {
    name: string
    amount: string
}

const ResistanceCard = ({name, amount}: ResistanceCardProps) => {
    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    {name}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center">
                        {amount}
                    </li>
                </ul>
            </div>
        </div>
    );
};

interface ResistancesProps {
    data: MonsterData
}

const Resistances = ({data}: ResistancesProps) => {
    return (
        <div className='container'>
            <div className='h3'>
                Resistances
            </div>
            <div className='row row-cols-3'>
                <div className='col bg-success flex-column'>
                    <ResistanceCard name='Fire' amount={data.resistanceFire}/>
                    <ResistanceCard name='Water' amount={data.resistanceWater}/>
                    <ResistanceCard name='Wind' amount={data.resistanceWind}/>
                    <ResistanceCard name='Earth' amount={data.resistanceEarth}/>
                    <ResistanceCard name='Explosions' amount={data.resistanceExplosions}/>
                    <ResistanceCard name='Ice' amount={data.resistanceIce}/>
                    <ResistanceCard name='Electricity' amount={data.resistanceElectricity}/>
                </div>
                <div className='col'>
                    <ResistanceCard name='Light' amount={data.resistanceLight}/>
                    <ResistanceCard name='Dark' amount={data.resistanceDark}/>
                    <ResistanceCard name='Debilitation' amount={data.resistanceDebilitation}/>
                    <ResistanceCard name='Bedazzlement' amount={data.resistanceBedazzlement}/>
                    <ResistanceCard name='Antimagic' amount={data.resistanceAntimagic}/>
                    <ResistanceCard name='MP Absorbtion' amount={data.resistanceMpAbsorption}/>
                </div>
                <div className='col'>
                    <ResistanceCard name='Confusion' amount={data.resistanceConfusion}/>
                    <ResistanceCard name='Sleep' amount={data.resistanceSleep}/>
                    <ResistanceCard name='Paralysis' amount={data.resistanceParalysis}/>
                    <ResistanceCard name='Stun' amount={data.resistanceStun}/>
                    <ResistanceCard name='Poison' amount={data.resistancePoison}/>
                    <ResistanceCard name='Instant Death' amount={data.resistanceInstantDeath}/>
                </div>
            </div>
        </div>
    );
};

export default Resistances;