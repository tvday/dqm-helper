import {useState} from "react";
import {Column} from "./Table";

interface TableHeadProps<T> {
    columns: Column<T>[]
    handleSorting: (sortField: keyof T, sortOrder: string) => void
}

const TableHead = <T, >(props: TableHeadProps<T>) => {
    const [sortField, setSortField] = useState<keyof T>('' as keyof T);
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor: keyof T) => {
        console.log(accessor);

        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        props.handleSorting(accessor, sortOrder);
    };

    return (
        <thead>
        <tr>
            {props.columns.map(({label, accessor, sortable}) => {
                const cl = sortable
                    ? sortField === accessor && order === "asc"
                        ? "up"
                        : sortField === accessor && order === "desc"
                            ? "down"
                            : "default"
                    : "";
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