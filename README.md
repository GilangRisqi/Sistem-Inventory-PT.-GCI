# Sistem Inventory dan Laporan Harian PT. GCI

Aplikasi berbasis web untuk membantu pencatatan laporan operasional harian dan persediaan bahan baku PT. GCI. Data laporan dapat ditinjau kembali melalui rekap berdasarkan bulan, sehingga pencatatan dan penelusuran aktivitas operasional lebih teratur.

## Fitur

- Login pengguna dan navigasi ke halaman sesuai kebutuhan operasional.
- Input dan pengelolaan laporan harian, termasuk laporan produksi Iridesse, Strapless, Lipat, dan Lem-Packing.
- Pencatatan persediaan bahan baku.
- Rekap laporan berdasarkan jenis data dan bulan yang dipilih.
- Tinjau, ubah, atau hapus data dari tabel rekap.
- Ekspor rekap ke PDF.
- Progressive Web App (PWA) dengan service worker dan penyimpanan lokal untuk mendukung pengalaman saat koneksi terbatas. Sinkronisasi data utama menggunakan Supabase.

## Teknologi

- JavaScript dengan arsitektur model-view-presenter (MVP)
- Webpack untuk proses build dan server pengembangan
- Supabase untuk autentikasi, basis data, dan pembaruan data realtime
- IndexedDB untuk penyimpanan lokal
- Bootstrap untuk komponen antarmuka
- jsPDF dan jsPDF-AutoTable untuk ekspor laporan PDF

## Menjalankan Proyek

Persyaratan: Node.js versi 16 atau lebih baru dan npm versi 8 atau lebih baru.

```bash
npm install
npm run dev
```

Perintah `npm run dev` menjalankan server pengembangan melalui HTTPS. Ikuti peringatan sertifikat browser jika lingkungan lokal menggunakan sertifikat yang belum dipercaya.

Untuk membuat build produksi:

```bash
npm run build
```

## Konfigurasi Supabase

Aplikasi terhubung ke proyek Supabase melalui `src/js/config/supabase.js`. Sesuaikan URL proyek dan anon key dengan proyek Supabase yang digunakan. Pastikan tabel dan kebijakan akses yang diperlukan sudah disiapkan; skema awal tersedia di `database/supabase-schema.sql`.

Anon key dirancang untuk digunakan di aplikasi klien, tetapi akses data tetap harus dibatasi dengan kebijakan Row Level Security (RLS) yang sesuai. Jangan menaruh service-role key atau rahasia server di kode frontend.

## Struktur Proyek

- `src/js/models/` - akses dan pengelolaan data laporan serta bahan baku.
- `src/js/views/` - tampilan formulir, tabel, dan rekap.
- `src/js/presenters/` - alur aplikasi dan interaksi antara tampilan dengan model.
- `src/js/services/` - integrasi Supabase dan pengelolaan realtime.
- `src/js/config/` - konfigurasi koneksi aplikasi.
- `src/js/utils/` - utilitas aplikasi, termasuk kontrol akses dan migrasi.
- `src/css/` - stylesheet aplikasi.
- `src/images/` - aset dan ikon PWA.
- `database/` - skema basis data Supabase.

## Perintah NPM

- `npm run dev` - menjalankan server pengembangan.
- `npm start` - menjalankan server pengembangan HTTPS.
- `npm run build` - membuat build produksi.
- `npm run build:dev` - membuat build mode pengembangan.
- `npm run serve` - menyajikan build produksi melalui HTTPS.