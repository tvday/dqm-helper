import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MonsterData, MonsterSimpleData} from "../interfaces/monster";
import {APIBase} from "../utils/api";
import Table, {Column} from "../components/Table";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons'

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

type MonsterParams = {
    slug: string
};

const Monster = () => {
    const [data, setData] = useState<MonsterData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {slug} = useParams<MonsterParams>()
    if (slug === undefined) {
        throw new Error('undefined monster')
    }

    useEffect(() => {
        fetch(APIBase + `/monsters/${slug}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`error status: ${response.status}`);
                }
                return response.json();
            })
            .then((resData) => {
                setData(resData);
                setError(null);
            })
            .catch((err) => {
                console.log(err.message);
                setError(err.message);
                setData(undefined);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>{data &&
            <div className="container bg-dark-subtle">
                <div className='row'>
                    <div className='col bg-danger-subtle'>hi</div>
                    <div className='col-6 bg-success-subtle'>
                        {/*Monster Card*/}
                        <div className='container w-75 p-1 bg-success'>
                            <div className='text-center'>
                                <img className='img img-thumbnail'
                                     src={require('../images/slime.png.jpeg')}
                                     alt='slime icon'/>
                            </div>
                            <div className="h1 text-center">{data.name}</div>
                            <div className='container bg-dark-subtle'>
                                <div className='row h5'>
                                    <div className='col fst-italic'>Monster No.</div>
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

                        <br/>

                        {/*Growth Rates*/}
                        <div className='container'>
                            <div className='h3'>Growth Rates</div>

                            <div className='row'>
                                <div className='col'>
                                    <div className="card">
                                        <div className="card-header">
                                            HP
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{getStars(data.growthRateHP)}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="card">
                                        <div className="card-header">
                                            MP
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{getStars(data.growthRateMP)}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="card">
                                        <div className="card-header">
                                            Attack
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{getStars(data.growthRateAttack)}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <div className="card">
                                        <div className="card-header">
                                            Defence
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{getStars(data.growthRateDefense)}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="card">
                                        <div className="card-header">
                                            Agility
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{getStars(data.growthRateAgility)}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="card">
                                        <div className="card-header">
                                            Wisdom
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{getStars(data.growthRateWisdom)}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='col bg-primary-subtle'>hi</div>
                </div>
            </div>
        }</>
    );
};

export default Monster;