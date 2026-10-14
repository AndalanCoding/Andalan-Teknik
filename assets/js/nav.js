"use strict";
/* ---------- NAV ---------- */
const NAV=[['beranda','Beranda','#/'],['layanan','Layanan Teknologi','#/layanan'],['katalog','Pengadaan & Katalog','#/katalog'],['promo','Promo & Paket Hemat','#/promo'],['solusi','Solusi Smart Technology','#/solusi'],['portofolio','Portofolio','#/portofolio'],['tentang','Tentang Kami','#/tentang'],['kontak','Kontak','#/kontak']];
function buildNav(){
  $('#mainnav').innerHTML=NAV.map(n=>'<a href="'+n[2]+'" data-route="'+n[0]+'">'+n[1]+'</a>').join('');
  $('#mobilemenu').innerHTML=NAV.map((n,i)=>'<a href="'+n[2]+'" style="transition-delay:'+(i*45)+'ms"><i>0'+(i+1)+'</i>'+n[1]+'</a>').join('');
  const wa=$('#navwa'); wa.href=waLink('Halo Andalan Teknik, saya ingin konsultasi kebutuhan teknologi.');
  $('#wafab').href=waLink('Halo Andalan Teknik, saya ingin bertanya.');
}
function setActiveNav(route){
  $$('#mainnav a').forEach(a=>a.classList.toggle('on',a.dataset.route===route));
  $('#mobilemenu').classList.remove('open');
}
window.addEventListener('scroll',()=>{
  $('#topnav').classList.toggle('scrolled',scrollY>30);
  $('#wafab').classList.toggle('show',scrollY>420);
},{passive:true});
 $('#burger').addEventListener('click',()=>$('#mobilemenu').classList.toggle('open'));

