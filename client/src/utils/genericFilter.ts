export interface Filter<T> {
    accessor: keyof T
    values: any[]
}

export const genericFilter = <T>(obj: T, filters: Filter<T>[]) => {
    return filters.every((filter) => {
        return filter.values.length == 0 ||
            filter.values.some((value) => {
                return obj[filter.accessor] === value
            })
    })
}
