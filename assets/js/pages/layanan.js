"use strict";
function vLayanan(){
  return `
  <div class="phero"><div class="wrap"><div class="kick">// LAYANAN TEKNOLOGI</div>
  <h1>Layanan Teknologi</h1><p>Delapan layanan inti Andalan Teknik — dari perbaikan satu perangkat hingga pengelolaan teknologi untuk seluruh operasional bisnis.</p></div></div>
  <section><div class="wrap">
    ${DB.services.filter(s=>s.active).map((s,i)=>`
    <div class="pkg rv" style="grid-template-columns:minmax(160px,.7fr) 2fr auto">
      <div class="pk-name"><span class="mono" style="color:var(--cyan);font-size:22px">0${i+1}</span><h3 style="margin-top:6px">${esc(s.title)}</h3></div>
      <div><p style="margin-bottom:14px">${esc(s.desc)}</p><ul>${(s.features||[]).map(f=>'<li>'+ic('check')+esc(f)+'</li>').join('')}</ul></div>
      <div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start">
        <button class="btn btn-p btn-sm" data-wa="Halo Andalan Teknik, saya ingin bertanya tentang layanan: ${esc(s.title)}.">${ic('wa')}Tanya via WhatsApp</button>
      </div>
    </div>`).join('')}
  </div></section>
  ${ctaBand('Butuh Kombinasi Layanan?','Banyak klien menggabungkan beberapa layanan — misalnya pengadaan + instalasi jaringan + kontrak maintenance. Diskusikan kombinasi terbaik untuk Anda.')}`;
}

let catFilter='Semua', catQuery='';

