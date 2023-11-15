import {FC, useEffect, useState} from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
<<<<<<< HEAD
import {useSortableTable} from "../useSortableTable";
import {useEffect, useState} from "react";
import {genericSort, Sorter} from "../utils/genericSort";
=======
import {MonsterData} from "../pages/Monsters";
import { useSortableTable } from "../useSortableTable";
>>>>>>> parent of 31ff750 (added little styling)

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


<<<<<<< HEAD
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
=======
const Table = <T,>(props: TableProps<T>) => {
    // const [tableData1, setTableData] = useState<T[]>(props.data);
    const [tableData, handleSorting] = useSortableTable<T, keyof T>(props.data);


    // const columns: Column[] = [
    //     { label: "Image", accessor: "imgURL", sortable: false },
    //     { label: "Name", accessor: "name", sortable: true },
    //     { label: "Monster No.", accessor: "monsterNo", sortable: true },
    //     { label: "Rank", accessor: "rank", sortable: true },
    //     { label: "Family", accessor: "family", sortable: true },
    // ];
    // const handleSorting = (sortField: keyof MonsterData, sortOrder: string) => {
    //     console.log(sortField, sortOrder)
    //
    //     if (sortField) {
    //         const sorted = [...tableData].sort((a, b) => {
    //             if (a[sortField] === null && b[sortField] === null) return 0;
    //             if (a[sortField] === null) return 1;
    //             if (b[sortField] === null) return -1;
    //             return (
    //                 Number(a[sortField])-Number(b[sortField]) * (sortOrder === "asc" ? 1 : -1) ||
    //                 a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
    //                     numeric: true,
    //                     sensitivity: "base"
    //                 }) * (sortOrder === "asc" ? 1 : -1)
    //             );
    //         });
    //         setTableData(sorted);
    //     }
    // };

    return (
        <>
            <table className="table">
                <caption>{props.caption}</caption>
                <TableHead columns={props.columns} handleSorting={handleSorting} />
                <TableBody columns={props.columns} tableData={tableData} />
>>>>>>> parent of 31ff750 (added little styling)
            </table>
        </>
    );
};
<<<<<<< HEAD

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
=======
>>>>>>> parent of 31ff750 (added little styling)

export default Table;