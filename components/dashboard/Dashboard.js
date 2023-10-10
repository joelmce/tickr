"use client"
import GridLayout from "react-grid-layout";
import Creator from "./Creator";
import Ticker from "./ticker/Ticker";
import TickerChart from "./ticker/TickerChart";
import { generateStockData } from "@/app/generateMockStockData";

export default function Dashboard({ id }) {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 1 },
        { i: "b", x: 1, y: 1, w: 1, h: 1 },
        { i: "c", x: 2, y: 2, w: 1, h: 1 },
    ]

    const stockData = generateStockData()
    return (
        <>
            <Creator creator={"joel"} />

            <GridLayout
            cols={6}
            rowHeight={30}
            width={1200}>
                <div key="a" data-grid={layout[0]}>
                    <Ticker ticker={"Etheruem (ETH)"} price={"3,131.2"} diff={"3.31"} volume={"2.742b"}>
                        <TickerChart data={stockData} />
                    </Ticker>
                </div>
                <div key="b" data-grid={layout[1]}>
                    <Ticker key="b" ticker={"Bitcoin (BTC)"} price={"17,203.7"} diff={"-14"} volume={"6.412b"}>
                        <TickerChart data={stockData} />
                    </Ticker>
                </div>
                <div key="c" data-grid={layout[2]}>
                    <Ticker key="c"  ticker={"Dogecoin (DOGE)"} price={"0.00031"} diff={"11.3"} volume={"104.2m"}>
                        <TickerChart data={stockData} />
                    </Ticker>
                </div>
            </GridLayout>
      </>
    )
}