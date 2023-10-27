const { fetchTopCoins } = require("@/utils/fetchcoins.js");
import { EventEmitter } from "events";

let prices = {};
const priceEmitter = new EventEmitter();
const sockets = [];

async function setupWebSocketConnections() {
  try {
    // fetch top coins by marketcap
    const fetchedPrices = await fetchTopCoins();
    const top10Coins = Object.keys(fetchedPrices);

    // open WS connection for each coin
    top10Coins.forEach((coin) => {
      const endpoint = `wss://stream.binance.com:9443/ws/${coin.toLowerCase()}usdt@ticker`;
      const socket = new WebSocket(endpoint);
      sockets.push(socket);

      // update price object on price change
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data && data.c && !isNaN(data.c)) {
          prices[coin] = { current_price: data.c };
          priceEmitter.emit("pricesUpdated", prices);
        }
      };

      socket.onerror = (error) => {
        console.error(`WebSocket error for coin ${coin}:`, error);
      };

      socket.onclose = (event) => {
        console.warn(
          `WebSocket closed for coin ${coin}. Attempting to reconnect...`,
        );
        setTimeout(() => setupWebSocketForCoin(coin), 5000);
      };
    });
  } catch (error) {
    console.error(error);
  }
}

setupWebSocketConnections();

export { prices, priceEmitter };
