import {Column} from "./Table";

interface TableBodyProps<T> {
    columns: Column<T>[],
    tableData: T[]
}

const TableBody = <T, >(props: TableBodyProps<T>) => {
    return (
        <tbody className="table-group-divider">
        {props.tableData.map((data, index) => {
            return (
                <tr key={index}>
                    {props.columns.map(({ accessor }) => {
                        const tData = data[accessor]?.toString()
                        // const temp = tData?.toString()
                        // const tData = temp ? temp : "——";
                        return <td key={accessor.toString()}>{tData ? tData : "——"}</td>;
                    })}
                </tr>
            );
        })}
        </tbody>
    );
};

export default TableBody;