
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import Ticker from "./Ticker";
import TickerChart from "./TickerChart";

export default function SortableTest({ ticker }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: ticker.id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`rounded border p-4 bg-gradient-to-b from-[#0d0c0b] shadow-md opacity-80 cursor-pointer ${
                ticker.price_change_percentage_24h.toFixed(2) > 0
                    ? "to-green-900 border-[#164914]"
                    : "to-red-900 border-red-900"
                }`}
        >
            <Ticker ticker={ticker.name} price={ticker.current_price} diff={ticker.price_change_percentage_24h} volume={ticker.total_volume}>
                <TickerChart ticker={`BTCUSDT`} bias={ticker.price_change_percentage_24h.toFixed(2)}/>
            </Ticker>

        </div>
    )
}