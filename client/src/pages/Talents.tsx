import Table, {Column} from "../components/table/Table";
import {TalentData} from "../interfaces/talent";
import React, {useEffect, useState} from "react";
import {APIBase} from "../utils/api";
import {TalentSkillData} from "../interfaces/skill";
import {TraitData} from "../interfaces/trait";
import Talent from "../components/Talent";

const columns: Column<TalentData>[] = [
    {label: 'Name', accessor: 'name', link: '/talents/[slug]'},
    {
        label: 'Skills and Traits', accessor: "id",
        displayFunc: (cell) => {
            return (
                <>
                    <div className='container text-end'>
                        <p className="d-inline-flex gap-1">
                            <button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse"
                                    data-bs-target={`#talent-${cell.id}`} aria-expanded="false"
                                    aria-controls="collapseExample">
                                <div className='collapse show show-hide-button' id={`talent-${cell.id}`}>Show</div>
                                <div className='collapse show-hide-button' id={`talent-${cell.id}`}>Hide</div>
                            </button>
                        </p>
                        <div className="collapse" id={`talent-${cell.id}`}>
                            <div className="card card-body">
                                <Talent talent={cell}/>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    },
    {
        label: 'Skills', accessor: 'skills', searchable: true, display: false,
        searchFunc: (obj, value) => {
            let skills = obj as TalentSkillData[]
            return skills?.some((elem) => {
                return elem.name
                    .toLocaleLowerCase('en')
                    .includes(value.toLocaleLowerCase('en'));
            });
        }
    },
    {
        label: 'Traits', accessor: 'traits', searchable: true, display: false,
        searchFunc: (obj, value) => {
            let traits = obj as TraitData[]
            return traits.some((elem) => {
                return elem.name
                    .toLocaleLowerCase('en')
                    .includes(value.toLocaleLowerCase('en'))
            })
        }
    }
]

const Talents = () => {
    const [data, setData] = useState<TalentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(APIBase + '/talents')
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
            <h1>Talents</h1>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data.length > 0 &&
                <div className="container">
                    <Table data={data} columns={columns} search={true}/>
                </div>
            }
        </div>
    );
};

export default Talents;