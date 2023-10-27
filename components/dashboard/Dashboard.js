"use client";
import ResponsiveGridLayout from "react-grid-layout";
import Ticker from "../ticker/Ticker";
import TickerChart from "../ticker/TickerChart";
import { useEffect, useState } from "react";
import AddToFavourite from "./AddToFavourite";
import { fetchTopCoins } from "@/utils/fetchcoins";
import { CircularProgress } from "@mui/joy";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { priceEmitter } from "@/utils/socket.js";
import { ModeEdit } from "@mui/icons-material";
import { DashboardHeader } from "./DashboardHeader";

export default function Dashboard({ metadata }) {
  const originalLayout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 1, y: 0, w: 1, h: 1 },
    { i: "c", x: 2, y: 0, w: 1, h: 1 },
    { i: "d", x: 3, y: 0, w: 1, h: 1 },
    { i: "e", x: 4, y: 0, w: 1, h: 1 },
    { i: "f", x: 5, y: 0, w: 1, h: 1 },
    { i: "g", x: 6, y: 0, w: 1, h: 1 },
  ];

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState(originalLayout);
  const [data, updateData] = useState(metadata)
  const [coinPrices, setCoinPrices] = useState({});
  const [livePrices, setLivePrices] = useState({});
  const supabase = createClientComponentClient();

  const saveLayout = async (l) => {

    setLayout(l);
    const { error } = await supabase
      .from("Dashboards")
      .update({ layout: l })
      .eq("dashboard_id", metadata.dashboard_id);

    if (error) console.error(error);
  };


  const updateEditState = async(e) => {
    e.preventDefault();
    if(editMode) {
      setLoading(true)
      const { error } = await supabase.from("Dashboards").update({ description: data.description }).eq('dashboard_id', metadata.dashboard_id)
      if(error) console.error(error)
      setLoading(false)
    }
    setEditMode(!editMode);
  };

  const updateMetadata = (e) => {
    const { name, value } = e.target

    updateData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  useEffect(() => {
    const handlePricesUpdate = (updatedPrices) => {
      setLivePrices((prevPrices) => ({ ...prevPrices, ...updatedPrices }));
    };

    priceEmitter.on("pricesUpdated", handlePricesUpdate);

    return () => {
      priceEmitter.removeListener("pricesUpdated", handlePricesUpdate);
    };
  }, []);
  
  useEffect(() => {
    fetchTopCoins().then((initialPrices) => {  
      setCoinPrices(initialPrices);
      setLivePrices(initialPrices);
    });
  }, []);

  const topCoins = Object.entries(coinPrices);

  return (
    <>
      <div className="mx-6">
        <DashboardHeader metadata={metadata}/>
      </div>

      <ResponsiveGridLayout
        cols={4}
        layout={layout}
        compactType="horizontal"
        maxRows={4}
        rowHeight={175}
        margin={[25, 25]}
        width={1100}
        isBounded={true}
        isDroppable={true}
        onLayoutChange={(_layout) => saveLayout(_layout)}
      >
        {topCoins.map(([ticker, coinData], index) => {
          const layoutItem = originalLayout[index];
          if (!layoutItem) return null;

          const { name, price_change_percentage_24h, total_volume } = coinData;
          
          const livePriceValue = livePrices[ticker].current_price;


          return (
            <div
              key={layoutItem.i}
              className={`rounded border p-4 bg-gradient-to-b from-[#0d0c0b] shadow-md opacity-80 cursor-pointer ${
                price_change_percentage_24h.toFixed(2) > 0
                  ? "to-green-900 border-[#164914]"
                  : "to-red-900 border-red-900"
              }`}
              data-grid={layoutItem}
            >
              <Ticker
                ticker={name}
                price={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(livePriceValue)}
                diff={price_change_percentage_24h.toFixed(2)}
                volume={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(total_volume)}
              >
                <TickerChart
                  ticker={`${ticker.toUpperCase()}USDT`}
                  bias={price_change_percentage_24h.toFixed(2)}
                />
              </Ticker>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </>
  );
}
