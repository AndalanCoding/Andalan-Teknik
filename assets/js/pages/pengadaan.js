/* ===================== HALAMAN: PENGADAAN ===================== */
let prodCat = 'Semua', prodQ = '';
function prodCard(p){
  const ic = CAT_ICONS[p.category]||'cpu';
  return `<article class="prod-card reveal">
    <div class="prod-fig">
      ${p.image
        ? '<img src="'+esc(imgUrl(p.image))+'" alt="'+esc(p.name)+'" loading="lazy">'
        : '<i data-lucide="'+ic+'"></i><span class="fig-note">FOTO PRODUK</span>'}
      <span class="st ${statusClass(p.status)}" style="right:10px">${esc(p.status)}</span>
      ${p.demo?'<span class="demo-badge">DATA CONTOH</span>':''}
    </div>
    <div class="prod-body">
      <span class="prod-cat">${esc(p.category)}</span>
      <h3>${esc(p.name)}</h3>
      <p class="prod-meta">Merek / tipe: ${esc(p.brand||'hubungi kami')}</p>
      ${p.spec?'<p class="prod-spec">'+esc(p.spec)+'</p>':''}
      <div class="prod-foot">
        <span class="prod-price">${p.price!=null?fmtIDR(p.price):'Harga: hubungi kami'}</span>
        <a class="btn btn-wa-o btn-sm btn-block" target="_blank" rel="noopener" href="${waLink(waProduct(p))}">Tanyakan Produk via WhatsApp</a>
      </div>
    </div>
  </article>`;
}
function prodGridHTML(){
  const list = DATA.products.filter(p=>
    (prodCat==='Semua' || p.category===prodCat) &&
    (!prodQ || (p.name+' '+p.brand+' '+p.spec).toLowerCase().includes(prodQ))
  );
  if(!list.length && DATA_LOADING) return '<div class="empty-state">Memuat data…</div>';
  if(!list.length) return '<div class="empty-state">Tidak ada produk yang cocok dengan pencarian atau filter Anda. Coba ubah kata kunci, atau tanyakan langsung via WhatsApp.</div>';
  return list.map(prodCard).join('');
}
function renderPengadaan(){
  return `
  <section class="page-head"><div class="container">
    <span class="crumb"><a href="#/">BERANDA</a><i data-lucide="chevron-right"></i>PENGADAAN</span>
    <h1>Pengadaan Perangkat IT</h1>
    <p>Ingin membeli atau mengadakan komputer, CCTV, dan perangkat pendukung IT? Kami siapkan penawaran berdasarkan spesifikasi dan anggaran Anda.</p>
  </div></section>
  <section class="section"><div class="container">
    ${DATA.products.some(p=>p.demo) ? `
    <div class="demo-banner">
      <i data-lucide="info"></i>
      <div><b>Mode demo katalog.</b> Data produk di bawah adalah contoh untuk pratinjau tampilan — bukan stok, harga, atau merek yang sesungguhnya. Data asli dikelola melalui Dashboard Admin, dan harga hanya ditampilkan jika sudah ditetapkan.</div>
    </div>
    ` : ''}
    <div class="toolbar">
      <div class="search-box"><i data-lucide="search"></i><input id="prod-search" type="text" placeholder="Cari produk..."></div>
      <span class="res-count" id="prod-count"></span>
    </div>
    <div class="chip-row" id="cat-chips">
      ${['Semua',...CATS].map(c=>'<button class="chip'+(c===prodCat?' active':'')+'" type="button" data-c="'+esc(c)+'">'+esc(c)+'</button>').join('')}
    </div>
    <div class="prod-grid" id="prod-grid"></div>
    <div class="proc-note-card">
      <div>
        <h3>Butuh perangkat dengan spesifikasi tertentu?</h3>
        <p>Kami siapkan penawaran pengadaan berdasarkan spesifikasi dan anggaran yang Anda tetapkan — untuk kantor, sekolah, instansi, maupun usaha.</p>
      </div>
      <a class="btn btn-orange" target="_blank" rel="noopener" href="${waLink('Halo Andalan Teknik, saya ingin meminta penawaran pengadaan perangkat IT.\n\nMohon informasi lebih lanjut. Terima kasih.')}">Minta Penawaran <i data-lucide="arrow-up-right"></i></a>
    </div>
  </div></section>`;
}
function mountPengadaan(){
  const paint = ()=>{
    $('#prod-grid').innerHTML = prodGridHTML();
    const n = $('#prod-grid').querySelectorAll('.prod-card').length;
    $('#prod-count').textContent = n + ' PRODUK';
    initReveal(); refreshIcons();
  };
  $$('#cat-chips .chip').forEach(c=>c.addEventListener('click', ()=>{
    prodCat = c.dataset.c;
    $$('#cat-chips .chip').forEach(x=>x.classList.toggle('active', x===c));
    paint();
  }));
  const inp = $('#prod-search');
  inp.addEventListener('input', ()=>{ prodQ = inp.value.trim().toLowerCase(); paint(); });
  paint();
}

