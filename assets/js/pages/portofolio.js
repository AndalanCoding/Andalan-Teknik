"use strict";
function vPortofolio(){
  return `
  <div class="phero"><div class="wrap"><div class="kick">// PORTOFOLIO</div>
  <h1>Portofolio Proyek</h1><p>Dokumentasi pekerjaan yang dikelola tim Andalan Teknik — diperbarui berkala melalui dashboard internal.</p></div></div>
  <section><div class="wrap">
    <div class="cat-bar">${['Semua'].concat(PORT_CATS).map(c=>'<button class="chip'+(c===portFilter?' on':'')+'" data-pcat="'+esc(c)+'">'+esc(c)+'</button>').join('')}</div>
    <div class="port-grid" id="portgrid"></div>
  </div></section>
  ${ctaBand('Proyek Anda Berikutnya?','Kami antusias mendengar rencana Anda — dari satu unit hingga satu gedung.')}`;
}
function renderPortGrid(){
  const items=DB.portfolio.filter(p=>p.active&&(portFilter==='Semua'||p.category===portFilter));
  $('#portgrid').innerHTML=items.length?items.map(portCard).join(''):'<div class="empty" style="grid-column:1/-1">Belum ada entri portofolio pada kategori ini.</div>';
}

