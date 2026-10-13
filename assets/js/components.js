/* ===================== KOMPONEN TEMPLATE ===================== */
const CORNERS = '<span class="cnr tl"></span><span class="cnr tr"></span><span class="cnr bl"></span><span class="cnr br"></span>';
function secHead(index,title,sub,link){
  return '<div class="sec-head reveal"><div>'+
    '<span class="sec-index">'+index+'</span>'+
    '<h2 class="sec-title">'+title+'</h2>'+
    (sub?'<p class="sec-sub">'+sub+'</p>':'')+
  '</div>'+(link||'')+'</div>';
}
/* key → foto asli di assets/img/photos/<key>.jpg; jika belum ada, otomatis memakai ilustrasi bawaan */
function photoImg(key, alt){
  return '<img class="fig-img" src="assets/img/photos/'+key+'.jpg" alt="'+(alt||'')+'" loading="lazy" '+
    'onerror="this.onerror=null;this.src=\'assets/img/illustrations/'+key+'.svg\'">';
}
function figDark(icon, cap, wm, cls, key, alt){
  return '<div class="fig-dark '+(cls||'')+'">'+(key?photoImg(key,alt):'')+CORNERS+
    (key?'':'<i data-lucide="'+icon+'"></i>')+
    (wm&&!key?'<span class="fig-wm">'+wm+'</span>':'')+
    '<span class="fig-cap">'+cap+'</span></div>';
}
function checkList(items){
  return '<ul class="check-list">'+items.map(x=>'<li><i data-lucide="check"></i><span>'+esc(x)+'</span></li>').join('')+'</ul>';
}
function projCard(p, featured, delay){
  const ic = PF_ICONS[p.category]||'wrench';
  return '<article class="pf-card'+(featured?' lg':'')+' reveal" style="transition-delay:'+(delay||0)+'ms">'+
    '<div class="pf-fig">'+
      (p.image
        ? '<img src="'+esc(imgUrl(p.image))+'" alt="'+esc(p.title)+'" loading="lazy">'
        : '<div class="fig-dark pf in-card">'+CORNERS+'<i data-lucide="'+ic+'"></i><span class="fig-cap">'+esc(p.category).toUpperCase()+'</span></div>')+
      (p.demo?'<span class="demo-badge">DATA CONTOH</span>':'')+
    '</div>'+
    '<div class="pf-body">'+
      '<div class="pf-meta"><span class="pf-tag">'+esc(p.category)+'</span>'+
      '<span class="pf-loc"><i data-lucide="map-pin"></i>'+esc(p.location)+'</span></div>'+
      '<h3>'+esc(p.title)+'</h3><p>'+esc(p.desc)+'</p>'+
    '</div></article>';
}
function statusClass(s){ return s==='Tersedia'?'ada':(s==='Habis'?'habis':'tanya'); }

