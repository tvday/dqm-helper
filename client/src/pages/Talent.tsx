import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchData} from "../utils/api";
import {TalentData} from "../interfaces/talent";
import {default as TalentTable} from '../components/TalentTable'
import {MonsterWithTalentData} from "../interfaces/monster";
import MonsterTable from "../components/MonsterTable";
import {AccordionBody, AccordionHeader} from "../components/Accordion";

const Talent = () => {
    const [talentData, setTalentData] = useState<TalentData | null>(null);
    const [talentLoading, setTalentLoading] = useState(true);
    const [talentError, setTalentError] = useState<string | null>(null);

    const [monsterData, setMonsterData] = useState<MonsterWithTalentData[] | null>(null);
    const [monsterLoading, setMonsterLoading] = useState(true);
    const [monsterError, setMonsterError] = useState<string | null>(null);

    const {slug} = useParams()
    if (slug === undefined) {
        throw new Error('undefined monster')
    }

    useEffect(() => {
        fetchData(`/talents/${slug}`, null, setTalentData, setTalentLoading, setTalentError);
        fetchData(`/talents/${slug}/monsters`, null, setMonsterData, setMonsterLoading, setMonsterError)
    }, []);

    return (
        <div className='container'>
            {talentData && <>
                <div className='h1'>{talentData.name}</div>

                <div className='accordion accordion-flush'>
                    <div className='accordion-item'>
                        <AccordionHeader id='SkillTraitsPanel'>
                            <div className='h3'>Skills and Traits</div>
                        </AccordionHeader>
                        <AccordionBody id='SkillTraitsPanel'>
                            <TalentTable talent={talentData}/>
                        </AccordionBody>
                    </div>
                    <div className='accordion-item'>
                        <AccordionHeader id='ObtainPanel'>
                            <div className='h3'>How to Obtain</div>
                        </AccordionHeader>
                        <AccordionBody id='ObtainPanel'>
                            <div className='accordion border'>
                                <div className='accordion-item'>
                                    <AccordionHeader id='ObtainFromMonstersPanel'>
                                        <div className='h5'>From Monsters</div>
                                    </AccordionHeader>
                                    <AccordionBody id='ObtainFromMonstersPanel'>
                                        {monsterData &&
                                            <MonsterTable data={monsterData}/>
                                        }
                                    </AccordionBody>
                                </div>
                            </div>
                        </AccordionBody>
                    </div>
                </div>
            </>}
        </div>
    );
};

export default Talent;