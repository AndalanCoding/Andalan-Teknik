/* ===================== DASHBOARD ADMIN ===================== */
let adminAuthed = sessionStorage.getItem('andalan_admin_auth')==='1';
let adminTab = 'ringkasan';

function renderAdmin(){
  return adminAuthed ? adminShell() : adminLogin();
}
function adminLogin(){
  return `
  <div class="admin-login">
    <div class="al-card">
      <a class="brand" href="#/">
        <img class="brand-mark" src="assets/img/logo.png" alt="Logo Andalan Teknik" width="46" height="42">
        <span class="brand-txt"><b>Andalan Teknik</b><small>CV. KARYA ANDALAN TEKNIK</small></span>
      </a>
      <h1>Dashboard Admin</h1>
      <p>Masuk untuk mengelola konten website — katalog, portofolio, layanan, dan pengaturan.</p>
      <form id="login-form">
        <div class="field">
          <label>Kata Sandi</label>
          <input type="password" name="pw" id="pw" required autocomplete="current-password" placeholder="Kata sandi admin">
        </div>
        <button class="btn btn-orange btn-block" type="submit"><i data-lucide="lock"></i> Masuk</button>
      </form>
      <div class="login-err" id="login-err" hidden><i data-lucide="alert-triangle"></i>Kata sandi salah. Silakan coba lagi.</div>
      <div class="al-hint">Autentikasi ini berjalan di sisi browser (mode demo) — jangan dipakai untuk data sensitif. Kata sandi awal ada di <code>assets/js/config.js</code>.</div>
    </div>
  </div>`;
}
function adminShell(){
  const tabs = [
    ['ringkasan','Ringkasan','layout-dashboard'],
    ['pesan','Pesan Masuk','inbox'],
    ['layanan','Kelola Layanan','wrench'],
    ['produk','Kelola Produk','package'],
    ['portofolio','Kelola Portofolio','image'],
    ['testimoni','Testimoni','quote'],
    ['pengaturan','Pengaturan','settings']
  ];
  return `
  <div class="admin">
    <aside class="admin-side">
      <a class="brand" href="#/">
        <img class="brand-mark" src="assets/img/logo.png" alt="Logo Andalan Teknik" width="46" height="42">
        <span class="brand-txt"><b>Andalan Teknik</b><small>ADMIN PANEL</small></span>
      </a>
      ${tabs.map(t=>`<button class="anav${adminTab===t[0]?' active':''}" data-tab="${t[0]}" type="button"><i data-lucide="${t[2]}"></i>${t[1]}${t[0]==='pesan'&&DATA.messages.length?`<span class="cnt">${DATA.messages.length}</span>`:''}</button>`).join('')}
      <div class="a-side-bottom">
        <button class="anav" id="a-view" type="button"><i data-lucide="external-link"></i>Lihat Website</button>
        <button class="anav" id="a-logout" type="button"><i data-lucide="log-out"></i>Keluar</button>
      </div>
    </aside>
    <div class="admin-main">
      <div class="admin-top">
        <div><span class="sec-index">Dashboard Admin</span><h1 id="admin-title"></h1></div>
        <div class="a-actions">
          <a class="btn btn-outline btn-sm" href="#/">Lihat Website</a>
          <button class="btn btn-outline btn-sm" id="a-logout2" type="button"><i data-lucide="log-out"></i> Keluar</button>
        </div>
      </div>
      <div id="admin-body"></div>
    </div>
  </div>`;
}
function mountAdmin(){
  if(!adminAuthed){
    $('#login-form').addEventListener('submit', e=>{
      e.preventDefault();
      if($('#pw').value === DATA.settings.adminPassword){
        adminAuthed = true;
        sessionStorage.setItem('andalan_admin_auth','1');
        adminTab = 'ringkasan';
        route();
        toast('Selamat datang kembali','success');
      } else {
        $('#login-err').hidden = false;
        $('#pw').value = '';
      }
    });
    return;
  }
  const logout = ()=>{
    adminAuthed = false;
    sessionStorage.removeItem('andalan_admin_auth');
    route();
  };
  const lo = $('#a-logout'); if(lo) lo.onclick = logout;
  const lo2 = $('#a-logout2'); if(lo2) lo2.onclick = logout;
  $$('.anav[data-tab]').forEach(b=>b.addEventListener('click', ()=>{
    adminTab = b.dataset.tab;
    $$('.anav[data-tab]').forEach(x=>x.classList.toggle('active', x===b));
    renderAdminTab();
  }));
  renderAdminTab();
}
const ADMIN_TITLES = {ringkasan:'Ringkasan',pesan:'Pesan Masuk',layanan:'Kelola Layanan',produk:'Kelola Katalog Produk',portofolio:'Kelola Portofolio',testimoni:'Kelola Testimoni',pengaturan:'Pengaturan'};
function renderAdminTab(){
  const t = $('#admin-title'); if(t) t.textContent = ADMIN_TITLES[adminTab];
  const body = $('#admin-body'); if(!body) return;
  if(adminTab==='ringkasan') body.innerHTML = tabRingkasan();
  if(adminTab==='pesan')     body.innerHTML = tabPesan();
  if(adminTab==='layanan')   body.innerHTML = tabLayanan();
  if(adminTab==='produk')    body.innerHTML = tabProduk();
  if(adminTab==='portofolio')body.innerHTML = tabPortofolio();
  if(adminTab==='testimoni') body.innerHTML = tabTestimoni();
  if(adminTab==='pengaturan'){ body.innerHTML = tabPengaturan(); mountPengaturan(); }
  mountAdminTabExtras();
  refreshIcons();
}
function statCard(n,l,ic){ return '<div class="a-stat"><i data-lucide="'+ic+'"></i><b>'+n+'</b><span>'+l+'</span></div>'; }
function tabRingkasan(){
  const recent = DATA.messages.slice(0,4);
  return `
  <div class="a-stats">
    ${statCard(DATA.services.length,'Layanan','wrench')}
    ${statCard(DATA.products.length,'Produk Katalog','package')}
    ${statCard(DATA.projects.length,'Proyek Portofolio','image')}
    ${statCard(DATA.messages.length,'Pesan Masuk','inbox')}
  </div>
  <div class="a-cols">
    <div class="a-card">
      <h3>Pesan Terbaru</h3>
      ${recent.length ? recent.map(m=>`
        <div style="padding:12px 0;border-bottom:1px solid var(--line)">
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:center">
            <b style="font-size:14px;color:var(--navy-900)">${esc(m.nama)}</b>
            <span class="pill">${esc(m.layanan)}</span>
          </div>
          <small class="muted" style="font-size:12px">${new Date(m.ts).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'})} · ${esc(m.lokasi)}</small>
        </div>`).join('') : '<p class="a-note">Belum ada pesan masuk. Pesan dari formulir konsultasi di halaman Kontak akan tampil di sini.</p>'}
      ${recent.length?'<div style="margin-top:16px"><button class="btn btn-outline btn-sm" data-goto="pesan" type="button">Lihat semua pesan</button></div>':''}
    </div>
    <div class="a-card">
      <h3>Catatan Admin</h3>
      <ul class="note-list">
        <li><i data-lucide="info"></i>Semua data tersimpan di localStorage browser ini. Gunakan tombol <b>Ekspor Data</b> di menu Pengaturan untuk backup berkala.</li>
        <li><i data-lucide="info"></i>Nomor WhatsApp seluruh tombol website diatur di menu <b>Pengaturan</b> — pastikan sudah diganti dengan nomor resmi.</li>
        <li><i data-lucide="info"></i>Data katalog &amp; portofolio bertanda <b>demo</b> adalah contoh — ganti dengan data asli sebelum website dirilis.</li>
        <li><i data-lucide="info"></i>Testimoni hanya tampil di beranda jika ditambahkan di menu <b>Testimoni</b> dan sudah terverifikasi.</li>
      </ul>
      <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">
        <button class="btn btn-orange btn-sm" data-goto="produk" type="button"><i data-lucide="plus"></i> Kelola Produk</button>
        <button class="btn btn-outline btn-sm" data-goto="portofolio" type="button"><i data-lucide="plus"></i> Kelola Portofolio</button>
      </div>
    </div>
  </div>`;
}
function tabPesan(){
  if(!DATA.messages.length) return '<div class="a-card a-empty"><i data-lucide="inbox"></i>Belum ada pesan masuk.<br>Pesan dari formulir konsultasi akan tampil di sini.</div>';
  return DATA.messages.map(m=>`
  <div class="a-card">
    <div class="msg-top">
      <div><b>${esc(m.nama)}</b><span class="msg-date">${new Date(m.ts).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'})}</span></div>
      <div class="msg-right"><span class="pill">${esc(m.layanan)}</span>
        <button class="icon-btn danger" data-delmsg="${m.id}" type="button" title="Hapus pesan"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
    <div class="msg-body">
      <p><b>Perusahaan:</b> ${esc(m.perusahaan||'—')}</p>
      <p><b>No. WhatsApp:</b> ${esc(m.wa)}</p>
      <p><b>Lokasi:</b> ${esc(m.lokasi)}</p>
      <p><b>Jadwal konsultasi:</b> ${esc(m.jadwal||'—')}</p>
      <p class="msg-need">${esc(m.kebutuhan)}</p>
    </div>
  </div>`).join('');
}
function tabLayanan(){
  return '<div class="a-card" style="margin-bottom:16px"><p class="a-note">Perubahan pada deskripsi, manfaat, dan cakupan pekerjaan akan langsung tampil di halaman <b>Layanan</b> dan <b>Beranda</b>.</p></div>' +
  DATA.services.map((s,i)=>`
  <div class="a-card svc-edit">
    <div class="svc-edit-top"><i data-lucide="${s.icon}"></i><h3>${esc(s.title)}</h3></div>
    <div class="field"><label>Deskripsi</label><textarea rows="3" id="se-desc-${i}">${esc(s.desc)}</textarea></div>
    <div class="form-row">
      <div class="field"><label>Manfaat <small class="muted">(satu per baris)</small></label><textarea rows="4" id="se-ben-${i}">${esc(s.benefits.join('\n'))}</textarea></div>
      <div class="field"><label>Cakupan Pekerjaan <small class="muted">(satu per baris)</small></label><textarea rows="4" id="se-scp-${i}">${esc(s.scope.join('\n'))}</textarea></div>
    </div>
    <button class="btn btn-outline btn-sm" data-savesvc="${i}" type="button"><i data-lucide="save"></i> Simpan Layanan</button>
  </div>`).join('');
}
function tabProduk(){
  return `
  <div class="a-toolbar">
    <p class="a-note">Kelola katalog pengadaan — nama, kategori, harga, status ketersediaan, dan foto produk.</p>
    <button class="btn btn-orange btn-sm" id="add-prod" type="button"><i data-lucide="plus"></i> Tambah Produk</button>
  </div>
  <div class="a-card a-pad0">
    <table class="a-table">
      <thead><tr><th>Produk</th><th>Kategori</th><th>Harga</th><th>Status</th><th></th></tr></thead>
      <tbody>
        ${DATA.products.length ? DATA.products.map(p=>`
        <tr>
          <td><b>${esc(p.name)}</b>${p.demo?'<span class="demo-pill">demo</span>':''}<br><small>${esc(p.brand||'—')}</small></td>
          <td>${esc(p.category)}</td>
          <td>${p.price!=null?fmtIDR(p.price):'—'}</td>
          <td><span class="st-inline ${statusClass(p.status)}">${esc(p.status)}</span></td>
          <td class="ta-right">
            <button class="icon-btn" data-editprod="${p.id}" type="button" title="Edit"><i data-lucide="pencil"></i></button>
            <button class="icon-btn danger" data-delprod="${p.id}" type="button" title="Hapus"><i data-lucide="trash-2"></i></button>
          </td>
        </tr>`).join('') : '<tr><td colspan="5" class="a-empty">Belum ada produk. Klik "Tambah Produk" untuk memulai.</td></tr>'}
      </tbody>
    </table>
  </div>`;
}
function tabPortofolio(){
  return `
  <div class="a-toolbar">
    <p class="a-note">Kelola dokumentasi proyek. Jangan menampilkan identitas atau foto pelanggan tanpa izin — lokasi ditulis secara umum.</p>
    <button class="btn btn-orange btn-sm" id="add-proj" type="button"><i data-lucide="plus"></i> Tambah Proyek</button>
  </div>
  <div class="a-card a-pad0">
    <table class="a-table">
      <thead><tr><th>Proyek</th><th>Kategori</th><th>Lokasi</th><th></th></tr></thead>
      <tbody>
        ${DATA.projects.length ? DATA.projects.map(p=>`
        <tr>
          <td><b>${esc(p.title)}</b>${p.demo?'<span class="demo-pill">demo</span>':''}<br><small>${esc(p.desc)}</small></td>
          <td>${esc(p.category)}</td>
          <td>${esc(p.location)}</td>
          <td class="ta-right">
            <button class="icon-btn" data-editproj="${p.id}" type="button" title="Edit"><i data-lucide="pencil"></i></button>
            <button class="icon-btn danger" data-delproj="${p.id}" type="button" title="Hapus"><i data-lucide="trash-2"></i></button>
          </td>
        </tr>`).join('') : '<tr><td colspan="4" class="a-empty">Belum ada proyek.</td></tr>'}
      </tbody>
    </table>
  </div>`;
}
function tabTestimoni(){
  return `
  <div class="a-card" style="margin-bottom:16px">
    <p class="a-note"><b>Penting:</b> testimoni hanya akan tampil di halaman Beranda jika ditambahkan di sini. Pastikan setiap testimoni berasal dari pelanggan nyata dan sudah terverifikasi sebelum ditampilkan.</p>
    <button class="btn btn-orange btn-sm" id="add-tsti" style="margin-top:14px" type="button"><i data-lucide="plus"></i> Tambah Testimoni</button>
  </div>
  ${DATA.testimonials.length ? DATA.testimonials.map(t=>`
  <div class="a-card tsti-edit">
    <div class="msg-top">
      <div><b>${esc(t.name)}</b><span class="msg-date">${esc(t.role||'')}</span></div>
      <div class="msg-right">
        <button class="icon-btn" data-edittsti="${t.id}" type="button" title="Edit"><i data-lucide="pencil"></i></button>
        <button class="icon-btn danger" data-deltsti="${t.id}" type="button" title="Hapus"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
    <p style="font-size:14px;color:var(--ink-soft)">“${esc(t.text)}”</p>
  </div>`).join('') : '<div class="a-card a-empty"><i data-lucide="quote"></i>Belum ada testimoni.<br>Bagian testimoni tidak akan tampil di beranda selama kosong.</div>'}`;
}
function tabPengaturan(){
  const s = DATA.settings;
  return `
  <div class="a-card">
    <h3>Informasi Kontak</h3>
    <form id="set-form">
      <div class="field"><label>Nomor WhatsApp <span style="color:var(--orange)">*</span></label>
        <input name="wa" required value="${esc(s.whatsapp)}">
        <p class="hint">Format internasional tanpa tanda "+", diawali 62. Contoh: 628123456789. Digunakan oleh seluruh tombol WhatsApp di website.</p>
      </div>
      <div class="form-row">
        <div class="field"><label>Email</label><input name="email" type="email" value="${esc(s.email||'')}" placeholder="Opsional — tampil di Kontak & footer"></div>
        <div class="field"><label>Jam Operasional <span style="color:var(--orange)">*</span></label><input name="hours" required value="${esc(s.hours)}"><p class="hint">Contoh: Senin – Sabtu, 08.00 – 17.00 WIB</p></div>
      </div>
      <button class="btn btn-orange btn-sm" type="submit"><i data-lucide="save"></i> Simpan Pengaturan</button>
    </form>
  </div>
  <div class="a-card">
    <h3>Keamanan</h3>
    <form id="pw-form">
      <div class="field" style="max-width:340px"><label>Kata Sandi Admin Baru</label><input name="pw" required minlength="6" placeholder="Minimal 6 karakter"></div>
      <button class="btn btn-outline btn-sm" type="submit"><i data-lucide="lock"></i> Ubah Kata Sandi</button>
    </form>
  </div>
  <div class="a-card">
    <h3>Data</h3>
    <p class="a-note" style="margin-bottom:14px">Seluruh data website tersimpan di localStorage browser ini. Ekspor secara berkala sebagai backup, atau untuk memindahkan data ke perangkat lain.</p>
    <button class="btn btn-outline btn-sm" id="btn-export" type="button"><i data-lucide="download"></i> Ekspor Data (JSON)</button>
  </div>`;
}
function fld(label, inputHtml, req, hint){
  return '<div class="field"><label>'+label+(req?' <span class="req">*</span>':'')+'</label>'+inputHtml+(hint||'')+'</div>';
}
/* ---- Modal CRUD ---- */
function productModal(p){
  const isNew = !p;
  p = p || {name:'',category:CATS[0],brand:'',spec:'',price:null,status:'Hubungi Admin',image:'',demo:false};
  openModal(`
  <h3>${isNew?'Tambah':'Edit'} Produk</h3>
  <form id="m-form">
    ${fld('Nama Produk','<input name="name" required value="'+esc(p.name)+'">',1)}
    <div class="form-row">
      ${fld('Kategori','<select name="category">'+CATS.map(c=>'<option'+(c===p.category?' selected':'')+'>'+c+'</option>').join('')+'</select>')}
      ${fld('Status','<select name="status">'+['Tersedia','Habis','Hubungi Admin'].map(s=>'<option'+(s===p.status?' selected':'')+'>'+s+'</option>').join('')+'</select>')}
    </div>
    ${fld('Merek / Tipe','<input name="brand" value="'+esc(p.brand||'')+'" placeholder="Opsional">')}
    ${fld('Spesifikasi','<textarea name="spec" rows="3">'+esc(p.spec||'')+'</textarea>')}
    ${fld('Harga (Rp)','<input name="price" type="number" min="0" step="any" value="'+(p.price!=null?p.price:'')+'" placeholder="Kosongkan jika belum ditetapkan">')}
    ${fld('URL Foto','<input name="image" value="'+esc(p.image||'')+'" placeholder="https://... (opsional)">','', '<p class="hint">Tempel URL foto produk. Untuk uji tampilan dapat memakai https://picsum.photos/seed/nama/800/600.jpg</p>')}
    <div class="field"><label>Tanda Data</label>
      <label class="check-inline"><input type="checkbox" name="demo" ${p.demo?'checked':''}> Tandai sebagai data contoh (demo) pada website</label>
    </div>
    <div class="m-actions"><button type="button" class="btn btn-outline btn-sm" id="m-cancel">Batal</button><button class="btn btn-orange btn-sm" type="submit">Simpan</button></div>
  </form>`);
  $('#m-cancel').onclick = closeModal;
  $('#m-form').onsubmit = e=>{
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const obj = {
      id: p.id || uid(), name: d.name.trim(), category: d.category, brand: d.brand.trim(),
      spec: d.spec.trim(), price: d.price===''?null:Number(d.price),
      status: d.status, image: d.image.trim(), demo: d.demo==='on'
    };
    if(p.id){
      const i = DATA.products.findIndex(x=>x.id===p.id);
      DATA.products[i] = obj;
    } else DATA.products.unshift(obj);
    saveData(); closeModal(); renderAdminTab();
    toast('Produk berhasil disimpan','success');
  };
}
function projectModal(p){
  const isNew = !p;
  p = p || {title:'',category:'CCTV',location:'',desc:'',image:'',demo:false};
  openModal(`
  <h3>${isNew?'Tambah':'Edit'} Proyek</h3>
  <form id="m-form">
    ${fld('Nama Proyek','<input name="title" required value="'+esc(p.title)+'">',1)}
    <div class="form-row">
      ${fld('Kategori','<select name="category">'+PF_CATS.map(c=>'<option'+(c===p.category?' selected':'')+'>'+c+'</option>').join('')+'</select>')}
      ${fld('Lokasi Umum','<input name="location" required value="'+esc(p.location)+'" placeholder="Contoh: Tembalang, Semarang">',1)}
    </div>
    ${fld('Deskripsi Singkat','<textarea name="desc" rows="3" required>'+esc(p.desc)+'</textarea>',1)}
    ${fld('URL Foto','<input name="image" value="'+esc(p.image||'')+'" placeholder="https://... (opsional)">','', '<p class="hint">Tempel URL foto dokumentasi. Untuk uji tampilan dapat memakai https://picsum.photos/seed/nama/800/600.jpg</p>')}
    <div class="field"><label>Tanda Data</label>
      <label class="check-inline"><input type="checkbox" name="demo" ${p.demo?'checked':''}> Tandai sebagai data contoh (demo) pada website</label>
    </div>
    <div class="m-actions"><button type="button" class="btn btn-outline btn-sm" id="m-cancel">Batal</button><button class="btn btn-orange btn-sm" type="submit">Simpan</button></div>
  </form>`);
  $('#m-cancel').onclick = closeModal;
  $('#m-form').onsubmit = e=>{
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const obj = {id:p.id||uid(), title:d.title.trim(), category:d.category, location:d.location.trim(), desc:d.desc.trim(), image:d.image.trim(), demo:d.demo==='on'};
    if(p.id){ const i=DATA.projects.findIndex(x=>x.id===p.id); DATA.projects[i]=obj; }
    else DATA.projects.unshift(obj);
    saveData(); closeModal(); renderAdminTab();
    toast('Proyek berhasil disimpan','success');
  };
}
function testiModal(t){
  const isNew = !t;
  t = t || {name:'',role:'',text:''};
  openModal(`
  <h3>${isNew?'Tambah':'Edit'} Testimoni</h3>
  <form id="m-form">
    ${fld('Nama Pelanggan','<input name="name" required value="'+esc(t.name)+'">',1)}
    ${fld('Instansi / Peran','<input name="role" value="'+esc(t.role||'')+'" placeholder="Contoh: Pemilik Toko — Banyumanik">')}
    ${fld('Isi Testimoni','<textarea name="text" rows="4" required>'+esc(t.text)+'</textarea>',1,'<p class="hint">Pastikan testimoni berasal dari pelanggan nyata dan sudah terverifikasi.</p>')}
    <div class="m-actions"><button type="button" class="btn btn-outline btn-sm" id="m-cancel">Batal</button><button class="btn btn-orange btn-sm" type="submit">Simpan</button></div>
  </form>`);
  $('#m-cancel').onclick = closeModal;
  $('#m-form').onsubmit = e=>{
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const obj = {id:t.id||uid(), name:d.name.trim(), role:d.role.trim(), text:d.text.trim()};
    if(t.id){ const i=DATA.testimonials.findIndex(x=>x.id===t.id); DATA.testimonials[i]=obj; }
    else DATA.testimonials.push(obj);
    saveData(); closeModal(); renderAdminTab();
    toast('Testimoni berhasil disimpan','success');
  };
}
function mountAdminTabExtras(){
  $$('[data-goto]').forEach(b=>b.addEventListener('click', ()=>{
    adminTab = b.dataset.goto;
    $$('.anav[data-tab]').forEach(x=>x.classList.toggle('active', x.dataset.tab===adminTab));
    renderAdminTab();
  }));
  $$('[data-delmsg]').forEach(b=>b.addEventListener('click', ()=>confirmDialog('Hapus pesan dari '+esc(b.dataset.delmsg ? (DATA.messages.find(m=>m.id===b.dataset.delmsg)||{}).nama||'pelanggan' : '')+'?', ()=>{
    DATA.messages = DATA.messages.filter(m=>m.id!==b.dataset.delmsg);
    saveData(); renderAdminTab(); toast('Pesan dihapus','success');
  })));
  $$('[data-savesvc]').forEach(b=>b.addEventListener('click', ()=>{
    const i = +b.dataset.savesvc;
    const s = DATA.services[i];
    s.desc = $('#se-desc-'+i).value.trim();
    s.benefits = splitLines($('#se-ben-'+i).value);
    s.scope = splitLines($('#se-scp-'+i).value);
    saveData(); toast('Layanan "'+s.title+'" disimpan','success');
  }));
  const ap = $('#add-prod'); if(ap) ap.onclick = ()=>productModal(null);
  $$('[data-editprod]').forEach(b=>b.addEventListener('click', ()=>productModal(DATA.products.find(p=>p.id===b.dataset.editprod))));
  $$('[data-delprod]').forEach(b=>b.addEventListener('click', ()=>{
    const p = DATA.products.find(x=>x.id===b.dataset.delprod);
    confirmDialog('Hapus produk "'+(p?p.name:'')+'" dari katalog?', ()=>{
      DATA.products = DATA.products.filter(x=>x.id!==b.dataset.delprod);
      saveData(); renderAdminTab(); toast('Produk dihapus','success');
    });
  }));
  const apr = $('#add-proj'); if(apr) apr.onclick = ()=>projectModal(null);
  $$('[data-editproj]').forEach(b=>b.addEventListener('click', ()=>projectModal(DATA.projects.find(p=>p.id===b.dataset.editproj))));
  $$('[data-delproj]').forEach(b=>b.addEventListener('click', ()=>{
    const p = DATA.projects.find(x=>x.id===b.dataset.delproj);
    confirmDialog('Hapus proyek "'+(p?p.title:'')+'" dari portofolio?', ()=>{
      DATA.projects = DATA.projects.filter(x=>x.id!==b.dataset.delproj);
      saveData(); renderAdminTab(); toast('Proyek dihapus','success');
    });
  }));
  const at = $('#add-tsti'); if(at) at.onclick = ()=>testiModal(null);
  $$('[data-edittsti]').forEach(b=>b.addEventListener('click', ()=>testiModal(DATA.testimonials.find(t=>t.id===b.dataset.edittsti))));
  $$('[data-deltsti]').forEach(b=>b.addEventListener('click', ()=>{
    const t = DATA.testimonials.find(x=>x.id===b.dataset.deltsti);
    confirmDialog('Hapus testimoni dari "'+(t?t.name:'')+'"?', ()=>{
      DATA.testimonials = DATA.testimonials.filter(x=>x.id!==b.dataset.deltsti);
      saveData(); renderAdminTab(); toast('Testimoni dihapus','success');
    });
  }));
}
function mountPengaturan(){
  const sf = $('#set-form');
  if(sf) sf.onsubmit = e=>{
    e.preventDefault();
    const d = Object.fromEntries(new FormData(sf));
    if(!/^62\d{8,13}$/.test(d.wa.trim())){ toast('Nomor WhatsApp tidak valid — gunakan format 62xxxxxxxxxx','error'); return; }
    DATA.settings.whatsapp = d.wa.trim();
    DATA.settings.email = d.email.trim();
    DATA.settings.hours = d.hours.trim();
    saveData(); updateSettingsUI();
    toast('Pengaturan berhasil disimpan','success');
  };
  const pf = $('#pw-form');
  if(pf) pf.onsubmit = e=>{
    e.preventDefault();
    const d = Object.fromEntries(new FormData(pf));
    DATA.settings.adminPassword = d.pw;
    saveData();
    pf.reset();
    toast('Kata sandi admin berhasil diubah','success');
  };
  const ex = $('#btn-export');
  if(ex) ex.onclick = ()=>{
    const blob = new Blob([JSON.stringify(DATA,null,2)],{type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data-andalan-teknik.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Data berhasil diekspor','success');
  };
}

