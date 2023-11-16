import React, {useEffect, useState} from "react";
import Table, {Column, FilterGroup} from "../components/Table";


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
    {label: "Image", accessor: "imgURL", sortable: false},
    {label: "Name", accessor: "name", sortable: true},
    {label: "Monster No.", accessor: "monsterNo", sortable: true},
    {label: "Rank", accessor: "rank", sortable: true},
    {label: "Family", accessor: "family", sortable: true},
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
        fetch("http://localhost:8080/api/v1/monsters")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`error status: ${response.status}`);
                }
                return response.json();
            })
            .then((resData) => {
                console.log(resData);
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

        // <>
        //     <h1>Monsters</h1>
        //     {loading && <div>A moment please...</div>}
        //     {error && (
        //         <div>{`There is a problem fetching the post data - ${error}`}</div>
        //     )}
        //     {data && <table >
        //         <thead>
        //         <tr>
        //             <th>Image</th>
        //             <th>Name</th>
        //             <th>Monster No.</th>
        //             <th>Rank</th>
        //             <th>Family</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //         {data.map(({id, name, monsterNo, imgURL, rank, family}) => (
        //             <tr key={id}>
        //                 <td>{imgURL}</td>
        //                 <td>{name}</td>
        //                 <td>{monsterNo}</td>
        //                 <td>{rank}</td>
        //                 <td>{family}</td>
        //             </tr>
        //         ))}
        //         </tbody>
        //     </table>}
        // </>
    );
};

export default Monsters;