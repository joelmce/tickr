import { prices } from "@/utils/socket";

export default function handler(req, res) {
  const coin = req.query.coin;

  if (coin) {
    const coinPrice = prices[coin.toUpperCase()];
    if (coinPrice) {
      res.status(200).json({ coin, price: coinPrice });
    } else {
      res.status(404).json({ error: "Coin not found" });
    }
  } else {
    res.status(200).json(prices);
  }
}
