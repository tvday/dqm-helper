import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchData} from "../utils/api";
import {TalentData} from "../interfaces/talent";
import {default as TalentTable} from '../components/Talent'

const Talent = () => {
    const [data, setData] = useState<TalentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {slug} = useParams()
    if (slug === undefined) {
        throw new Error('undefined monster')
    }

    useEffect(() => {
        fetchData(`/talents/${slug}`, null, setData, setLoading, setError)
    }, []);

    return (
        <div className='container'>
            {data && <>
                <div className='h1'>{data.name}</div>

                <div className='container'>
                    <div className='h3'>Skills and Traits</div>
                    <TalentTable talent={data}/>
                </div>

                <div className='container'>
                    <div className='h3'>How to Obtain</div>
                </div>
            </>}
        </div>
    );
};

export default Talent;