 // Generate a random number between min and max
 const getRandomPrice = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  // Generate a month's worth of sample stock data
  export const generateStockData = () => {
    const startDate = new Date(); // Current date
    const endDate = new Date();
    endDate.setDate(startDate.getDate() - 30); // 30 days ago

    const stockData = [];

    for (
      let date = startDate;
      date > endDate;
      date.setDate(date.getDate() - 1)
    ) {
      const formattedDate = date.toISOString().split("T")[0];
      const price = parseFloat(getRandomPrice(50, 200)); // Generating random prices between 50 and 200
      stockData.push({ date: formattedDate, price: price });
    }

    return stockData.reverse(); // Reverse the array to have the data in chronological order
  };