import TableHead from "./TableHead";
import TableBody from "./TableBody";
import {useEffect, useState} from "react";
import {genericSort, Sorter} from "../utils/genericSort";
import {genericFilter, Filter} from "../utils/genericFilter";
import TableFilters from "./TableFilters";

export interface Column<T> {
    label: string,
    accessor: keyof T
    sortable: boolean
}

export interface FilterGroup<T> {
    label: string
    accessor: keyof T
    values: any[]
}

interface TableProps<T> {
    caption: string
    data: T[]
    columns: Column<T>[]
    filters: FilterGroup<T>[]
}


const SortableTable = <T, >(props: TableProps<T>) => {
    const [tableData, setTableData] = useState<T[]>(props.data);

    const [activeSorter, setActiveSorter] = useState<Sorter<T>>({
        accessor: '' as keyof T,
        order: "asc"
    })
    const [activeFilters, setActiveFilters] = useState<Filter<T>[]>([])
    // const [activeSearch, setActiveSearch] = useState()

    useEffect(() => {
        const result = [...props.data]
            .filter((obj) =>
                genericFilter<T>(obj, activeFilters))
            .sort((a: T, b: T) =>
                genericSort(a, b, activeSorter.accessor, activeSorter.order)
            )

        setTableData(result)
    }, [activeSorter, activeFilters]);

    const handleFilterChange = (accessor: keyof T, value: string, checked: boolean) => {
        let result = [...activeFilters]
        const changedFilterIndex = result.findIndex((filter) => filter.accessor === accessor)

        if (checked) {
            if (changedFilterIndex >= 0) {
                result[changedFilterIndex].values.push(value)
            } else {
                result.push({accessor: accessor, values: [value]})
            }
        } else {
            console.log('unchecked?')
            if (changedFilterIndex >= 0) {
                result[changedFilterIndex].values = result[changedFilterIndex].values.filter((val) => {return val !== value})
            }
        }
        console.log('active filters: ', result)

        setActiveFilters(result)
    }

    return (
        <>
            <TableFilters filters={props.filters} onFilterChange={handleFilterChange}/>
            <table className="table table-bordered table-striped table-hover">
                <caption>{props.caption}</caption>
                <TableHead columns={props.columns}
                    // handleSorting={handleSorting}
                           changeSorter={(sortField, sortOrder) =>
                               setActiveSorter({accessor: sortField, order: sortOrder})}
                           activeSorter={activeSorter}/>
                <TableBody columns={props.columns} tableData={tableData}/>
            </table>
        </>
    );
};

export default SortableTable;