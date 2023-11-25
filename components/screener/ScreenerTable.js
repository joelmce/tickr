"use client"

import { useEffect, useState } from "react"

const tickers = ["BTC", "ETH", "XRP", "LTC", "ADA", "BNB", "DOT", "DOGE", "MATIC"]

export default function ScreenerTable() {
    const [tickerData, setTickerData] = useState([]);
    
    useEffect(() => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')

        socket.onopen = () => {
            console.log("Opened")
        }

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            // Filter data for specific tokens
            const filteredData = data.filter(item => tickers.includes(item.s.substr(0, item.s.length - 4)));
            setTickerData(filteredData)
        }

        socket.onclose = () => {
            console.log("Socket closed")
        }

        return () => {
            socket.close()
        }
    }, [])

    return (
        <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-4">Screener</h2>
            </div>
            <table className="w-3/4 mx-auto text-xs">
                <thead className="border-b border-green-500">
                    <tr>
                        <th className="py-1 text-center">Name</th>
                        <th className="py-1 text-center">Price</th>
                        <th className="py-1 text-center">Change (24h)</th>
                        <th className="py-1 text-center">Volume</th>
                        <th className="py-1 text-center">Open Interest</th>
                        <th className="py-1 text-center">Open Interest Change</th>
                        <th className="py-1 text-center">Open Interest Volume</th>
                        <th className="py-1 text-center">Market Cap</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-green-500">
                    {tickerData.map(ticker => {
                        return (
                            <tr key={ticker.s}>
                                <td className="py-1 text-center">{ticker.s}</td>
                                <td className="py-1 text-center">{ticker.c}</td>
                                <td className="py-1 text-center">{ticker.P}</td>
                                <td className="py-1 text-center text-green-400"></td>
                                <td className="py-1 text-center"></td>
                                <td className="py-1 text-center">$150M</td>
                                <td className="py-1 text-center text-green-400">+2.30%</td>
                                <td className="py-1 text-center">$120M</td>
                                <td className="py-1 text-center"></td>
                            </tr>
                        )
                    })}
                    {/* <
                    <tr>
                    <td className="py-1 text-center">Ethereum</td>
                    <td className="py-1 text-center">ETH</td>
                    <td className="py-1 text-center">$4,000</td>
                    <td className="py-1 text-center text-red-500">-1.23%</td>
                    <td className="py-1 text-center">$100M</td>
                    <td className="py-1 text-center">$80M</td>
                    <td className="py-1 text-center text-red-500">-0.75%</td>
                    <td className="py-1 text-center">$60M</td>
                    <td className="py-1 text-center">$400M</td>
                    </tr> */}
                </tbody>
            </table>
        </main>
    )
}