import {Column} from "./Table";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'
import {Sorter} from "../utils/genericSort";

interface TableHeadProps<T> {
    columns: Column<T>[]
    changeSorter: (sortField: keyof T, sortOrder: "asc" | "desc") => void
    activeSorter: Sorter<T>
}

const TableHead = <T, >(props: TableHeadProps<T>) => {

    const handleSortingChange = (accessor: keyof T) => {
        const sortOrder =
            accessor === props.activeSorter.sortField && props.activeSorter.sortOrder === "asc" ? "desc" : "asc";
        console.log(accessor, sortOrder);
        props.changeSorter(accessor, sortOrder);
    };

    return (
        <thead>
        <tr>
            {props.columns.map(({label, accessor, sortable}) => {
                const icon = props.activeSorter.sortField === accessor && props.activeSorter.sortOrder === "asc"
                    ? faSortUp
                    : props.activeSorter.sortField === accessor && props.activeSorter.sortOrder === "desc"
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