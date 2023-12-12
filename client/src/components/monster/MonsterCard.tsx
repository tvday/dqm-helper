import React from "react";
import {MonsterData} from "../../interfaces/monster";
import {IconsAPI} from "../../utils/api";
import Icon from "../Icon";

interface MonsterCardProps {
    data: MonsterData
}

const MonsterCard = ({data}: MonsterCardProps) => {

    return (
        <div className='container p-2 bg-primary-subtle rounded' style={{maxWidth: '25rem'}}>
            <div className='text-center'>
                <img className='img img-thumbnail'
                     src={require('../../images/slime.png.jpeg')}
                     alt='slime icon'/>
            </div>
            <div className="h1 text-center">{data.name}</div>
            <div className='container'>
                <div className='row h5'>
                    <div className='col fst-italic'>Monster No.</div>
                    <div className='col text-end'>{data.monsterNo.toString().padStart(3, '0')}</div>
                </div>
                <div className='row h5'>
                    <div className='col fst-italic'>Family</div>
                    <div className='col text-end align-middle'>
                        <Icon iconURL={`${IconsAPI}/${data.familyImageSlug}`} name={data.family} displayName={true}/>
                    </div>
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