"use strict";
/* ================================================================
   DASHBOARD ADMIN
   Login client-side hanya untuk pengelolaan lokal/kendali akses
   ringan. Untuk produksi multi-user, gunakan integrasi Google
   Apps Script (tab "Integrasi & Data") dengan token rahasia.
================================================================ */
const PW_KEY='andalan_admin_pw';
const ADMIN_TABS=[
 ['overview','Ringkasan','radar','INTI'],
 ['hero','Konten Beranda','monitor','INTI'],
 ['promos','Promo & Banner','zap','KONTEN'],
 ['packages','Paket Hemat','box','KONTEN'],
 ['products','Katalog Produk','layers','KONTEN'],
 ['services','Layanan','wrench','KONTEN'],
 ['portfolio','Portofolio','eye','KONTEN'],
 ['sectors','Sektor Pelanggan','users','KONTEN'],
 ['about','Halaman Tentang','building','KONTEN'],
 ['faqs','FAQ','chat','KONTEN'],
 ['testimonials','Testimoni','star','KONTEN'],
 ['leads','Permintaan Konsultasi','send','INTERAKSI'],
 ['company','Info Perusahaan','building','PENGATURAN'],
 ['data','Integrasi & Data','db','PENGATURAN']
];
let adTab='overview';
function getPW(){ return localStorage.getItem(PW_KEY)||CONFIG.defaultAdminPassword; }
function renderAdmin(){
  const root=$('#admin-root'); if(!root) return;
  if(sessionStorage.getItem('adal_auth')!=='1'){ renderLogin(root); return; }
  root.innerHTML=`
  <aside class="ad-side">
    <div class="brand"><img class="hex" src="assets/img/logo.png" alt="Logo Andalan Teknik"><span>ANDALAN ADMIN<small>CONTROL PANEL</small></span></div>
    
    <div style="margin-top:auto;padding:16px 20px;border-top:1px solid var(--line)">
      <a href="#/" class="btn btn-g btn-sm" style="width:100%;justify-content:center;margin-bottom:8px">${ic('eye')}Lihat Situs</a>
      <button class="btn btn-r btn-sm" style="width:100%;justify-content:center" id="ad-logout">${ic('lock')}Keluar</button>
    </div>
  </aside>
  <div class="ad-main" id="ad-main"></div>`;
  // kelompok label: bangun ulang lebih bersih
  root.querySelector('.ad-side').innerHTML='<div class="brand"><img class="hex" src="assets/img/logo.png" alt="Logo Andalan Teknik"><span>ANDALAN ADMIN<small>CONTROL PANEL</small></span></div>'+
    (()=>{let out='',last='';ADMIN_TABS.forEach(t=>{if(t[3]!==last){out+='<div class="grp">'+t[3]+'</div>';last=t[3];}out+='<button class="tab'+(adTab===t[0]?' on':'')+'" data-adtab="'+t[0]+'">'+ic(t[2])+t[1]+'</button>';});return out;})()+
    '<div style="margin-top:auto;padding:16px 20px;border-top:1px solid var(--line)">'+adPublishHTML()+'<a href="#/" class="btn btn-g btn-sm" style="width:100%;justify-content:center;margin-bottom:8px">'+ic('eye')+'Lihat Situs</a><button class="btn btn-r btn-sm" style="width:100%;justify-content:center" id="ad-logout">'+ic('lock')+'Keluar</button></div>';
  root.querySelectorAll('[data-adtab]').forEach(b=>b.addEventListener('click',()=>{adTab=b.dataset.adtab;renderAdmin();}));
  $('#ad-logout').addEventListener('click',()=>{sessionStorage.removeItem('adal_auth');refreshDB();renderAdmin();});
  bindPublish();
  renderAdTab();
}
function renderLogin(root){
  root.innerHTML=`<div class="ad-login"><div class="box panel">
    <h3 style="margin-bottom:6px">${ic('lock')} Dashboard Admin</h3>
    <p style="font-size:13px;color:var(--mut);margin-bottom:18px">Masukkan kata sandi admin untuk mengelola konten situs. Sandi awal ada di <span class="mono" style="color:var(--cyan)">assets/js/config.js</span> — segera ganti di tab Integrasi &amp; Data.</p>
    <form id="ad-login-f"><div class="fld"><label>Kata Sandi</label><input type="password" name="pw" required autofocus></div>
    <button class="btn btn-p" style="width:100%;justify-content:center;margin-top:14px" type="submit">Masuk</button></form>
    <p style="margin-top:14px"><a href="#/" style="font-size:13px">← Kembali ke situs</a></p>
  </div></div>`;
  $('#ad-login-f').addEventListener('submit',e=>{
    e.preventDefault();
    if(e.target.pw.value===getPW()){ sessionStorage.setItem('adal_auth','1'); refreshDB(); toast('Selamat datang, admin.'); renderAdmin(); }
    else toast('Kata sandi salah.','err');
  });
}

