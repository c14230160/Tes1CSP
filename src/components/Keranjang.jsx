import React, { useState } from "react";

export default function Keranjang({ items, onUpdateQty, onHapus }) {
  const [confirmHapusId, setConfirmHapusId] = useState(null);

  const totalItem = items.reduce((acc, curr) => acc + curr.qty, 0);
  const totalHarga = items.reduce((acc, curr) => acc + curr.harga * curr.qty, 0);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  const handleHapusClick = (id) => {
    if (confirmHapusId === id) {
      onHapus(id);
      setConfirmHapusId(null);
    } else {
      setConfirmHapusId(id);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#ffffff",
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: "1.25rem", borderBottom: "2px solid #f1f5f9", paddingBottom: "8px" }}>
        Keranjang Pesanan ({totalItem})
      </h2>

      {items.length === 0 ? (
        <p style={{ color: "#64748b", textAlign: "center" }}>Keranjang masih kosong.</p>
      ) : (
        <div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold" }}>{item.nama}</div>
                  <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                    {formatRupiah(item.harga)} x {item.qty} = {formatRupiah(item.harga * item.qty)}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    style={{ padding: "2px 8px", cursor: "pointer" }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                  <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    style={{ padding: "2px 8px", cursor: "pointer" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleHapusClick(item.id)}
                    style={{
                      marginLeft: "8px",
                      padding: "4px 8px",
                      backgroundColor: confirmHapusId === item.id ? "#dc2626" : "#ef4444",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  >
                    {confirmHapusId === item.id ? "Yakin Hapus?" : "Hapus"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "8px",
              borderTop: "2px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            <span>Total Harga:</span>
            <span>{formatRupiah(totalHarga)}</span>
          </div>
        </div>
      )}
    </div>
  );
}