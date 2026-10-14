"use strict";
function vPromo(){
  const feat=DB.promos.find(p=>p.active&&p.featured)||DB.promos.find(p=>p.active);
  const promos=DB.promos.filter(p=>p.active&&!p.featured);
  const pkgs=DB.packages.filter(p=>p.active);
  return `
  <div class="phero"><div class="wrap"><div class="kick">// PROMO & PAKET HEMAT</div>
  <h1>Promo & Paket Hemat</h1><p>Penawaran aktif dan paket hemat Andalan Teknik. Semua promo di halaman ini dikelola langsung oleh admin — periode dan syarat berlaku.</p></div></div>
  <section><div class="wrap">
    ${shead('// PENAWARAN AKTIF','Promo Berjalan')}
    ${feat?`<div class="promo-feat rv">
      ${imgTag(feat.image,feat.title,'Promo')}
      <div class="in"><span class="red-tag">${ic('zap')} ${esc(feat.badge||'PROMO')}</span><h3>${esc(feat.title)}</h3><p>${esc(feat.desc)}</p>
      <div class="meta"><span>${ic('clock')} ${esc(feat.period||'—')}</span></div>
      <button class="btn btn-r" data-wa="Halo Andalan Teknik, saya ingin bertanya tentang promo: ${esc(feat.title)}.">${ic('wa')}Klaim via WhatsApp</button></div>
    </div>`:''}
    <div class="promo-grid">${promos.map(promoCard).join('')||'<div class="empty" style="grid-column:1/-1">Belum ada promo lain yang aktif saat ini.</div>'}</div>
  </div></section>
  <section style="background:var(--bg1);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
    ${shead('// PAKET','Paket Service & Maintenance','Kombinasi layanan dalam skema hemat — cocok untuk kebutuhan berkelanjutan.')}
    ${pkgs.map(pkgHTML).join('')}
  </div></section>
  <section><div class="wrap">
    ${shead('// PENAWARAN KHUSUS','Minta Penawaran Khusus','Untuk perusahaan, sekolah, dan kantor dengan kebutuhan multi-unit, ajangkan penawaran khusus melalui formulir ini.')}
    <div class="panel rv" style="max-width:680px">${leadFormHTML('promo',true)}</div>
  </div></section>`;
}

