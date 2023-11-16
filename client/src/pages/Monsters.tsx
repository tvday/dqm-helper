import React, {useEffect, useState} from "react";
import Table, {Column, FilterGroup} from "../components/Table";

const APIBase = 'http://localhost:8080/api/v1'
// const APIBase = 'http://10.00.54:8080/api/v1' // for testing on mobile devices

// function getMonsters() {
//     fetch("localhost:8080/api/v1/monsters")
//         .then(data => {
//             setD
//         })
// }

export type MonsterData = {
    id: number
    name: string
    monsterNo: number
    rank: string
    family: string
    imgURL: string
}

const columns: Column<MonsterData>[] = [
    {label: "Image", accessor: "imgURL", sortable: false, searchable: false},
    {label: "Name", accessor: "name", sortable: true, searchable: true},
    {label: "Monster No.", accessor: "monsterNo", sortable: true, searchable: false},
    {label: "Rank", accessor: "rank", sortable: true, searchable: false},
    {label: "Family", accessor: "family", sortable: true, searchable: true},
]

const filters: FilterGroup<MonsterData>[] = [
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
    const [data, setData] = useState<MonsterData[]>([]);
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
        <>
            <h1>Monsters</h1>
            <i className="icon bi-envelope"></i>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data.length > 0 &&
                <div className="container">
                    <Table caption={"Monsters"} data={data} columns={columns} filters={filters}/>
                </div>
            }
        </>
    );
};

export default Monsters;