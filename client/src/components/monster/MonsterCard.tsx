import React from "react";
import {MonsterData} from "../../interfaces/monster";

interface MonsterCardProps {
    data: MonsterData
}

const MonsterCard = ({data}: MonsterCardProps) => {

    return (
        <div className='container p-2 bg-success' style={{maxWidth: '25rem'}}>
            <div className='text-center'>
                <img className='img img-thumbnail'
                     src={require('../../images/slime.png.jpeg')}
                     alt='slime icon'/>
            </div>
            <div className="h1 text-center">{data.name}</div>
            <div className='container bg-dark-subtle'>
                <div className='row h5'>
                    <div className='col fst-italic text-bg-warning'>Monster No.</div>
                    <div className='col text-end'>{data.monsterNo}</div>
                </div>
                <div className='row h5'>
                    <div className='col fst-italic'>Family</div>
                    <div className='col text-end'>{data.family}</div>
                </div>
                <div className='row h5'>
                    <div className='col fst-italic'>Rank</div>
                    <div className='col text-end'>{data.rank}</div>
                </div>
            </div>
        </div>
    );
};

export default MonsterCard;