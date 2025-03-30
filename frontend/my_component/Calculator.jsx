import React, { useState, useEffect } from "react";
import axios from "axios";
import TradeCard from "./TradeCard";

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

export default function Calculator({ selectedAsset }) {
  const [position, setPosition] = useState(500);
  const [leverage, setLeverage] = useState(20);
  const [entry, setEntry] = useState(2.15);
  const [stop, setStop] = useState(2.13);
  const [target, setTarget] = useState(2.35);
  const [livePrice, setLivePrice] = useState(null);

  const digits = precisionMap[selectedAsset] || 2;

  useEffect(() => {
    if (!selectedAsset) return;
    const fetchPrice = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedAsset.toLowerCase()}&vs_currencies=usd`
        );
        const price = res.data[selectedAsset.toLowerCase()]?.usd;
        if (price) {
          setLivePrice(Number(price).toFixed(digits));
          setEntry(Number(price).toFixed(digits));
        }
      } catch {
        setLivePrice("N/A");
      }
    };
    fetchPrice();
  }, [selectedAsset]);

  const format = (val) => {
    const fixed = Number(val).toFixed(digits);
    return digits > 0 ? fixed : Math.floor(val).toString();
  };

  const total = position * leverage;
  const risk = Math.abs(entry - stop) * total / entry;
  const reward = Math.abs(target - entry) * total / entry;
  const breakeven = ((Number(entry) + Number(stop)) / 2).toFixed(digits);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label>
          Position: 
          <input
            type="number"
            value={position}
            onChange={e => setPosition(+e.target.value)}
            className="input w-full border rounded p-1"
          />
        </label>
        <label>
          Leverage: 
          <input
            type="number"
            value={leverage}
            onChange={e => setLeverage(+e.target.value)}
            className="input w-full border rounded p-1"
          />
        </label>
        <label>
          Entry: 
          <input
            type="number"
            value={entry}
            onChange={e => setEntry(+e.target.value)}
            className="input w-full border rounded p-1"
          />
        </label>
        <label>
          Stop: 
          <input
            type="number"
            value={stop}
            onChange={e => setStop(+e.target.value)}
            className="input w-full border rounded p-1"
          />
        </label>
        <label>
          Take Profit: 
          <input
            type="number"
            value={target}
            onChange={e => setTarget(+e.target.value)}
            className="input w-full border rounded p-1"
          />
        </label>
        <div className="pt-4">
          Live Price: <strong>${livePrice}</strong>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 space-y-1 text-sm">
        <p><strong>Total Exposure:</strong> £{total}</p>
        <p><strong>Risk:</strong> £{risk.toFixed(2)}</p>
        <p><strong>Reward:</strong> £{reward.toFixed(2)}</p>
        <p><strong>Breakeven:</strong> {breakeven}</p>
        <p><strong>RR Ratio:</strong> {(reward / risk).toFixed(2)} : 1</p>
      </div>

      <TradeCard
        asset={selectedAsset}
        entry={entry}
        stop={stop}
        target={target}
        size={position}
        leverage={leverage}
      />
    </div>
  );
}
