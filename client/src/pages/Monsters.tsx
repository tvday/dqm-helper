import React, {useEffect, useState} from "react";
import Table, {Column, FilterGroup} from "../components/table/Table";
import {MonsterSimpleData} from "../interfaces/monster";
import {APIBase} from "../utils/api";

const columns: Column<MonsterSimpleData>[] = [
    {label: "Image", accessor: "imgURL", sortable: false, searchable: false},
    {label: "Name", accessor: "name", sortable: true, searchable: true, link: '/monsters/[slug]'},
    {label: "Monster No.", accessor: "monsterNo", sortable: true, searchable: false},
    {label: "Rank", accessor: "rank", sortable: true, searchable: false},
    {label: "Family", accessor: "family", sortable: true, searchable: false},
]

const filters: FilterGroup<MonsterSimpleData>[] = [
    {
        label: 'Rank',
        accessor: 'rank',
        values: ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'S', 'X']
    },
    {
        label: 'Family',
        accessor: 'family',
        values: ['Slime', 'Dragon', 'Nature', 'Beast', 'Material', 'Demon', 'Undead', '???']
    }
]

const Monsters = () => {
    const [data, setData] = useState<MonsterSimpleData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(APIBase + '/monsters')
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
                setData([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <h1>Monsters</h1>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data.length > 0 &&
                <div className="container">
                    <Table caption={"Monsters"} data={data} columns={columns} filters={filters}/>
                </div>
            }
        </div>
    );
};

export default Monsters;