import 'bootstrap/dist/js/bootstrap'
import {TalentData} from "../../interfaces/talent";
import {useEffect, useState} from "react";
import Table, {Column} from "../table/Table";

interface Row {
    name: string
    desc: string
    mp: number | null
    points: number
}

const columns: Column<Row>[] = [
    {label: "Name", accessor: "name"},
    {label: "Description", accessor: "desc"},
    {label: "MP", accessor: "mp"},
    {label: "Required Points", accessor: "points"}
]

const TalentTabContent = ({talent, index}: TalentTanContentProps) => {
    const [rows, updateRows] = useState<Row[]>([])

    console.log(rows)

    useEffect(() => {
        let rows = Array<Row>().concat(
            talent.skills?.map((skill): Row => {
                return {name: skill.name, desc: skill.description, mp: skill.mpCost, points: skill.requiredPoints}
            }),
            talent.traits?.map((trait): Row => {
                return {name: trait.name, desc: trait.description, mp: null, points: trait.requiredPoints}
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
        <div className={index === 0 ? "tab-pane fade show active" : "tab-pane fade"}
             id={`nav-${talent.slug}`}
             role="tabpanel"
             aria-labelledby={`nav-tab-${talent.slug}`}
             tabIndex={0}
        >
            <Table caption={
                talent.isInherent
                    ? "This trait is inherent."
                    : "This trait is random on scout."
            }
                   data={rows}
                   columns={columns}
            />
        </div>
    );
};

interface TalentTabProps {
    name: string
    slug: string
    index: number
}

const TalentTab = ({name, slug, index}: TalentTabProps) => {
    return (
        <button className={index === 0 ? "nav-link active" : "nav-link"}
                id={`nav-tab-${name}`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-${slug}`}
                type="button"
                role="tab"
                aria-controls={`nav-${slug}`}
                aria-selected={index === 0 ? "true" : "false"}>
            {name}
        </button>
    );
};

interface TalentTanContentProps {
    talent: TalentData
    index: number
}

interface TalentsProps {
    talents: TalentData[]
}

const Talents = ({talents}: TalentsProps) => {
    return (
        <div>
            <div className='h3'>
                Talents
            </div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {talents.map((talent, index) => {
                        return <TalentTab name={talent.name} slug={talent.slug} index={index} key={index}/>;
                    })}
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {talents.map((talent, index) => {
                    return <TalentTabContent talent={talent} index={index} key={index}/>;
                })}
            </div>
        </div>
    );
};

export default Talents