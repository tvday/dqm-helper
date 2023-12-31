import {FilterGroup as FGData} from "./Table";

interface FilterGroupProps<T> {
    data: FGData<T>
    onFilterChange: (accessor: keyof T, value: string, checked: boolean) => void
}

interface TableFiltersProps<T> {
    filters: FGData<T>[]
    onFilterChange: (accessor: keyof T, value: string, checked: boolean) => void
}


const FilterGroup = <T, >(props: FilterGroupProps<T>) => {
    const {title, accessor, values, labels} = props.data

    return (
        <>
            <div>{title}</div>
            <div className="btn-toolbar">
                {values.map((value, index) => {
                    return <div key={index}>
                        <input
                            type='checkbox'
                            className='btn-check'
                            id={'btn-check-' + title + '-' + index}
                            autoComplete='off'
                            onChange={(event) => {
                                props.onFilterChange(accessor, value, event.target.checked)
                            }}
                        />
                        <label
                            className="btn btn-primary"
                            htmlFor={'btn-check-' + title + '-' + index}
                        >
                            {labels[index]}
                        </label>
                    </div>;
                })}
            </div>
        </>
    );
};

const TableFilters = <T, >(props: TableFiltersProps<T>) => {

    return (
        <>
            <div className="h5">Filters</div>
            {props.filters.map((filter, index) => {
                return <FilterGroup key={index} data={filter} onFilterChange={props.onFilterChange}/>
            })}
        </>
    )
};

export default TableFilters