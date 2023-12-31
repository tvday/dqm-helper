import {Column} from "./Table";
import {Link} from "react-router-dom";
import {Simulate} from "react-dom/test-utils";

interface TableBodyProps<T> {
    columns: Column<T>[],
    tableData: T[]
}

const convertURL = <T, >(url: string, data: T): string => {
    const re = /\[(.*?)]/g
    const matches = Array.from(url.matchAll(re))

    let resultURL = url
    matches.map((match) => {
        const accessor = match[1] as keyof T
        const val = data[accessor]

        if (val === undefined) {
            throw new Error(`Cannot build link "${url}". Invalid parameter: "${accessor.toString()}"`)
        }

        resultURL = resultURL.replace(match[0], val as string)
    })

    return resultURL
}

const TableBody = <T, >(props: TableBodyProps<T>) => {
    return (
        <tbody className="table-group-divider">
        {props.tableData.map((row, index) => {
            return (
                <tr key={index}>
                    {props.columns.map(({accessor, displayFunc, display, link}, index) => {
                        if (display === false) return
                        const cellData = row[accessor]?.toString()
                        return (
                            <td key={index}>
                                {displayFunc
                                    ? displayFunc(row)
                                    : link
                                        ? <Link to={convertURL(link, row)}
                                                className="link-dark">{cellData ? cellData : "——"}</Link>
                                        : cellData ? cellData : "——"
                                }
                            </td>
                        )
                    })}
                </tr>
            );
        })}
        </tbody>
    );
};

export default TableBody;