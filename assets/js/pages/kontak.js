/* ===================== HALAMAN: KONTAK ===================== */
function renderKontak(){
  const s = DATA.settings;
  return `
  <section class="page-head"><div class="container">
    <span class="crumb"><a href="#/">BERANDA</a><i data-lucide="chevron-right"></i>KONTAK</span>
    <h1>Hubungi Kami</h1>
    <p>Ceritakan kebutuhan atau kendala Anda — kami akan merespons pada jam operasional dan membantu menyusun langkah selanjutnya.</p>
  </div></section>
  <section class="section"><div class="container">
    <div class="contact-grid">
      <div class="c-stack">
        <div class="c-card reveal">
          <span class="icw"><i data-lucide="map-pin"></i></span>
          <div>
            <h3>Alamat Kantor</h3>
            <p>CV. Karya Andalan Teknik<br>${esc(ADDRESS)}</p>
            <div class="c-act"><a class="link-arrow" target="_blank" rel="noopener" href="${MAP_LINK}">Buka di Google Maps <i data-lucide="arrow-up-right"></i></a></div>
          </div>
        </div>
        <div class="c-card reveal" style="transition-delay:60ms">
          <span class="icw"><i data-lucide="message-circle"></i></span>
          <div>
            <h3>WhatsApp</h3>
            <p>Jalur konsultasi tercepat — kirim pesan kapan saja, kami balas pada jam operasional.</p>
            <div class="c-act"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waLink(WA_FLOAT_MSG)}">Chat WhatsApp</a></div>
          </div>
        </div>
        <div class="c-card reveal" style="transition-delay:120ms">
          <span class="icw"><i data-lucide="clock"></i></span>
          <div>
            <h3>Jam Operasional</h3>
            <p>${esc(s.hours)}<br>Dapat berubah — silakan konfirmasi via WhatsApp.</p>
          </div>
        </div>
        <div class="c-card reveal" style="transition-delay:180ms">
          <span class="icw"><i data-lucide="mail"></i></span>
          <div>
            <h3>Email</h3>
            <p>${s.email ? esc(s.email) : 'Belum tersedia untuk saat ini — silakan hubungi kami via WhatsApp.'}</p>
          </div>
        </div>
      </div>
      <div class="form-card reveal" id="form-wrap" style="transition-delay:100ms">
        <h2>Formulir Konsultasi</h2>
        <p class="fc-sub">Isi formulir berikut — setelah dikirim, Anda akan diarahkan ke WhatsApp dengan ringkasan pesan yang sudah terisi.</p>
        <form id="c-form">
          <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
          <div class="form-row">
            <div class="field"><label>Nama <span class="req">*</span></label><input name="nama" required placeholder="Nama Anda"></div>
            <div class="field"><label>Nama Perusahaan / Instansi</label><input name="perusahaan" placeholder="Opsional"></div>
          </div>
          <div class="form-row">
            <div class="field"><label>Nomor WhatsApp <span class="req">*</span></label><input name="wa" required placeholder="08xxxxxxxxxx"></div>
            <div class="field"><label>Jenis Layanan <span class="req">*</span></label>
              <select name="layanan" required>
                <option value="">— Pilih layanan —</option>
                ${DATA.services.map(s=>'<option>'+esc(s.title)+'</option>').join('')}
                <option>Pengadaan perangkat IT</option>
                <option>Lainnya / belum yakin</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="field"><label>Lokasi Pekerjaan <span class="req">*</span></label><input name="lokasi" required placeholder="Contoh: Tembalang, Semarang"></div>
            <div class="field"><label>Jadwal Konsultasi</label><input name="jadwal" placeholder="Opsional — contoh: hari kerja, pagi"></div>
          </div>
          <div class="field"><label>Deskripsi Masalah / Kebutuhan <span class="req">*</span></label><textarea name="kebutuhan" rows="4" required placeholder="Ceritakan kendala atau kebutuhan Anda..."></textarea></div>
          <button class="btn btn-orange btn-block" type="submit"><i data-lucide="send"></i> Kirim &amp; Lanjut ke WhatsApp</button>
          <p class="form-note">Data Anda hanya digunakan untuk menindaklanjuti permintaan ini.</p>
        </form>
      </div>
    </div>
    <div class="map-wrap corners">${CORNERS}
      <iframe title="Peta lokasi kantor Andalan Teknik" src="${MAP_EMBED}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="map-link"><a class="link-arrow" target="_blank" rel="noopener" href="${MAP_LINK}">Buka di Google Maps <i data-lucide="arrow-up-right"></i></a></div>
  </div></section>`;
}
function mountKontak(){
  const form = $('#c-form');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    const d = Object.fromEntries(new FormData(form));
    DATA.messages.unshift({id:uid(), ts:Date.now(), nama:d.nama, perusahaan:d.perusahaan||'', wa:d.wa, layanan:d.layanan, lokasi:d.lokasi, kebutuhan:d.kebutuhan, jadwal:d.jadwal||''});
    saveData();
    sendToSheet(d);
    const msg = 'Halo Andalan Teknik, saya ingin konsultasi mengenai layanan ' + d.layanan + '.\n\n' +
      'Nama: ' + d.nama + '\n' +
      (d.perusahaan ? 'Perusahaan: ' + d.perusahaan + '\n' : '') +
      'No. WhatsApp: ' + d.wa + '\n' +
      'Lokasi: ' + d.lokasi + '\n' +
      (d.jadwal ? 'Jadwal konsultasi: ' + d.jadwal + '\n' : '') +
      '\nKebutuhan: ' + d.kebutuhan + '\n\n' +
      'Mohon informasi lebih lanjut mengenai proses pengerjaan dan estimasi biayanya. Terima kasih.';
    $('#form-wrap').innerHTML = `
      <div class="form-success">
        <div class="fs-ic"><i data-lucide="check"></i></div>
        <h3>Terima kasih, ${esc(d.nama)}!</h3>
        <p>Permintaan konsultasi Anda sudah kami catat. Silakan lanjutkan ke WhatsApp agar dapat segera kami tanggapi.</p>
        <div class="fs-sum">
          <div><span>Jenis layanan</span><b>${esc(d.layanan)}</b></div>
          <div><span>Lokasi</span><b>${esc(d.lokasi)}</b></div>
          <div><span>No. WhatsApp</span><b>${esc(d.wa)}</b></div>
          <div><span>Jadwal</span><b>${esc(d.jadwal||'Fleksibel')}</b></div>
        </div>
        <a class="btn btn-orange" target="_blank" rel="noopener" href="${waLink(msg)}"><i data-lucide="send"></i> Kirim ke WhatsApp</a>
        <button class="btn btn-outline" id="form-again" type="button">Isi Permintaan Lain</button>
      </div>`;
    refreshIcons();
    $('#form-again').addEventListener('click', ()=>route());
    toast('Permintaan konsultasi berhasil dicatat','success');
    $('#form-wrap').scrollIntoView({behavior:'smooth', block:'center'});
  });
}

