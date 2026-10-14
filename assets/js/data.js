"use strict";
/* ---------- DEFAULT DATA (placeholder — kelola via dashboard) ---------- */
const DEFAULT_DB = {
 company:{
  brand:'Andalan Teknik', legal:'CV. Karya Andalan Teknik',
  address:'Jl. Griya Klipang Permai Blk. N No.6/17, Sendangmulyo, Kec. Tembalang, Kota Semarang, Jawa Tengah 50272',
  phone:'', whatsapp:CONFIG.whatsapp, email:'webandalanteknik@gmail.com',
  hours:'Senin–Sabtu · jam operasional dikonfirmasi saat kontak',
  mapsQuery:'Griya Klipang Permai, Sendangmulyo, Tembalang, Semarang'
 },
 hero:{
  kicker:'CV. KARYA ANDALAN TEKNIK // SEMARANG',
  title:'Solusi Teknologi Cerdas untuk Masa Depan Bisnis Anda',
  lead:'Andalan Teknik adalah mitra teknologi untuk service, maintenance, instalasi, dan pengadaan perangkat — dari komputer & laptop hingga CCTV dan jaringan IT. Kami mendengarkan kebutuhan Anda lebih dulu, lalu merancang solusi yang tepat, terukur, dan siap berkembang bersama bisnis Anda.'
 },
 services:[
  {id:'s1',icon:'wrench',title:'Service Komputer & Laptop',desc:'Diagnosa menyeluruh dan perbaikan perangkat — baik kerusakan hardware, performa melambat, maupun masalah sistem operasi. Setiap perbaikan diawali pemeriksaan agar akar masalahnya terselesaikan, bukan hanya gejalanya.',features:['Diagnosa hardware & software','Perbaikan komponen / upgrade','Instalasi ulang sistem & pemulihan data','Laporan hasil pengerjaan'],active:true},
  {id:'s2',icon:'clock',title:'Maintenance Komputer Berkala',desc:'Perawatan terjadwal agar perangkat tetap sehat sebelum rusak: pembersihan, health check, update, dan dokumentasi kondisi tiap unit — cocok untuk kantor dengan banyak perangkat kerja.',features:['Jadwal kunjungan rutin','Pembersihan & health check','Update sistem & aplikasi prioritas','Riwayat kondisi per unit'],active:true},
  {id:'s3',icon:'cctv',title:'Instalasi & Maintenance CCTV',desc:'Pemasangan sistem pemantauan dari survei lokasi, penentuan titik kamera, penataan kabel, hingga konfigurasi akses pemantauan lewat HP. Termasuk perawatan sistem CCTV yang sudah terpasang.',features:['Survei lokasi & titik kamera','Instalasi rapi & terdokumentasi','Akses pemantauan via HP','Perawatan & perbaikan sistem existing'],active:true},
  {id:'s4',icon:'laptop',title:'Pengadaan Komputer & Laptop',desc:'Pengadaan perangkat kerja sesuai kebutuhan dan anggaran — bukan sekadar jual unit. Kami bantu menentukan spesifikasi yang tepat, menyiapkan perangkat siap pakai, hingga serah terima.',features:['Analisis spesifikasi sesuai kebutuhan','Perangkat siap pakai (setup awal)','Opsi konfigurasi untuk kantor/lab','Dukungan pasca serah terima'],active:true},
  {id:'s5',icon:'layers',title:'Pengadaan CCTV & Perlengkapannya',desc:'Pengadaan paket CCTV lengkap: kamera, recorder, storage, kabel, PSU, dan aksesoris pendukung — dengan rekomendasi kombinasi perangkat yang sesuai kondisi lokasi dan tujuan pemantauan Anda.',features:['Rekomendasi kombinasi perangkat','Paket lengkap siap instalasi','Hard disk / storage rekaman','Aksesoris & mounting kit'],active:true},
  {id:'s6',icon:'network',title:'Jaringan & Perangkat IT',desc:'Perancangan dan pemasangan jaringan: kabel UTP, router, access point, switch, hingga pembagian bandwidth. Jaringan yang stabil adalah fondasi semua operasional teknologi bisnis Anda.',features:['Instalasi kabel & panel jaringan','Setup router / access point','Pembagian & stabilisasi bandwidth','Dokumentasi topologi jaringan'],active:true},
  {id:'s7',icon:'shield',title:'Maintenance IT untuk Kantor & Bisnis',desc:'Layanan pemeliharaan menyeluruh untuk lingkungan kerja: perangkat, jaringan, dan penanganan gangguan dengan prioritas. Satu pintu untuk semua urusan teknis kantor Anda.',features:['Penanganan gangguan prioritas','Pemeliharaan jaringan berkala','Dokumentasi aset IT','Single point of contact'],active:true},
  {id:'s8',icon:'radar',title:'Konsultasi Kebutuhan Teknologi',desc:'Sesi diskusi untuk memetakan kebutuhan teknologi Anda sebelum memutuskan belanja perangkat atau kontrak jasa. Kami bantu menyusun prioritas, skema anggaran, dan tahapan implementasi.',features:['Pemetaan kebutuhan & risiko','Rencana tahapan & prioritas','Estimasi kebutuhan perangkat','Rekomendasi solusi jangka panjang'],active:true}
 ],
 promos:[
  {id:'p1',badge:'PROMO',title:'Paket Instalasi CCTV',category:'CCTV',desc:'Solusi pemasangan CCTV untuk rumah, toko, dan kantor — mulai dari survei lokasi, pemilihan titik kamera, pemasangan, hingga konfigurasi akses pemantauan lewat HP.',period:'Periode terbatas — konfirmasi via WhatsApp',terms:'Syarat & ketentuan berlaku; rincian lengkap diinformasikan saat konsultasi.',image:'',active:true,featured:true},
  {id:'p2',badge:'PROMO',title:'Paket Maintenance Komputer Berkala',category:'Maintenance',desc:'Kontrak perawatan terjadwal untuk perangkat kerja Anda. Cocok untuk kantor dan usaha dengan banyak unit komputer yang perlu selalu siap dipakai.',period:'Periode terbatas — konfirmasi via WhatsApp',terms:'Frekuensi kunjungan dan cakupan paket disesuaikan jumlah perangkat.',image:'',active:true,featured:false},
  {id:'p3',badge:'PROMO',title:'Paket Pengadaan Perangkat IT',category:'Pengadaan',desc:'Pengadaan serentak perangkat kerja beserta setup, instalasi, dan konfigurasi — perangkat datang dalam kondisi siap pakai, bukan sekadar kotak.',period:'Periode terbatas — konfirmasi via WhatsApp',terms:'Spesifikasi final menyesuaikan analisis kebutuhan dan anggaran.',image:'',active:true,featured:false},
  {id:'p4',badge:'KHUSUS',title:'Penawaran Khusus Perusahaan, Sekolah & Kantor',category:'Korporat',desc:'Skema penawaran khusus untuk kebutuhan multi-unit: pengadaan perangkat, instalasi jaringan, dan kontrak maintenance dalam satu paket kerja sama.',period:'Berlaku sepanjang tahun anggaran',terms:'Pengajuan penawaran melalui konsultasi dengan PIC lembaga/perusahaan.',image:'',active:true,featured:false},
  {id:'p5',badge:'MUSIMAN',title:'Promo Musiman (contoh — nonaktif)',category:'Musiman',desc:'Slot promo musiman yang dapat diaktifkan kapan pun dibutuhkan lewat dashboard admin, lengkap dengan judul, periode, dan syaratnya.',period:'Atur periode via dashboard admin',terms:'Contoh entri — silakan edit atau hapus.',image:'',active:false,featured:false}
 ],
 packages:[
  {id:'k1',title:'Paket Instalasi CCTV',audience:'Rumah · Toko · Kantor',items:['Survei lokasi & penentuan titik kamera','Pengadaan unit CCTV & perlengkapan','Pemasangan & penataan kabel','Konfigurasi akses pemantauan via HP','Panduan penggunaan & serah terima'],price:'Penawaran menyesuaikan jumlah titik & perangkat',featured:false,active:true},
  {id:'k2',title:'Paket Maintenance Komputer',audience:'Kantor · UMKM · Lab',items:['Kunjungan terjadwal sesuai paket','Pembersihan & health check perangkat','Update sistem & aplikasi prioritas','Laporan kondisi per unit','Prioritas penanganan gangguan'],price:'Skema kontrak diatur dalam penawaran',featured:false,active:true},
  {id:'k3',title:'Paket Pengadaan Perangkat IT',audience:'Perusahaan · Sekolah',items:['Analisis kebutuhan & spesifikasi','Pengadaan unit + kelengkapan','Setup, instalasi & konfigurasi','Migrasi data bila diperlukan','Dukungan pasca serah terima'],price:'Menyesuaikan volume & spesifikasi',featured:false,active:true},
  {id:'k4',title:'Maintenance IT Korporat',audience:'Kantor & bisnis multi-perangkat',items:['Penanganan gangguan prioritas','Pemeliharaan jaringan berkala','Dokumentasi aset IT','Konsultasi perencanaan teknologi','Single point of contact untuk semua urusan IT'],price:'Skema bulanan — diatur dalam penawaran',featured:true,active:true}
 ],
 products:[
  {id:'d1',name:'PC Desktop — Office Series',category:'Komputer',specs:['Rakitan sesuai kebutuhan','Konfigurasi fleksibel','Garansi & dukungan setup'],price:'',image:'',active:true},
  {id:'d2',name:'PC Desktop — Workstation Series',category:'Komputer',specs:['Performa tinggi untuk beban berat','Opsi kartu grafis & storage cepat','Konsultasi spesifikasi dulu'],price:'',image:'',active:true},
  {id:'d3',name:'Laptop — Business Series',category:'Laptop',specs:['Ringan & tahan lama untuk kerja harian','Opsi layar & memori tambahan','Siap pakai dengan setup awal'],price:'',image:'',active:true},
  {id:'d4',name:'Laptop — Education Series',category:'Laptop',specs:['Pilihan ekonomis untuk sekolah & pelajar','Tersedia untuk pembelian volume','Setup serentak banyak unit'],price:'',image:'',active:true},
  {id:'d5',name:'CCTV Indoor HD',category:'CCTV & Peralatan',specs:['Kamera dalam ruangan','Resolusi HD','Rekomendasi titik via survei'],price:'',image:'',active:true},
  {id:'d6',name:'CCTV Outdoor HD',category:'CCTV & Peralatan',specs:['Tahan cuaca untuk luar ruangan','Fitur malam sesuai kebutuhan','Termasuk bracket mounting'],price:'',image:'',active:true},
  {id:'d7',name:'DVR / NVR — Perekam',category:'CCTV & Peralatan',specs:['Perekam multi-channel','Hard disk rekaman (opsi kapasitas)','Setup remote view via HP'],price:'',image:'',active:true},
  {id:'d8',name:'Router & Access Point',category:'Jaringan',specs:['Distribusi WiFi stabil','Cakupan sesuai luas area','Konfigurasi keamanan jaringan'],price:'',image:'',active:true},
  {id:'d9',name:'Switch — Distribusi Jaringan',category:'Jaringan',specs:['Pilihan port sesuai skala','Opsi manageable untuk kantor','Termasuk rack & penataan kabel'],price:'',image:'',active:true},
  {id:'d10',name:'UPS & Perlindungan Daya',category:'Aksesoris',specs:['Backup listrik untuk perangkat kritis','Melindungi data dari listrik padam','Kapasitas sesuai beban'],price:'',image:'',active:true}
 ],
 sectors:[
  {id:'x1',icon:'home',label:'Rumah Tangga'},{id:'x2',icon:'store',label:'Toko & Retail'},
  {id:'x3',icon:'building',label:'Perkantoran'},{id:'x4',icon:'school',label:'Sekolah & Kampus'},
  {id:'x5',icon:'clinic',label:'Klinik & Fasilitas'},{id:'x6',icon:'factory',label:'Industri & Workshop'},
  {id:'x7',icon:'users',label:'UMKM & Startup'},{id:'x8',icon:'server',label:'Rental & Lab Komputer'}
 ],
 portfolio:[
  {id:'r1',title:'Instalasi CCTV Multi-Kamera — Hunian',category:'CCTV',location:'Tembalang, Semarang',scale:'Skala hunian',desc:'Ringkasan proyek akan dilengkapi oleh admin melalui dashboard.',image:'',active:true,placeholder:true},
  {id:'r2',title:'Maintenance Berkala PC & Printer — Kantor',category:'Maintenance',location:'Semarang',scale:'Skala kantor kecil',desc:'Ringkasan proyek akan dilengkapi oleh admin melalui dashboard.',image:'',active:true,placeholder:true},
  {id:'r3',title:'Pengadaan & Setup Perangkat — Sekolah',category:'Pengadaan',location:'Jawa Tengah',scale:'Skala lab/ruang komputer',desc:'Ringkasan proyek akan dilengkapi oleh admin melalui dashboard.',image:'',active:true,placeholder:true},
  {id:'r4',title:'Setup Jaringan & WiFi Stabil — Kafe',category:'Jaringan',location:'Semarang',scale:'Skala usaha',desc:'Ringkasan proyek akan dilengkapi oleh admin melalui dashboard.',image:'',active:true,placeholder:true}
 ],
 faqs:[
  {id:'q1',q:'Di wilayah mana saja layanan tersedia?',a:'Basis kami di Semarang (Tembalang) dan kami melayani Semarang serta sekitarnya. Wilayah lain di Jawa Tengah dapat dilayani sesuai kesepakatan — tanyakan langsung saat konsultasi.'},
  {id:'q2',q:'Bagaimana cara memulai konsultasi?',a:'Paling cepat lewat WhatsApp: klik tombol "Konsultasi via WhatsApp" di situs ini dan jelaskan kebutuhan Anda. Bisa juga mengisi formulir kontak, dan kami akan menghubungi kembali.'},
  {id:'q3',q:'Apakah tersedia survei lokasi untuk pemasangan CCTV?',a:'Ya. Survei lokasi dapat dijadwalkan melalui konsultasi untuk menentukan titik kamera, jenis perangkat, dan estimasi kebutuhan — sehingga penawaran yang diberikan sudah sesuai kondisi lapangan.'},
  {id:'q4',q:'Bagaimana skema biayanya?',a:'Setiap kebutuhan berbeda, jadi kami tidak mematok harga generik. Setelah memahami kebutuhan Anda, kami sampaikan penawaran terukur sebelum pekerjaan dimulai.'},
  {id:'q5',q:'Apakah ada garansi untuk pekerjaan atau perangkat?',a:'Detail garansi pekerjaan maupun perangkat akan diinformasikan secara jelas di dalam penawaran — termasuk cakupan dan durasinya.'},
  {id:'q6',q:'Bisakah berlangganan maintenance berkala?',a:'Bisa. Kami menyediakan beberapa skema paket maintenance — lihat menu "Promo & Paket Hemat" atau tanyakan kombinasi yang paling sesuai dengan jumlah perangkat Anda.'}
 ],
 testimonials:[],
 about:{"profile": "{brand} berdiridengan satu keyakinan sederhana: teknologi seharusnya membuat bisnis berjalan lebih ringan — bukan menjadi sumber masalah baru. Karena itu setiap pekerjaan kami dimulai dari pemahaman kebutuhan, dikerjakan secara terdokumentasi, dan ditutup dengan dukungan yang berkelanjutan.", "values": ["Solusi dulu, transaksi kemudian — rekomendasi mengikuti kebutuhan, bukan sebaliknya.", "Transparan sejak awal — lingkup kerja dan penawaran disampaikan jelas sebelum pekerjaan dimulai.", "Mitra jangka panjang — kami membangun hubungan kerja yang berlanjut, bukan proyek sekali jalan.", "Lokal dan hadir — berbasis di Semarang, mudah dihubungi dan dijumpai."]},
 leads:[]
};
const PRODUCT_CATS = ['Komputer','Laptop','CCTV & Peralatan','Jaringan','Aksesoris','Lainnya'];
const PORT_CATS = ['CCTV','Maintenance','Pengadaan','Jaringan','Lainnya'];

