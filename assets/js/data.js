const LS_KEY = 'andalan_teknik_data_v1';
const CATS = ['Komputer & Laptop','Monitor & Aksesori','CCTV & Kamera Keamanan','DVR & NVR','Hard Disk CCTV','Kabel & Konektor','Perangkat Jaringan','Peralatan Pendukung IT'];
const CAT_ICONS = {'Komputer & Laptop':'laptop','Monitor & Aksesori':'monitor','CCTV & Kamera Keamanan':'camera','DVR & NVR':'server','Hard Disk CCTV':'hard-drive','Kabel & Konektor':'cable','Perangkat Jaringan':'network','Peralatan Pendukung IT':'power'};
const PF_CATS = ['CCTV','Komputer','Pengadaan','Jaringan','Lainnya'];
const PF_ICONS = {'CCTV':'video','Komputer':'monitor','Pengadaan':'package','Jaringan':'network','Lainnya':'wrench'};
const WA_FLOAT_MSG = 'Halo Andalan Teknik, saya ingin konsultasi mengenai kebutuhan IT, komputer, atau CCTV.\n\nMohon informasi lebih lanjut mengenai proses pengerjaan dan estimasi biayanya. Terima kasih.';

/* ===================== DATA DEFAULT (dapat dikelola admin) ===================== */
const DEFAULT_DATA = {
  settings: {
    whatsapp: CONFIG.whatsapp,
    email: '',
    hours: 'Senin – Sabtu, 08.00 – 17.00 WIB',
    adminPassword: CONFIG.adminPassword
  },
  services: [
    {
      icon:'wrench', title:'Service & Maintenance Komputer',
      short:'Perbaikan, perawatan, dan optimalisasi komputer desktop & laptop.',
      desc:'Kami menangani perbaikan komputer desktop dan laptop untuk kebutuhan pribadi maupun kantor — mulai dari diagnosis kerusakan, instalasi sistem operasi dan aplikasi, hingga upgrade komponen agar perangkat Anda kembali bekerja optimal.',
      benefits:['Perangkat kembali optimal tanpa harus langsung diganti','Kerusakan didiagnosis lebih dulu — tidak asal ganti komponen','Perawatan berkala mencegah kerusakan mendadak saat jam kerja','Cocok untuk kebutuhan kantor, sekolah, dan perusahaan'],
      scope:['Perbaikan desktop & laptop','Instalasi OS & aplikasi','Upgrade RAM & SSD','Diagnosis kerusakan','Pembersihan & perawatan berkala','Troubleshooting hardware & software','Maintenance kantor, sekolah & perusahaan']
    },
    {
      icon:'video', title:'Instalasi & Maintenance CCTV',
      short:'Perencanaan, pemasangan, dan perawatan sistem CCTV.',
      desc:'Kami membantu merencanakan dan memasangkan sistem CCTV yang tepat sasaran — mulai dari penentuan titik kamera, pemasangan indoor maupun outdoor, konfigurasi DVR/NVR, hingga pengaturan akses melalui smartphone agar Anda dapat memantau lokasi kapan saja.',
      benefits:['Titik kamera direncanakan sesuai area yang benar-benar perlu dipantau','Pantauan dapat diakses langsung dari smartphone','Permasalahan seperti kamera tidak tampil atau tidak merekam dapat diperiksa','Instalasi kabel dirapikan agar aman dan tidak mengganggu aktivitas'],
      scope:['Instalasi rumah, toko, kantor & gudang','Kamera indoor & outdoor','Konfigurasi DVR & NVR','Akses CCTV via smartphone','Cek kamera tidak tampil / tidak merekam','Perawatan & perbaikan sistem','Penataan kabel & konektivitas jaringan']
    },
    {
      icon:'package', title:'Pengadaan Komputer & Perangkat IT',
      short:'Pengadaan perangkat sesuai spesifikasi dan anggaran Anda.',
      desc:'Kami menyediakan pengadaan komputer, laptop, perangkat CCTV, dan perlengkapan IT lainnya berdasarkan spesifikasi serta anggaran yang Anda tetapkan — termasuk penyusunan kebutuhan untuk kantor, sekolah, dan instansi.',
      benefits:['Penawaran disusun sesuai kebutuhan nyata dan anggaran','Spesifikasi dapat disesuaikan per unit atau per batch','Satu pintu untuk perangkat komputer, CCTV, dan jaringan','Cocok untuk kebutuhan kantor, sekolah, dan instansi'],
      scope:['Pengadaan desktop & laptop','Monitor, printer & aksesori','Perangkat CCTV & perlengkapannya','Perangkat jaringan & pendukung IT','Sesuai spesifikasi & anggaran pelanggan','Penawaran kebutuhan kantor, sekolah & instansi']
    },
    {
      icon:'clipboard-list', title:'Maintenance IT Berkala',
      short:'Program perawatan rutin perangkat & jaringan dengan laporan jelas.',
      desc:'Program perawatan rutin untuk menjaga perangkat komputer dan jaringan tetap optimal — mencakup pemeriksaan berkala, pendataan aset IT, dan laporan pekerjaan maintenance agar Anda selalu tahu kondisi perangkat Anda.',
      benefits:['Masalah kecil terdeteksi sebelum menjadi gangguan besar','Kondisi aset IT terdokumentasi dan mudah dipantau','Pekerjaan maintenance dilaporkan secara transparan','Rekomendasi penggantian diberikan berdasarkan kondisi nyata'],
      scope:['Pemeriksaan perangkat komputer','Pemeriksaan koneksi jaringan','Jadwal perawatan rutin','Pendataan aset perangkat IT','Laporan pekerjaan maintenance','Rekomendasi penggantian perangkat']
    }
  ],
  /* Data katalog berikut adalah DATA CONTOH (demo) — bukan stok/harga/merek
     sesungguhnya. Kelola data asli melalui Dashboard Admin → Kelola Produk. */
  products: [
    {id:'p1',name:'PC Desktop — Rakitan Office',category:'Komputer & Laptop',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog. Hubungi kami untuk rekomendasi spesifikasi sesuai kebutuhan.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p2',name:'Laptop Bisnis 14"',category:'Komputer & Laptop',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog. Hubungi kami untuk rekomendasi spesifikasi sesuai kebutuhan.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p3',name:'Monitor LED 21,5"',category:'Monitor & Aksesori',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Tersedia',image:'',demo:true},
    {id:'p4',name:'Keyboard + Mouse Set',category:'Monitor & Aksesori',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p5',name:'Kamera CCTV Dome 2MP',category:'CCTV & Kamera Keamanan',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p6',name:'Kamera CCTV Bullet 2MP',category:'CCTV & Kamera Keamanan',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p7',name:'DVR 4 Channel',category:'DVR & NVR',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p8',name:'NVR 8 Channel PoE',category:'DVR & NVR',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p9',name:'Hard Disk Surveillance 1TB',category:'Hard Disk CCTV',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Habis',image:'',demo:true},
    {id:'p10',name:'Kabel CCTV RG59 + Konektor',category:'Kabel & Konektor',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p11',name:'Switch 8 Port',category:'Perangkat Jaringan',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Hubungi Admin',image:'',demo:true},
    {id:'p12',name:'UPS 1200VA',category:'Peralatan Pendukung IT',brand:'(contoh — diisi admin)',spec:'Spesifikasi contoh untuk pratinjau katalog.',price:null,status:'Hubungi Admin',image:'',demo:true}
  ],
  /* Data proyek berikut adalah DATA CONTOH (demo). Ganti dengan dokumentasi
     proyek nyata melalui Dashboard Admin → Kelola Portofolio. */
  projects: [
    {id:'pr1',title:'Instalasi CCTV Ruko 2 Lantai',category:'CCTV',location:'Tembalang, Semarang',desc:'Pemasangan kamera indoor & outdoor, konfigurasi DVR, serta pengaturan akses melalui smartphone.',image:'',demo:true},
    {id:'pr2',title:'Instalasi CCTV Rumah Tinggal',category:'CCTV',location:'Banyumanik, Semarang',desc:'Penentuan titik kamera mengelilingi area rumah dan penataan kabel yang rapi.',image:'',demo:true},
    {id:'pr3',title:'Perawatan Komputer Kantor',category:'Komputer',location:'Semarang Utara',desc:'Pembersihan perangkat, pengecekan sistem, dan pembuatan laporan kondisi unit.',image:'',demo:true},
    {id:'pr4',title:'Upgrade SSD & RAM Beberapa Unit',category:'Komputer',location:'Pedurungan, Semarang',desc:'Upgrade komponen untuk mempercepat kinerja komputer kerja karyawan.',image:'',demo:true},
    {id:'pr5',title:'Pengadaan Komputer Lab Sekolah',category:'Pengadaan',location:'Semarang Timur',desc:'Penyusunan penawaran perangkat sesuai anggaran dan kebutuhan lab komputer.',image:'',demo:true},
    {id:'pr6',title:'Perapian Kabel Jaringan Gudang',category:'Jaringan',location:'Semarang Barat',desc:'Penataan ulang kabel jaringan agar aman, tertata, dan mudah dipelihara.',image:'',demo:true},
    {id:'pr7',title:'Instalasi Jaringan Kantor',category:'Jaringan',location:'Tembalang, Semarang',desc:'Pemasangan perangkat jaringan dan pengetesan konektivitas seluruh titik.',image:'',demo:true},
    {id:'pr8',title:'Pemasangan DVR & Konfigurasi Remote',category:'CCTV',location:'Sendangmulyo, Semarang',desc:'Konfigurasi DVR dan akses pantauan dari smartphone untuk pemilik usaha.',image:'',demo:true}
  ],
  /* Testimoni awalnya kosong — tampil di beranda hanya jika sudah ditambahkan
     DAN terverifikasi berasal dari pelanggan nyata (via Dashboard Admin). */
  testimonials: [],
  messages: []
};

