"use strict";
/* ---------- VIEWS ---------- */
function vHome(){
  const H=DB.hero, feat=DB.promos.find(p=>p.active&&p.featured)||DB.promos.find(p=>p.active);
  const promos=DB.promos.filter(p=>p.active&&!p.featured);
  const pkgs=DB.packages.filter(p=>p.active);
  const ports=DB.portfolio.filter(p=>p.active);
  return `
  <section class="hero">
    <canvas id="fx"></canvas>
    <div class="wrap hero-grid">
      <div>
        <div class="kick-row"><b></b>${esc(H.kicker)}</div>
        <h1>${esc(H.title).replace('Cerdas','<em>Cerdas<svg viewBox="0 0 120 10" preserveAspectRatio="none"><path d="M2 7 Q60 -2 118 6" fill="none" stroke="#35e0ff" stroke-width="2.5" vector-effect="non-scaling-stroke" opacity=".85"/></svg></em>')}</h1>
        <p class="lead">${esc(H.lead)}</p>
        <div class="cta-row">
          <button class="btn btn-p" data-wa="Halo Andalan Teknik, saya ingin konsultasi kebutuhan teknologi untuk bisnis/kebutuhan saya.">${ic('wa')}Konsultasi via WhatsApp</button>
          <a class="btn btn-g" href="#/layanan">${ic('arrow')}Jelajahi Layanan</a>
        </div>
        <div class="stats">
          <div><b>${DB.services.filter(s=>s.active).length}</b><span>Layanan Utama</span></div>
          <div><b>${pkgs.length}</b><span>Paket Hemat</span></div>
          <div><b>${DB.sectors.length}</b><span>Sektor Pelanggan</span></div>
        </div>
      </div>
      <div class="stage">
        <div class="frame f2">
          <span class="tag">ANDA-1 // AI UNIT</span>
          ${robotSVG()}
          <div class="term">
            <div class="t-head"><i></i><i></i><i></i><span>BOOT</span></div>
            <div class="ln" id="term-ln"></div><span class="cur"></span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="layanan-section">
    <div class="wrap">
      ${shead('// 01 — LAYANAN','Layanan Unggulan Kami','Delapan layanan inti yang saling terhubung — pilih untuk melihat detail, cakupan, dan cara memulainya.')}
      ${svcSelectorHTML()}
    </div>
  </section>

  <section style="background:var(--bg1);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
    <div class="wrap">
      ${shead('// 02 — PROMO','Promo & Penawaran Berjalan','Penawaran aktif yang dikelola langsung oleh tim kami — periode dan syarat berlaku.',true)}
      ${feat?`
      <div class="promo-feat rv">
        ${imgTag(feat.image,feat.title,'Promo')}
        <div class="in">
          <span class="red-tag">${ic('zap')} ${esc(feat.badge||'PROMO')}</span>
          <h3>${esc(feat.title)}</h3>
          <p>${esc(feat.desc)}</p>
          <div class="meta"><span>${ic('clock')} ${esc(feat.period||'—')}</span>${feat.category?'<span>'+esc(feat.category)+'</span>':''}</div>
          <button class="btn btn-r" data-wa="Halo Andalan Teknik, saya ingin bertanya tentang promo: ${esc(feat.title)}.">${ic('wa')}Klaim via WhatsApp</button>
        </div>
      </div>`:''}
      <div class="promo-grid">${promos.map(promoCard).join('')}</div>
    </div>
  </section>

  <section>
    <div class="wrap">
      ${shead('// 03 — PAKET','Paket Service & Maintenance','Paket hemat untuk kebutuhan berkelanjutan — kombinasi layanan dalam satu skema kerja sama.')}
      ${pkgs.map(pkgHTML).join('')}
    </div>
  </section>

  <section style="background:var(--bg1);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
    <div class="wrap">
      ${shead('// 04 — KATALOG','Pengadaan Perangkat','Perangkat komputer, laptop, CCTV, dan perlengkapan jaringan — spesifikasi disesuaikan kebutuhan, harga dikonfirmasi via penawaran.')}
      <div class="prod-grid" style="margin-bottom:26px">
        ${DB.products.filter(p=>p.active).slice(0,6).map(p=>`
        <div class="prod rv" data-prod="${p.id}" role="button" tabindex="0">
          <div class="im">${imgTag(p.image,p.name,p.category)}<span class="cat">${esc(p.category)}</span></div>
          <div class="bd"><h4>${esc(p.name)}</h4><div class="sp">${(p.specs||[]).map(esc).join('<br>')}</div>
          <div class="pr">${p.price?esc(p.price):'<em>— MINTA PENAWARAN —</em>'}</div></div>
        </div>`).join('')}
      </div>
      <a class="btn btn-g" href="#/katalog">${ic('layers')}Buka Katalog Lengkap</a>
    </div>
  </section>

  <section>
    <div class="wrap">
      ${shead('// 05 — KEUNGGULAN','Mengapa Andalan Teknik','Prinsip kerja kami — bukan sekadar memperbaiki perangkat, tapi menjaga teknologi Anda tetap menjadi aset.')}
      <div class="adv">
        ${[['Satu Pintu untuk Semua Urusan IT','Dari service satu unit laptop hingga pengadaan dan maintenance seluruh kantor — tidak perlu berpindah-pindah penyedia jasa.'],
           ['Konsultasi Dulu, Belanja Belakangan','Kami memulai dari analisis kebutuhan, bukan dari daftar harga. Anda mendapat rekomendasi yang proporsional dengan masalah sebenarnya.'],
           ['Dukungan Berkelanjutan','Pekerjaan kami tidak berhenti saat perangkat terpasang — tersedia skema maintenance dan penanganan gangguan lanjutan.'],
           ['Transparan & Terdokumentasi','Penawaran, lingkup kerja, dan hasil pengerjaan disampaikan secara jelas — Anda tahu apa yang dibayar dan apa yang didapat.'],
           ['Berbasis di Semarang','Kami bekerja dari Tembalang, Semarang, dan melayani sekitarnya — mudah dihubungi, mudah menemui.']]
          .map((a,i)=>'<div class="node rv"><div class="pt"><i></i></div><div class="no">MODULE 0'+(i+1)+'</div><h3>'+esc(a[0])+'</h3><p>'+esc(a[1])+'</p></div>').join('')}
      </div>
    </div>
  </section>

  <section style="padding-top:30px">
    <div class="wrap center">
      ${shead('// 06 — SEKTOR','Sektor yang Kami Layani','',true)}
    </div>
    <div class="mq rv"><div class="mq-track">
      ${DB.sectors.concat(DB.sectors).map(s=>'<div class="sec-chip">'+ic(s.icon||'zap')+esc(s.label)+'</div>').join('')}
    </div></div>
  </section>

  <section style="background:var(--bg1);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
    <div class="wrap">
      ${shead('// 07 — PORTOFOLIO','Jejak Pengerjaan','Ringkasan pekerjaan yang telah kami tangani — daftar terus diperbarui oleh tim.')}
      <div class="port-grid">${ports.map(portCard).join('')}</div>
      <div style="text-align:center;margin-top:26px"><a class="btn btn-g" href="#/portofolio">Lihat Semua Portofolio</a></div>
    </div>
  </section>

  <section>
    <div class="wrap">
      ${shead('// 08 — FAQ','Pertanyaan yang Sering Diajukan','',true)}
      <div style="max-width:820px;margin:0 auto">${faqHTML()}</div>
    </div>
  </section>

  ${ctaBand('Mulai dari Satu Percakapan','Ceritakan kendala atau rencana teknologi Anda — kami bantu petakan langkah paling efisien berikutnya, tanpa biaya konsultasi awal.')}
  `;
}

