/* ===================== HALAMAN: BERANDA ===================== */
function svcPanelHTML(i){
  const s = DATA.services[i];
  return `<div class="svc-panel-in">
    ${figDark(s.icon,'LAYANAN',pad2(i),'',SVC_KEYS[i],s.title)}
    <div class="svc-panel-body">
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.desc)}</p>
      <ul class="check-list cols2">${s.scope.slice(0,6).map(x=>'<li><i data-lucide="check"></i><span>'+esc(x)+'</span></li>').join('')}</ul>
      <div class="svc-actions">
        <a class="btn btn-orange btn-sm" target="_blank" rel="noopener" href="${waLink(waQuote(s.title))}">Minta Penawaran <i data-lucide="arrow-up-right"></i></a>
        <a class="link-arrow" href="#/layanan">Lihat detail layanan <i data-lucide="arrow-right"></i></a>
      </div>
    </div>
  </div>`;
}
function renderHome(){
  const hasDemo = DATA.projects.some(p=>p.demo);
  const tstiIdx = DATA.testimonials.length ? '05' : '05';
  return `
  <!-- HERO -->
  <section class="hero">
    <div class="container hero-in">
      <div>
        <span class="hero-kicker">CV. KARYA ANDALAN TEKNIK · SEMARANG</span>
        <h1>Solusi <em>IT, Komputer &amp; CCTV</em> Andal untuk Bisnis Anda</h1>
        <p class="lead">Andalan Teknik melayani service dan maintenance komputer, instalasi CCTV, serta pengadaan perangkat teknologi untuk rumah, kantor, bisnis, dan instansi di Semarang dan sekitarnya.</p>
        <div class="hero-cta">
          <a class="btn btn-orange" target="_blank" rel="noopener" href="${waLink(WA_FLOAT_MSG)}">Konsultasi via WhatsApp</a>
          <a class="btn btn-ghost" href="#/layanan">Lihat Layanan</a>
        </div>
        <div class="hero-meta">
          <span><i data-lucide="map-pin"></i> Melayani Semarang &amp; sekitarnya</span>
          <span><i data-lucide="shield-check"></i> Rumah tangga, kantor, sekolah, instansi &amp; bisnis</span>
        </div>
      </div>
      <div class="hero-fig corners out">
        ${CORNERS}
        ${heroSVG()}
        <div class="hero-chip">
          <span class="icw"><i data-lucide="video"></i></span>
          <span><strong>Instalasi &amp; Konfigurasi CCTV</strong><span>DVR / NVR · akses dari smartphone</span></span>
        </div>
      </div>
    </div>
  </section>

  <!-- MARQUEE -->
  <div class="marquee" aria-hidden="true">
    <div class="mq-track">
      ${'<div class="mq-group">'+['SERVICE KOMPUTER','INSTALASI CCTV','PENGADAAN PERANGKAT IT','MAINTENANCE BERKALA','KONFIGURASI DVR & NVR','TROUBLESHOOTING','PENATAAN KABEL & JARINGAN','UPGRADE RAM & SSD','AKSES CCTV VIA SMARTPHONE'].map(x=>'<span>'+x+'</span>').join('')+'</div>'}
      ${'<div class="mq-group">'+['SERVICE KOMPUTER','INSTALASI CCTV','PENGADAAN PERANGKAT IT','MAINTENANCE BERKALA','KONFIGURASI DVR & NVR','TROUBLESHOOTING','PENATAAN KABEL & JARINGAN','UPGRADE RAM & SSD','AKSES CCTV VIA SMARTPHONE'].map(x=>'<span>'+x+'</span>').join('')+'</div>'}
    </div>
  </div>

  <!-- LAYANAN UTAMA -->
  <section class="section">
    <div class="container">
      ${secHead('01 · Layanan Utama','Apa yang Bisa Kami Bantu','Empat lini layanan utama Andalan Teknik — klik untuk melihat ringkasan tiap layanan.','<a class="sec-link" href="#/layanan">Semua layanan <i data-lucide="arrow-right"></i></a>')}
      <div class="svc-tabs">
        <div class="svc-tab-list">
          ${DATA.services.map((s,i)=>`
          <button class="svc-tab" type="button" data-i="${i}">
            <span class="svc-num">${pad2(i)}</span>
            <span class="svc-tt"><b>${esc(s.title)}</b><small>${esc(s.short)}</small></span>
            <i data-lucide="chevron-right"></i>
          </button>`).join('')}
        </div>
        <div id="svc-panel"></div>
      </div>
    </div>
  </section>

  <!-- KEUNGGULAN -->
  <section class="section on-navy">
    <div class="container adv-grid">
      <div class="reveal">
        <span class="sec-index">02 · Keunggulan</span>
        <h2 class="sec-title">Mengapa Memilih Andalan Teknik</h2>
        <p class="sec-sub">Bukan sekadar memperbaiki perangkat — kami memastikan Anda memahami apa yang dikerjakan, mengapa dikerjakan, dan berapa biayanya sebelum pekerjaan dimulai.</p>
        <p style="font-family:var(--font-mono);font-size:11px;letter-spacing:.14em;color:#5480C4;margin-top:22px">CV. KARYA ANDALAN TEKNIK — SEMARANG</p>
      </div>
      <div class="spec-grid reveal">
        ${ADVANTAGES.map(a=>`<div class="spec-cell"><i data-lucide="${a.icon}"></i><h3>${a.t}</h3><p>${a.d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- PROSES -->
  <section class="section">
    <div class="container">
      ${secHead('03 · Proses Kerja','Dari Konsultasi hingga Selesai','Alur kerja yang jelas dan disepakati bersama di setiap tahapnya.')}
      <div class="steps">
        ${STEPS.map((st,i)=>`
        <div class="step reveal" style="transition-delay:${i*70}ms">
          <span class="step-num">${pad2(i)}</span>
          <div><h3>${st.t}</h3><p>${st.d}</p></div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${DATA.projects.length ? `
  <!-- PORTOFOLIO -->
  <section class="section section-soft">
    <div class="container">
      ${secHead('04 · Portofolio','Dokumentasi Pekerjaan','Kategori pekerjaan yang kami tangani.','<a class="sec-link" href="#/portofolio">Lihat semua <i data-lucide="arrow-right"></i></a>')}
      ${hasDemo?'<p class="pf-note"><i data-lucide="info"></i> Menampilkan data contoh — dokumentasi proyek nyata dikelola melalui dashboard admin.</p>':''}
      <div class="pf-grid">${DATA.projects.slice(0,6).map((p,i)=>projCard(p,i===0,i*60)).join('')}</div>
    </div>
  </section>` : ''}

  ${DATA.testimonials.length ? `
  <!-- TESTIMONI (hanya tampil jika sudah ditambahkan & terverifikasi admin) -->
  <section class="section">
    <div class="container">
      ${secHead(tstiIdx+' · Testimoni','Kata Pelanggan Kami','Testimoni ditampilkan setelah melewati proses verifikasi oleh tim kami.')}
      <div class="tsti-grid">
        ${DATA.testimonials.map(t=>`
        <div class="tsti reveal">
          <i data-lucide="quote"></i>
          <p>“${esc(t.text)}”</p>
          <div class="who"><b>${esc(t.name)}</b><span>${esc(t.role||'')}</span></div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <!-- FAQ -->
  <section class="section ${DATA.testimonials.length?'':'section-soft'}">
    <div class="container">
      <div class="faq-grid">
        <div class="faq-side reveal">
          <span class="sec-index">${DATA.testimonials.length?'06':'05'} · FAQ</span>
          <h2 class="sec-title">Pertanyaan yang Sering Diajukan</h2>
          <p class="sec-sub">Belum menemukan jawaban yang Anda cari? Tim kami siap membantu.</p>
          <div class="mini-cta">
            <b>Masih ada pertanyaan?</b>
            <p>Chat langsung dengan kami — respons pada jam operasional.</p>
            <a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(WA_FLOAT_MSG)}">Chat WhatsApp</a>
          </div>
        </div>
        <div class="reveal">
          ${FAQS.map(f=>`
          <div class="faq-item">
            <button class="faq-q" type="button">${esc(f.q)}<i data-lucide="chevron-down"></i></button>
            <div class="faq-a"><p>${esc(f.a)}</p></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-band">
    <div class="container">
      <div class="cta-inner corners out reveal">
        ${CORNERS}
        <span class="sec-index">Siap Memulai?</span>
        <h2>Butuh Estimasi Biaya untuk Kebutuhan IT Anda?</h2>
        <p>Ceritakan kendala atau kebutuhan Anda — kami bantu susun solusi dan penawarannya. Biaya menyesuaikan kebutuhan dan disepakati sebelum pengerjaan.</p>
        <div class="btn-row">
          <a class="btn btn-orange" target="_blank" rel="noopener" href="${waLink(WA_FLOAT_MSG)}">Konsultasi via WhatsApp</a>
          <a class="btn btn-ghost" href="#/kontak">Isi Formulir Konsultasi</a>
        </div>
      </div>
    </div>
  </section>`;
}
function mountHome(){
  // Tab layanan interaktif
  let act = 0;
  const tabs = $$('.svc-tab');
  const paint = ()=>{
    tabs.forEach((t,i)=>t.classList.toggle('active', i===act));
    $('#svc-panel').innerHTML = svcPanelHTML(act);
    refreshIcons();
  };
  tabs.forEach((t,i)=>t.addEventListener('click', ()=>{ act=i; paint(); }));
  paint();
  // FAQ accordion
  $$('.faq-q').forEach(b=>b.addEventListener('click', ()=>{
    const item = b.parentElement, a = item.querySelector('.faq-a');
    const open = item.classList.toggle('open');
    a.style.maxHeight = open ? a.scrollHeight+'px' : '0px';
  }));
}

