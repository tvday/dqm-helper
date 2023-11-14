import { useState } from "react";

export const useSortableTable = <T, K extends keyof T>(data: T[]): [T[], (sortField: K, sortOrder: string) => void] => {
    const [tableData, setTableData] = useState(data);

    const handleSorting = (sortField: K, sortOrder: string) => {

        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                const valA = a[sortField]?.toString()
                const valB = b[sortField]?.toString()

                if (valA === undefined && valB === undefined) return 0;
                if (valA === undefined) return 1;
                if (valB === undefined) return -1;

                return (
                    (Number(a) - Number(b)) * (sortOrder === "asc" ? 1 : -1) ||
                    valA.localeCompare(valB.toString(), "en", {
                        numeric: true,
                        sensitivity: "base"
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setTableData(sorted);
        }
    };

    return [tableData, handleSorting];
};