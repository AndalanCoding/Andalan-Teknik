/* ===================== HALAMAN: PORTOFOLIO ===================== */
let pfCat = 'Semua';
function pfGridHTML(){
  const list = DATA.projects.filter(p=>pfCat==='Semua'||p.category===pfCat);
  if(!list.length && DATA_LOADING) return '<div class="empty-state">Memuat data…</div>';
  if(!list.length) return '<div class="empty-state">Belum ada dokumentasi untuk kategori ini. Dokumentasi proyek diperbarui oleh tim kami secara berkala.</div>';
  return list.map((p,i)=>projCard(p,false,i*50)).join('');
}
function renderPortofolio(){
  return `
  <section class="page-head"><div class="container">
    <span class="crumb"><a href="#/">BERANDA</a><i data-lucide="chevron-right"></i>PORTOFOLIO</span>
    <h1>Portofolio &amp; Dokumentasi Pekerjaan</h1>
    <p>Galeri dokumentasi pekerjaan instalasi CCTV, perawatan komputer, upgrade perangkat, pengadaan, hingga penataan kabel dan jaringan.</p>
  </div></section>
  <section class="section"><div class="container">
    ${DATA.projects.some(p=>p.demo) ? `
    <div class="demo-banner">
      <i data-lucide="info"></i>
      <div><b>Data contoh.</b> Dokumentasi berikut adalah contoh untuk pratinjau tampilan. Sesuai kebijakan kami, identitas dan foto pelanggan tidak ditampilkan tanpa izin — lokasi ditulis secara umum.</div>
    </div>
    ` : ''}
    <div class="chip-row" id="pf-chips">
      ${['Semua',...PF_CATS].map(c=>'<button class="chip'+(c===pfCat?' active':'')+'" type="button" data-c="'+esc(c)+'">'+esc(c)+'</button>').join('')}
    </div>
    <div class="pf-grid" id="pf-grid"></div>
  </div></section>`;
}
function mountPortofolio(){
  const paint = ()=>{ $('#pf-grid').innerHTML = pfGridHTML(); initReveal(); refreshIcons(); };
  $$('#pf-chips .chip').forEach(c=>c.addEventListener('click', ()=>{
    pfCat = c.dataset.c;
    $$('#pf-chips .chip').forEach(x=>x.classList.toggle('active', x===c));
    paint();
  }));
  paint();
}

