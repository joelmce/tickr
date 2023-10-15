"use client";
import ResponsiveGridLayout from "react-grid-layout";
import Creator from "./Creator";
import Ticker from "../ticker/Ticker";
import TickerChart from "../ticker/TickerChart";
import { generateStockData } from "@/app/generateMockStockData";
import { useState } from "react";

export default function Dashboard({ metadata }) {
  const originalLayout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 1, y: 0, w: 1, h: 1 },
    { i: "c", x: 2, y: 0, w: 1, h: 1 },
    { i: "d", x: 3, y: 0, w: 1, h: 1 },
    { i: "e", x: 4, y: 0, w: 1, h: 1 },
    { i: "f", x: 5, y: 0, w: 1, h: 1 },
    { i: "g", x: 6, y: 0, w: 1, h: 1 },
  ];

  const [layout, setLayout] = useState(originalLayout);

  const stockData = generateStockData();
  return (
    <>
      <div className="mx-6">
        <h1 className="pl-1 mb-2 font-bold text-xl">Dashboard</h1>
        <Creator creator={metadata.creator} />
      </div>

      <ResponsiveGridLayout
        cols={3}
        layout={layout}
        compactType="horizontal"
        maxRows={4}
        rowHeight={284}
        margin={[25, 25]}
        width={1100}
        isBounded={true}
        isDroppable={true}
        onLayoutChange={(_layout) => setLayout(_layout)}
      >
        <div
          key="a"
          className="rounded border border-[#164914] w-fit p-4 bg-[#0E300D] shadow-md opacity-80 cursor-pointer"
        >
          <Ticker
            ticker={"Etheruem (ETH)"}
            price={"3,131.2"}
            diff={"3.31"}
            volume={"2.742b"}
          >
            <TickerChart data={stockData} />
          </Ticker>
        </div>
        <div
          key="b"
          className="rounded border border-[#164914] w-fit p-4 bg-[#0E300D] shadow-md opacity-80 cursor-pointer"
        >
          <Ticker
            ticker={"Bitcoin (BTC)"}
            price={"17,203.7"}
            diff={"-14"}
            volume={"6.412b"}
          >
            <TickerChart data={stockData} />
          </Ticker>
        </div>
        <div
          key="c"
          className="rounded border border-[#164914] w-fit p-4 bg-[#0E300D] shadow-md opacity-80 cursor-pointer"
        >
          <Ticker
            ticker={"Dogecoin (DOGE)"}
            price={"0.00031"}
            diff={"11.3"}
            volume={"104.2m"}
          >
            <TickerChart data={stockData} />
          </Ticker>
        </div>
        <div
          key="d"
          className="rounded border border-[#164914] w-fit p-4 bg-[#0E300D] shadow-md opacity-80 cursor-pointer"
        >
          <Ticker
            ticker={"Dogecoin (DOGE)"}
            price={"0.00031"}
            diff={"11.3"}
            volume={"104.2m"}
          >
            <TickerChart data={stockData} />
          </Ticker>
        </div>
        <div
          key="e"
          className="rounded border border-[#164914] w-fit p-4 bg-[#0E300D] shadow-md opacity-80 cursor-pointer"
        >
          <Ticker
            ticker={"Dogecoin (DOGE)"}
            price={"0.00031"}
            diff={"11.3"}
            volume={"104.2m"}
          >
            <TickerChart data={stockData} />
          </Ticker>
        </div>
        <div
          key="f"
          className="rounded border border-[#164914] w-fit p-4 bg-[#0E300D] shadow-md opacity-80 cursor-pointer"
        >
          <Ticker
            ticker={"Dogecoin (DOGE)"}
            price={"0.00031"}
            diff={"11.3"}
            volume={"104.2m"}
          >
            <TickerChart data={stockData} />
          </Ticker>
        </div>
        <div
          key="g"
          className="rounded border border-[#164914] w-fit p-4 bg-[#0E300D] shadow-md opacity-80 cursor-pointer"
        >
          <Ticker
            ticker={"Dogecoin (DOGE)"}
            price={"0.00031"}
            diff={"11.3"}
            volume={"104.2m"}
          >
            <TickerChart data={stockData} />
          </Ticker>
        </div>
      </ResponsiveGridLayout>
    </>
  );
}
