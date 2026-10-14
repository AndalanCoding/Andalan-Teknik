"use strict";
/* ---------- SHARED COMPONENTS ---------- */
function shead(kick,h2,p,center){
  return '<div class="shead'+(center?' center':'')+'"><div class="kick">'+esc(kick)+'</div><h2>'+esc(h2)+'</h2>'+(p?'<p>'+esc(p)+'</p>':'')+'</div>';
}
function ctaBand(t,sub){
  return '<section><div class="wrap"><div class="ctab rv"><div class="ring-ic">'+ic('chat','')+'</div><h2>'+esc(t)+'</h2><p>'+esc(sub)+'</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><button class="btn btn-p" data-wa="Halo Andalan Teknik, saya ingin menjadwalkan konsultasi kebutuhan teknologi.">'+ic('wa')+'Konsultasi via WhatsApp</button><a class="btn btn-g" href="#/kontak">Halaman Kontak</a></div></div></div></section>';
}
function svcSelectorHTML(){
  const sv=DB.services.filter(s=>s.active);
  return '<div class="svc-grid"><div class="svc-list rv">'+sv.map((s,i)=>
    '<div class="svc-row'+(i===0?' on':'')+'" data-svc="'+s.id+'" role="button" tabindex="0"><span class="num">0'+(i+1)+'</span><span class="nm">'+esc(s.title)+'</span>'+ic(s.icon)+'</div>').join('')+
    '</div><div class="svc-detail rv" id="svc-detail"></div></div>';
}
function renderSvcDetail(id){
  const s=DB.services.find(x=>x.id===id)||DB.services[0]; if(!s) return '';
  return '<div style="position:relative">'+ic(s.icon,'big-ic')+'<h3>'+esc(s.title)+'</h3><p>'+esc(s.desc)+'</p><ul>'+
    (s.features||[]).map(f=>'<li>'+ic('check')+esc(f)+'</li>').join('')+
    '</ul><button class="btn btn-g btn-sm" data-wa="Halo Andalan Teknik, saya tertarik dengan layanan: '+esc(s.title)+'. Mohon info lebih lanjut.">'+ic('wa')+'Tanya Layanan Ini</button></div>';
}
function pkgHTML(p){
  return '<div class="pkg'+(p.featured?' feat':'')+' rv">'+(p.featured?'<span class="badge">REKOMENDASI</span>':'')+
   '<div class="pk-name"><h3>'+esc(p.title)+'</h3><span>'+esc(p.audience||'')+'</span></div>'+
   '<ul>'+(p.items||[]).map(i=>'<li>'+ic('check')+esc(i)+'</li>').join('')+'</ul>'+
   '<div class="pk-price">'+esc(p.price||'Penawaran menyesuaikan kebutuhan')+'<br><button class="btn btn-p btn-sm" style="margin-top:10px" data-wa="Halo Andalan Teknik, saya ingin penawaran untuk '+esc(p.title)+'.">'+ic('wa')+'Minta Penawaran</button></div></div>';
}
function promoCard(p){
  return '<div class="promo-card rv"><span class="red-tag">'+esc(p.badge||'PROMO')+'</span>'+
   (p.image?''+imgTag(p.image,p.title,p.category)+'':'')+
   '<h4>'+esc(p.title)+'</h4><p>'+esc(p.desc)+'</p><div class="meta">'+ic('clock','')+' '+esc(p.period||'—')+(p.category?' · '+esc(p.category):'')+'</div>'+
   (p.terms?'<div class="terms">'+esc(p.terms)+'</div>':'')+
   '<button class="btn btn-r btn-sm" data-wa="Halo Andalan Teknik, saya ingin bertanya tentang promo: '+esc(p.title)+'.">'+ic('wa')+'Ambil Penawaran Ini</button></div>';
}
function portCard(p,i){
  const w=i===0?'w6':(i===1?'w4':'w4');
  return '<div class="port '+w+' rv" data-port="'+p.id+'" role="button" tabindex="0">'+
   (p.placeholder?'<span class="ph-tag">PLACEHOLDER</span>':'')+
   '<div class="im">'+imgTag(p.image,p.title,p.category)+'<div class="ov"><div><div class="tt">'+esc(p.title)+'</div><div class="ct">'+esc(p.category||'')+' · '+esc(p.location||'')+'</div></div></div></div></div>';
}
function faqHTML(){
  return '<div class="faq">'+DB.faqs.map((f,i)=>
    '<div class="faq-item" data-acc><button><span class="no">Q'+(i+1)+'</span>'+esc(f.q)+ic('plus')+'</button><div class="ans"><p>'+esc(f.a)+'</p></div></div>').join('')+'</div>';
}
function leadFormHTML(source,withCompany){
  const opts=['Konsultasi umum'].concat(DB.services.filter(s=>s.active).map(s=>s.title));
  return '<form class="f-grid" data-leadform="'+source+'">'+'<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">'+
   '<div class="fld"><label>Nama *</label><input name="nama" required maxlength="80"><span class="err">Nama wajib diisi.</span></div>'+
   (withCompany?'<div class="fld"><label>Perusahaan / Instansi</label><input name="org" maxlength="80"></div>':'')+
   '<div class="fld full"><label>Kebutuhan</label><select name="need">'+opts.map(o=>'<option>'+esc(o)+'</option>').join('')+'</select></div>'+
   '<div class="fld full"><label>Pesan *</label><textarea name="pesan" required maxlength="600" placeholder="Ceritakan kebutuhan atau kendala teknologi Anda…"></textarea><span class="err">Mohon tuliskan pesan.</span></div>'+
   '<div class="fld full" style="align-items:flex-start"><button class="btn btn-p" type="submit">'+ic('send')+'Kirim Permintaan</button><span style="font-size:12px;color:var(--mut)">Data tercatat di dashboard admin; lanjutkan ke WhatsApp bila ingin respon lebih cepat.</span></div>'+
   '</form>';
}
function bindLeadForm(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const f=e.target; let ok=true;
    ['nama','pesan'].forEach(n=>{
      const fld=f.querySelector('[name='+n+']').closest('.fld');
      const bad=!f.querySelector('[name='+n+']').value.trim();
      fld.classList.toggle('bad',bad); if(bad) ok=false;
    });
    if(!ok){ toast('Mohon lengkapi field yang ditandai.','err'); return; }
    const lead={id:uid(),tanggal:new Date().toLocaleString('id-ID'),nama:f.nama.value.trim(),org:(f.org?f.org.value.trim():''),need:f.need.value,pesan:f.pesan.value.trim(),status:'baru',source:f.dataset.leadform||f.id||'web'};
    submitLead(lead,f.website?f.website.value:'');
    const msg='Halo Andalan Teknik, saya '+lead.nama+(lead.org?' ('+lead.org+')':'')+' — kebutuhan: '+lead.need+'. '+lead.pesan;
    f.reset();
    openModal('<h3 style="margin-bottom:10px">Permintaan tercatat</h3><p style="color:var(--mut);font-size:14.5px;margin-bottom:22px">Terima kasih, '+esc(lead.nama)+'. Permintaan Anda tersimpan dan akan ditindaklanjuti. Ingin mempercepat prosesnya lewat WhatsApp?</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-p" data-wa="'+esc(msg)+'">'+ic('wa')+'Kirim via WhatsApp</button><button class="btn btn-g" data-close-modal>Tutup</button></div>');
    toast('Permintaan konsultasi berhasil dikirim.');
  });
}

