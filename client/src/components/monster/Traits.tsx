import 'bootstrap/dist/js/bootstrap'
import {MonsterTraitData} from "../../interfaces/trait";
import Table, {Column} from "../table/Table";

const columns: Column<MonsterTraitData>[] = [
    {label: "Name", accessor: "name"},
    {label: "Description", accessor: "description"},
    {label: "Unlock Level", accessor: "requiredLevel"},
    {label: "Large Trait", accessor: "isLargeTrait"}

]

interface TraitsProps {
    traits: MonsterTraitData[]
}

const Traits = ({traits}: TraitsProps) => {
    return (
        <div>
            <div className='h3'>
                Traits
            </div>
            {traits
                ? <Table data={traits} columns={columns}/>
                : <div>Error Loading Traits...</div>
            }
        </div>
    );
};

export default Traits