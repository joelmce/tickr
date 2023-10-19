"use client";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function TickerChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        data: data.map((item) => item.price),
        fill: true,
        borderColor: "rgba(48, 190, 42, 0.8)",
        backgroundColor: "rgba(12, 48, 10, 0.2)", // Dyamamic
        lineTension: 0.1,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    height: 2,
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

  return <Line data={chartData} options={chartOptions} />;
}
