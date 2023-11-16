export interface Sorter<T> {
    accessor: keyof T
    order: "asc" | "desc"
}

export const tableSort = <T, K extends keyof T>(a: T, b: T, sortField: K, sortOrder: "asc" | "desc") => {
    const valA = a[sortField]?.toString()
    const valB = b[sortField]?.toString()

    if (valA === undefined && valB === undefined) return 0;
    if (valA === undefined) return 1;
    if (valB === undefined) return -1;

    return (
        (Number(valA) - Number(valB)) * (sortOrder === "asc" ? 1 : -1) ||
        valA.localeCompare(valB.toString(), "en", {
            numeric: true,
            sensitivity: "base"
        }) * (sortOrder === "asc" ? 1 : -1)
    );
}