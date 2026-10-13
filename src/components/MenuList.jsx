import React from "react";
import MenuCard from "./MenuCard";

export default function MenuList({ menu, onTambah, searchKeyword, selectedCategory }) {
  if (menu.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "32px 16px", color: "#64748b" }}>
        <p>
          Menu tidak ditemukan untuk kata kunci <strong>"{searchKeyword}"</strong>
          {selectedCategory !== "semua" && (
            <> pada kategori <strong>"{selectedCategory}"</strong></>
          )}.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {menu.map((item) => (
        <MenuCard key={item.id} item={item} onTambah={onTambah} />
      ))}
    </div>
  );
}