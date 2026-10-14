"use strict";
function vTentang(){
  const C=DB.company;
  return `
  <div class="phero"><div class="wrap"><div class="kick">// TENTANG KAMI</div>
  <h1>${esc(C.legal)}</h1><p>Dikenal sebagai <b style="color:var(--txt)">${esc(C.brand)}</b> — penyedia jasa service, maintenance, instalasi, dan pengadaan perangkat teknologi yang berbasis di Semarang.</p></div></div>
  <section><div class="wrap" style="display:grid;grid-template-columns:1.2fr .8fr;gap:40px;align-items:start">
    <div>
      <div class="panel rv" style="margin-bottom:18px">
        <h3>${ic('code')} Profil Perusahaan</h3>
        <p style="font-size:15px">${esc(DB.about.profile).replace(/\{brand\}/g,esc(C.brand))}</p>
      </div>
      <div class="panel rv">
        <h3>${ic('star')} Nilai Kerja Kami</h3>
        <ul class="check-list" style="margin-top:8px">
          ${DB.about.values.map(aboutValueHTML).join('')}
        </ul>
      </div>
    </div>
    <div>
      <div class="panel rv" style="margin-bottom:18px">
        <h3>${ic('pin')} Alamat</h3>
        <p style="font-size:14.5px">${esc(C.address)}</p>
        <p style="margin-top:10px" class="mono">${ic('clock')} ${esc(C.hours)}</p>
      </div>
      <div class="map-box rv"><iframe title="Peta lokasi" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(C.mapsQuery)}&output=embed"></iframe></div>
    </div>
  </div></section>
  ${ctaBand('Kenali Kami Lebih Dekat','Kunjungi kantor kami atau mulai percakapan hari ini.')}`;
}

