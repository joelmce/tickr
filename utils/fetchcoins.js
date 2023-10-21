const axios = require("axios");

async function fetchTopCoins() {
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

  const fetchedPrices = {};
  response.data
    .filter(
      (coin) => !["steth", "usdt", "usdc", "tusd", "dai"].includes(coin.symbol),
    )
    .slice(0, 10)
    .forEach((coin) => {
      fetchedPrices[coin.symbol] = coin.current_price;
    });

  return fetchedPrices;
}

export { fetchTopCoins };
