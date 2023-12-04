import {useEffect, useState} from "react";
import Table, {Column} from "./table/Table";
import Icon from "./Icon";
import {IconsURL} from "../utils/api";
import {TalentData} from "../interfaces/talent";

interface TalentProps {
    talent: TalentData
    caption?: string
}

interface Row {
    name: string
    iconSlug: string | null
    desc: string
    mp: number | null
    points: number
}

const columns: Column<Row>[] = [
    {
        label: "Name", accessor: "name",
        displayFunc: (row) => {
            return row.iconSlug
                ? <Icon name={row.name} iconURL={`${IconsURL}/${row.iconSlug}`}/>
                : row.name
        }
    },
    {label: "Description", accessor: "desc"},
    {label: "MP", accessor: "mp"},
    {label: "Required Points", accessor: "points"}
]

const Talent = ({talent, caption}: TalentProps) => {
    const [rows, updateRows] = useState<Row[]>([])

    useEffect(() => {
        let rows = Array<Row>().concat(
            talent.skills?.map((skill): Row => {
                return {
                    name: skill.name,
                    iconSlug: skill.skillTypeImageSlug,
                    desc: skill.description,
                    mp: skill.mpCost,
                    points: skill.requiredPoints,
                }
            }),
            talent.traits?.map((trait): Row => {
                return {
                    name: trait.name,
                    iconSlug: null,
                    desc: trait.description,
                    mp: null,
                    points: trait.requiredPoints
                }
            })
        )
            .filter((val) => val !== undefined)
            .sort((a, b) => {
                if (a.points < b.points) {
                    return -1
                } else if (a.points > b.points) {
                    return 1
                } else {
                    return 0
                }
            })

        updateRows(rows)
    }, [talent.skills, talent.traits]);

    return (
            <Table caption={caption} data={rows} columns={columns}/>
    );
};

export default Talent;