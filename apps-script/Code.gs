/**
 * Backend Andalan Teknik — Google Apps Script + Google Sheets.
 * Cara pasang: lihat README.md bagian "Opsi B".
 */
const NOTIFY_EMAIL = ''; // opsional: email yang menerima notifikasi pesan baru

const SHEETS = {
  Produk:     ['id', 'name', 'category', 'brand', 'spec', 'price', 'status', 'image', 'demo', 'aktif'],
  Portofolio: ['id', 'title', 'category', 'location', 'desc', 'image', 'demo', 'aktif'],
  Testimoni:  ['id', 'name', 'role', 'text', 'aktif'],
  Pengaturan: ['key', 'value'],
  Pesan:      ['waktu', 'nama', 'perusahaan', 'wa', 'layanan', 'lokasi', 'jadwal', 'kebutuhan']
};

/** Jalankan SEKALI dari editor untuk membuat semua sheet + contoh data. */
function setup() {
  const ss = SpreadsheetApp.getActive();
  Object.keys(SHEETS).forEach(function (n) {
    const sh = ss.getSheetByName(n) || ss.insertSheet(n);
    if (sh.getLastRow() === 0) {
      sh.appendRow(SHEETS[n]);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, SHEETS[n].length).setFontWeight('bold');
    }
  });
  const p = ss.getSheetByName('Pengaturan');
  p.getRange('B:B').setNumberFormat('@'); // nomor WA sebagai teks
  if (p.getLastRow() < 2) {
    p.getRange(2, 1, 3, 2).setValues([['whatsapp', '6281234567890'], ['email', ''], ['hours', 'Senin – Sabtu, 08.00 – 17.00 WIB']]);
  }
  const pr = ss.getSheetByName('Produk');
  if (pr.getLastRow() < 2) pr.appendRow(['p1', 'Contoh Produk', 'Komputer & Laptop', 'Merek', 'Spesifikasi singkat', '', 'Hubungi Admin', '', true, true]);
  const po = ss.getSheetByName('Portofolio');
  if (po.getLastRow() < 2) po.appendRow(['pr1', 'Contoh Proyek', 'CCTV', 'Tembalang, Semarang', 'Deskripsi singkat pekerjaan', '', true, true]);
}

function rows_(name) {
  const sh = SpreadsheetApp.getActive().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  const v = sh.getDataRange().getValues(), h = v.shift();
  return v.filter(function (r) { return r.join('') !== ''; }).map(function (r) {
    const o = {}; h.forEach(function (k, i) { o[k] = r[i]; }); return o;
  });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** Dibaca website: ?action=data */
function doGet(e) {
  const cache = CacheService.getScriptCache();
  let c = cache.get('data');
  if (!c) {
    const s = {}; rows_('Pengaturan').forEach(function (r) { s[r.key] = r.value; });
    c = JSON.stringify({ ok: true, products: rows_('Produk'), projects: rows_('Portofolio'), testimonials: rows_('Testimoni'), settings: s });
    if (c.length < 95000) cache.put('data', c, 60); // data baru tampil maks. ±1 menit setelah diedit
  }
  return ContentService.createTextOutput(c).setMimeType(ContentService.MimeType.JSON);
}

/** Menerima pesan dari formulir konsultasi. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.website) return json_({ ok: true }); // honeypot: bot
    ['nama', 'wa', 'layanan', 'lokasi', 'kebutuhan'].forEach(function (k) {
      if (!String(d[k] || '').trim()) throw new Error('Field wajib kosong: ' + k);
    });
    const v = function (k) { return String(d[k] || '').trim().slice(0, 1000).replace(/^[=+\-@]/, "'$&"); }; // cegah formula injection
    const row = [new Date(), v('nama'), v('perusahaan'), v('wa'), v('layanan'), v('lokasi'), v('jadwal'), v('kebutuhan')];
    SpreadsheetApp.getActive().getSheetByName('Pesan').appendRow(row);
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'Konsultasi baru — ' + row[4],
        'Nama: ' + row[1] + '\nPerusahaan: ' + row[2] + '\nWA: ' + row[3] + '\nLokasi: ' + row[5] + '\nJadwal: ' + row[6] + '\n\n' + row[7]);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
