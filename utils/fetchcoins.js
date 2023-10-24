const axios = require("axios");

async function fetchTopCoins() {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        sparkline: false,
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
      fetchedPrices[coin.symbol] = {
        name: coin.name,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        total_volume: coin.total_volume,
      };
    });

  return fetchedPrices;
}

export { fetchTopCoins };
