"use strict";
/* =====================================================================
   ADMIN EXTRA — alat bantu tab Permintaan Konsultasi
===================================================================== */
function bindLeadTools(){
  const rf=document.getElementById('ld-refresh'), cv=document.getElementById('ld-csv');
  if(rf) rf.onclick=async()=>{ try{ const j=await api('get'); DB.leads=j.leads||[]; saveDB(true); renderAdTab(); toast('Permintaan dimuat dari server.'); }catch(e){ toast('Gagal: '+e.message,'err'); } };
  if(cv) cv.onclick=exportLeadsCSV;
}
function exportLeadsCSV(){
  const cols=['tanggal','nama','org','need','pesan','status','source'];
  const q=v=>{ let s=String(v==null?'':v).replace(/"/g,'""'); if(/^[=+\-@]/.test(s)) s="'"+s; return '"'+s+'"'; };
  const csv=[cols.join(',')].concat(DB.leads.map(l=>cols.map(c=>q(l[c])).join(','))).join('\r\n');
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv'}));
  a.download='permintaan-konsultasi.csv'; a.click(); URL.revokeObjectURL(a.href); toast('File CSV diunduh.');
}
