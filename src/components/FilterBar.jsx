import React, { useRef } from "react";

export default function FilterBar({
  searchKeyword,
  setSearchKeyword,
  selectedCategory,
  setSelectedCategory,
  kategoriList,
  kategoriCounts,
}) {
  const inputRef = useRef(null);

  const handleClear = () => {
    setSearchKeyword("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Cari nama menu..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #cbd5e1",
          }}
        />
        <button
          onClick={handleClear}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f1f5f9",
            border: "1px solid #cbd5e1",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Bersihkan
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {kategoriList.map((kat) => {
          const isActive = selectedCategory === kat;
          const count = kategoriCounts[kat] || 0;
          return (
            <button
              key={kat}
              onClick={() => setSelectedCategory(kat)}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid",
                borderColor: isActive ? "#2563eb" : "#cbd5e1",
                backgroundColor: isActive ? "#2563eb" : "#ffffff",
                color: isActive ? "#ffffff" : "#334155",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {kat} ({count})
            </button>
          );
        })}
      </div>
    </div>
  );
}