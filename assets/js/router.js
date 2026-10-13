/* ===================== ROUTER ===================== */
const PAGES = {
  home:      {title:'',            render:renderHome,      mount:mountHome},
  layanan:   {title:'Layanan',     render:renderLayanan},
  pengadaan: {title:'Pengadaan',   render:renderPengadaan, mount:mountPengadaan},
  portofolio:{title:'Portofolio',  render:renderPortofolio,mount:mountPortofolio},
  tentang:   {title:'Tentang Kami',render:renderTentang},
  kontak:    {title:'Kontak',      render:renderKontak,    mount:mountKontak},
  admin:     {title:'Dashboard Admin', render:renderAdmin, mount:mountAdmin}
};
function getRoute(){
  const h = location.hash.replace(/^#\/?/,'').split('?')[0].replace(/\/$/,'');
  if(h==='admin' && !ADMIN_ENABLED) return 'home';
  return PAGES[h] ? h : 'home';
}
function route(keepScroll){
  const key = getRoute();
  const page = PAGES[key];
  document.body.classList.toggle('admin-mode', key==='admin');
  document.title = (key==='home' ? 'Andalan Teknik · Jasa IT, Komputer & CCTV Semarang' : page.title + ' — Andalan Teknik');
  $('#app').innerHTML = page.render();
  $$('#nav a[data-route]').forEach(a=>a.classList.toggle('active', a.dataset.route===key));
  closeMobileMenu();
  if(!keepScroll) window.scrollTo(0,0);
  refreshIcons();
  if(page.mount) page.mount();
  initReveal();
}
function initReveal(){
  const els = $$('.reveal');
  if(!els.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  },{threshold:.1});
  els.forEach(el=>{ if(!el.classList.contains('in')) io.observe(el); });
}

/* ===================== HEADER INTERAKSI ===================== */
function closeMobileMenu(){
  const nav = $('#nav'); if(nav) nav.classList.remove('open');
  const b = $('#burger');
  if(b && b.dataset.open==='1'){ b.dataset.open='0'; b.innerHTML='<i data-lucide="menu"></i>'; refreshIcons(); }
}
function bindHeader(){
  const burger = $('#burger');
  burger.addEventListener('click', ()=>{
    const nav = $('#nav');
    const open = nav.classList.toggle('open');
    burger.dataset.open = open?'1':'0';
    burger.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    refreshIcons();
  });
  $$('#nav a').forEach(a=>a.addEventListener('click', closeMobileMenu));
  window.addEventListener('scroll', ()=>{
    $('#navbar').classList.toggle('scrolled', window.scrollY>8);
  }, {passive:true});
}

