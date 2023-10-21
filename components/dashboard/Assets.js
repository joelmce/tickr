"use client";
import { useState, useEffect } from "react";
import { fetchTopCoins } from "@/utils/fetchcoins.js";

export default function Assets() {
  const [coinPrices, setCoinPrices] = useState({});

  useEffect(() => {
    fetchTopCoins().then((prices) => {
      setCoinPrices(prices);
    });
  }, []);

  const topCoins = Object.entries(coinPrices);

  return (
    <>
      <h1 className="pl-1 mb-2 font-bold text-xl">Assets</h1>
      <div className="asset-container flex shadow-md rounded">
        <div className="asset-col">
          <p className="asset-title">Top 10 Cryptocurrencies by Marketcap</p>
          {topCoins.map(([ticker, price], index) => {
            return (
              <div
                className="asset-ticker shadow-md first-of-type:rounded-tl first-of-type:rounded-tr last-of-type:rounded-bl last-of-type:rounded-br cursor-pointer opacity-80"
                key={index}
              >
                <p className="ticker-name">{ticker}</p>
                <p className="ticker-price">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(price)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="asset-col">
          <p className="asset-data-title">Charts, Volume, and More Data</p>
        </div>
      </div>
    </>
  );
}
