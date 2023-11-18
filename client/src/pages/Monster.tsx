import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MonsterData, MonsterSimpleData} from "../interfaces/monster";
import {APIBase} from "../utils/api";
import Table, {Column} from "../components/table/Table";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons'
import MonsterCard from "../components/monster/MonsterCard";
import GrowthRates from "../components/monster/GrowthRates";

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
                    {/*<div className='col bg-danger-subtle'>hi</div>*/}
                    <div className='col bg-success-subtle'>
                        <MonsterCard data={data}/>
                        <br/>
                        <GrowthRates data={data}/>
                    </div>
                    {/*<div className='col bg-primary-subtle'>hi</div>*/}
                </div>
            </div>
        }</>
    );
};

export default Monster;