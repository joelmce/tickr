"use client";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

export default function TickerChart({ ticker }) {
  const [historicalData, setHistoricalData] = useState([]);

  const fetchData = async () => {
    try {
      const interval = "1h";

      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${ticker}&interval=${interval}`
      );
      const data = await response.json();

      setHistoricalData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    const updateInterval = setInterval(() => {
      fetchData();
    }, 60000); // 60 minutes

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  const chartData = {
    labels: historicalData.map((candle) =>
      new Date(candle[0]).toLocaleTimeString()
    ),
    datasets: [
      {
        data: historicalData.map((candle) => parseFloat(candle[4])),
        borderColor: "rgba(48, 190, 42, 0.8)",
        backgroundColor: "rgba(12, 48, 10, 0.2)", // Dyamamic
        lineTension: 0.1,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div className="h-16">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
