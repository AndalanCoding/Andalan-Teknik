/* ===================== HALAMAN: TENTANG ===================== */
function renderTentang(){
  return `
  <section class="page-head"><div class="container">
    <span class="crumb"><a href="#/">BERANDA</a><i data-lucide="chevron-right"></i>TENTANG KAMI</span>
    <h1>Tentang Andalan Teknik</h1>
    <p>Penyedia jasa service, maintenance, instalasi, dan pengadaan perangkat komputer serta CCTV — dikelola oleh CV. Karya Andalan Teknik.</p>
  </div></section>
  <section class="section"><div class="container about-grid">
    <div class="about-text reveal">
      <span class="sec-index">Profil Perusahaan</span>
      <h2 class="sec-title">Partner Teknis untuk Perangkat Anda</h2>
      <div style="margin-top:22px">
        <p><b>Andalan Teknik</b> adalah penyedia jasa service, maintenance, instalasi, dan pengadaan perangkat komputer serta CCTV yang dikelola oleh <b>CV. Karya Andalan Teknik</b> dan berbasis di Semarang, Jawa Tengah.</p>
        <p>Kami melayani rumah tangga, kantor, sekolah, instansi pemerintah, perusahaan swasta, toko, gudang, pabrik, dan pelaku usaha — dengan fokus pada wilayah Semarang dan sekitarnya.</p>
        <p>Kami percaya setiap pekerjaan dimulai dari pemahaman kebutuhan: apa masalahnya, apa opsinya, dan mana yang paling masuk akal bagi Anda. Karena itu kami menjelaskan semuanya secara terbuka sebelum mengerjakan apa pun.</p>
      </div>
      <h3 class="mini">Bidang Layanan</h3>
      ${checkList(['Service &amp; maintenance komputer desktop dan laptop','Instalasi &amp; maintenance sistem CCTV','Pengadaan komputer dan perangkat IT','Program maintenance IT berkala dengan pelaporan'])}
    </div>
    <div class="reveal" style="transition-delay:80ms">
      ${figDark('building-2','CV. KARYA ANDALAN TEKNIK','','','tentang','Kantor Andalan Teknik, Semarang')}
      <div class="info-card corners" style="margin-top:20px">${CORNERS}
        <dl>
          <div class="info-row"><dt>Nama Brand</dt><dd><b>Andalan Teknik</b></dd></div>
          <div class="info-row"><dt>Badan Usaha</dt><dd><b>CV. Karya Andalan Teknik</b></dd></div>
          <div class="info-row"><dt>Bidang Usaha</dt><dd>Jasa service, maintenance, instalasi, dan pengadaan perangkat komputer serta CCTV</dd></div>
          <div class="info-row"><dt>Alamat</dt><dd>${esc(ADDRESS)}</dd></div>
          <div class="info-row"><dt>Wilayah Layanan</dt><dd>Semarang dan sekitarnya</dd></div>
        </dl>
      </div>
      <a class="link-arrow" style="margin-top:16px" target="_blank" rel="noopener" href="${MAP_LINK}">Lihat lokasi di Google Maps <i data-lucide="arrow-up-right"></i></a>
    </div>
  </div></section>
  <section class="section section-soft"><div class="container">
    ${secHead('Komitmen Kami','Yang Kami Pegang di Setiap Pekerjaan','')}
    <div class="spec-grid light reveal">
      <div class="spec-cell"><i data-lucide="badge-check"></i><h3>Kualitas Pekerjaan</h3><p>Setiap pekerjaan dikerjakan dengan standar kerapian dan pengecekan hasil bersama pelanggan sebelum dinyatakan selesai.</p></div>
      <div class="spec-cell"><i data-lucide="message-circle"></i><h3>Komunikasi Transparan</h3><p>Masalah, opsi penanganan, dan penawaran dijelaskan dengan jelas — tidak ada pekerjaan yang dimulai tanpa kesepakatan.</p></div>
      <div class="spec-cell"><i data-lucide="scale"></i><h3>Sesuai Kebutuhan &amp; Anggaran</h3><p>Kami menawarkan solusi yang realistis berdasarkan kebutuhan dan anggaran Anda — bukan sekadar menjual perangkat.</p></div>
      <div class="spec-cell"><i data-lucide="clipboard-list"></i><h3>Terdokumentasi</h3><p>Untuk pekerjaan maintenance dan instalasi, kami menyediakan dokumentasi serta laporan yang jelas sebagai bahan panduan Anda.</p></div>
    </div>
  </div></section>
  <section class="cta-band"><div class="container">
    <div class="cta-inner corners out reveal">${CORNERS}
      <span class="sec-index">Mari Bekerja Sama</span>
      <h2>Diskusikan Kebutuhan IT Anda dengan Kami</h2>
      <p>Dari satu unit komputer hingga sistem CCTV untuk seluruh gedung — kami siap mendengar kebutuhan Anda.</p>
      <div class="btn-row">
        <a class="btn btn-orange" target="_blank" rel="noopener" href="${waLink(WA_FLOAT_MSG)}">Konsultasi via WhatsApp</a>
        <a class="btn btn-ghost" href="#/kontak">Halaman Kontak</a>
      </div>
    </div>
  </div></section>`;
}

