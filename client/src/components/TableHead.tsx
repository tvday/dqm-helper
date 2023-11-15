import {Column} from "./Table";

<<<<<<< HEAD
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'
import {Sorter} from "../utils/genericSort";

=======
>>>>>>> parent of 31ff750 (added little styling)
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
<<<<<<< HEAD
                const icon = props.activeSorter.sortField === accessor && props.activeSorter.sortOrder === "asc"
                    ? faSortUp
                    : props.activeSorter.sortField === accessor && props.activeSorter.sortOrder === "desc"
                        ? faSortDown
                        : faSort
=======
                const cl = sortable
                    ? sortField === accessor && order === "asc"
                        ? "up"
                        : sortField === accessor && order === "desc"
                            ? "down"
                            : "default"
                    : "";
>>>>>>> parent of 31ff750 (added little styling)
                return <th
                    key={accessor.toString()}
                    onClick={sortable ? () => handleSortingChange(accessor) : undefined}
                    className={cl}
                >
                    {label}
                </th>;
            })}
        </tr>
        </thead>
    );
};

export default TableHead;