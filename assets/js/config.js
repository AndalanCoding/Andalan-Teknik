/* =====================================================================
   KONFIGURASI UTAMA — cukup edit file ini untuk pengaturan dasar.
===================================================================== */
const CONFIG = {
  // 'local'  = data disimpan di browser (localStorage), dashboard admin aktif.
  // 'sheets' = data produk/portofolio/testimoni/kontak dibaca dari Google Sheets
  //            lewat Google Apps Script (lihat README.md). Dashboard admin dimatikan.
  mode: 'local',

  // URL Web App Google Apps Script (berakhiran /exec). Jika diisi, pesan dari
  // formulir konsultasi juga dikirim ke Google Sheets (mode apa pun).
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbwumVopHYWuEK4REKrHFKBXJQDeX2mqtnQoF8yHdlvOJbX0D9VTeY-k3OUauspHdl6fWw/exec',

  // GANTI dengan nomor WhatsApp asli — format 62xxxxxxxxxx tanpa tanda "+".
  whatsapp: '628980222087',

  // Hanya untuk mode 'local'. Segera ganti setelah login pertama.
  adminPassword: 'andalan-admin',
  enableAdmin: true,

  // 'logo+text' = logo + tulisan nama di sebelahnya | 'logo-only' = hanya logo
  logoMode: 'logo+text'
};

const USE_SHEETS    = CONFIG.mode === 'sheets' && !!CONFIG.appsScriptUrl;
const ADMIN_ENABLED = CONFIG.enableAdmin && !USE_SHEETS;
let   DATA_LOADING  = USE_SHEETS;
