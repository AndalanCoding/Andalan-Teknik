/**
 * Backend Andalan Teknik — Google Apps Script (terikat ke Google Sheet).
 * Pasang: Extensions > Apps Script, tempel kode ini, ganti TOKEN, jalankan setup() sekali,
 * lalu Deploy > New deployment > Web app (Execute as: Me · Who has access: Anyone).
 */
const TOKEN = '@admin123'; // WAJIB diganti (min. 20 karakter acak)
const NOTIFY_EMAIL = 'webandalanteknik@gmail.com';                              // opsional: email notifikasi permintaan baru
const LEAD_HEADERS = ['id', 'tanggal', 'nama', 'org', 'need', 'pesan', 'status', 'source'];

/** Jalankan SEKALI dari editor: membuat sheet Leads, file data & folder media di Drive. */
function setup() { leads_(); dataFile_(); mediaFolder_(); Logger.log('Siap. Lanjut: Deploy > New deployment > Web app.'); }

function props_() { return PropertiesService.getScriptProperties(); }
function leads_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName('Leads');
  if (!sh) {
    sh = ss.insertSheet('Leads');
    sh.getRange('A:H').setNumberFormat('@');
    sh.appendRow(LEAD_HEADERS); sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, LEAD_HEADERS.length).setFontWeight('bold');
  }
  return sh;
}
function dataFile_() {
  const id = props_().getProperty('DATA_ID');
  if (id) { try { return DriveApp.getFileById(id); } catch (e) {} }
  const f = DriveApp.createFile('andalan-site-data.json', '{}', 'application/json');
  props_().setProperty('DATA_ID', f.getId());
  return f;
}
function mediaFolder_() {
  const id = props_().getProperty('MEDIA_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  const f = DriveApp.createFolder('Andalan Teknik - Media');
  props_().setProperty('MEDIA_ID', f.getId());
  return f;
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function clean_(v, n) { return String(v == null ? '' : v).trim().slice(0, n || 1000).replace(/^[=+\-@]/, "'$&"); } // cegah formula injection

/** Publik: ?action=public → konten situs yang sudah dipublikasikan (tanpa data lead). */
function doGet(e) {
  if (!e || !e.parameter || e.parameter.action !== 'public') return json_({ ok: true, service: 'andalan-teknik' });
  const cache = CacheService.getScriptCache();
  let c = cache.get('pub');
  if (!c) { c = dataFile_().getBlob().getDataAsString() || '{}'; if (c.length < 90000) cache.put('pub', c, 60); }
  return ContentService.createTextOutput('{"ok":true,"data":' + c + '}').setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ error: 'Format tidak valid' }); }
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    if (d.action === 'lead') return lead_(d); // publik (formulir situs)
    if (TOKEN.indexOf('GANTI') === 0) return json_({ error: 'TOKEN di Code.gs belum diganti' });
    if (d.token !== TOKEN) return json_({ error: 'unauthorized' });
    switch (d.action) {
      case 'get': return json_({ ok: true, data: JSON.parse(dataFile_().getBlob().getDataAsString() || '{}'), leads: rows_() });
      case 'save': delete d.data.leads; dataFile_().setContent(JSON.stringify(d.data)); CacheService.getScriptCache().remove('pub'); return json_({ ok: true });
      case 'upload': return upload_(d);
      case 'leadstatus': return patchLead_(d.id, function (sh, r) { sh.getRange(r, 7).setValue(clean_(d.status, 20)); });
      case 'leaddelete': return patchLead_(d.id, function (sh, r) { sh.deleteRow(r); });
    }
    return json_({ error: 'aksi tidak dikenal' });
  } catch (err) {
    return json_({ error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function lead_(d) {
  if (d.website) return json_({ ok: true }); // honeypot: bot
  if (!clean_(d.nama, 80) || !clean_(d.pesan, 600)) return json_({ error: 'nama dan pesan wajib diisi' });
  const row = [clean_(d.id, 20), clean_(d.tanggal, 40), clean_(d.nama, 80), clean_(d.org, 80), clean_(d.need, 80), clean_(d.pesan, 600), 'baru', clean_(d.source, 30)];
  leads_().appendRow(row);
  if (NOTIFY_EMAIL) MailApp.sendEmail(NOTIFY_EMAIL, 'Permintaan baru — ' + row[2], 'Kebutuhan: ' + row[4] + '\nPerusahaan: ' + row[3] + '\n\n' + row[5]);
  return json_({ ok: true });
}
function rows_() {
  const v = leads_().getDataRange().getValues(); v.shift();
  return v.filter(function (r) { return r[0] !== ''; }).map(function (r) {
    const o = {}; LEAD_HEADERS.forEach(function (h, i) { o[h] = String(r[i]); }); return o;
  }).reverse();
}
function patchLead_(id, fn) {
  const sh = leads_(), ids = sh.getRange(1, 1, sh.getLastRow(), 1).getValues();
  for (let r = 2; r <= ids.length; r++) if (String(ids[r - 1][0]) === String(id)) { fn(sh, r); return json_({ ok: true }); }
  return json_({ error: 'permintaan tidak ditemukan' });
}
function upload_(d) {
  if (!/^image\/(jpeg|png|webp|gif)$/.test(d.mime || '')) return json_({ error: 'Tipe file tidak didukung' });
  if (!d.data || d.data.length > 7000000) return json_({ error: 'File terlalu besar (maks ±5 MB)' });
  const name = clean_(d.name, 80).replace(/[^\w.\-]+/g, '_') || 'foto.jpg';
  const f = mediaFolder_().createFile(Utilities.newBlob(Utilities.base64Decode(d.data), d.mime, name));
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return json_({ ok: true, id: f.getId(), url: 'https://drive.google.com/thumbnail?id=' + f.getId() + '&sz=w1600' });
}
