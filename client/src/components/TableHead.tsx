import {useState} from "react";
import {Column} from "./Table";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {icon} from '@fortawesome/fontawesome-svg-core/import.macro'
import {faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'

interface TableHeadProps<T> {
    columns: Column<T>[]
    handleSorting: (sortField: keyof T, sortOrder: string) => void
}

const TableHead = <T, >(props: TableHeadProps<T>) => {
    const [sortField, setSortField] = useState<keyof T>('' as keyof T);
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor: keyof T) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        console.log(accessor, sortOrder);
        props.handleSorting(accessor, sortOrder);
    };

    const temp = (accessor: keyof T) => {
        return (sortField === accessor && order === "asc"
            ? "sort-up"
            : sortField === accessor && order === "desc"
                ? "sort-down"
                : "sort")
    }

    return (
        <thead>
        <tr>
            {props.columns.map(({label, accessor, sortable}) => {
                const icon = sortField === accessor && order === "asc"
                    ? faSortUp
                    : sortField === accessor && order === "desc"
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