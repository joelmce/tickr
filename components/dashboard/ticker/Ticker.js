export default function Ticker({ ticker, children, price, diff, volume }) {
  return (
    <div className="rounded border border-[#164914] w-fit p-4 bg-[#0E300D] shadow-md opacity-80 ">
      <span className="text-xl font-bold">{ticker}</span>
      <div>
        <p className="">{price}</p>
        <p className="text-green-500" 
        style={{
          color: diff < 0 ? 'red' : 'green'
        }}>{diff}%</p>
      </div>

      {children}
      <p>{volume} vol</p>
    </div>
  );
}
