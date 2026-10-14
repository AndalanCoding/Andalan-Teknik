"use strict";
/* =====================================================================
   KONFIGURASI UTAMA — cukup edit file ini untuk pengaturan dasar.
===================================================================== */
const CONFIG = {
  // URL Web App Google Apps Script (berakhiran /exec). Lihat README.md.
  // Kosong  = MODE LOKAL: data hanya tersimpan di browser admin.
  // Diisi   = MODE ONLINE: konten & pesan masuk tersimpan di Google Drive/Sheets
  //           sehingga perubahan admin tampil untuk semua pengunjung.
  apiUrl: 'https://script.google.com/macros/s/AKfycbwkFbrpgHJi5zt_XK2652i6CmRn8hXASGG13hB0dP0clBumjoYZ-6S0mFKj_l9gymk2/exec',

  // GANTI dengan nomor WhatsApp asli — format 62xxxxxxxxxx tanpa tanda "+".
  whatsapp: '+6282221037833',

  // Sandi awal dashboard admin (#/admin). Segera ganti dari tab "Integrasi & Data".
  defaultAdminPassword: '@admin123'
};

