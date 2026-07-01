# Sistem Layanan Mahasiswa

Website sederhana untuk mencatat pengajuan layanan mahasiswa (loket digital).
Pengguna mengisi form pada satu halaman, data diproses dengan JavaScript dan
disimpan di `localStorage`, lalu ditampilkan pada halaman tabel data.

Dibuat untuk memenuhi **SUB-CPMK-07-2-8**: merancang dan mengimplementasikan
proyek web sederhana dengan mengintegrasikan HTML, CSS, JavaScript, dan Git.

## Struktur Folder

```
sistem-layanan-mahasiswa/
├── index.html          # Halaman form input data
├── data.html            # Halaman tabel data
├── css/
│   └── style.css        # Seluruh styling (desain tema tiket loket)
├── js/
│   ├── storage.js        # Modul penyimpanan data (localStorage)
│   ├── form.js            # Logika halaman form (validasi, simpan, tiket)
│   └── table.js            # Logika halaman tabel (render, cari, hapus)
├── .gitignore
└── README.md
```

## Fitur

- Form input dengan field **Nama, NIM, Jenis Layanan, Keterangan**
- Validasi input sederhana (field wajib diisi, NIM harus angka)
- Setiap pengajuan mendapat **nomor tiket** otomatis (contoh: `LYN-0001`)
- Data ditampilkan di tabel, diurutkan dari yang terbaru
- Pencarian data berdasarkan nama/NIM
- Hapus data per baris atau hapus semua data
- Layout responsif (desktop, tablet, mobile)

## Teknologi

- HTML5 semantik
- CSS3 (custom properties, Flexbox, Grid, media query)
- JavaScript (vanilla, ES6+, Web Storage API)
- Git & GitHub untuk version control

## Cara Menjalankan

Karena proyek ini murni HTML/CSS/JS (tanpa backend), cukup buka file
`index.html` langsung di browser, atau gunakan ekstensi seperti **Live
Server** (VS Code) agar path relatif dimuat dengan sempurna.

> Catatan: data disimpan di `localStorage` browser masing-masing perangkat.
> Jika dibuka dari perangkat/browser lain, data tidak akan ikut terbawa.

## Cara Mengelola Proyek dengan Git & GitHub

1. Buat repository baru di GitHub (misalnya bernama `sistem-layanan-mahasiswa`),
   kosongkan (tanpa README) agar tidak bentrok saat push pertama.
2. Di dalam folder proyek ini, jalankan perintah berikut lewat terminal:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: sistem layanan mahasiswa"
   git branch -M main
   git remote add origin https://github.com/USERNAME/sistem-layanan-mahasiswa.git
   git push -u origin main
   ```

   Ganti `USERNAME` dengan username GitHub Anda.

3. Untuk perubahan berikutnya, gunakan alur kerja standar:

   ```bash
   git add .
   git commit -m "Deskripsikan perubahan yang dilakukan"
   git push
   ```

4. (Opsional) Aktifkan **GitHub Pages** agar website bisa diakses secara
   publik: buka repo di GitHub → *Settings* → *Pages* → pilih branch `main`
   dan folder `/ (root)` → simpan. Situs akan tersedia di
   `https://USERNAME.github.io/sistem-layanan-mahasiswa/`.

## Pengembangan Lanjutan (opsional)

- Mengganti `localStorage` dengan backend (misalnya Node.js + database) agar
  data tersimpan di server dan bisa diakses lintas perangkat.
- Menambahkan autentikasi agar hanya mahasiswa/admin tertentu yang bisa
  mengubah data.
- Menambahkan ekspor data ke CSV/Excel dari halaman tabel.
