"use client";
import ResponsiveGridLayout from "react-grid-layout";
import Creator from "./Creator";
import Ticker from "../ticker/Ticker";
import TickerChart from "../ticker/TickerChart";
import { generateStockData } from "@/app/generateMockStockData";
import { useEffect, useState } from "react";
import AddToFavourite from "./AddToFavourite";
import { fetchTopCoins } from "@/utils/fetchcoins";
import { priceEmitter } from "@/utils/websocket.js";
import { setupWebSocketConnections } from "@/utils/websocket.js";

setupWebSocketConnections();

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

  useEffect(() => {
    function handlePriceUpdate(updatedPrices) {
      setCoinPrices((prevPrices) => ({
        ...prevPrices,
        ...updatedPrices,
      }));
    }

    priceEmitter.on("pricesUpdated", handlePriceUpdate);

    return () => {
      priceEmitter.removeListener("pricesUpdated", handlePriceUpdate);
    };
  }, []);

  useEffect(() => {
    console.log("Coin Prices Updated:", coinPrices);
  }, [coinPrices]);

  const topCoins = Object.entries(coinPrices);

  const stockData = generateStockData();

  return (
    <>
      <div className="mx-6">
        <h1 className="pl-1 mb-2 font-bold text-xl">{metadata.name}</h1>
        <p className="my-4">{metadata.description}</p>
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
              className="rounded border border-[#164914] p-4 bg-gradient-to-b from-black to-green-700 shadow-md opacity-80 cursor-pointer"
              data-grid={layoutItem}
            >
              <Ticker
                ticker={name}
                price={coinPrices[ticker].current_price}
                diff={price_change_percentage_24h}
                volume={total_volume}
              >
                <TickerChart data={stockData} />
              </Ticker>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </>
  );
}
