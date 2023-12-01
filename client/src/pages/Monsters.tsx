import React, {useEffect, useState} from "react";
import Table, {Column, FilterGroup} from "../components/table/Table";
import {MonsterSimpleData} from "../interfaces/monster";
import {APIBase, IconsURL} from "../utils/api";
import FamilyIcon from "../components/FamilyIcon";

const columns: Column<MonsterSimpleData>[] = [
    {label: "Image", accessor: "imgURL", sortable: false, searchable: false},
    {label: "Name", accessor: "name", sortable: true, searchable: true, link: '/monsters/[slug]'},
    {label: "Monster No.", accessor: "monsterNo", sortable: true, searchable: false},
    {label: "Rank", accessor: "rank", sortable: true, searchable: false},
    {label: "Family", accessor: "family", sortable: true, searchable: false},
]

const filters: FilterGroup<MonsterSimpleData>[] = [
    {
        title: 'Rank',
        accessor: 'rank',
        values: ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'S', 'X'],
        labels: ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'S', 'X']
    },
    {
        title: 'Family',
        accessor: 'family',
        values: ['Slime', 'Dragon', 'Nature', 'Beast', 'Material', 'Demon', 'Undead', '???'],
        labels: [
            <FamilyIcon iconURL={`${IconsURL}/slime.png`} name='Slime'/>,
            <FamilyIcon iconURL={`${IconsURL}/dragon.png`} name='Dragon'/>,
            <FamilyIcon iconURL={`${IconsURL}/nature.png`} name='Nature'/>,
            <FamilyIcon iconURL={`${IconsURL}/beast.png`} name='Beast'/>,
            <FamilyIcon iconURL={`${IconsURL}/material.png`} name='Material'/>,
            <FamilyIcon iconURL={`${IconsURL}/demon.png`} name='Demon'/>,
            <FamilyIcon iconURL={`${IconsURL}/undead.png`} name='Undead'/>,
            <FamilyIcon iconURL={`${IconsURL}/boss.png`} name='???'/>
        ]
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
                    <Table data={data} columns={columns} filters={filters} search={true}/>
                </div>
            }
        </div>
    );
};

export default Monsters;