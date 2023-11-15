import TableHead from "./TableHead";
import TableBody from "./TableBody";
import {useSortableTable} from "../useSortableTable";
import {useEffect, useState} from "react";
import {genericSort, Sorter} from "../utils/genericSort";

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


const SortableTable = <T, >(props: TableProps<T>) => {
    const [tableData, setTableData] = useState<T[]>(props.data);

    const [activeSorter, setActiveSorter] = useState<Sorter<T>>({
        sortField: '' as keyof T,
        sortOrder: "asc"
    })
    // const [activeFilters, setActiveFilter] = useState()
    // const [activeSearch, setActiveSearch] = useState()
    //
    // const [tableData1, handleSorting] = useSortableTable<T, keyof T>(props.data);

    useEffect(() => {
        const result = [...tableData].sort((a: T, b: T) =>
            genericSort(a, b, activeSorter.sortField, activeSorter.sortOrder)
        )

        setTableData(result)
    }, [activeSorter]);

    return (
        <>
            <table className="table table-bordered table-striped table-hover">
                <caption>{props.caption}</caption>
                <TableHead columns={props.columns}
                    // handleSorting={handleSorting}
                           changeSorter={(sortField, sortOrder) =>
                               setActiveSorter({sortField: sortField, sortOrder: sortOrder})}
                           activeSorter={activeSorter}/>
                <TableBody columns={props.columns} tableData={tableData}/>
            </table>
        </>
    );
};

// const Table = <T, >(props: TableProps<T>) => {
//     // const [tableData1, setTableData] = useState<T[]>(props.data);
//     const [tableData, handleSorting] = useSortableTable<T, keyof T>(props.data);
//
//
//     return (
//         <>
//             <table className="table table-bordered table-striped table-hover">
//                 <caption>{props.caption}</caption>
//                 <TableHead columns={props.columns} handleSorting={handleSorting}/>
//                 <TableBody columns={props.columns} tableData={tableData}/>
//             </table>
//         </>
//     );
// };

export default SortableTable;