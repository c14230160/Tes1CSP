import React, { useState, useEffect } from "react";
import { semuaMenu } from "./data/menu";
import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import TimerSesi from "./components/TimerSesi";
import MenuForm from "./components/MenuForm";

export default function App() {
  const [menuList, setMenuList] = useState(semuaMenu);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [showTimer, setShowTimer] = useState(true);

  // B5.1 Persistensi localStorage dengan Lazy Initializer
  const [keranjang, setKeranjang] = useState(() => {
    const saved = localStorage.getItem("kantin_keranjang");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Simpan keranjang ke localStorage setiap kali mengalami perubahan
  useEffect(() => {
    localStorage.setItem("kantin_keranjang", JSON.stringify(keranjang));
  }, [keranjang]);

  // B5.2 Memperbarui judul tab browser
  useEffect(() => {
    const totalQty = keranjang.reduce((acc, curr) => acc + curr.qty, 0);
    if (totalQty > 0) {
      document.title = `(${totalQty}) KantinKita`;
    } else {
      document.title = "KantinKita";
    }
  }, [keranjang]);

  // B3.2 Menghasilkan kategori secara dinamis dari data menu
  const kategoriList = ["semua", ...Array.from(new Set(menuList.map((m) => m.kategori)))];

  // Hitung jumlah item tiap kategori untuk tombol filter (Bonus)
  const kategoriCounts = kategoriList.reduce((acc, kat) => {
    if (kat === "semua") {
      acc[kat] = menuList.length;
    } else {
      acc[kat] = menuList.filter((m) => m.kategori === kat).length;
    }
    return acc;
  }, {});

  // B4.1 & B4.2 Menambah item ke keranjang secara imutabel
  const handleTambahKeKeranjang = (menuItem) => {
    setKeranjang((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === menuItem.id);
      if (existingIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevCart, { ...menuItem, qty: 1 }];
      }
    });
  };

  // B4.3 & B4.4 Mengubah qty keranjang
  const handleUpdateQty = (id, delta) => {
    setKeranjang((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + delta };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };

  // Menghapus item dari keranjang
  const handleHapusKeranjang = (id) => {
    setKeranjang((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // B6.4 Menambah menu baru secara imutabel
  const handleTambahMenuBaru = (menuBaru) => {
    const idBaru = menuList.length > 0 ? Math.max(...menuList.map((m) => m.id)) + 1 : 1;
    setMenuList((prev) => [...prev, { ...menuBaru, id: idBaru }]);
  };

  // Filter pencarian dan kategori
  const filteredMenu = menuList.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchCategory = selectedCategory === "semua" || item.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "16px",
        }}
      >
        <h1 style={{ margin: 0, color: "#1e293b" }}>KantinKita</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* B5.4 Conditional Rendering untuk Unmount TimerSesi */}
          {showTimer && <TimerSesi />}
          <button
            onClick={() => setShowTimer((prev) => !prev)}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
          >
            {showTimer ? "Sembunyikan Timer" : "Tampilkan Timer"}
          </button>
        </div>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px" }}>
        <section>
          <FilterBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            kategoriList={kategoriList}
            kategoriCounts={kategoriCounts}
          />

          <MenuList
            menu={filteredMenu}
            onTambah={handleTambahKeKeranjang}
            searchKeyword={searchKeyword}
            selectedCategory={selectedCategory}
          />

          <MenuForm onTambahMenu={handleTambahMenuBaru} kategoriList={kategoriList} />
        </section>

        <aside>
          <Keranjang
            items={keranjang}
            onUpdateQty={handleUpdateQty}
            onHapus={handleHapusKeranjang}
          />
        </aside>
      </main>
    </div>
  );
}