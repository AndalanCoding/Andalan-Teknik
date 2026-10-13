/* ===================== HALAMAN: LAYANAN ===================== */
function renderLayanan(){
  return `
  <section class="page-head"><div class="container">
    <span class="crumb"><a href="#/">BERANDA</a><i data-lucide="chevron-right"></i>LAYANAN</span>
    <h1>Layanan Kami</h1>
    <p>Service dan maintenance komputer, instalasi CCTV, pengadaan perangkat, hingga program perawatan IT berkala — untuk rumah tangga, kantor, sekolah, instansi, dan bisnis.</p>
  </div></section>
  ${DATA.services.map((s,i)=>`
  <section class="section ${i%2?'section-soft':''}">
    <div class="container svc-detail ${i%2?'rev':''}">
      <div class="sd-fig reveal">
        ${figDark(s.icon,'LAYANAN',pad2(i),'',SVC_KEYS[i],s.title)}
      </div>
      <div class="reveal" style="transition-delay:80ms">
        <span class="sec-index">${pad2(i)} · Layanan</span>
        <h2 class="sec-title">${esc(s.title)}</h2>
        <p class="sec-sub">${esc(s.desc)}</p>
        <h3 class="mini">Manfaat</h3>
        ${checkList(s.benefits)}
        <h3 class="mini">Cakupan Pekerjaan</h3>
        <div class="scope-grid">${s.scope.map(x=>'<span><i data-lucide="check"></i>'+esc(x)+'</span>').join('')}</div>
        <div class="sd-cta">
          <a class="btn btn-orange" target="_blank" rel="noopener" href="${waLink(waQuote(s.title))}">Minta Penawaran <i data-lucide="arrow-up-right"></i></a>
          <span class="price-note"><i data-lucide="info"></i>Harga menyesuaikan kebutuhan — hubungi kami untuk estimasi biaya.</span>
        </div>
      </div>
    </div>
  </section>`).join('')}
  <section class="cta-band"><div class="container">
    <div class="cta-inner corners out reveal">${CORNERS}
      <span class="sec-index">Siap Memulai?</span>
      <h2>Tentukan Layanan yang Tepat Bersama Kami</h2>
      <p>Belum yakin layanan mana yang Anda butuhkan? Ceritakan situasinya — kami bantu sesuaikan solusinya.</p>
      <div class="btn-row">
        <a class="btn btn-orange" target="_blank" rel="noopener" href="${waLink(WA_FLOAT_MSG)}">Konsultasi via WhatsApp</a>
        <a class="btn btn-ghost" href="#/kontak">Isi Formulir Konsultasi</a>
      </div>
    </div>
  </div></section>`;
}

