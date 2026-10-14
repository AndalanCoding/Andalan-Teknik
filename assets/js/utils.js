"use strict";
/* ---------- UTILS ---------- */
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const uid=()=> 'id'+Math.random().toString(36).slice(2,9);
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
function waLink(txt){ return 'https://wa.me/'+DB.company.whatsapp+'?text='+encodeURIComponent(txt); }
function openWA(txt){ window.open(waLink(txt),'_blank','noopener'); }
function toast(msg,type){
  const t=document.createElement('div'); t.className='toast'+(type==='err'?' err':'');
  t.innerHTML=ic(type==='err'?'x':'check')+'<div>'+esc(msg)+'</div>';
  $('#toasts').appendChild(t); setTimeout(()=>{t.style.transition='opacity .4s';t.style.opacity='0';setTimeout(()=>t.remove(),400)},3800);
}
function openModal(html){ $('#modal-box').innerHTML='<button class="m-close" data-close-modal>'+ic('x')+'</button><div class="m-body">'+html+'</div>'; $('#modal-root').classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(){ $('#modal-root').classList.remove('open'); document.body.style.overflow=''; }
function confirmModal(title,msg,onYes){
  openModal('<h3 style="margin-bottom:10px">'+esc(title)+'</h3><p style="color:var(--mut);font-size:14.5px;margin-bottom:22px">'+esc(msg)+'</p><div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-g btn-sm" data-close-modal>Batal</button><button class="btn btn-r btn-sm" id="cf-yes">Ya, lanjutkan</button></div>');
  $('#cf-yes').onclick=()=>{ closeModal(); onYes(); };
}
let pageTimers=[];
const later=(f,ms)=>{const t=setTimeout(f,ms);pageTimers.push(t);return t;};
const every=(f,ms)=>{const t=setInterval(f,ms);pageTimers.push(t);return t;};

/* ---------- REVEAL ---------- */
const revealObs=new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target);} });
},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
function bindReveals(root){
  (root||document).querySelectorAll('.rv:not(.in)').forEach((el,i)=>{
    el.style.transitionDelay=(Math.min(i,8)*55)+'ms';
    revealObs.observe(el);
  });
}

