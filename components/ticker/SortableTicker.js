import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Ticker from "./Ticker";
import TickerChart from "./TickerChart";

export function SortableTicker({ ticker, tickerData, livePrice }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: tickerData.name})

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
            tickerData.price_change_percentage_24h.toFixed(2) > 0
                ? "to-green-900 border-[#164914]"
                : "to-red-900 border-red-900"
            }`}
        >
            <Ticker
                ticker={tickerData.name}
                price={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(livePrice)}
                diff={tickerData.price_change_percentage_24h.toFixed(2)}
                volume={new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tickerData.total_volume)}
              >
                <TickerChart
                  ticker={`${ticker.toUpperCase()}USDT`}
                  bias={tickerData.price_change_percentage_24h.toFixed(2)}
                />
              </Ticker>


        </div>
    )
}