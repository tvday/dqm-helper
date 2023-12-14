import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {MonsterData, MonsterSimpleData} from "../interfaces/monster";
import {APIBase, fetchSetData} from "../utils/api";
import Table, {Column} from "../components/table/Table";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from '@fortawesome/free-solid-svg-icons'
import MonsterCard from "../components/monster/MonsterCard";
import GrowthRates from "../components/monster/GrowthRates";
import Resistances from "../components/monster/Resistances";
import Traits from "../components/monster/Traits";
import Talents from "../components/monster/Talents";
import Locations from "../components/monster/Locations";
import Synths from "../components/monster/Synths";
import MonsterNode from "../components/synth/MonsterNode";
import {AccordionBody, AccordionHeader} from "../components/Accordion";
import SynthTree from "../components/synth/SynthTree";

const Monster = () => {
    const [data, setData] = useState<MonsterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {slug} = useParams()
    if (slug === undefined) {
        throw new Error('undefined monster')
    }

    useEffect(() => {
        fetchSetData(`/monsters/${slug}`, null, setData, setLoading, setError)
    }, []);

    return (
        <>
            {data &&
                <div className="container">
                    <MonsterCard data={data}/>
                    <br/>

                    <div className='accordion accordion-flush'>
                        <GrowthRates growthRates={data.growthRates}/>
                        <br/>
                        <Resistances resistances={data.resistances}/>
                        <br/>
                        <Traits traits={data.traits}/>
                        <br/>
                        <Talents talents={data.talents}/>
                        <br/>
                        <Locations locations={data.locations}/>
                        <br/>
                        {/*<div className='accordion-item'>*/}
                        {/*    <AccordionHeader id={'id'}>*/}
                        {/*        <div className='h3'>*/}
                        {/*            Synth Node*/}
                        {/*        </div>*/}
                        {/*    </AccordionHeader>*/}
                        {/*    <AccordionBody id={'id'}>*/}
                        {/*        <SynthNode monster={data}/>*/}
                        {/*        /!*<SynthTree/>*!/*/}
                        {/*    </AccordionBody>*/}
                        {/*</div>*/}
                        <br/>
                        <Synths monster={data}/>
                    </div>
                </div>
            }
        </>
    );
};

export default Monster;