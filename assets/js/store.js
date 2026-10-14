"use strict";
/* =====================================================================
   STORE — penyimpanan data situs
   • Admin     : salinan kerja di localStorage (LS_KEY)
   • Pengunjung: salinan publik hasil unduhan dari server (PUB_KEY) bila
                 CONFIG.apiUrl diisi, selain itu data default/lokal.
===================================================================== */
const LS_KEY='andalan_db_v1', PUB_KEY='andalan_public_cache_v1', DIRTY_KEY='andalan_dirty', PULLED_KEY='andalan_pulled';
const isAdminSession=()=>sessionStorage.getItem('adal_auth')==='1';
function readLS(k){ try{ const r=localStorage.getItem(k); return r?JSON.parse(r):null; }catch(e){ return null; } }
function mergeDefault(d){
  d=d||{};
  return Object.assign(structuredClone(DEFAULT_DB), d, {
    company:Object.assign({},DEFAULT_DB.company,d.company||{}),
    hero:Object.assign({},DEFAULT_DB.hero,d.hero||{}),
    about:Object.assign({},DEFAULT_DB.about,d.about||{}),
    leads:Array.isArray(d.leads)?d.leads:[]
  });
}
function loadPub(){ return mergeDefault(readLS(PUB_KEY)); }
function loadDB(){ const d=readLS(LS_KEY); if(d) return mergeDefault(d); return CONFIG.apiUrl?loadPub():structuredClone(DEFAULT_DB); }
function refreshDB(){ DB=(CONFIG.apiUrl&&!isAdminSession())?loadPub():loadDB(); }
let DB=(CONFIG.apiUrl&&!isAdminSession())?loadPub():loadDB();
function saveDB(noDirty){
  try{ localStorage.setItem(LS_KEY,JSON.stringify(DB)); }
  catch(e){ toast('Penyimpanan browser penuh. Aktifkan Google Drive (tab Integrasi & Data) atau pakai gambar lebih kecil.','err'); return; }
  if(!noDirty && getRemote().enabled){ localStorage.setItem(DIRTY_KEY,'1'); updatePubStatus(); }
}
