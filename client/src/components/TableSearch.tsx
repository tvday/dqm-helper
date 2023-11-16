import _debounce from 'lodash/debounce'
import React, {useCallback, useRef, useState} from "react";

interface TableSearchProps<T> {
    onSearchChange: (query: string) => void
}

const TableSearch = <T, >(props: TableSearchProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSearchChange = useCallback(
        _debounce(
            props.onSearchChange,
            250,
            {leading: true, maxWait: 1000}
        ), []);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
            handleSearchChange('')
        }
    };

    return (
        <>
            <div className="d-flex" role="search">
                <input className="form-control me-2"
                       type="search"
                       placeholder="Search by keyword ..."
                       ref={inputRef}
                       onChange={(event) => handleSearchChange(event.target.value)}/>
                <button className="btn btn-outline-danger"
                        type="reset"
                        onClick={handleClick}
                >
                    Clear
                </button>
            </div>
        </>

    );
};

export default TableSearch