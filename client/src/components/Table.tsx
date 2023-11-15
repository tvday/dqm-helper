import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useSortableTable } from "../useSortableTable";
import {useEffect, useState} from "react";

export interface Column<T> {
    label: string,
    accessor: keyof T
    sortable: boolean
}

interface TableProps<T> {
    caption: string
    data: T[]
    columns: Column<T>[]
}


const SortableTable = <T,>(props: TableProps<T>) => {
    const [tableData, setTableData] = useState<T[]>(props.data);

    const [activeSort, setActiveSorter] = useState()
    const [activeFilters, setActiveFilter] = useState()
    const [activeSearch, setActiveSearch] = useState()

    const [tableData1, handleSorting] = useSortableTable<T, keyof T>(props.data);

    useEffect(() => {

    }, [activeSort]);

    return (
        <>
            <table className="table table-bordered table-striped table-hover">
                <caption>{props.caption}</caption>
                <TableHead columns={props.columns} handleSorting={handleSorting} />
                <TableBody columns={props.columns} tableData={tableData} />
            </table>
        </>
    );
};

const Table = <T,>(props: TableProps<T>) => {
    // const [tableData1, setTableData] = useState<T[]>(props.data);
    const [tableData, handleSorting] = useSortableTable<T, keyof T>(props.data);


    return (
        <>
            <table className="table table-bordered table-striped table-hover">
                <caption>{props.caption}</caption>
                <TableHead columns={props.columns} handleSorting={handleSorting} />
                <TableBody columns={props.columns} tableData={tableData} />
            </table>
        </>
    );
};

export default SortableTable;