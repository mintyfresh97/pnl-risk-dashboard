import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TradeCard({ asset, entry, stop, target, size, leverage }) {
  const cardRef = useRef(null);
  const [notes, setNotes] = useState("");
  const [strategy, setStrategy] = useState("");
  const timestamp = new Date().toLocaleString();

  const total = size * leverage;
  const risk = Math.abs(entry - stop) * total / entry;
  const reward = Math.abs(target - entry) * total / entry;
  const rr = (reward / risk).toFixed(2);
  const breakeven = ((Number(entry) + Number(stop)) / 2).toFixed(3);

  const downloadAsImage = async () => {
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = `${asset}_trade_card.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadAsPDF = async () => {
    const canvas = await html2canvas(cardRef.current);
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`${asset}_trade_card.pdf`);
  };

  return (
    <div className="space-y-4">
      <div ref={cardRef} className="rounded-xl p-4 border border-gray-300 dark:border-gray-600 bg-white
