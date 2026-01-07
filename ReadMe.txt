Ini adalah panduan "Copy-Paste-Edit" yang sangat praktis. Kamu hanya perlu mengubah 3 File Utama (menu.js, index.html, app.js) untuk menjadikannya milik usahamu sepenuhnya.
Saya urutkan dari yang PALING PENTING.
1️⃣ Ganti DAFTAR MENU (Wajib)
Ini adalah database makanan dan minumanmu.
 * File: menu.js
 * Cari Bagian: foods (makanan) dan drinks (minuman).
Caranya:
Ganti teks di dalam tanda kutip "" dan angka harga.
foods: [
    {
        id: "f1", 
        name: "Nasi Goreng Spesial", // ⬅️ Ganti Nama Menu
        price: 25000,                // ⬅️ Ganti Harga (jangan pakai titik)
        image: "img/nasigoreng.jpg"  // ⬅️ Ganti nama file foto
    },
    // ...
]

2️⃣ Ganti IDENTITAS TOKO (Nama, Alamat, Logo)
Supaya pelanggan tahu ini toko siapa.
 * File: index.html
 * Cari Bagian: <header> (di bagian atas kode).
A. Ganti Logo:
Cari kode ini dan ganti src:
<img src="img/logo-kamu.png" alt="Logo" class="logo">

(Pastikan kamu punya file gambar logo di folder img)
B. Ganti Nama & Alamat:
Cari kode ini:
<h1 id="store-name">URBAN CAFÉ</h1> <p class="store-address">Jl. Kopi Nikmat No. 99, Jakarta</p> ```

---

### 3️⃣ Ganti NOMOR WA & PASSWORD (Penting)
Supaya pesanan masuk ke WA-mu, bukan WA saya, dan adminnya aman.
* **File:** `app.js`
* **Cari Bagian:** Paling atas file.

**Caranya:**
Ubah dua baris ini:
```javascript
const ADMIN_PASSWORD = "1234";          // ⬅️ Ganti sandi admin sesukamu
const WA_NUMBER = "6282319527214";      // ⬅️ Ganti nomor WA kamu (Ganti 08.. jadi 62..)

4️⃣ Ganti GAMBAR QRIS (Untuk Pembayaran)
Supaya pelanggan scan QRIS-mu yang asli.
 * File: index.html
 * Cari Bagian: Scroll sampai paling bawah, cari komentar ``.
Caranya:
Ganti src dengan nama file foto QRIS kamu:
<img src="img/qris-asli.jpg" alt="QRIS" class="qris-img">

📂 PANDUAN FOLDER (Supaya Gambar Muncul)
Ini kesalahan yang paling sering terjadi: Gambar tidak muncul karena salah taruh file.
Buatlah struktur folder di komputer/laptopmu persis seperti ini:
📁 folder-cafe-kamu/
├── 📄 index.html
├── 📄 style.css
├── 📄 menu.js
├── 📄 app.js
├── 📄 manifest.json
├── 📄 service-worker.js
└── 📁 img/               <--- (BUAT FOLDER BARU NAMANYA "img")
    ├── logo.png          <--- Masukkan logomu di sini
    ├── qris.jpg          <--- Masukkan foto QRIS di sini
    ├── nasigoreng.jpg    <--- Masukkan foto menu di sini
    └── kopi.jpg

Jika kamu menaruh foto di dalam folder img, maka di kodingan (menu.js atau index.html) kamu menulisnya: src="img/namafoto.jpg".
📝 Rangkuman Checklist Edit
| No | Mau Ubah Apa? | Buka File | Baris / Bagian |
|---|---|---|---|
| 1 | Nomor WhatsApp | app.js | Baris ke-6 (WA_NUMBER) |
| 2 | Password Admin | app.js | Baris ke-5 (ADMIN_PASSWORD) |
| 3 | Nama Menu & Harga | menu.js | Bagian foods & drinks |
| 4 | Nama Toko | index.html | Bagian <h1 id="store-name"> |
| 5 | Alamat Toko | index.html | Bagian <p class="store-address"> |
| 6 | Foto Logo | index.html | Bagian <img ... class="logo"> |
| 7 | Foto QRIS | index.html | Bagian <div id="qris-modal"> |
