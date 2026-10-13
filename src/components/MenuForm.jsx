import React, { useState } from "react";

export default function MenuForm({ onTambahMenu, kategoriList }) {
  const initialForm = {
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.nama.trim().length < 3) {
      newErrors.nama = "Nama minimal 3 karakter";
    }
    if (!formData.kategori) {
      newErrors.kategori = "Kategori wajib dipilih";
    }
    if (!formData.harga || Number(formData.harga) <= 0) {
      newErrors.harga = "Harga harus lebih dari 0";
    }
    if (formData.stok === "" || Number(formData.stok) < 0) {
      newErrors.stok = "Stok tidak boleh negatif";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onTambahMenu({
        nama: formData.nama,
        kategori: formData.kategori,
        harga: Number(formData.harga),
        stok: Number(formData.stok),
      });

      setFormData(initialForm);
      setErrors({});
    }
  };

  // Ambil daftar kategori unik tanpa "semua"
  const opsiKategori = kategoriList.filter((k) => k !== "semua");

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        backgroundColor: "#ffffff",
        marginTop: "20px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Tambah Menu Baru</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label htmlFor="nama" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
            Nama Menu:
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={formData.nama}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          />
          {errors.nama && (
            <span role="alert" style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px", display: "block" }}>
              {errors.nama}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="kategori" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
            Kategori:
          </label>
          <select
            id="kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          >
            <option value="">-- Pilih Kategori --</option>
            {opsiKategori.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
          {errors.kategori && (
            <span role="alert" style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px", display: "block" }}>
              {errors.kategori}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="harga" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
            Harga (Rp):
          </label>
          <input
            id="harga"
            name="harga"
            type="number"
            value={formData.harga}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          />
          {errors.harga && (
            <span role="alert" style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px", display: "block" }}>
              {errors.harga}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="stok" style={{ display: "block", marginBottom: "4px", fontSize: "0.875rem" }}>
            Stok:
          </label>
          <input
            id="stok"
            name="stok"
            type="number"
            value={formData.stok}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          />
          {errors.stok && (
            <span role="alert" style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "2px", display: "block" }}>
              {errors.stok}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "8px",
          }}
        >
          Simpan Menu
        </button>
      </form>
    </div>
  );
}