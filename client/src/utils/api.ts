// export const APIBase = 'http://localhost:8080/api/v1'
import React from "react";

export const APIBase = 'http://10.00.54:8080/api/v1' // for testing on mobile devices

export const IconsAPI = 'http://10.00.54:8080/icons'


/**
 * Fetch data from the API and update state using the given functions.
 * @template T
 * @template D
 * @param route {string} route to API endpoint
 * @param defaultVal {D} value to be used if data is not retrieved
 * @param setData {React.Dispatch<React.SetStateAction<T | D>>} function to set data
 * @param setLoading {React.Dispatch<React.SetStateAction<boolean>>} function to set loading
 * @param setError {React.Dispatch<React.SetStateAction<string | null>>} function to set errors
 */
export const fetchSetData = <T, D>(route: string, defaultVal: D,
                                   setData: React.Dispatch<React.SetStateAction<T | D>>,
                                   setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
                                   setError?: React.Dispatch<React.SetStateAction<string | null>>) => {

    fetch(APIBase + route)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            return response.json();
        })
        .then((resData) => {
            setData(resData);
            setError && setError(null);
        })
        .catch((err) => {
            console.log(err.message);
            setError && setError(err.message);
            setData(defaultVal);
        })
        .finally(() => {
            setLoading && setLoading(false);
        });
}

/**
 * Fetch data from the API and update state using the given functions.
 * @template T
 * @template D
 * @param route {string} route to API endpoint
 * @param defaultVal {D} value to be used if data is not retrieved
 * @param setData {React.Dispatch<React.SetStateAction<T | D>>} function to set data
 * @param setLoading {React.Dispatch<React.SetStateAction<boolean>>} function to set loading
 * @param setError {React.Dispatch<React.SetStateAction<string | null>>} function to set errors
 */
export const fetchData = async (route: string) => {
    return fetch(APIBase + route)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            return response.json();
        })
}
