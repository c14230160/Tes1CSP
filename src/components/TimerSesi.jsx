import React, { useState, useEffect } from "react";

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDetik((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatWaktu = (totalDetik) => {
    const m = String(Math.floor(totalDetik / 60)).padStart(2, "0");
    const s = String(totalDetik % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      style={{
        padding: "8px 12px",
        backgroundColor: "#f8fafc",
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        fontSize: "0.875rem",
        fontWeight: "bold",
        color: "#475569",
        display: "inline-block",
      }}
    >
      Lama Sesi: {formatWaktu(detik)}
    </div>
  );
}