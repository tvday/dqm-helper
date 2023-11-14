import {FC, useEffect, useState} from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import {MonsterData} from "../pages/Monsters";
import { useSortableTable } from "../useSortableTable";

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
            </table>
        </>
    );
};

export default Table;