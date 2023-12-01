import TableHead from "../table/TableHead";
import TableBody from "../table/TableBody";
import {ReactElement, useEffect, useState} from "react";
import {tableSort, Sorter} from "../../utils/tableSort";
import {tableFilter, Filter} from "../../utils/tableFilter";
import TableFilters from "../table/TableFilters";
import TableSearch from "../table/TableSearch";
import {tableSearch, Searcher} from "../../utils/tableSearch";


export interface Column<T> {
    // Title of column.
    label: string,
    // Key of the data where the column data is.
    accessor: keyof T
    // Optionally used to transform the column data when displaying.
    displayTransformation?: (row: T) => string | ReactElement
    // Dictates if column can be sorted.
    sortable?: boolean
    // Dictates if data is included in search filtering.
    searchable?: boolean
    // Add dynamic link to displayed data.
    //  Not used if displayTransformation is also supplied.
    //  Format: "/url/[<accessor>]" where <accessor> is a key of the data.
    link?: string
}

export interface FilterGroup<T> {
    title: string
    accessor: keyof T
    labels: string[] | ReactElement[]
    values: any[]
}

interface TableProps<T> {
    caption?: string
    data: T[]
    columns: Column<T>[]
    filters?: FilterGroup<T>[]
    search?: boolean
}


const Table = <T, >(props: TableProps<T>) => {
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
    }, [activeSorter, activeSearcher, activeFilters, props.data]);

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
            if (changedFilterIndex >= 0) {
                result[changedFilterIndex].values = result[changedFilterIndex].values.filter((val) => {
                    return val !== value
                })
            }
        }

        setActiveFilters(result)
    }

    return (
        <>
            {props.search && <TableSearch
                onSearchChange={(query =>
                    setActiveSearch({
                        accessors: activeSearcher.accessors,
                        value: query
                    }))}
            />}
            {props.filters && <TableFilters filters={props.filters} onFilterChange={handleFilterChange}/>}
            <table className="table table-bordered table-striped table-hover">
                {props.caption && <caption>{props.caption}</caption>}
                <TableHead columns={props.columns}
                           changeSorter={(sortField, sortOrder) =>
                               setActiveSorter({accessor: sortField, order: sortOrder})}
                           activeSorter={activeSorter}/>
                <TableBody columns={props.columns} tableData={tableData}/>
            </table>
        </>
    );
};

export default Table;