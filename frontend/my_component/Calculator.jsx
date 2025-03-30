// src/components/Calculator.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TradeCard from "./TradeCard";

export default function Calculator({ selectedAsset }) {
  const [position, setPosition] = useState(500);
  const [leverage, setLeverage] = useState(20);
  const [entry, setEntry] = useState(2.15);
  const [stop, setStop] = useState(2.13);
  const [target, setTarget] = useState(2.35);
  const [livePrice, setLivePrice] = useState(null);

  useEffect(() => {
    if (!selectedAsset) return;
    const fetchPrice = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedAsset.toLowerCase()}&vs_currencies=usd`
        );
        setLivePrice(res.data[selectedAsset.toLowerCase()].usd);
      } catch (err) {
        setLivePrice("?");
      }
    };
    fetchPrice();
  }, [selectedAsset]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label>Position: <input value={position} onChange={e => setPosition(+e.target.value)} className="input" /></label>
        <label>Leverage: <input value={leverage} onChange={e => setLeverage(+e.target.value)} className="input" /></label>
        <label>Entry: <input value={entry} onChange={e => setEntry(+e.target.value)} className="input" /></label>
        <label>Stop: <input value={stop} onChange={e => setStop(+e.target.value)} className="input" /></label>
        <label>Target: <input value={target} onChange={e => setTarget(+e.target.value)} className="input" /></label>
        <div className="pt-4">Live Price: <strong>{livePrice ?? "Loading..."}</strong></div>
      </div>

      <TradeCard
        size={position}
        leverage={leverage}
        entry={entry}
        stop={stop}
        target={target}
        asset={selectedAsset}
      />
    </div>
  );
}
