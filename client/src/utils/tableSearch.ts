export interface SearchParam<T> {
    accessor: keyof T
    searchFunc?: (obj: T[keyof T], value: string) => boolean
}

export interface Searcher<T> {
    value: string
    params: SearchParam<T>[]
}

export const tableSearch = <T>(obj: T, searcher: Searcher<T>) => {
    if (searcher.value === '') {
        return true;
    }

    return searcher.params.some(({accessor, searchFunc}) => {
        if (searchFunc !== undefined) {
            return searchFunc(obj[accessor], searcher.value)
        } else {
            return obj[accessor]?.toString().toLocaleLowerCase('en')
                .includes(searcher.value.toLocaleLowerCase('en'));
        }
    });
};