/* ===================== HERO SVG (ilustrasi skematik) ===================== */
function heroSVG(){
  return `
  <!-- Opsional: ilustrasi ini dapat diganti dengan foto teknisi asli yang sedang bekerja -->
  <svg class="hero-svg" viewBox="0 0 560 440" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustrasi skematik instalasi CCTV dengan akses smartphone">
    <!-- dinding -->
    <line x1="50" y1="34" x2="50" y2="310" stroke="#3D6CB5" stroke-width="2"/>
    <path d="M42 52 L50 44 M42 76 L50 68 M42 100 L50 92 M42 124 L50 116 M42 148 L50 140 M42 172 L50 164 M42 196 L50 188 M42 220 L50 212 M42 244 L50 236 M42 268 L50 260 M42 292 L50 284" stroke="#3D6CB5" stroke-width="1.4"/>
    <!-- braket dinding -->
    <path d="M50 116 H128 M50 154 H128" stroke="#3D6CB5" stroke-width="2"/>
    <circle cx="132" cy="135" r="9" fill="#0A1B33" stroke="#5E9BFF" stroke-width="2"/>
    <!-- kamera (berputar perlahan) -->
    <g class="cam" style="transform-origin:132px 135px">
      <rect x="126" y="128" width="24" height="14" rx="4" fill="#10294E" stroke="#5E9BFF" stroke-width="1.6"/>
      <path d="M150 100 Q222 84 294 100" stroke="#5E9BFF" stroke-width="2"/>
      <rect x="146" y="103" width="152" height="64" rx="18" fill="#10294E" stroke="#5E9BFF" stroke-width="2"/>
      <path d="M166 116 V154 M180 113 V157 M194 113 V157" stroke="#2C5288" stroke-width="1.5"/>
      <path d="M146 152 C128 184 94 178 86 216" stroke="#2C5288" stroke-width="2"/>
      <path d="M312 128 L436 84 L436 240 L312 142 Z" fill="rgba(111,165,255,0.06)"/>
      <path d="M312 128 L436 84 M312 142 L436 240" stroke="#2C5288" stroke-width="1.3" stroke-dasharray="5 7"/>
      <circle cx="298" cy="135" r="19" fill="#0A1B33" stroke="#5E9BFF" stroke-width="2"/>
      <circle cx="298" cy="135" r="8" fill="#1E6DE5"/>
      <circle cx="302" cy="131" r="2.4" fill="#CFE1FF"/>
    </g>
    <!-- chip REC -->
    <rect x="196" y="62" width="66" height="26" rx="13" fill="#0A1B33" stroke="#2C5288"/>
    <circle cx="210" cy="75" r="4" fill="#F2620E" class="blink"/>
    <text x="221" y="79" fill="#9FC2FF" font-size="11" letter-spacing="1">REC</text>
    <!-- anotasi dimensi -->
    <path d="M146 40 V28 M298 40 V28 M146 34 H298" stroke="#2C5288" stroke-width="1"/>
    <text x="222" y="22" fill="#7FA8E8" font-size="10" letter-spacing="2" text-anchor="middle">TITIK KAMERA — 01</text>
    <path d="M268 170 L316 206 H428" stroke="#2C5288" stroke-width="1"/>
    <text x="322" y="202" fill="#7FA8E8" font-size="10" letter-spacing="1.5">LENS 2.8MM · IR 20M</text>
    <!-- aliran data ke smartphone -->
    <path d="M312 150 C 380 192, 400 200, 448 226" stroke="#1E6DE5" stroke-width="1.6" class="flow" stroke-dasharray="3 7"/>
    <rect x="448" y="196" width="86" height="158" rx="16" fill="#10294E" stroke="#5E9BFF" stroke-width="2"/>
    <rect x="457" y="210" width="68" height="120" rx="6" fill="#0A1B33" stroke="#2C5288"/>
    <rect x="463" y="216" width="28" height="52" rx="3" fill="rgba(111,165,255,0.07)" stroke="#6FA5FF"/>
    <circle cx="486" cy="223" r="2.4" fill="#F2620E" class="blink"/>
    <rect x="495" y="216" width="28" height="52" rx="3" fill="rgba(111,165,255,0.06)" stroke="#2C5288"/>
    <rect x="463" y="274" width="28" height="52" rx="3" fill="rgba(111,165,255,0.06)" stroke="#2C5288"/>
    <rect x="495" y="274" width="28" height="52" rx="3" fill="rgba(111,165,255,0.06)" stroke="#2C5288"/>
    <path d="M478 339 H504" stroke="#2C5288" stroke-width="2"/>
    <text x="491" y="376" fill="#7FA8E8" font-size="10" letter-spacing="1.5" text-anchor="middle">AKSES VIA</text>
    <text x="491" y="390" fill="#7FA8E8" font-size="10" letter-spacing="1.5" text-anchor="middle">SMARTPHONE</text>
    <!-- tanda silang blueprint -->
    <path d="M112 388 h16 M120 380 v16" stroke="#2C5288" stroke-width="1.2"/>
    <path d="M404 52 h16 M412 44 v16" stroke="#2C5288" stroke-width="1.2"/>
    <!-- garis dasar -->
    <path d="M40 416 H536" stroke="#2C5288" stroke-width="1" stroke-dasharray="2 6"/>
    <text x="40" y="434" fill="#5480C4" font-size="9.5" letter-spacing="1.5">SKEMA INSTALASI — ANDALAN TEKNIK</text>
    <text x="536" y="434" fill="#5480C4" font-size="9.5" letter-spacing="1.5" text-anchor="end">SKEMA 01 · CCTV &amp; REMOTE ACCESS</text>
  </svg>`;
}

/* ===================== FOOTER ===================== */
function renderFooter(){
  const s = DATA.settings;
  $('#site-footer').innerHTML = `
  <div class="foot-grid">
    <div class="foot-brand">
      <a class="brand" href="#/">
        <img class="brand-mark" src="assets/img/logo.png" alt="Logo Andalan Teknik" width="46" height="42">
        <span class="brand-txt"><b>Andalan Teknik</b><small>CV. KARYA ANDALAN TEKNIK</small></span>
      </a>
      <p>Jasa service, maintenance, instalasi, dan pengadaan perangkat komputer &amp; CCTV untuk rumah tangga, kantor, sekolah, instansi, dan bisnis.</p>
      <div class="foot-addr"><i data-lucide="map-pin"></i><span>${esc(ADDRESS)}</span></div>
    </div>
    <div>
      <h4>Layanan</h4>
      <ul>
        <li><a href="#/layanan">Service &amp; Maintenance Komputer</a></li>
        <li><a href="#/layanan">Instalasi &amp; Maintenance CCTV</a></li>
        <li><a href="#/pengadaan">Pengadaan Perangkat IT</a></li>
        <li><a href="#/layanan">Maintenance IT Berkala</a></li>
      </ul>
    </div>
    <div>
      <h4>Perusahaan</h4>
      <ul>
        <li><a href="#/">Beranda</a></li>
        <li><a href="#/tentang">Tentang Kami</a></li>
        <li><a href="#/portofolio">Portofolio</a></li>
        <li><a href="#/kontak">Kontak</a></li>
      </ul>
    </div>
    <div>
      <h4>Kontak &amp; Jam Layanan</h4>
      <div class="foot-hours"><i data-lucide="clock"></i><span id="foot-hours">${esc(s.hours)}</span></div>
      <div class="foot-hours" style="margin-top:10px"><i data-lucide="map-pin"></i><span>Wilayah layanan utama: Semarang &amp; sekitarnya</span></div>
      <div class="foot-wa"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(WA_FLOAT_MSG)}">Chat WhatsApp</a></div>
    </div>
  </div>
  <div class="foot-bottom">
    <span>© <span id="year"></span> CV. Karya Andalan Teknik · Andalan Teknik</span>
    <span>Semarang, Jawa Tengah${ADMIN_ENABLED?' · <a href="#/admin">Login Admin</a>':''}</span>
  </div>`;
  const y = $('#year'); if(y) y.textContent = new Date().getFullYear();
  refreshIcons();
}
function updateSettingsUI(){
  const s = DATA.settings;
  const tb = $('#tb-hours'); if(tb) tb.textContent = s.hours;
  const fw = $('#wa-float'); if(fw) fw.href = waLink(WA_FLOAT_MSG);
  renderFooter();
}

