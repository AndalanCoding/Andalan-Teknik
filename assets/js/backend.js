/* =====================================================================
   BACKEND — integrasi Google Apps Script / Google Sheets (opsional)
===================================================================== */
const LS_SHEETS = 'andalan_sheets_cache_v1';
const isOn = (v, def) => (v === '' || v == null) ? def : (v === true || /^(true|1|ya|yes)$/i.test(String(v).trim()));

/* Link Google Drive (file/d/ID/view) → URL gambar yang bisa ditampilkan */
function imgUrl(u){
  const m = String(u || '').match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
  return m ? 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w1000' : u;
}

function applySheetData(r){
  const num = v => (v === '' || v == null || isNaN(+v)) ? null : +v;
  DATA.products = (r.products || []).filter(x => x.name && isOn(x.aktif, true)).map(x => ({
    id: String(x.id || uid()), name: String(x.name), category: x.category || CATS[0], brand: x.brand || '',
    spec: x.spec || '', price: num(x.price), status: x.status || 'Hubungi Admin', image: x.image || '', demo: isOn(x.demo, false)
  }));
  DATA.projects = (r.projects || []).filter(x => x.title && isOn(x.aktif, true)).map(x => ({
    id: String(x.id || uid()), title: String(x.title), category: x.category || 'Lainnya', location: x.location || '',
    desc: x.desc || '', image: x.image || '', demo: isOn(x.demo, false)
  }));
  DATA.testimonials = (r.testimonials || []).filter(x => x.text && isOn(x.aktif, true)).map(x => ({
    id: String(x.id || uid()), name: x.name || 'Pelanggan', role: x.role || '', text: String(x.text)
  }));
  DATA.products.forEach(p => { if(!CATS.includes(p.category)) CATS.push(p.category); });
  DATA.projects.forEach(p => { if(!PF_CATS.includes(p.category)) PF_CATS.push(p.category); });
  DATA.settings = Object.assign({}, DEFAULT_DATA.settings);
  ['whatsapp', 'email', 'hours'].forEach(k => { const v = (r.settings || {})[k]; if(v) DATA.settings[k] = String(v).trim(); });
}

async function syncFromSheets(){
  if(!USE_SHEETS) return;
  const wasLoading = DATA_LOADING;
  let changed = false;
  try{
    const res = await fetch(CONFIG.appsScriptUrl + '?action=data');
    const j = await res.json();
    if(!j.ok) throw new Error(j.error || 'respon tidak valid');
    const raw = JSON.stringify(j);
    try{ changed = raw !== localStorage.getItem(LS_SHEETS); localStorage.setItem(LS_SHEETS, raw); }catch(e){ changed = true; }
    applySheetData(j);
  }catch(e){ console.warn('Sinkronisasi Google Sheets gagal:', e); }
  DATA_LOADING = false;
  if(changed || wasLoading){
    updateSettingsUI();
    if(['home', 'pengadaan', 'portofolio'].includes(getRoute())) route(true);
  }
}

/* Kirim pesan formulir ke Google Sheets (tanpa menunggu respon) */
function sendToSheet(d){
  if(!CONFIG.appsScriptUrl) return;
  try{
    fetch(CONFIG.appsScriptUrl, {
      method: 'POST', mode: 'no-cors', keepalive: true,
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify(Object.assign({action: 'contact'}, d))
    });
  }catch(e){}
}

/* Mode sheets: tampilkan cache terakhir lebih dulu agar cepat */
if(USE_SHEETS){
  try{
    const c = JSON.parse(localStorage.getItem(LS_SHEETS) || 'null');
    applySheetData(c || {});
    if(c) DATA_LOADING = false;
  }catch(e){ applySheetData({}); }
}
