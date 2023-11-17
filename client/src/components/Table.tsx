import TableHead from "./TableHead";
import TableBody from "./TableBody";
import {useEffect, useState} from "react";
import {tableSort, Sorter} from "../utils/tableSort";
import {tableFilter, Filter} from "../utils/tableFilter";
import TableFilters from "./TableFilters";
import TableSearch from "./TableSearch";
import {tableSearch, Searcher} from "../utils/tableSearch";

export interface Column<T> {
    label: string,
    accessor: keyof T
    sortable: boolean
    searchable: boolean
    link?: string
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
    const [activeSearcher, setActiveSearch] = useState<Searcher<T>>({
        value: '',
        accessors: props.columns
            .filter(col => col.searchable)
            .map(({accessor}) => accessor)
    })
    const [activeFilters, setActiveFilters] = useState<Filter<T>[]>([])


    // update data based on filters and sorting
    useEffect(() => {
        const result = [...props.data]
            .filter((obj) =>
                tableFilter<T>(obj, activeFilters))
            .filter((obj) =>
                tableSearch(obj, activeSearcher))
            .sort((a: T, b: T) =>
                tableSort(a, b, activeSorter.accessor, activeSorter.order)
            )

        setTableData(result)
    }, [activeSorter, activeSearcher, activeFilters]);

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
                result[changedFilterIndex].values = result[changedFilterIndex].values.filter((val) => {
                    return val !== value
                })
            }
        }
        console.log('active filters: ', result)

        setActiveFilters(result)
    }

    return (
        <>
            <TableSearch
                onSearchChange={(query =>
                    setActiveSearch({
                        accessors: activeSearcher.accessors,
                        value: query
                    }))}
            />
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