/* --- skema field untuk CRUD generik --- */
const F={text:(k,l,ph)=>({k,t:'text',l,ph}),area:(k,l)=>({k,t:'area',l}),list:(k,l)=>({k,t:'list',l}),bool:(k,l)=>({k,t:'bool',l}),sel:(k,l,o)=>({k,t:'sel',l,o}),img:(k,l)=>({k,t:'img',l})};
const SCHEMAS={
 services:{title:'Layanan',nameKey:'title',fields:[F.sel('icon','Ikon',ICON_NAMES),F.text('title','Judul'),F.area('desc','Deskripsi'),F.list('features','Poin layanan (satu per baris)'),F.bool('active','Tampilkan di situs')]},
 promos:{title:'Promo',nameKey:'title',fields:[F.text('badge','Label (mis. PROMO)'),F.text('title','Judul promo'),F.area('desc','Deskripsi'),F.text('period','Periode'),F.area('terms','Syarat & ketentuan'),F.text('category','Kategori'),F.img('image','Gambar'),F.bool('featured','Jadikan banner utama'),F.bool('active','Aktif')]},
 packages:{title:'Paket Hemat',nameKey:'title',fields:[F.text('title','Nama paket'),F.text('audience','Sasaran'),F.list('items','Item paket (satu per baris)'),F.area('price','Keterangan harga / skema'),F.bool('featured','Tandai rekomendasi'),F.bool('active','Aktif')]},
 products:{title:'Produk Katalog',nameKey:'name',fields:[F.text('name','Nama perangkat'),F.sel('category','Kategori',PRODUCT_CATS),F.list('specs','Spesifikasi (satu per baris)'),F.text('price','Harga (kosongkan = minta penawaran)'),F.img('image','Gambar'),F.bool('active','Tampilkan')]},
 portfolio:{title:'Portofolio',nameKey:'title',fields:[F.text('title','Judul proyek'),F.sel('category','Kategori',PORT_CATS),F.text('location','Lokasi'),F.text('scale','Skala'),F.area('desc','Deskripsi'),F.img('image','Gambar'),F.bool('active','Tampilkan')]},
 sectors:{title:'Sektor',nameKey:'label',fields:[F.sel('icon','Ikon',ICON_NAMES),F.text('label','Nama sektor')]},
 faqs:{title:'FAQ',nameKey:'q',fields:[F.text('q','Pertanyaan'),F.area('a','Jawaban')]},
 testimonials:{title:'Testimoni',nameKey:'name',fields:[F.text('name','Nama'),F.text('role','Peran / instansi'),F.area('text','Isi testimoni'),F.bool('verified','Terverifikasi'),F.bool('active','Tampilkan')]}
};
const HERO_FIELDS=[F.text('kicker','Eyebrow baris kecil'),F.area('title','Headline utama (kata "Cerdas" otomatis di-highlight)'),F.area('lead','Deskripsi layanan di hero')];
const COMPANY_FIELDS=[F.text('brand','Nama brand'),F.text('legal','Nama badan usaha'),F.area('address','Alamat'),F.text('phone','Telepon'),F.text('whatsapp','Nomor WhatsApp (format 62xxx, tanpa tanda +)'),F.text('email','Email'),F.text('hours','Jam operasional'),F.text('mapsQuery','Query peta Google Maps')];

