import Ticker from "@/components/ticker/Ticker";
import TickerChart from "@/components/ticker/TickerChart";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen mx-auto">
        <div>
          <h1 className="text-7xl font-extrabold text-green-400">
            Be first to the market.
          </h1>
          <p className="text-xl font-extrabold">
            $ Customise your view, share it, then trade with it.
          </p>
        </div>
        <section className="flex gap-10 mt-10">
          <div className="rounded border p-4 bg-gradient-to-b from-[#0d0c0b] to-slate-900 border-[#164914] shadow-md opacity-80 cursor-pointer">
            <Ticker
              ticker="Bitcoin"
              diff={"+5.2%"}
              price={"$33,020"}
              volume={"$22,320,331.00"}
            >
              <TickerChart ticker="BTCUSDT" bias="+5.2" />
            </Ticker>
          </div>
          <div className="rounded border p-4 bg-gradient-to-b from-[#0d0c0b] to-slate-900 border-[#164914] shadow-md opacity-80 cursor-pointer">
            <Ticker
              ticker="Solana"
              diff={"+4.33"}
              price={"$25.45"}
              volume="$9,001,322.00"
            >
              <TickerChart ticker="SOLUSDT" bias="+4.33" />
            </Ticker>
          </div>
        </section>
      </main>
    </>
  );
}
