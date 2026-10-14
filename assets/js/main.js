"use strict";
/* ---------- INIT ---------- */
window.addEventListener('load',()=>{
  const boot=$('#boot');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(()=>{ boot.classList.add('done'); setTimeout(()=>boot.remove(),600); }, reduced?100:850);
});
buildNav();
route();
syncPublic();
