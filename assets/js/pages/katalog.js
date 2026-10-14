"use strict";
function vKatalog(){
  return `
  <div class="phero"><div class="wrap"><div class="kick">// PENGADAAN & KATALOG</div>
  <h1>Katalog Perangkat</h1><p>Perangkat komputer, laptop, CCTV, dan perlengkapan jaringan. Spesifikasi final dan harga dikonfirmasi melalui penawaran resmi.</p></div></div>
  <section><div class="wrap">
    <div class="cat-bar">
      ${['Semua'].concat(PRODUCT_CATS).map(c=>'<button class="chip'+(c===catFilter?' on':'')+'" data-cat="'+esc(c)+'">'+esc(c)+'</button>').join('')}
      <div class="searchbox">${ic('search')}<input id="catq" placeholder="Cari perangkat…" value="${esc(catQuery)}"></div>
    </div>
    <div class="prod-grid" id="prodgrid"></div>
    <p style="margin-top:26px;font-family:var(--f-mono);font-size:12px;color:var(--mut)">* Konfigurasi &amp; harga dapat berbeda menyesuaikan ketersediaan dan kebutuhan — konfirmasi via WhatsApp sebelum pemesanan.</p>
  </div></section>`;
}
function renderProdGrid(){
  const q=catQuery.toLowerCase();
  const items=DB.products.filter(p=>p.active&&(catFilter==='Semua'||p.category===catFilter)&&(!q||(p.name+' '+(p.specs||[]).join(' ')).toLowerCase().includes(q)));
  $('#prodgrid').innerHTML=items.length?items.map(p=>`
    <div class="prod" data-prod="${p.id}" role="button" tabindex="0">
      <div class="im">${imgTag(p.image,p.name,p.category)}<span class="cat">${esc(p.category)}</span></div>
      <div class="bd"><h4>${esc(p.name)}</h4><div class="sp">${(p.specs||[]).map(esc).join('<br>')}</div>
      <div class="pr">${p.price?esc(p.price):'<em>— MINTA PENAWARAN —</em>'}</div></div>
    </div>`).join(''):'<div class="empty" style="grid-column:1/-1">Tidak ada perangkat yang cocok dengan filter ini.</div>';
}

let portFilter='Semua';

