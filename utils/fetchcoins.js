const axios = require("axios");

async function fetchCoins(tickers) {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        ids: tickers.join(","),
        order: "market_cap_desc",
        sparkline: false,
      },
    },
  );

  const fetchedPrices = [];
  response.data.forEach((coin, index) => {
    fetchedPrices.push({
      id: index + 1,
      market_cap: coin.market_cap,
      img: coin.image,
      name: coin.name,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      total_volume: coin.total_volume
    })
  })

  console.log("fetched ALL coins");
  return fetchedPrices;
}

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
    .slice(0, 20)
    .forEach((coin) => {
      fetchedPrices[coin.symbol] = {
        market_cap: coin.market_cap,
        img: coin.image,
        name: coin.name,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        total_volume: coin.total_volume,
      };
    });
  console.log("fetched ALL coins");
  return fetchedPrices;
}

// async function fetchCoins(ticker) {
//   console.log(ticker)
//   try {
//     const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ticker}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true`);
//     const coin = response.data;
//     console.log(coin);

//     const coinData = {
//       price: coin[0].usd,
//       vol: coin.usd_24h_vol,
//       diff: coin.usd_24h_change
//     }

//     console.log(coinData)

//     return coinData;
//   } catch (error) {
//     console.error("error fetching coin")
//     throw error;
//   }
// }

export { fetchTopCoins, fetchCoins };
