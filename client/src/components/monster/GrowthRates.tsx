import {MonsterData} from "../../interfaces/monster";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

interface GrowthRateCardProps {
    name: string
    growthRate: number
}

const GrowthRateCard = ({name, growthRate}: GrowthRateCardProps) => {
    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    {name}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center">
                        {getStars(growthRate)}
                    </li>
                </ul>
            </div>
        </div>
    );
};

interface GrowthRatesProps {
    data: MonsterData
}

const GrowthRates = ({data}: GrowthRatesProps) => {
    return (
        <div className='container'>
            <div className='h3'>Growth Rates</div>

            <div className='row row-cols-3 g-3'>
                <GrowthRateCard name='HP' growthRate={data.growthRateHP}/>
                <GrowthRateCard name='MP' growthRate={data.growthRateMP}/>
                <GrowthRateCard name='Attack' growthRate={data.growthRateAttack}/>
                <GrowthRateCard name='Defence' growthRate={data.growthRateDefense}/>
                <GrowthRateCard name='Agility' growthRate={data.growthRateAgility}/>
                <GrowthRateCard name='Wisdom' growthRate={data.growthRateWisdom}/>
            </div>
        </div>
    );
};

const getStars = (active: number) => {
    let stars: React.ReactElement[] = []

    for (let i = 0; i < active; ++i) {
        stars.push(<FontAwesomeIcon icon={faStar} className='text-warning' key={i}/>)
    }

    for (let i = active; i < 5; ++i) {
        stars.push(<FontAwesomeIcon icon={faStar} className='text-black-50' key={i}/>)
    }

    return stars
}

export default GrowthRates