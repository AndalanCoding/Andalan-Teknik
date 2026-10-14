"use strict";
function vSolusi(){
  const sols=[
   ['cctv','Smart Security','Sistem keamanan terpadu berbasis CCTV yang dirancang dari survei lokasi: pemilihan kamera tepat, penempatan strategis, dan pemantauan yang bisa diakses dari mana saja.'],
   ['network','Smart Office','Infrastruktur kantor yang stabil — jaringan terdokumentasi, perangkat terawat, dan penanganan gangguan berprioritas agar operasional tidak berhenti.'],
   ['box','Smart Procurement','Pengadaan perangkat yang terencana: analisis kebutuhan dulu, baru belanja. Perangkat datang siap pakai dengan setup dan konfigurasi selesai.'],
   ['shield','Smart Support','Dukungan berkelanjutan lewat kontrak maintenance — perawatan terjadwal, laporan kondisi, dan satu pintu untuk semua urusan teknis.']
  ];
  return `
  <div class="phero"><div class="wrap"><div class="kick">// SOLUSI SMART TECHNOLOGY</div>
  <h1>Solusi Smart Technology</h1><p>Empat pilar solusi cerdas Andalan Teknik — dirancang bertahap, terukur, dan selalu bisa dikembangkan seiring pertumbuhan bisnis Anda.</p></div></div>
  <section><div class="wrap">
    <div class="prod-grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
    ${sols.map(s=>`<div class="panel rv">${ic(s[0])}<h3>${esc(s[1])}</h3><p style="font-size:14.5px">${esc(s[2])}</p></div>`).join('')}
    </div>
  </div></section>
  <section style="background:var(--bg1);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
    ${shead('// ALUR KERJA','Cara Kami Bekerja','Setiap solusi melewati empat tahap yang sama — agar hasilnya terprediksi dan terdokumentasi.')}
    <div class="journey">
      ${[['01','Survei & Konsultasi','Kami mendengarkan kebutuhan dan memeriksa kondisi lapangan bila diperlukan.'],
         ['02','Desain & Penawaran','Solusi dirancang beserta lingkup kerja dan penawaran transparan.'],
         ['03','Implementasi','Instalasi, konfigurasi, dan pengujian hingga sistem siap digunakan.'],
         ['04','Dukungan','Pemeliharaan berkala dan penanganan lanjutan sesuai skema kerja sama.']]
        .map(j=>'<div class="jr rv"><div class="n">'+j[0]+'</div><h4>'+esc(j[1])+'</h4><p>'+esc(j[2])+'</p></div>').join('')}
    </div>
  </div></section>
  <section><div class="wrap">
    ${shead('// ANALISIS KEBUTUHAN','Formulir Analisis Kebutuhan','Ceritakan kondisi teknologi Anda saat ini — kami balas dengan peta jalan solusi yang paling relevan.')}
    <div class="panel rv" style="max-width:680px">
      <form class="f-grid" id="anform"><input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
        <div class="fld"><label>Nama *</label><input name="nama" required maxlength="80"><span class="err">Nama wajib diisi.</span></div>
        <div class="fld"><label>Jenis Bisnis</label><select name="need">${DB.sectors.map(s=>'<option>'+esc(s.label)+'</option>').join('')}<option>Lainnya</option></select></div>
        <div class="fld full"><label>Kondisi / Kebutuhan Saat Ini *</label><textarea name="pesan" required maxlength="600" placeholder="Contoh: kantor dengan 12 PC yang sering lambat, ingin CCTV 8 titik, dan WiFi yang tidak stabil…"></textarea><span class="err">Mohon tuliskan kebutuhan.</span></div>
        <div class="fld full"><button class="btn btn-p" type="submit">${ic('send')}Kirim Analisis</button></div>
      </form>
    </div>
  </div></section>
  ${ctaBand('Rancang Solusi Anda','Satu percakapan singkat bisa menghemat berbulan-bulan masalah teknis.')}`;
}

