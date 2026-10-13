/* ===================== KONTEN STATIS ===================== */
/* nama file foto per layanan: assets/img/photos/<nama>.jpg */
const SVC_KEYS = ['komputer','cctv','pengadaan','maintenance'];

const ADVANTAGES = [
  {icon:'message-circle', t:'Komunikasi Transparan', d:'Kami menjelaskan masalah, opsi penanganan, dan penawaran secara jelas sebelum pekerjaan dimulai.'},
  {icon:'scale', t:'Sesuai Kebutuhan & Anggaran', d:'Solusi disusun secara realistis berdasarkan kebutuhan nyata dan anggaran yang Anda miliki.'},
  {icon:'clipboard-check', t:'Rapi & Terdokumentasi', d:'Hasil pekerjaan dirapikan dan didokumentasikan, termasuk laporan untuk pekerjaan maintenance.'},
  {icon:'shield-check', t:'Dukungan Setelah Pekerjaan', d:'Tetap terhubung dengan kami melalui WhatsApp untuk pertanyaan atau tindak lanjut.'}
];
const STEPS = [
  {t:'Konsultasi Awal', d:'Ceritakan kebutuhan atau kendala Anda melalui WhatsApp atau formulir konsultasi.'},
  {t:'Survei & Penawaran', d:'Kami tinjau kebutuhan — dan lokasi bila diperlukan — lalu menyusun penawaran yang jelas.'},
  {t:'Penjadwalan', d:'Pekerjaan dijadwalkan sesuai kesepakatan dan waktu yang Anda tentukan.'},
  {t:'Pengerjaan', d:'Teknisi mengerjakan dengan standar kerapian dan komunikasi yang baik.'},
  {t:'Serah Terima', d:'Pengecekan hasil bersama pelanggan, dilengkapi dokumentasi dan laporan bila relevan.'}
];
const FAQS = [
  {q:'Di area mana saja Andalan Teknik melayani?', a:'Fokus layanan kami adalah Kota Semarang dan sekitarnya. Untuk lokasi di luar area tersebut, silakan hubungi kami terlebih dahulu melalui WhatsApp untuk konfirmasi ketersediaan layanan.'},
  {q:'Berapa biaya service komputer atau instalasi CCTV?', a:'Biaya menyesuaikan jenis pekerjaan, perangkat, dan lokasi — karena itu kami tidak menetapkan harga paket di website ini. Silakan konsultasi via WhatsApp; kami berikan estimasi biaya sesuai kebutuhan Anda sebelum pekerjaan dimulai.'},
  {q:'Bagaimana proses pengerjaannya dari awal sampai selesai?', a:'Prosesnya terdiri dari lima tahap: konsultasi awal, survei & penawaran, penjadwalan, pengerjaan, dan serah terima. Penawaran dan jadwal selalu disepakati bersama sebelum pekerjaan dimulai.'},
  {q:'Apakah bisa survei lokasi terlebih dahulu?', a:'Bisa. Untuk pekerjaan seperti instalasi CCTV atau program maintenance berkala, kami dapat mengatur survei lokasi terlebih dahulu agar titik pemasangan dan penawaran menjadi lebih akurat. Hubungi kami untuk penjadwalan.'},
  {q:'Apakah tersedia perawatan berkala untuk kantor atau sekolah?', a:'Ya. Kami menyediakan program Maintenance IT Berkala yang mencakup pemeriksaan perangkat, pengecekan jaringan, pendataan aset IT, dan laporan pekerjaan maintenance setiap kunjungan.'},
  {q:'Saya ingin mengadakan perangkat dengan spesifikasi tertentu — bisa dibantu?', a:'Bisa. Kami menyusun penawaran pengadaan berdasarkan spesifikasi dan anggaran yang Anda tetapkan, termasuk untuk kebutuhan kantor, sekolah, dan instansi.'}
];
const ADDRESS = 'Jl. Griya Klipang Permai Blk. N No.6/17, Sendangmulyo, Kec. Tembalang, Kota Semarang, Jawa Tengah 50272';
const MAP_EMBED = 'https://www.google.com/maps?q=' + encodeURIComponent(ADDRESS) + '&output=embed';
const MAP_LINK  = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADDRESS);

