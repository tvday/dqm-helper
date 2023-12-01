import React, {useEffect, useState} from "react";
import Table, {Column, FilterGroup} from "../components/table/Table";
import {MonsterSimpleData} from "../interfaces/monster";
import {APIBase, IconsURL} from "../utils/api";
import Icon from "../components/Icon";
import {Link} from "react-router-dom";

const transName = (row: MonsterSimpleData) => {
    return <Link to={`/monsters/${row.slug}`} className='link-dark'>{row.name}</Link>
}

const columns: Column<MonsterSimpleData>[] = [
    {label: "Image", accessor: "imgURL", sortable: false, searchable: false},
    {label: "Name", accessor: "name", displayTransformation: transName, sortable: true, searchable: true/**, link: '/monsters/[slug]'*/},
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
            <Icon iconURL={`${IconsURL}/slime.png`} name='Slime'/>,
            <Icon iconURL={`${IconsURL}/dragon.png`} name='Dragon'/>,
            <Icon iconURL={`${IconsURL}/nature.png`} name='Nature'/>,
            <Icon iconURL={`${IconsURL}/beast.png`} name='Beast'/>,
            <Icon iconURL={`${IconsURL}/material.png`} name='Material'/>,
            <Icon iconURL={`${IconsURL}/demon.png`} name='Demon'/>,
            <Icon iconURL={`${IconsURL}/undead.png`} name='Undead'/>,
            <Icon iconURL={`${IconsURL}/boss.png`} name='???'/>
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