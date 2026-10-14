"use strict";
function vKontak(){
  const C=DB.company;
  return `
  <div class="phero"><div class="wrap"><div class="kick">// KONTAK</div>
  <h1>Hubungi Kami</h1><p>Sampaikan kebutuhan Anda — respon paling cepat melalui WhatsApp, atau gunakan formulir untuk permintaan penawaran.</p></div></div>
  <section><div class="wrap" style="display:grid;grid-template-columns:1.15fr .85fr;gap:36px;align-items:start">
    <div class="panel rv">
      <h3>${ic('send')} Formulir Konsultasi & Penawaran</h3>
      <div style="margin:14px 0 6px">${leadFormHTML('kontak',true)}</div>
    </div>
    <div>
      <div class="panel rv" style="margin-bottom:18px">
        <h3>${ic('chat')} Kontak Langsung</h3>
        <ul class="check-list" style="margin-top:10px">
          <li>${ic('wa')}<span>WhatsApp — <button class="btn btn-p btn-sm" style="vertical-align:middle" data-wa="Halo Andalan Teknik, saya ingin konsultasi.">Chat Sekarang</button></span></li>
          ${C.phone?'<li>'+ic('phone')+'<span>'+esc(C.phone)+'</span></li>':''}
          ${C.email?'<li>'+ic('mail')+'<span>'+esc(C.email)+'</span></li>':''}
          <li>${ic('pin')}<span>${esc(C.address)}</span></li>
          <li>${ic('clock')}<span>${esc(C.hours)}</span></li>
        </ul>
      </div>
      <div class="map-box rv"><iframe title="Peta lokasi" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(C.mapsQuery)}&output=embed"></iframe></div>
    </div>
  </div></section>`;
}

function vNotFound(){
  return '<div class="phero" style="min-height:60vh;display:flex;align-items:center"><div class="wrap"><div class="kick">// 404</div><h1>Halaman tidak ditemukan</h1><p style="margin-bottom:22px">Rute yang Anda tuju tidak tersedia.</p><a class="btn btn-p" href="#/">Kembali ke Beranda</a></div></div>';
}

function footerHTML(){
  const C=DB.company;
  return `<footer><div class="wrap">
    <div class="ft-grid">
      <div>
        <a href="#/" class="brand" style="margin-bottom:14px"><img class="hex" src="assets/img/logo.png" alt="Logo Andalan Teknik"><span>ANDALAN TEKNIK<small>SMART TECHNOLOGY</small></span></a>
        <p>${esc(C.legal)} — solusi cerdas untuk service, maintenance, instalasi, dan pengadaan perangkat teknologi di Semarang dan sekitarnya.</p>
        <p class="mono" style="margin-top:12px;font-size:11px;letter-spacing:.15em;color:var(--cyan)">ROBOTIC AI · FUTURISTIC TECH</p>
      </div>
      <div><h4>Navigasi</h4><ul>${NAV.map(n=>'<li><a href="'+n[2]+'">'+n[1]+'</a></li>').join('')}</ul></div>
      <div><h4>Layanan</h4><ul>${DB.services.filter(s=>s.active).slice(0,6).map(s=>'<li><a href="#/layanan">'+esc(s.title)+'</a></li>').join('')}</ul></div>
      <div><h4>Kontak</h4><ul class="ft-contact">
        <li>${ic('pin')}<span>${esc(C.address)}</span></li>
        ${C.phone?'<li>'+ic('phone')+'<span>'+esc(C.phone)+'</span></li>':''}
        ${C.email?'<li>'+ic('mail')+'<span>'+esc(C.email)+'</span></li>':''}
        <li>${ic('clock')}<span>${esc(C.hours)}</span></li>
      </ul></div>
    </div>
    <div class="ft-bot"><span>© ${new Date().getFullYear()} ${esc(C.legal)} — Semarang, Jawa Tengah</span><span>SYSTEM.STATUS: ONLINE // SEMARANG 50272</span></div>
  </div></footer>`;
}

