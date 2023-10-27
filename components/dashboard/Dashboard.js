"use client";
import ResponsiveGridLayout from "react-grid-layout";
import Creator from "./Creator";
import Ticker from "../ticker/Ticker";
import TickerChart from "../ticker/TickerChart";
import { useEffect, useState } from "react";
import AddToFavourite from "./AddToFavourite";
import { fetchTopCoins } from "@/utils/fetchcoins";

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
  const [coinPrices, setCoinPrices] = useState({});

  useEffect(() => {
    fetchTopCoins().then((prices) => {
      setCoinPrices(prices);
    });
  }, []);

  const topCoins = Object.entries(coinPrices);

  return (
    <>
      <div className="mx-6">
        <h1 className="pl-1 mb-2 font-extrabold text-6xl">
          {metadata.name.toUpperCase()}
        </h1>
        <p className="my-4 text-xl">{metadata.description}</p>
        <Creator creator={metadata.creator} />
        <AddToFavourite />
      </div>

      <ResponsiveGridLayout
        cols={4}
        layout={layout}
        compactType="horizontal"
        maxRows={4}
        rowHeight={175}
        margin={[25, 25]}
        width={1100}
        isBounded={true}
        isDroppable={true}
        onLayoutChange={(_layout) => setLayout(_layout)}
      >
        {topCoins.map(([ticker, coinData], index) => {
          const layoutItem = originalLayout[index];
          if (!layoutItem) return null;

          const {
            name,
            current_price,
            price_change_percentage_24h,
            total_volume,
          } = coinData;

          return (
            <div
              key={layoutItem.i}
              className={`rounded border p-4 bg-gradient-to-b from-[#0d0c0b] shadow-md opacity-80 cursor-pointer ${
                price_change_percentage_24h.toFixed(2) > 0
                  ? "to-green-900 border-[#164914]"
                  : "to-red-900 border-red-900"
              }`}
              data-grid={layoutItem}
            >
              <Ticker
                ticker={name}
                price={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(current_price)}
                diff={price_change_percentage_24h.toFixed(2)}
                volume={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(total_volume)}
              >
                <TickerChart
                  ticker={`${ticker.toUpperCase()}USDT`}
                  bias={price_change_percentage_24h.toFixed(2)}
                />
              </Ticker>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </>
  );
}
