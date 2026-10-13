import React from "react";
import styles from "../styles/MenuCard.module.css";
import Badge from "./Badge";

export default function MenuCard({ item, onTambah }) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const isHabis = item.stok === 0;

  return (
    <div className={`${styles.card} ${isHabis ? styles.habis : ""}`}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{item.nama}</h3>
          <Badge variant={isHabis ? "danger" : "default"}>{item.kategori}</Badge>
        </div>
        <p style={{ margin: "4px 0", fontWeight: "bold", color: "#2563eb" }}>
          {formatRupiah(item.harga)}
        </p>
        <p style={{ margin: "4px 0", fontSize: "0.875rem", color: "#64748b" }}>
          Stok: {isHabis ? <strong style={{ color: "#ef4444" }}>Habis</strong> : item.stok}
        </p>
      </div>

      <button
        onClick={() => onTambah(item)}
        disabled={isHabis}
        style={{
          marginTop: "12px",
          padding: "8px 12px",
          backgroundColor: isHabis ? "#cbd5e1" : "#16a34a",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          cursor: isHabis ? "not-allowed" : "pointer",
        }}
      >
        {isHabis ? "Stok Habis" : "+ Tambah"}
      </button>
    </div>
  );
}