function renderAdTab(){
  const m=$('#ad-main'); if(!m) return;
  const warns=[];
  if(DB.company.whatsapp==='6281234567890') warns.push('Nomor WhatsApp masih menggunakan nilai default. Semua tombol WhatsApp mengarah ke nomor ini — segera perbarui di tab <b>Info Perusahaan</b>.');
  if(!DB.company.email) warns.push('Email perusahaan belum diisi.');
  if(!getRemote().enabled) warns.push('<b>Mode lokal:</b> perubahan hanya terlihat di browser ini. Aktifkan Google Sheets di tab <b>Integrasi &amp; Data</b> agar tampil untuk semua pengunjung.');
  const warnHTML=warns.length?'<div class="ad-note">'+ic('zap')+'<div>'+warns.join('<br>')+'</div></div>':'';
  const T={
  overview:()=>{
    const leads=DB.leads, nw=leads.filter(l=>l.status==='baru').length;
    m.innerHTML='<div class="ad-top"><h2>Ringkasan</h2></div>'+warnHTML+
    '<div class="stat-row">'+
    '<div class="stat"><b>'+DB.promos.filter(p=>p.active).length+'</b><span>Promo Aktif</span></div>'+
    '<div class="stat"><b>'+DB.products.filter(p=>p.active).length+'</b><span>Produk Katalog</span></div>'+
    '<div class="stat"><b>'+DB.portfolio.filter(p=>p.active).length+'</b><span>Entri Portofolio</span></div>'+
    '<div class="stat"><b>'+nw+'</b><span>Lead Baru</span></div>'+
    '</div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Permintaan Terbaru</th><th>Kebutuhan</th><th>Status</th><th>Waktu</th></tr></thead><tbody>'+
    (leads.length?leads.slice(0,8).map(l=>'<tr><td><b style="color:var(--txt)">'+esc(l.nama)+'</b>'+(l.org?'<br><span style="font-size:12px">'+esc(l.org)+'</span>':'')+'</td><td>'+esc(l.need)+'</td><td>'+esc(l.status)+'</td><td style="font-family:var(--f-mono);font-size:11px">'+esc(l.tanggal)+'</td></tr>').join(''):'<tr><td colspan="4" style="text-align:center;padding:24px">Belum ada permintaan masuk.</td></tr>')+
    '</tbody></table></div>';
  },
  hero:()=>{
    m.innerHTML='<div class="ad-top"><h2>Konten Beranda (Hero)</h2></div>'+warnHTML+'<div class="ad-form">'+formFromFields(HERO_FIELDS,DB.hero)+
    '<button class="btn btn-p btn-sm" style="margin-top:16px" id="f-save">'+ic('check')+'Simpan Beranda</button></div>';
    $('#f-save').addEventListener('click',()=>{
      collectFields(HERO_FIELDS,DB.hero); saveDB(); toast('Konten beranda disimpan.');
    });
  },
  company:()=>{
    m.innerHTML='<div class="ad-top"><h2>Info Perusahaan</h2></div>'+warnHTML+'<div class="ad-form">'+formFromFields(COMPANY_FIELDS,DB.company)+
    '<button class="btn btn-p btn-sm" style="margin-top:16px" id="f-save">'+ic('check')+'Simpan Info Perusahaan</button></div>';
    $('#f-save').addEventListener('click',()=>{
      collectFields(COMPANY_FIELDS,DB.company); saveDB(); buildNav(); toast('Info perusahaan disimpan.');
    });
  },
  leads:()=>{
    m.innerHTML='<div class="ad-top"><h2>Permintaan Konsultasi & Penawaran</h2><div class="sp"><button class="btn btn-g btn-sm" id="ld-refresh">'+ic('down')+'Muat dari Server</button> <button class="btn btn-g btn-sm" id="ld-csv">'+ic('down')+'Export CSV</button></div></div>'+warnHTML+
    '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nama</th><th>Kebutuhan / Pesan</th><th>Sumber</th><th>Waktu</th><th>Status</th><th></th></tr></thead><tbody>'+
    (DB.leads.length?DB.leads.map(l=>'<tr><td><b style="color:var(--txt)">'+esc(l.nama)+'</b>'+(l.org?'<br><span style="font-size:12px">'+esc(l.org)+'</span>':'')+'</td><td style="max-width:280px"><b style="color:var(--txt);font-size:12.5px">'+esc(l.need)+'</b><br>'+esc(l.pesan)+'</td><td style="font-family:var(--f-mono);font-size:11px">'+esc(l.source)+'</td><td style="font-family:var(--f-mono);font-size:11px">'+esc(l.tanggal)+'</td><td><select class="mini" data-leadst="'+l.id+'">'+['baru','diproses','selesai'].map(s=>'<option'+(l.status===s?' selected':'')+'>'+s+'</option>').join('')+'</select></td><td><div class="act"><a class="ibtn" target="_blank" rel="noopener" href="'+waLink('Halo '+l.nama+', kami dari Andalan Teknik membalas permintaan Anda terkait: '+l.need)+'" title="Balas via WA">'+ic('wa')+'</a><button class="ibtn del" data-leaddel="'+l.id+'" title="Hapus">'+ic('trash')+'</button></div></td></tr>').join(''):'<tr><td colspan="6" style="text-align:center;padding:24px">Belum ada permintaan masuk.</td></tr>')+
    '</tbody></table></div>';
    bindLeadTools();
    m.querySelectorAll('[data-leadst]').forEach(s=>s.addEventListener('change',()=>{
      const l=DB.leads.find(x=>x.id===s.dataset.leadst); if(l){l.status=s.value;saveDB(true);remoteLead('status',l.id,l.status);toast('Status diperbarui: '+s.value);}
    }));
    m.querySelectorAll('[data-leaddel]').forEach(b=>b.addEventListener('click',()=>confirmModal('Hapus permintaan?','Data permintaan ini akan dihapus permanen.',()=>{
      remoteLead('del',b.dataset.leaddel); DB.leads=DB.leads.filter(x=>x.id!==b.dataset.leaddel); saveDB(true); renderAdTab(); toast('Permintaan dihapus.');
    })));
  },
  about:()=>{
    const AF=[F.area('profile','Profil perusahaan (tulis {brand} untuk nama brand)'),F.list('values','Nilai kerja (satu per baris, format: Judul — penjelasan)')];
    m.innerHTML='<div class="ad-top"><h2>Halaman Tentang</h2></div>'+warnHTML+'<div class="ad-form">'+formFromFields(AF,DB.about)+'<button class="btn btn-p btn-sm" style="margin-top:16px" id="f-save">'+ic('check')+'Simpan</button></div>';
    $('#f-save').addEventListener('click',()=>{ collectFields(AF,DB.about); saveDB(); toast('Halaman Tentang disimpan.'); });
  },
  data:()=>{ /* integrasi di bawah */ }
  };
  if(T[adTab]){ T[adTab](); if(adTab!=='data') return; }
  if(SCHEMAS[adTab]){ renderCrud(adTab); return; }
  if(adTab==='data') renderDataTab(m,warnHTML);
}
function formFromFields(fields,obj){
  return '<div class="f-grid">'+fields.map(f=>{
    const v=obj[f.k]??''; const id='ff_'+f.k;
    if(f.t==='img') return imgFieldHTML(id,v,f.l);
    if(f.t==='bool') return '<div class="fld full" style="flex-direction:row;align-items:center;gap:10px"><input type="checkbox" id="'+id+'"'+(v?' checked':'')+' style="width:auto"><label for="'+id+'" style="margin:0;text-transform:none;letter-spacing:0;font-size:13.5px;color:var(--body)">'+esc(f.l)+'</label></div>';
    if(f.t==='area'||f.t==='list') return '<div class="fld full"><label>'+esc(f.l)+'</label><textarea id="'+id+'">'+esc(f.t==='list'?(v||[]).join('\n'):v)+'</textarea></div>';
    if(f.t==='sel') return '<div class="fld"><label>'+esc(f.l)+'</label><select id="'+id+'">'+f.o.map(o=>'<option'+(o===v?' selected':'')+'>'+esc(o)+'</option>').join('')+'</select></div>';
    return '<div class="fld'+(f.k==='title'||f.k==='kicker'?' full':'')+'"><label>'+esc(f.l)+'</label><input id="'+id+'" value="'+esc(v)+'"'+(f.ph?' placeholder="'+esc(f.ph)+'"':'')+'></div>';
  }).join('')+'</div>';
}
function collectFields(fields,obj){
  fields.forEach(f=>{
    const el=$('#ff_'+f.k); if(!el) return;
    obj[f.k]=f.t==='bool'?el.checked:f.t==='list'?el.value.split('\n').map(x=>x.trim()).filter(Boolean):el.value.trim();
  });
}
function renderCrud(key){
  const sc=SCHEMAS[key], list=DB[key];
  const m=$('#ad-main');
  m.innerHTML='<div class="ad-top"><h2>'+sc.title+'</h2><div class="sp"><button class="btn btn-p btn-sm" id="c-add">'+ic('plus')+'Tambah '+sc.title+'</button></div></div>'+
  '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>'+esc(sc.nameKey==='q'?'Pertanyaan':sc.nameKey==='name'?'Nama':'Judul')+'</th>'+(key==='promos'||key==='products'||key==='packages'?'<th>Status</th>':'')+'<th></th></tr></thead><tbody>'+
  (list.length?list.map((it,i)=>'<tr><td style="max-width:520px"><b style="color:var(--txt)">'+esc(it[sc.nameKey])+'</b>'+(it.placeholder?' <span class="mono" style="color:var(--mut);font-size:10px">[placeholder]</span>':'')+(key==='services'||key==='products'?'<br><span style="font-family:var(--f-mono);font-size:11px;color:var(--mut)">'+ic(it.icon||'zap')+' '+esc(it.icon||'')+'</span>':'')+'</td>'+
  ((key==='promos'||key==='products'||key==='packages')?'<td>'+(it.active?'<span style="color:var(--cyan)">aktif</span>':'<span style="color:var(--mut)">nonaktif</span>')+(it.featured?' · <span style="color:var(--red)">utama</span>':'')+'</td>':'')+
  '<td><div class="act"><button class="ibtn" data-cmv="up" data-id="'+it.id+'" title="Naik">'+ic('up')+'</button><button class="ibtn" data-cmv="dn" data-id="'+it.id+'" title="Turun">'+ic('down')+'</button><button class="ibtn" data-ced="'+it.id+'" title="Edit">'+ic('edit')+'</button><button class="ibtn del" data-cdl="'+it.id+'" title="Hapus">'+ic('trash')+'</button></div></td></tr>').join(''):'<tr><td colspan="3" style="text-align:center;padding:24px">Belum ada data.</td></tr>')+
  '</tbody></table></div>';
  m.querySelectorAll('[data-cmv]').forEach(b=>b.addEventListener('click',()=>{
    const a=DB[key], i=a.findIndex(x=>x.id===b.dataset.id), j=i+(b.dataset.cmv==='up'?-1:1);
    if(i<0||j<0||j>=a.length) return; [a[i],a[j]]=[a[j],a[i]]; saveDB(); renderAdTab();
  }));
  $('#c-add').addEventListener('click',()=>crudForm(key,null));
  m.querySelectorAll('[data-ced]').forEach(b=>b.addEventListener('click',()=>crudForm(key,DB[key].find(x=>x.id===b.dataset.ced))));
  m.querySelectorAll('[data-cdl]').forEach(b=>b.addEventListener('click',()=>confirmModal('Hapus entri?','Entri ini akan dihapus dari situs.',()=>{
    DB[key]=DB[key].filter(x=>x.id!==b.dataset.cdl); saveDB(); renderAdTab(); toast('Entri dihapus.');
  })));
}
function crudForm(key,item){
  const sc=SCHEMAS[key]; const isNew=!item;
  const obj=item?structuredClone(item):{id:uid(),active:true};
  if(!item&&key==='promos'){obj.badge='PROMO';obj.period='';}
  openModal('<h3 style="margin-bottom:18px">'+(isNew?'Tambah ':'Edit ')+sc.title+'</h3><div class="f-grid">'+
   sc.fields.map(f=>{
    const v=obj[f.k]??''; const id='cf_'+f.k;
    if(f.t==='img') return imgFieldHTML(id,v,f.l);
    if(f.t==='bool') return '<div class="fld full" style="flex-direction:row;align-items:center;gap:10px"><input type="checkbox" id="'+id+'"'+(v?' checked':'')+' style="width:auto"><label for="'+id+'" style="margin:0;text-transform:none;letter-spacing:0;font-size:13.5px;color:var(--body)">'+esc(f.l)+'</label></div>';
    if(f.t==='area'||f.t==='list') return '<div class="fld full"><label>'+esc(f.l)+'</label><textarea id="'+id+'">'+esc(f.t==='list'?(v||[]).join('\n'):v)+'</textarea></div>';
    if(f.t==='sel') return '<div class="fld"><label>'+esc(f.l)+'</label><select id="'+id+'">'+f.o.map(o=>'<option'+(o===v?' selected':'')+'>'+esc(o)+'</option>').join('')+'</select></div>';
    return '<div class="fld full"><label>'+esc(f.l)+'</label><input id="'+id+'" value="'+esc(v)+'"></div>';
   }).join('')+'</div>'+
   '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px"><button class="btn btn-g btn-sm" data-close-modal>Batal</button><button class="btn btn-p btn-sm" id="cf-save">'+ic('check')+'Simpan</button></div>');
  bindImgFields();
  $('#cf-save').addEventListener('click',()=>{
    const nk=sc.nameKey;
    sc.fields.forEach(f=>{
      const el=$('#cf_'+f.k); if(!el) return;
      obj[f.k]=f.t==='bool'?el.checked:f.t==='list'?el.value.split('\n').map(x=>x.trim()).filter(Boolean):el.value.trim();
    });
    if(!obj[nk]){ toast('Field judul/nama wajib diisi.','err'); return; }
    obj.placeholder=false;
    if(isNew) DB[key].push(obj); else { const i=DB[key].findIndex(x=>x.id===obj.id); DB[key][i]=obj; }
    saveDB(); closeModal(); renderAdTab(); toast(sc.title+(isNew?' ditambahkan.':' diperbarui.'));
  });
}
function renderDataTab(m,warnHTML){
  const c=getRemote();
  m.innerHTML='<div class="ad-top"><h2>Integrasi & Data</h2></div>'+warnHTML+
  '<div class="ad-hint">Data situs tersimpan lokal di browser (localStorage) dan otomatis dipakai oleh seluruh halaman. Untuk sinkronisasi antar-perangkat atau tim, gunakan integrasi Google Sheets via Apps Script di bawah — aman karena token rahasia disimpan pada deployment Anda, bukan di kode situs.</div>'+
  '<div class="ad-form" style="margin-bottom:18px"><h3 style="margin-bottom:14px">'+ic('db')+' Sinkronisasi Google Sheets (opsional)</h3>'+
  '<div class="f-grid">'+
  '<div class="fld"><label>Status</label><select id="rm-en"><option value="0"'+(c.enabled?'':' selected')+'>Nonaktif (lokal)</option><option value="1"'+(c.enabled?' selected':'')+'>Aktif</option></select></div>'+
  '<div class="fld full"><label>URL Web App Apps Script</label><input id="rm-url" value="'+esc(c.url)+'" placeholder="https://script.google.com/macros/s/…/exec"></div>'+
  '<div class="fld full"><label>Token rahasia (sama dengan TOKEN di skrip)</label><input id="rm-tk" value="'+esc(c.token)+'" type="password"></div></div>'+
  '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><button class="btn btn-g btn-sm" id="rm-save">'+ic('gear')+'Simpan Konfigurasi</button><button class="btn btn-g btn-sm" id="rm-pull">'+ic('down')+'Tarik Data</button><button class="btn btn-p btn-sm" id="rm-push">'+ic('up')+'Kirim Data</button></div>'+
  '<div id="rm-status" class="mono" style="margin-top:12px;font-size:12px;color:var(--mut)"></div></div>'+
  '<div class="ad-form" style="margin-bottom:18px"><h3 style="margin-bottom:14px">'+ic('down')+' Backup Manual</h3><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-g btn-sm" id="exp">'+ic('down')+'Export JSON</button><button class="btn btn-g btn-sm" id="impbtn">'+ic('up')+'Import JSON</button><input type="file" id="imp" accept=".json" hidden><button class="btn btn-r btn-sm" id="rst">'+ic('trash')+'Reset ke Default</button></div></div>'+
  '<div class="ad-form"><h3 style="margin-bottom:6px">'+ic('lock')+' Kata Sandi Admin</h3><div class="f-grid"><div class="fld"><label>Sandi baru</label><input id="pw1" type="password"></div><div class="fld"><label>Ulangi</label><input id="pw2" type="password"></div></div><button class="btn btn-g btn-sm" style="margin-top:14px" id="pwsave">'+ic('check')+'Ganti Sandi</button></div>'+
  '<h3 style="margin:22px 0 10px;font-size:16px">'+ic('code')+' Panduan Google Apps Script (copy &amp; paste ke script.google.com)</h3>'+
  '<div class="code" id="gascode">'+GAS_CODE+'</div>'+
  '<button class="btn btn-g btn-sm" style="margin-top:10px" id="copygas">'+ic('check')+'Salin Kode</button>';
  $('#rm-save').addEventListener('click',()=>{ setRemote({enabled:$('#rm-en').value==='1',url:$('#rm-url').value.trim(),token:$('#rm-tk').value.trim()}); toast('Konfigurasi integrasi disimpan.'); });
  $('#rm-pull').addEventListener('click',async()=>{
    const st=$('#rm-status'); st.textContent='Menarik data…';
    try{ await remotePull(); st.style.color='var(--cyan)'; st.textContent='Data berhasil ditarik dari Google Sheets.'; toast('Data remote berhasil dimuat.'); }
    catch(e){ st.style.color='var(--red)'; st.textContent='Gagal: '+e.message; }
  });
  $('#rm-push').addEventListener('click',async()=>{
    const st=$('#rm-status'); st.textContent='Mengirim data…';
    try{ await remotePush(); st.style.color='var(--cyan)'; st.textContent='Data berhasil dikirim ke Google Sheets.'; toast('Data tersimpan di Google Sheets.'); }
    catch(e){ st.style.color='var(--red)'; st.textContent='Gagal: '+e.message; }
  });
  $('#exp').addEventListener('click',()=>{
    const b=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='andalan-teknik-data.json'; a.click(); URL.revokeObjectURL(a.href);
    toast('File backup diunduh.');
  });
  $('#impbtn').addEventListener('click',()=>$('#imp').click());
  $('#imp').addEventListener('change',e=>{
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=()=>{ try{
      const d=JSON.parse(r.result);
      if(typeof d!=='object'||!d.services||!d.company) throw new Error('Struktur tidak dikenali');
      DB=Object.assign(structuredClone(DEFAULT_DB),d); saveDB(); buildNav(); toast('Data berhasil diimpor.'); renderAdTab();
    }catch(err){ toast('Import gagal: file tidak valid.','err'); } };
    r.readAsText(f);
  });
  $('#rst').addEventListener('click',()=>confirmModal('Reset semua data?','Seluruh konten kembali ke placeholder default. Backup dulu via Export JSON bila perlu.',()=>{
    DB=structuredClone(DEFAULT_DB); saveDB(); buildNav(); renderAdTab(); toast('Data direset ke default.');
  }));
  $('#pwsave').addEventListener('click',()=>{
    const a=$('#pw1').value, b=$('#pw2').value;
    if(a.length<6){ toast('Sandi minimal 6 karakter.','err'); return; }
    if(a!==b){ toast('Konfirmasi sandi tidak sama.','err'); return; }
    localStorage.setItem(PW_KEY,a); toast('Kata sandi admin diganti.'); $('#pw1').value='';$('#pw2').value='';
  });
  $('#copygas').addEventListener('click',()=>{
    navigator.clipboard.writeText(GAS_CODE).then(()=>toast('Kode Apps Script disalin ke clipboard.')).catch(()=>toast('Gagal menyalin — silakan blok manual.','err'));
  });
}

