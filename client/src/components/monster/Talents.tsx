import {TalentData} from "../../interfaces/talent";
import Talent from "../Talent";

const TalentTabContent = ({talent, index}: TalentTanContentProps) => {
    return (
        <div className={index === 0 ? "tab-pane fade show active" : "tab-pane fade"}
             id={`nav-${talent.slug}`}
             role="tabpanel"
             aria-labelledby={`nav-tab-${talent.slug}`}
             tabIndex={0}
        >
            <Talent talent={talent} caption={
                talent.isInherent
                    ? "This talent is innate."
                    : "This talent is random on scout."
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
        </div>
    );
};

export default Talents