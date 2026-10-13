# Andalan Teknik — Website

Website statis (HTML + CSS + JS), tanpa proses build. Buka `index.html` langsung di browser, atau upload seluruh folder ke hosting.

## Struktur
```
index.html            kerangka halaman + SEO + favicon
assets/css/           base · layout · home · pages · admin · responsive
assets/js/config.js   ★ PENGATURAN UTAMA (nomor WA, mode, logo, URL Apps Script)
assets/js/data.js     data awal (layanan, produk contoh, proyek contoh)
assets/js/content.js  teks statis (keunggulan, langkah kerja, FAQ, alamat)
assets/js/pages/      satu file per halaman
assets/js/admin.js    dashboard admin (mode local)
assets/js/backend.js  integrasi Google Sheets
assets/img/           logo, favicon, gambar share (og-image)
apps-script/Code.gs   kode Google Apps Script
```

## Yang WAJIB diganti
- `assets/js/config.js` → `whatsapp` (masih nomor contoh `6281234567890`) dan `adminPassword`.
- Setelah punya domain: ubah `og:image` di `index.html` menjadi URL lengkap.

## Opsi tampilan logo
`config.js` → `logoMode: 'logo+text'` (logo + tulisan) atau `'logo-only'` (hanya logo).

## Opsi data
**Opsi A — `mode: 'local'` (default, seperti versi lama).** Produk/portofolio dikelola lewat menu `#/admin`. Catatan: data tersimpan di browser yang dipakai mengedit saja — pengunjung lain TIDAK melihat perubahan itu. Cocok untuk demo/uji coba.

**Opsi B — `mode: 'sheets'` (disarankan untuk dipakai sungguhan).** Data dikelola di Google Sheets, tampil untuk semua pengunjung; pesan formulir masuk ke sheet `Pesan`.
1. Buat Google Sheet baru → *Extensions → Apps Script* → tempel isi `apps-script/Code.gs`.
2. Jalankan fungsi `setup` sekali (izinkan akses) → sheet Produk, Portofolio, Testimoni, Pengaturan, Pesan terbuat.
3. *Deploy → New deployment → Web app* · Execute as: **Me** · Who has access: **Anyone** → salin URL `/exec`.
4. Di `config.js`: `mode: 'sheets'` dan isi `appsScriptUrl`.
5. Edit data langsung di Sheet (perubahan tampil ±1 menit). Kolom `aktif` = FALSE untuk menyembunyikan baris; `demo` = TRUE untuk memberi label "DATA CONTOH". Kolom `image` boleh berisi link berbagi Google Drive.
6. Setiap mengubah `Code.gs`, buat *New deployment* / versi baru agar berlaku.

**Opsi C — `mode: 'local'` + isi `appsScriptUrl`.** Tetap pakai dashboard lokal, tetapi pesan formulir juga tercatat di Google Sheets.
Opsional: isi `NOTIFY_EMAIL` di `Code.gs` untuk notifikasi email tiap pesan masuk.

## Hosting gratis
GitHub Pages, Netlify, atau Cloudflare Pages — upload folder ini apa adanya.

## Catatan
- Kata sandi admin mode `local` hanya pengaman tampilan (berjalan di browser), bukan keamanan sungguhan.
- Ikon memakai Lucide dari CDN (`unpkg`), font dari Google Fonts — perlu internet.

## Foto
Setiap layanan dan halaman Tentang memakai gambar. Secara bawaan tampil ilustrasi di `assets/img/illustrations/`.
Untuk memakai foto asli, simpan file (rasio ±4:3, lebar 1200 px, di bawah 300 KB) di `assets/img/photos/` dengan nama:
`komputer.jpg`, `cctv.jpg`, `pengadaan.jpg`, `maintenance.jpg`, `tentang.jpg` — otomatis menggantikan ilustrasi.
Foto produk & portofolio: isi kolom/kolom "URL Foto" dengan path (mis. `assets/img/photos/cctv-ruko.jpg`) atau link Google Drive.
