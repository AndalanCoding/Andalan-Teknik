"use strict";
/* =====================================================================
   ADMIN PAGE — titik masuk admin.html (dashboard berdiri sendiri)
===================================================================== */
document.addEventListener('click',e=>{
  if(e.target.closest('[data-close-modal]')){ closeModal(); return; }
  const a=e.target.closest('a[href="#/"]');                 // "Lihat Situs" / "Kembali ke situs"
  if(a){ e.preventDefault(); location.href='index.html'; }
});
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });
$('#app').innerHTML='<div id="admin-root"></div>';
renderAdmin();
