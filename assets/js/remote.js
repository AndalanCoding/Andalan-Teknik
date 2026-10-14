"use strict";
/* =====================================================================
   REMOTE — komunikasi dengan Google Apps Script (opsional)
===================================================================== */
const REMOTE_KEY='andalan_remote_cfg';
function getRemote(){
  let s={}; try{ s=JSON.parse(localStorage.getItem(REMOTE_KEY))||{}; }catch(e){}
  return {enabled:s.enabled!==undefined?!!s.enabled:!!CONFIG.apiUrl, url:s.url||CONFIG.apiUrl||'', token:s.token||''};
}
function setRemote(c){ localStorage.setItem(REMOTE_KEY,JSON.stringify(c)); }

/* Panggilan admin (butuh token) — token dikirim lewat body POST, bukan URL */
async function api(action,payload){
  const c=getRemote(); if(!c.url) throw new Error('URL Apps Script belum diisi');
  const r=await fetch(c.url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},redirect:'follow',
    body:JSON.stringify(Object.assign({action,token:c.token},payload||{}))});
  const j=await r.json(); if(j.error||j.ok===false) throw new Error(j.error||'Permintaan gagal'); return j;
}
async function remotePull(){
  const c=getRemote(); if(!c.enabled||!c.url) throw new Error('Integrasi belum diaktifkan / URL kosong');
  const j=await api('get');
  DB=mergeDefault(Object.assign({},j.data||{},{leads:j.leads||[]}));
  try{ localStorage.setItem(LS_KEY,JSON.stringify(DB)); localStorage.removeItem(DIRTY_KEY); localStorage.setItem(PULLED_KEY,'1'); }catch(e){}
  buildNav();
}
async function remotePush(){
  const c=getRemote(); if(!c.enabled||!c.url) throw new Error('Integrasi belum diaktifkan / URL kosong');
  if(!localStorage.getItem(PULLED_KEY)){            // cegah menimpa data online secara tidak sengaja
    const j=await api('get');
    if(j.data&&Object.keys(j.data).length&&!window.confirm('Server sudah berisi data. Mengirim akan MENIMPA data online dengan data di browser ini.\n\nSebaiknya klik "Tarik Data" dulu. Tetap lanjutkan?')) throw new Error('Dibatalkan.');
  }
  const data=Object.assign({},DB); delete data.leads;
  await api('save',{data});
  localStorage.removeItem(DIRTY_KEY); localStorage.setItem(PULLED_KEY,'1'); updatePubStatus();
}
async function remoteLead(op,id,status){
  const c=getRemote(); if(!c.enabled||!c.token) return;
  try{ await api(op==='del'?'leaddelete':'leadstatus',{id,status}); }catch(e){ toast('Gagal sinkron ke server: '+e.message,'err'); }
}

/* Pengunjung: kirim lead ke Google Sheets (mode online) atau simpan lokal */
function submitLead(lead,honeypot){
  if(!CONFIG.apiUrl){ DB.leads.unshift(lead); saveDB(); return; }
  try{ fetch(CONFIG.apiUrl,{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify(Object.assign({action:'lead',website:honeypot||''},lead))}); }catch(e){}
}
/* Pengunjung: ambil konten terbaru yang dipublikasikan admin */
async function syncPublic(){
  if(!CONFIG.apiUrl||isAdminSession()) return;
  try{
    const r=await fetch(CONFIG.apiUrl+'?action=public'); const j=await r.json();
    if(!j.ok||!j.data||!Object.keys(j.data).length) return;
    const raw=JSON.stringify(j.data); if(raw===localStorage.getItem(PUB_KEY)) return;
    localStorage.setItem(PUB_KEY,raw); if(isAdminSession()) return;
    DB=loadPub(); buildNav(); if(!/^#\/?admin/.test(location.hash)) route();
  }catch(e){ console.warn('Sinkron data publik gagal:',e); }
}

/* Tombol & status "Publikasikan" di sidebar admin */
function pubStatusHTML(){
  return localStorage.getItem(DIRTY_KEY)==='1'?'<span style="color:var(--red)">● Belum dipublikasikan</span>':'<span style="color:var(--cyan)">● Sudah tayang</span>';
}
function updatePubStatus(){ const s=document.getElementById('pub-st'); if(s) s.innerHTML=pubStatusHTML(); }
function adPublishHTML(){
  if(!getRemote().enabled) return '<div style="font-size:11.5px;color:var(--mut);margin-bottom:10px;line-height:1.5">Mode lokal: perubahan hanya tampil di browser ini.</div>';
  return '<div id="pub-st" class="mono" style="font-size:11px;margin-bottom:8px">'+pubStatusHTML()+'</div><button class="btn btn-p btn-sm" style="width:100%;justify-content:center;margin-bottom:8px" id="ad-publish">'+ic('up')+'Publikasikan</button>';
}
function bindPublish(){
  const b=document.getElementById('ad-publish'); if(!b) return;
  b.onclick=async()=>{ b.disabled=true; try{ await remotePush(); toast('Perubahan dipublikasikan ke situs.'); }catch(e){ toast('Gagal: '+e.message,'err'); } b.disabled=false; };
}
