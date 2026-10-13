/* ===================== UTIL ===================== */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const uid = () => 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2,8);
const fmtIDR = n => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const splitLines = s => s.split('\n').map(x=>x.trim()).filter(Boolean);
const pad2 = n => String(n+1).padStart(2,'0');
function refreshIcons(){ try{ if(window.lucide) lucide.createIcons(); }catch(e){} }

function loadData(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(raw){
      const d = JSON.parse(raw);
      return Object.assign({}, structuredClone(DEFAULT_DATA), d, {
        settings: Object.assign({}, DEFAULT_DATA.settings, d.settings||{})
      });
    }
  }catch(e){}
  return structuredClone(DEFAULT_DATA);
}
let DATA = loadData();
function saveData(){ if(USE_SHEETS) return; try{ localStorage.setItem(LS_KEY, JSON.stringify(DATA)); }catch(e){} }

/* ===================== WHATSAPP ===================== */
function waLink(msg){ return 'https://wa.me/08980222087' + DATA.settings.whatsapp + '?text=' + encodeURIComponent(msg); }
function waQuote(serviceTitle){
  return 'Halo Andalan Teknik, saya ingin meminta penawaran untuk layanan "' + serviceTitle + '".\n\nMohon informasi mengenai cakupan pekerjaan dan estimasi biayanya. Terima kasih.';
}
function waProduct(p){
  return 'Halo Andalan Teknik, saya ingin menanyakan produk berikut:\n\nNama Produk: ' + p.name + '\nKategori: ' + p.category + '\n\nApakah produk ini tersedia? Mohon informasi harga dan spesifikasinya. Terima kasih.';
}

