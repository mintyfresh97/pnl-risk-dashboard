// src/components/TradeCard.jsx
import React from "react";

export default function TradeCard({ size, leverage, entry, stop, target, asset }) {
  const capital = size * leverage;
  const breakeven = (entry + stop) / 2;
  const pnl = ((target - entry) * capital) / entry;
  const risk = ((entry - stop) * capital) / entry;
  const rr = Math.abs(pnl / risk);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
      <div className="flex items-center gap-2">
        <img src={`/icons/${asset}.png`} alt={asset} className="h-6 w-6" />
        <h2 className="text-lg font-semibold">{asset}</h2>
      </div>
      <div>Capital: ${capital.toFixed(2)}</div>
      <div>Breakeven: {breakeven.toFixed(4)}</div>
      <div>Risk: ${risk.toFixed(2)}</div>
      <div>Reward: ${pnl.toFixed(2)}</div>
      <div>R:R = {rr.toFixed(2)}:1</div>
    </div>
  );
}
