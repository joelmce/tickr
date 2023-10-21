"use client";

import { useState } from "react";

const fetchCoinData = async (ticker) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function SearchForTicker() {
  const [search, updateSearch] = useState("");
  const [searchResults, updateSearchResults] = useState([]);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    updateSearch(term);

    if (term.trim() === "") {
      updateSearchResults([]);
    } else {
      const data = await fetchCoinData(term);
      updateSearchResults(data || []);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by ticker..."
        value={search}
        onChange={handleSearchChange}
      />
      <ul>
        {searchResults.map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol.toUpperCase()}) - ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
}
