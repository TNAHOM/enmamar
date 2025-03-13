'use client'

import { useState, useEffect } from "react"

export function useFetchListData<T>({ url }: { url: string }) {
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const jsonData: T[] = await response.json()
                setData(jsonData)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    // console.log(data, "data from useFetchData")

    return { data, loading, error }
}


export function useFetchData<T>({ url }: { url: string }) {
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                // console.log(response, "response from useFetchData")
                // console.log(url, "url from useFetchData")
                const jsonData: T = await response.json()
                setData(jsonData)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    // console.log(data, "data from useFetchData")

    return { data, loading, error }
}