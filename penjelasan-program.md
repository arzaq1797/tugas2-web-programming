# Penjelasan Program

Program ini merupakan tugas mata kuliah Pemrograman Web: sebuah aplikasi web sederhana bernama **SITTA** yang membantu pengelolaan **bahan ajar** di lingkungan Universitas Terbuka (UT). Aplikasi dibangun murni dengan **HTML, CSS, dan JavaScript vanilla** (tanpa framework, tanpa backend), sehingga seluruh data hanya tersimpan di **memori browser** selama halaman terbuka.

---

## 1. Struktur File

```
├── index.html        → Halaman login (form masuk + modal lupa password & daftar)
├── dashboard.html    → Halaman beranda setelah login
├── stok.html         → Informasi stok bahan ajar (tabel, modal detail, modal tambah)
├── tracking.html     → Tracking pengiriman paket bahan ajar
├── css/
│   └── style.css     → Seluruh gaya UI (navbar, modal, form, tabel, dll.)
├── js/
│   └── data.js       → Data statis (pengguna, bahan ajar, tracking pengiriman)
└── assets/
    └── img/          → Gambar cover bahan ajar
```

---

## 2. Sumber Data — `js/data.js`

Seluruh data aplikasi didefinisikan sebagai variabel global JavaScript biasa:

| Variabel | Isi | Dipakai di |
|---|---|---|
| `dataPengguna` | Daftar pengguna (nama, email, password, role, lokasi) | Login |
| `dataBahanAjar` | Daftar bahan ajar (kodeLokasi, kodeBarang, namaBarang, jenisBarang, edisi, stok, cover) | Stok |
| `dataTracking` | Riwayat pengiriman per nomor DO, berisi status, ekspedisi, dan riwayat `perjalanan` | Tracking |

> **Catatan penting:** file `data.js` ini tidak pernah diubah oleh program saat berjalan. Data yang "ditambahkan" oleh pengguna hanya hidup di memori (array `dataBahanAjar`) dan akan hilang ketika halaman dimuat ulang.

---

## 3. Halaman Login — `index.html`

- Menampilkan **kartu login** dengan kolom email dan kata sandi.
- Tombol **"Lupa password"** dan **"Daftar"** membuka **modal** (jendela muncul di atas layar):
  - Modal 1: form masa pengisian email untuk reset password
  - Modal 2: form pendaftaran akun baru
- Pola modal yang dipakai:
  - `.modal` → lapisan (overlay) gelap dengan `position: fixed` yang menutupi seluruh layar
  - `.modal-content` → kotak putih di tengah
  - `.modal-header` → judul + tombol `×` untuk menutup
  - `.modal-body` → isi form
- Modal dibuka/ditutup dengan mengubah `style.display` antara `"none"` dan `"block"` melalui JavaScript.

---

## 4. Halaman Stok — `stok.html`

Halaman dengan fitur paling lengkap. Bebagian utamanya:

### 4.1. Sapaan

JavaScript membaca jam lokal perangkat dan menampilkan sapaan: *Selamat Pagi* (00.00–10.59), *Selamat Siang* (11.00–14.59), *Selamat Sore* (15.00–17.59), atau *Selamat Malam* (18.00–23.59).

### 4.2. Tabel Stok

- Fungsi `tampilkanTabel()` mengosongkan `<tbody>` lalu mengisi ulang satu baris `<tr>` untuk setiap elemen `dataBahanAjar` menggunakan **template literal** (backtick `` ` `` dengan `${...}`).
- Setiap baris memiliki kolom **Aksi** berisi tombol **Detail**.

### 4.3. Modal Detail

- Menekan tombol **Detail** memanggil `lihatDetail(index)`.
- Modal menampilkan **gambar cover** di bagian atas, lalu **tabel informasi** (Kode Lokasi, Kode Barang, Nama Barang, Jenis, Edisi, Stok).

### 4.4. Fungsi `urlCover(url)`

Menentukan sumber gambar cover tanpa mengubah `data.js`:

1. Jika URL diawali `https://` atau `http://` → dipakai langsung (cocok untuk cover dari internet).
2. Jika diawali `img/` → diberi prefix menjadi `assets/img/` (menyesuaikan lokasi gambar di folder proyek).
3. Selain itu → dipakai apa adanya.

### 4.5. Modal Tambah Bahan Ajar

- Tombol **"+ Tambah Bahan Ajar"** berada di **bawah tabel** dan membuka modal berisi form: Kode Lokasi, Kode Barang, Nama Barang, Jenis (select), Edisi (number), Stok (number), dan **URL Cover** (`type="url"`).
- Saat pengguna mengetik URL cover, fungsi `pratinjauCover()` langsung menampilkan **pratinjau gambar** di bawah kolom.
- Form dikirim melalui **`addEventListener("submit", ...)`** (bukan atribut `onsubmit` di HTML).
- Saat disimpan:
  1. `event.preventDefault()` mencegah pengiriman form bawaan browser;
  2. objek baru di-`push` ke array `dataBahanAjar` di **memori** (file `data.js` tetap tidak tersentuh);
  3. tabel dirender ulang dengan `tampilkanTabel()`;
  4. modal ditutup, form direset, dan browser menampilkan `alert()` konfirmasi.
- Data yang ditambahkan hanya bertahan selama halaman terbuka.

---

## 5. Halaman Tracking — `tracking.html`

- Pengguna memasukkan **nomor Delivery Order (DO)**.
- Program mencari nomor tersebut di objek `dataTracking`.
- Jika ditemukan, ditampilkan kartu detail (`.kartu-detail`): status, ekspedisi, tanggal kirim, dan **riwayat perjalanan paket** (waktu dan keterangan setiap titik perjalanan) dari array `perjalanan`.
- Status dikirim ditampilkan dengan bentuk label/`badge` berwarna (`.status`).

---

## 6. Gaya Tampilan — `css/style.css`

- Reset sederhana: `* { box-sizing, margin, padding }` dinolkan agar tampilan konsisten di semua browser.
- **Tema warna**: ungu `#8b5cf6` (aksen), pink `#f472b6` / `#f9a8d4` (hiasan), latar lembut `#fdf2f8`.
- **Navbar**: menggunakan `float` dengan menu dropdown **Laporan**.
- **Form**: `.grup-input` memberi label tebal dan style konsisten; pada rule bersama `input` maupun `select` (padding, border putus-putus pink, radius 12px) dan fokus berwarna ungu dengan cincin `box-shadow`.
- **Tombol `.tombol`**: kapsul ungu dengan efek `hover` lebih gelap; semua tombol punya cincin fokus biru `:focus-visible` untuk navigasi keyboard.
- **Tabel & kartu**: `.section-tengah` memusatkan tabel, `.kartu-detail` membungkus detail tracking dengan border putus-putus.

---

## 7. Batasan Program

1. Tanpa backend dan tanpa penyimpanan permanen — login, tambah data, dan tracking hanya bekerja dengan data contoh dari `data.js`.
2. Data yang ditambahkan hanya ada di memori dan hilang saat halaman dimuat ulang.
3. Aplikasi ditujukkan untuk latihan konsep: manipulasi DOM (`querySelector`, `createElement`, `innerHTML`), event handling (`addEventListener`, `onclick`), template literal, serta komponen modal berbasis CSS murni.
