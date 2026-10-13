A1. Aturan Hooks 
Kode tersebut melanggar aturan Hooks (Rules of Hooks) karena panggilan useState diletakkan di dalam kondisi if. React mengandalkan urutan pemanggilan (call order) Hooks pada setiap proses render untuk mencocokkan state dengan pemanggilnya. Jika Hook dipanggil di dalam kondisi atau perulangan, urutan pemanggilan dapat berubah dan merusak konsistensi internal React.

Perbaikan:
function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");

  if (sudahLogin) {
    // ...
  }
}

--------------------------------------------------

A2. Mutasi State Langsung
Layar tidak berubah karena metode .push() melakukan mutasi langsung (direct mutation) pada array items, sehingga referensi memori array tersebut tidak berubah. React menggunakan pembandingan dangkal (shallow comparison) pada state; karena referensi memori items tetap sama, React menganggap tidak ada perubahan state dan tidak memicu proses re-render.

Perbaikan:
const tambah = (baru) => {
  setItems((prevItems) => [...prevItems, baru]);
};

--------------------------------------------------

A3. Perilaku useEffect & Cleanup Function 
Perbedaan ketiga bentuk useEffect:
(a) Tanpa dependency array: Efek dijalankan setelah render pertama dan setelah setiap kali komponen melakukan re-render.
(b) Array kosong []: Efek hanya dijalankan sekali setelah render pertama (mount).
(c) Array berisi dependency [kota]: Efek dijalankan setelah render pertama dan setiap kali nilai kota berubah.

Cleanup function dijalankan pada dua kesempatan:
1. Sebelum efek dijalankan kembali pada re-render berikutnya (untuk membersihkan hasil efek sebelumnya).
2. Saat komponen dilepas/dihapus dari DOM (unmount).

--------------------------------------------------

A4. State Lifting & Komunikasi Komponen 
State keyword sebaiknya disimpan di komponen induk (parent) yang menaungi FilterBar dan DaftarMenu (Lifting State Up) agar data pencarian dapat dibagikan secara bersamaan ke kedua komponen bersaudara tersebut.

Yang "naik" dari FilterBar ke induknya bukanlah data secara langsung, melainkan sinyal/event melalui pemanggilan fungsi callback (yang dikirim sebagai props dari induk) yang membawa payload data kata kunci baru.

--------------------------------------------------

A5. Controlled Component 
Controlled component adalah komponen formulir dalam React yang nilai elemen inputnya sepenuhnya dikendalikan dan disimpan di dalam state React.

Satu fungsi handleChange dapat menangani sepuluh input sekaligus karena memanfaatkan dua hal:
1. Atribut "name" pada setiap elemen HTML input yang disesuaikan dengan nama properti pada objek state.
2. Fitur JavaScript "e.target" (mengambil e.target.name dan e.target.value) yang dikombinasikan dengan computed property names [e.target.name]: e.target.value.