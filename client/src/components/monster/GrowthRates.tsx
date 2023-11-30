import {MonsterData} from "../../interfaces/monster";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {GrowthRateData} from "../../interfaces/growthRate";

interface GrowthRateCardProps {
    growthRate: GrowthRateData
}

const GrowthRateCard = ({growthRate}: GrowthRateCardProps) => {
    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    {growthRate.name}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center">
                        {getStars(growthRate.growthRate)}
                    </li>
                </ul>
            </div>
        </div>
    );
};

interface GrowthRatesProps {
    growthRates: GrowthRateData[]
}

const GrowthRates = ({growthRates}: GrowthRatesProps) => {
    return (
        <div className='container'>
            <div className='h3'>Growth Rates</div>
            {growthRates
                ? <div className='row row-cols-3 g-3'>
                    {growthRates.map((gr, index) => <GrowthRateCard growthRate={gr} key={index}/>)}
                </div>
                : <div>Error Loading Growth Rates...</div>
            }
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