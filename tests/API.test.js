import "@testing-library/jest-dom";

async function withFetch() {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        ids: "bitcoin",
        order: "market_cap_desc",
        sparkline: false,
      },
    }
  );
  return response.json();
}

describe("Test the fetch of a ticker", () => {
  test("Make sure we get the data", async () => {
    const res = await withFetch();
    expect(res.statusCode).toBe(200);
  });

  test("Make sure we get the symbol", async () => {
    const res = await withFetch();
    expect(res.data.symbol).toBe("btc");
  });
});
