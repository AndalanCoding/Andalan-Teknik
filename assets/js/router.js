"use strict";
/* ---------- ROUTER ---------- */
const ROUTES={beranda:vHome,'':vHome,layanan:vLayanan,katalog:vKatalog,promo:vPromo,solusi:vSolusi,portofolio:vPortofolio,tentang:vTentang,kontak:vKontak,admin:renderAdmin};
const TITLES={beranda:'Beranda',layanan:'Layanan Teknologi',katalog:'Pengadaan & Katalog',promo:'Promo & Paket Hemat',solusi:'Solusi Smart Technology',portofolio:'Portofolio',tentang:'Tentang Kami',kontak:'Kontak',admin:'Dashboard Admin'};
function cleanupPage(){ pageTimers.forEach(t=>{clearTimeout(t);clearInterval(t);if(t.stop)t.stop();}); pageTimers=[]; }
function route(){
  cleanupPage(); closeModal();
  const h=location.hash.replace(/^#\/?/,'').split('?')[0].replace(/\/$/,'');
  const isAdmin=h==='admin';
  const app=$('#app');
  if(isAdmin){ location.replace('admin.html'); return; }
  const view=ROUTES[h]||vNotFound;
  app.innerHTML='<div class="page">'+view()+(h==='solusi'?footerHTML():footerHTML())+'</div>';
  setActiveNav(ROUTES[h]?h:'');
  document.title=(TITLES[h]&&h!=='beranda'?TITLES[h]+' — ':'')+'Andalan Teknik | CV. Karya Andalan Teknik';
  bindReveals(app);
  window.scrollTo(0,0);
  // post-mount bindings
  if(h===''||h==='beranda'){ initHeroFX(); const sd=$('#svc-detail'); if(sd){ sd.innerHTML=renderSvcDetail(DB.services[0].id); } }
  app.querySelectorAll('[data-svc]').forEach(el=>el.addEventListener('click',()=>{
    app.querySelectorAll('[data-svc]').forEach(r=>r.classList.remove('on')); el.classList.add('on');
    const d=$('#svc-detail'); d.style.opacity=0;
    setTimeout(()=>{ d.innerHTML=renderSvcDetail(el.dataset.svc); d.style.transition='opacity .3s'; d.style.opacity=1; },120);
  }));
  if(h==='katalog'){ renderProdGrid(); const q=$('#catq'); if(q){ let deb; q.addEventListener('input',()=>{clearTimeout(deb);deb=setTimeout(()=>{catQuery=q.value;renderProdGrid();},200);}); } }
  if(h==='portofolio') renderPortGrid();
  if(h==='solusi'){ const f=$('#anform'); if(f) bindLeadForm(f); }
  app.querySelectorAll('[data-leadform]').forEach(bindLeadForm);
  // faq accordion
  app.querySelectorAll('[data-acc]').forEach(item=>{
    item.querySelector('button').addEventListener('click',()=>{
      const open=item.classList.contains('open');
      app.querySelectorAll('[data-acc]').forEach(i2=>{i2.classList.remove('open');i2.querySelector('.ans').style.maxHeight='0';});
      if(!open){ item.classList.add('open'); const a=item.querySelector('.ans'); a.style.maxHeight=a.scrollHeight+'px'; }
    });
  });
}
window.addEventListener('hashchange',route);

/* ---------- GLOBAL DELEGATION ---------- */
document.addEventListener('click',e=>{
  const wa=e.target.closest('[data-wa]');
  if(wa){ e.preventDefault(); openWA(wa.dataset.wa); return; }
  const cm=e.target.closest('[data-close-modal]');
  if(cm){ closeModal(); return; }
  const prod=e.target.closest('[data-prod]');
  if(prod){ const p=DB.products.find(x=>x.id===prod.dataset.prod); if(p) productModal(p); return; }
  const port=e.target.closest('[data-port]');
  if(port){ const p=DB.portfolio.find(x=>x.id===port.dataset.port); if(p) portModal(p); return; }
  const cat=e.target.closest('[data-cat]');
  if(cat){ catFilter=cat.dataset.cat; $$('[data-cat]').forEach(c=>c.classList.toggle('on',c.dataset.cat===catFilter)); renderProdGrid(); return; }
  const pc=e.target.closest('[data-pcat]');
  if(pc){ portFilter=pc.dataset.pcat; $$('[data-pcat]').forEach(c=>c.classList.toggle('on',c.dataset.pcat===portFilter)); renderPortGrid(); return; }
  if(e.target.closest('#burger')) return;
  if(e.target.closest('#mobilemenu a')) $('#mobilemenu').classList.remove('open');
});
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });
function productModal(p){
  openModal(`${imgTag(p.image,p.name,p.category,'m-img')}
  <div class="mono" style="font-size:10.5px;letter-spacing:.2em;color:var(--cyan);margin-bottom:8px">${esc(p.category).toUpperCase()}</div>
  <h3 style="margin-bottom:10px">${esc(p.name)}</h3>
  <ul class="check-list" style="margin-bottom:16px">${(p.specs||[]).map(s=>'<li>'+ic('check')+'<span>'+esc(s)+'</span></li>').join('')}</ul>
  <p style="font-family:var(--f-mono);font-size:12.5px;color:var(--mut);margin-bottom:20px">${p.price?'HARGA: '+esc(p.price):'HARGA: DIKONFIRMASI MELALUI PENAWARAN RESMI'}</p>
  <button class="btn btn-p" data-wa="Halo Andalan Teknik, saya ingin meminta penawaran untuk: ${esc(p.name)}.">${ic('wa')}Minta Penawaran</button>`);
}
function portModal(p){
  openModal(`${imgTag(p.image,p.title,p.category,'m-img')}
  <div class="mono" style="font-size:10.5px;letter-spacing:.2em;color:var(--cyan);margin-bottom:8px">${esc((p.category||'').toUpperCase())} · ${esc(p.scale||'')}</div>
  <h3 style="margin-bottom:6px">${esc(p.title)}</h3>
  <p class="mono" style="font-size:12px;color:var(--mut);margin-bottom:12px">${ic('pin')} ${esc(p.location||'')}</p>
  <p style="font-size:14.5px">${esc(p.desc)}</p>`);
}

