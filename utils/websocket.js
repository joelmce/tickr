const axios = require("axios");
const WebSocket = require("ws");

let prices = {};

async function setupWebSocketConnections() {
  try {
    // fetch top coins by marketcap
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          sparkline: false,
          market_dominance: false,
          percent_change: false,
        },
      },
    );

    // filter out whatever coins you don't want included
    const top10Coins = response.data
      .filter((coin) => !["steth", "usdt", "usdc"].includes(coin.id))
      .slice(0, 10);

    // open WS connection for each coin
    top10Coins.forEach((coin) => {
      const endpoint = `wss://stream.binance.com:9443/ws/${coin.symbol.toLowerCase()}usdt@ticker`;
      const socket = new WebSocket(endpoint);

      // update price object on price change
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        prices[coin.symbol] = data.c;
        console.log(`${coin.symbol}: ${data.c}`);
      };

      socket.onerror = (error) => {
        console.error(`WebSocket error for coin ${coin.id}:`, error);
      };

      socket.onclose = (event) => {
        console.warn(
          `WebSocket closed for coin ${coin.id}. Attempting to reconnect...`,
        );
        setTimeout(() => {
          setupWebSocketConnections();
        }, 5000);
      };
    });
  } catch (error) {
    console.error(error);
  }
}
setupWebSocketConnections();

export { prices };
