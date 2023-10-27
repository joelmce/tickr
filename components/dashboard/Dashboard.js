"use client";
import { useEffect, useState } from "react";
import { fetchCoins, fetchTopCoins } from "@/utils/fetchcoins";
import { priceEmitter } from "@/utils/socket.js";
import { DashboardHeader } from "./DashboardHeader";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTest from "../ticker/SortableTest";

const Grid = ({ columns, children}) => {
  return (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridGap: 10,
            maxWidth: '1000px',
            margin: '100px auto',
            justifyContent: 'center'
        }}
    >
        {children}
    </div>
);
}


export default function Dashboard({ metadata, user }) {
  const [items, setItems] = useState([])
  const [finalItems, setFinalItems] = useState([]);
  const [coinPrices, setCoinPrices] = useState({});
  const [livePrices, setLivePrices] = useState({});


  useEffect(() => {
    const arr = ['bitcoin', 'solana', 'cardano', 'doge', 'ethereum', 'litecoin']
    fetchCoins(arr).then((data) => {
      setItems(data)
    })
    // fetchTopCoins().then((initialPrices) => {  
    //   const filteredPrices = Object.keys(initialPrices)
    //   .filter(ticker => chosenTickers.includes(ticker))
    //   .reduce((acc, curr) => {
    //     acc[curr] = initialPrices[curr];
    //     return acc;
    //   }, {});
    //   console.log(filteredPrices)
    //   setFinalItems(filteredPrices);
    //   setCoinPrices(initialPrices);
    //   setLivePrices(initialPrices);
    // });

    const handlePricesUpdate = (updatedPrices) => {
      setLivePrices((prevPrices) => ({ ...prevPrices, ...updatedPrices }));
    };

    priceEmitter.on("pricesUpdated", handlePricesUpdate);

    return () => {
      priceEmitter.removeListener("pricesUpdated", handlePricesUpdate);
    };
  }, []);

  const onDragEnd = (event) => {
    const { active, over } = event
    console.log(event)

    if (active.id === over.id) {
      return;
    }

    setItems((items) => {
      console.log("Stored Items:", items)
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      console.log(oldIndex, newIndex)
      return arrayMove(items, oldIndex, newIndex);
    });

  }

  return (
    <>
      <div className="mx-6">
        <DashboardHeader user={user} metadata={metadata}/>
      </div>

      <div className="">
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={items} >
           <Grid columns={5}>
            {items.map((item) => {
                return <SortableTest key={item.id} ticker={item}/>
            })}
           </Grid>
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}
