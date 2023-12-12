import {MonsterSimpleData} from "../interfaces/monster";
import Table, {Column, FilterGroup} from "./table/Table";
import Icon from "./Icon";
import React from "react";

const columns: Column<MonsterSimpleData>[] = [
    {label: "Image", accessor: "imgURL", sortable: false, searchable: false},
    {label: "Name", accessor: "name", sortable: true, searchable: true, link: '/monsters/[slug]'},
    {
        label: "Monster No.", accessor: "monsterNo", sortable: true, searchable: false,
        displayFunc: row => row.monsterNo.toString().padStart(3, '0')
    },
    {label: "Rank", accessor: "rank", sortable: true, searchable: false},
    {
        label: "Family", accessor: "family", sortable: true, searchable: false,
        displayFunc: row => <Icon iconSlug={row.familyImageSlug} name={row.family} displayName={true}/>
    },
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
            <Icon iconSlug='slime.png' name='Slime' displayName={true}/>,
            <Icon iconSlug='dragon.png' name='Dragon' displayName={true}/>,
            <Icon iconSlug='nature.png' name='Nature' displayName={true}/>,
            <Icon iconSlug='beast.png' name='Beast' displayName={true}/>,
            <Icon iconSlug='material.png' name='Material' displayName={true}/>,
            <Icon iconSlug='demon.png' name='Demon' displayName={true}/>,
            <Icon iconSlug='undead.png' name='Undead' displayName={true}/>,
            <Icon iconSlug='boss.png' name='???' displayName={true}/>
        ]
    }
]

interface MonsterTableProps {
    data: MonsterSimpleData[]
}

const MonsterTable = ({data}: MonsterTableProps) => {
    return (
        <Table data={data} columns={columns} filters={filters} search={true}/>
    );
};

export default MonsterTable;