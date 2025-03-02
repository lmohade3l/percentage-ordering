"use client"
import useSWR from "swr"

export default function Markets() {
    const fetcher = (...args: [string, RequestInit?]) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR("https://api.bitpin.ir/v1/mkt/markets/", fetcher)
    
    console.log({ data })
    
    return (
        <div>
            صفحه بازارها
        </div>
    )
}