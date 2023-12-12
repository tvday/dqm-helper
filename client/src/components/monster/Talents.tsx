import {TalentOfMonsterData} from "../../interfaces/talent";
import TalentTable from "../TalentTable";
import {AccordionBody, AccordionHeader} from "../Accordion";
import {Link} from "react-router-dom";

const TalentTabContent = ({talent, index}: TalentTanContentProps) => {
    return (
        <div className={index === 0 ? "tab-pane fade show active" : "tab-pane fade"}
             id={`nav-${talent.slug}`}
             role="tabpanel"
             aria-labelledby={`nav-tab-${talent.slug}`}
             tabIndex={0}
        >
            <TalentTable talent={talent} caption={
                <div>
                    {talent.isInnate
                        ? "This talent is innate. "
                        : "This talent is random on scout. "}
                    <Link to={`/talents/${talent.slug}`}>Go to page.</Link>
                </div>
            }/>
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
    talent: TalentOfMonsterData
    index: number
}

interface TalentsProps {
    talents: TalentOfMonsterData[]
}

const Talents = ({talents}: TalentsProps) => {
    const id = 'TalentsPanel'
    return (
        <div className='accordion-item'>
            <AccordionHeader id={id}>
                <div className='h3'>
                    Talents
                </div>
            </AccordionHeader>
            <AccordionBody id={id}>
                {talents
                    ? <>
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
                    </>
                    : <div>Error Loading Talents...</div>
                }
            </AccordionBody>
        </div>
    );
};

export default Talents