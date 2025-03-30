import React, { useState, useEffect } from "react";
import "../../index.css";
import TradeCard from "./TradeCard"; // <- Added this import

// Precision map based on asset
const precisionMap = {
  BTC: 5,
  ETH: 4,
  XRP: 3,
  ADA: 3,
  SOL: 5,
  LINK: 3,
  ONDO: 3,
  CRV: 3,
  CVX: 3,
  SUI: 3,
  FARTCOIN: 3,
};

export default function MyComponent() {
  const [asset, setAsset] = useState("BTC");
  const [position, setPosition] = useState(500);
  const [leverage, setLeverage] = useState(20);
  const [entry, setEntry] = useState(82000);
  const [stop, setStop] = useState(81000);
  const [target, setTarget] = useState(83000);
  const [livePrice, setLivePrice] = useState(null);

  const digits = precisionMap[asset] || 2;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${asset.toLowerCase()}&vs_currencies=usd`
        );
        const data = await res.json();
        const price = data[asset.toLowerCase()]?.usd;
        if (price) {
          setLivePrice(Number(price).toFixed(digits));
          setEntry(Number(price).toFixed(digits));
        }
      } catch {
        setLivePrice("N/A");
      }
    };
    fetchPrice();
  }, [asset]);

  const total = position * leverage;
  const risk = Math.abs(entry - stop) * total / entry;
  const reward = Math.abs(target - entry) * total / entry;
  const breakeven = ((Number(entry) + Number(stop)) / 2).toFixed(digits);

  const format = (val: number) => {
    const fixed = Number(val).toFixed(digits);
    return digits > 0 ? fixed : Math.floor(val).toString();
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-blue-600">PnL Calculator</h2>

      <div className="flex gap-2 flex-wrap">
        {Object.keys(precisionMap).map((a) => (
          <button
            key={a}
            onClick={() => setAsset(a)}
            className={`px-3 py-1 rounded-full ${asset === a ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label>
          Position (£)
          <input type="number" value={position} onChange={(e) => setPosition(+e.target.value)} className="w-full border rounded p-1" />
        </label>
        <label>
          Leverage
          <input type="number" value={leverage} onChange={(e) => setLeverage(+e.target.value)} className="w-full border rounded p-1" />
        </label>
        <label>
          Entry
          <input type="number" value={entry} onChange={(e) => setEntry(+e.target.value)} className="w-full border rounded p-1" />
        </label>
        <label>
          Stop Loss
          <input type="number" value={stop} onChange={(e) => setStop(+e.target.value)} className="w-full border rounded p-1" />
        </label>
        <label>
          Take Profit
          <input type="number" value={target} onChange={(e) => setTarget(+e.target.value)} className="w-full border rounded p-1" />
        </label>
      </div>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg text-sm space-y-1">
        <p><strong>Live Price:</strong> ${livePrice}</p>
        <p><strong>Total Exposure:</strong> £{total}</p>
        <p><strong>Risk:</strong> £{risk.toFixed(2)}</p>
        <p><strong>Reward:</strong> £{reward.toFixed(2)}</p>
        <p><strong>Breakeven Price:</strong> {breakeven}</p>
        <p><strong>RR Ratio:</strong> {(reward / risk).toFixed(2)}:1</p>
      </div>

      {/* Render the Trade Card below */}
      <TradeCard
        asset={asset}
        entry={entry}
        stop={stop}
        target={target}
        size={position}
        leverage={leverage}
      />
    </div>
  );
}
