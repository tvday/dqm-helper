import {Column} from "./Table";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'
import {Sorter} from "../../utils/tableSort";

interface TableHeadProps<T> {
    columns: Column<T>[]
    changeSorter: (sortField: keyof T, sortOrder: "asc" | "desc") => void
    activeSorter: Sorter<T>
}

const TableHead = <T, >(props: TableHeadProps<T>) => {

    const handleSortingChange = (accessor: keyof T) => {
        const sortOrder =
            accessor === props.activeSorter.accessor && props.activeSorter.order === "asc" ? "desc" : "asc";
        console.log(accessor, sortOrder);
        props.changeSorter(accessor, sortOrder);
    };

    return (
        <thead>
        <tr>
            {props.columns.map(({label, accessor, sortable}) => {
                const icon = props.activeSorter.accessor === accessor && props.activeSorter.order === "asc"
                    ? faSortUp
                    : props.activeSorter.accessor === accessor && props.activeSorter.order === "desc"
                        ? faSortDown
                        : faSort
                return <th
                    key={accessor.toString()}
                    onClick={sortable ? () => handleSortingChange(accessor) : undefined}
                    className={sortable ? 'sortable' : ''}
                >
                    <div className="row">
                        <div className="col-auto me-auto">{label}</div>
                        <div className="col-auto">{sortable && <FontAwesomeIcon icon={icon}/>}</div>
                    </div>
                </th>;
            })}
        </tr>
        </thead>
    );
};

export default TableHead;