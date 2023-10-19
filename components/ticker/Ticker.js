export default function Ticker({ ticker, children, price, diff, volume }) {
  return (
    <>
      <span className="font-bold">{ticker}</span>
      <div>
        <p className="text-xs">{price}</p>
        <p className="text-xs font-bold" 
        style={{
          color: diff < 0 ? 'red' : 'green'
        }}>{diff}%</p>
      </div>

      {children}
      <p>{volume} vol</p>
    </>
  );
}
