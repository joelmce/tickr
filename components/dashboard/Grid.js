export default function Grid({ children, columns  }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 30,
      }}
      {children}
    ></div>
  );
}
