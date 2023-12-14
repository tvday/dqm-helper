import React, {useEffect, useState} from "react";
import {MonsterSimpleData} from "../interfaces/monster";
import {fetchSetData, IconsAPI} from "../utils/api";
import MonsterTable from "../components/MonsterTable";

const Monsters = () => {
    const [data, setData] = useState<MonsterSimpleData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSetData('/monsters', [], setData, setLoading, setError)
    }, []);

    return (
        <div className="container">
            <h1>Monsters</h1>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data.length > 0 && <MonsterTable data={data}/>}
        </div>
    );
};

export default Monsters;