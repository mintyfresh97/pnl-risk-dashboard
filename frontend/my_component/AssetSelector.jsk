import React from "react";

export default function AssetSelector({ selectedAsset, setSelectedAsset }) {
  const assets = [
    "BTC", "ETH", "XRP", "SOL", "ADA",
    "LINK", "CRV", "CVX", "SUI", "ONDO", "FARTCOIN"
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center p-2">
      {assets.map((asset) => (
        <button
          key={asset}
          onClick={() => setSelectedAsset(asset)}
          className={`flex items-center gap-1 px-3 py-1 rounded-2xl shadow ${
            selectedAsset === asset ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          <img
            src={`/icons/${asset}.png`}
            alt={asset}
            className="w-5 h-5"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="text-sm">{asset}</span>
        </button>
      ))}
    </div>
  );
}
