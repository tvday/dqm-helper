import 'bootstrap/dist/js/bootstrap'
import {TraitOfMonsterData} from "../../interfaces/trait";
import Table, {Column} from "../table/Table";
import {AccordionBody, AccordionHeader} from "../Accordion";

const columns: Column<TraitOfMonsterData>[] = [
    {label: "Name", accessor: "name"},
    {label: "Description", accessor: "description"},
    {label: "Unlock Level", accessor: "requiredLevel"},
    {
        label: "Large Trait", accessor: "isLargeTrait",
        displayFunc: row => row.isLargeTrait ? 'Yes' : 'No'
    }

]

interface TraitsProps {
    traits: TraitOfMonsterData[]
}

const Traits = ({traits}: TraitsProps) => {
    const id = "TraitsPanel"
    return (
        <div className='accordion-item'>
            <AccordionHeader id={id}>
                <div className='h3'>Traits</div>
            </AccordionHeader>
            <AccordionBody id={id}>
                {traits
                    ? <Table data={traits} columns={columns}/>
                    : <div>Error Loading Traits...</div>
                }
            </AccordionBody>
        </div>
    );
};

export default Traits