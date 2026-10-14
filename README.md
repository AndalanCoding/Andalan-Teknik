# Andalan Teknik — Website + Dashboard Admin

Website statis (HTML + CSS + JS, tanpa proses build). Buka `index.html` langsung, atau upload folder ini ke hosting.
Dashboard admin: buka **`admin.html`** (halaman terpisah, tidak diindeks Google). Alamat lama `index.html#/admin` otomatis diarahkan ke sana.

## Struktur
```
index.html             situs publik (SEO, favicon)
admin.html             dashboard admin (login → kelola konten)
assets/css/            base · home · pages · layout · admin
assets/js/config.js    ★ PENGATURAN UTAMA (apiUrl, nomor WhatsApp, sandi awal admin)
assets/js/data.js      konten bawaan (layanan, promo, paket, produk, portofolio, FAQ, Tentang)
assets/js/store.js     penyimpanan data (admin vs pengunjung)
assets/js/remote.js    komunikasi dengan Google Apps Script
assets/js/media.js     tampilan gambar + unggah foto
assets/js/pages/       satu file per halaman
assets/js/admin*.js    dashboard admin
apps-script/Code.gs    backend Google Apps Script (juga tersedia di tab "Integrasi & Data")
```

## Login admin
Sandi awal: `admin1234` (di `config.js` → `defaultAdminPassword`). Ganti di tab **Integrasi & Data**.
Sandi ini hanya pengaman tampilan dan tersimpan per browser. TOKEN di `Code.gs` adalah hal yang BERBEDA (izin menulis ke Google).

## Yang WAJIB diganti
1. `config.js` → `whatsapp` (masih nomor contoh `6281234567890`).
2. Sandi admin (lihat di atas).
3. Setelah punya domain: ubah `og:image` di `index.html` menjadi URL lengkap.

## PILIHAN 1 — Cara menyimpan konten
**A. Mode lokal (`apiUrl` kosong, bawaan).** Data tersimpan di browser admin saja. Pengunjung lain TIDAK melihat perubahan,
dan pesan formulir tidak sampai ke admin. Cocok hanya untuk uji coba.

**B. Mode online (disarankan).** Konten dipublikasikan ke Google Drive, pesan masuk ke Google Sheets, foto diunggah ke Google Drive.
1. Buat Google Sheet baru → *Extensions → Apps Script* → tempel isi `apps-script/Code.gs`.
2. Ganti `TOKEN` (min. 20 karakter acak; jangan dibagikan). Opsional isi `NOTIFY_EMAIL`.
3. Jalankan fungsi `setup` sekali (izinkan akses Sheets, Drive, dan email jika dipakai).
4. *Deploy → New deployment → Web app* · Execute as **Me** · Who has access **Anyone** → salin URL `/exec`.
5. Tempel URL itu ke `config.js` → `apiUrl`.
6. Buka `admin.html` → login → tab **Integrasi & Data** → isi token yang sama → **Simpan Konfigurasi** → **Tarik Data**.
7. Edit konten → klik **Publikasikan** (sidebar). Pengunjung melihat versi baru saat membuka situs.
Perubahan `Code.gs` berlaku setelah *Manage deployments → edit → New version*; URL tetap sama.

## PILIHAN 2 — Foto
- **Unggah dari dashboard:** di form Promo/Produk/Portofolio klik **Unggah Foto**. Mode online → Google Drive (tampil di semua perangkat). Mode lokal → dikompres, disimpan di browser.
- **Tempel URL:** URL gambar apa pun, atau link berbagi Google Drive (otomatis dikonversi).
- **Kosong:** placeholder ikon sesuai kategori.

## PILIHAN 3 — Hosting gratis
GitHub Pages, Netlify, atau Cloudflare Pages: upload folder ini apa adanya.

## Isi yang bisa dikelola admin
Konten Beranda · Promo & Banner · Paket Hemat · Katalog Produk · Layanan · Portofolio · Sektor · Halaman Tentang · FAQ · Testimoni ·
Info Perusahaan (WA, email, alamat, jam, peta) · Permintaan Konsultasi (status, hapus, export CSV). Tombol ▲▼ mengatur urutan.

## Keamanan
- Yang melindungi data online adalah **TOKEN** di Apps Script (menulis, mengunggah, dan membaca pesan selalu butuh token).
- Pengunjung hanya bisa membaca konten publik dan mengirim formulir (ada kolom jebakan bot).
- Hanya font Google Fonts yang dimuat dari internet.
