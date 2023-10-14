import { generateStockData } from "@/app/generateMockStockData";

export default function Assets() {
  const stockData = generateStockData().slice(0, 20);

  return (
    <>
      <h1 className="pl-1 mb-2 font-bold text-xl">Assets</h1>
      <div className="asset-container flex shadow-md rounded">
        <div className="asset-col">
          <p className="asset-title">Top 20 Cryptocurrencies by Marketcap</p>
          {stockData.map((stock, index) => {
            return (
              <div
                className="asset-ticker shadow-md first-of-type:rounded-tl first-of-type:rounded-tr last-of-type:rounded-bl last-of-type:rounded-br cursor-pointer opacity-80"
                key={index}
              >
                <p className="ticker-name">ETH</p>
                <p className="ticker-price">${stock.price}</p>
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
