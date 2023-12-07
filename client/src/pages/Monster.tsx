import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MonsterData, MonsterSimpleData} from "../interfaces/monster";
import {APIBase, fetchData} from "../utils/api";
import Table, {Column} from "../components/table/Table";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons'
import MonsterCard from "../components/monster/MonsterCard";
import GrowthRates from "../components/monster/GrowthRates";
import Resistances from "../components/monster/Resistances";
import Traits from "../components/monster/Traits";
import Talents from "../components/monster/Talents";

const Monster = () => {
    const [data, setData] = useState<MonsterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {slug} = useParams()
    if (slug === undefined) {
        throw new Error('undefined monster')
    }

    useEffect(() => {
        fetchData(`/monsters/${slug}`, null, setData, setLoading, setError)
    }, []);

    return (
        <>{data &&
            <div className="container bg-dark-subtle">
                <div className='row'>
                    {/*<div className='col bg-danger-subtle'>hi</div>*/}
                    <div className='col bg-success-subtle'>
                        <MonsterCard data={data}/>
                        <br/>
                        <GrowthRates growthRates={data.growthRates}/>
                        <br/>
                        <Resistances resistances={data.resistances}/>
                        <br/>
                        <Traits traits={data.traits}/>
                        <br/>
                        <Talents talents={data.talents}/>
                    </div>
                </div>
            </div>
        }</>
    );
};

export default Monster;