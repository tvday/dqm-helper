export interface Searcher<T> {
    accessors: Array<keyof T>
    value: string
}

export const tableSearch = <T>(obj: T, searcher: Searcher<T>) => {
    if (searcher.value === '') {
        return true;
    }

    return searcher.accessors.some((accessor) => {
        return obj[accessor]?.toString().toLocaleLowerCase('en')
            .includes(searcher.value.toLocaleLowerCase('en'));
    });
};