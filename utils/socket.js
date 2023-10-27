const { fetchTopCoins } = require("@/utils/fetchcoins.js");
import { EventEmitter } from "events";

let prices = {};
let tempPrices = {};
let priceDiff = [];

const priceEmitter = new EventEmitter();

function calculatePriceDiff(oldPrices, newPrices) {
  return Object.entries(oldPrices).reduce((acc, [ticker, { current_price }]) => {
    const oldPrice = parseFloat(current_price);
    const newPrice = parseFloat(newPrices[ticker].current_price);
    const percentageDifference = ((newPrice - oldPrice) / oldPrice) * 100;
    
    acc[ticker] = percentageDifference.toFixed(2) + '%';
    
    return acc;
  }, {});
}

export default async function setupWebSocketConnections() {
  try {
    const fetchedPrices = await fetchTopCoins();
    const top10Coins = Object.keys(fetchedPrices);

    top10Coins.forEach((coin) => {
      const endpoint = `wss://stream.binance.com:9443/ws/${coin.toLowerCase()}usdt@ticker`;
      const socket = new WebSocket(endpoint);
      console.log("new socket opened");

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.c && !isNaN(data.c)) {
          tempPrices[coin] = { current_price: data.c };
        }
      };

      socket.onerror = (error) => {
        console.error(`WebSocket error for coin ${coin}:`, error);
      };

      socket.onclose = (event) => {
        console.warn(
          `WebSocket closed for coin ${coin}. Attempting to reconnect...`,
        );
      };
    });

    setInterval(() => {
      console.log(calculatePriceDiff(prices, tempPrices));
      prices = { ...tempPrices };
      priceDiff.push(prices, tempPrices);
      priceEmitter.emit("pricesUpdated", prices);
    }, 60000);

  } catch (error) {
    console.error(error);
  }
}

setupWebSocketConnections()

export { prices, priceEmitter };
