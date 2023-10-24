"use client";
import { useState, useEffect } from "react";
import { fetchTopCoins } from "@/utils/fetchcoins.js";

export default function Assets() {
  const [coinPrices, setCoinPrices] = useState({});
  const [selectedTicker, setSelectedTicker] = useState(null);

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
          {topCoins.map(([ticker, coinData], index) => {
            return (
              <div
                className="asset-ticker shadow-md first-of-type:rounded-tl first-of-type:rounded-tr last-of-type:rounded-bl last-of-type:rounded-br cursor-pointer opacity-80"
                key={index}
                onClick={() => setSelectedTicker(coinData)}
              >
                <p className="ticker-name">{coinData.name}</p>
                <p className="ticker-price">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(coinData.current_price)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="asset-col">
          <p className="asset-data-title">Charts, Volume, and More Data</p>

          {selectedTicker && (
            <div className="ticker-details text-lrg mx-2 p-2">
              <div className="coinImg w-10 h-10 my-3">
                <img src={selectedTicker.img} />
              </div>
              <p>
                <strong>Name:</strong> {selectedTicker.name}
              </p>
              <p>
                <strong>Price:</strong> {selectedTicker.current_price}
              </p>
              <p>
                <strong>24Hr:</strong>{" "}
                {selectedTicker.price_change_percentage_24h.toFixed(1)}%
              </p>
              <p>
                <strong>Marketcap:</strong> {selectedTicker.market_cap}
              </p>
              <p>
                <strong>Total Vol:</strong>
                {" $"}
                {selectedTicker.total_volume}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
