"use strict";
/* =====================================================================
   MEDIA — tampilan gambar (publik) & unggah foto (admin)
===================================================================== */
const CAT_ICON={Komputer:'monitor',Laptop:'laptop','CCTV & Peralatan':'cctv',Jaringan:'network',Aksesoris:'zap',CCTV:'cctv',Maintenance:'wrench',Pengadaan:'box',Promo:'zap'};
/* Link berbagi Google Drive → URL gambar yang dapat ditampilkan */
function imgUrl(u){
  const m=String(u||'').match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
  return m?'https://drive.google.com/thumbnail?id='+m[1]+'&sz=w1600':u;
}
/* Gambar atau placeholder ikon (bila kosong / gagal dimuat) */
function imgTag(src,alt,cat,cls){
  const ph='<div class="ph'+(cls?' '+cls:'')+'">'+ic(CAT_ICON[cat]||'layers')+'</div>';
  if(!src) return ph;
  return '<img'+(cls?' class="'+cls+'"':'')+' src="'+esc(imgUrl(src))+'" alt="'+esc(alt)+'" loading="lazy" decoding="async" data-ph="'+esc(ph)+'" onerror="this.outerHTML=this.dataset.ph">';
}
function aboutValueHTML(v){
  const i=v.indexOf(' — '), t=i>0?v.slice(0,i):'', d=i>0?v.slice(i+3):v;
  return '<li>'+ic('check')+'<span>'+(t?'<b style="color:var(--txt)">'+esc(t)+'</b> — ':'')+esc(d)+'</span></li>';
}

/* ---------- Field unggah gambar di form admin ---------- */
function imgFieldHTML(id,v,l){
  return '<div class="fld full"><label>'+esc(l)+'</label><div class="img-field"><img class="img-prev" data-imgprev="'+id+'" alt=""'+(v?' src="'+esc(imgUrl(v))+'"':' hidden')+'>'+
    '<div class="img-ctl"><input id="'+id+'" data-imgin="'+id+'" value="'+esc(v)+'" placeholder="https://… atau klik Unggah Foto">'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn btn-g btn-sm" data-imgup="'+id+'">'+ic('up')+'Unggah Foto</button><button type="button" class="btn btn-g btn-sm" data-imgclr="'+id+'">'+ic('trash')+'Hapus</button></div>'+
    '<span class="img-st mono" data-imgst="'+id+'"></span><input type="file" accept="image/*" hidden data-imgfile="'+id+'"></div></div></div>';
}
function readImg(file,max,q){
  return new Promise((res,rej)=>{
    const u=URL.createObjectURL(file), im=new Image();
    im.onload=()=>{
      const k=Math.min(1,max/Math.max(im.width,im.height)), c=document.createElement('canvas');
      c.width=Math.round(im.width*k); c.height=Math.round(im.height*k);
      const x=c.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,c.width,c.height); x.drawImage(im,0,0,c.width,c.height);
      URL.revokeObjectURL(u); res(c.toDataURL('image/jpeg',q));
    };
    im.onerror=()=>{ URL.revokeObjectURL(u); rej(new Error('File bukan gambar yang valid')); };
    im.src=u;
  });
}
function setImg(id,url){ const i=document.getElementById(id); if(!i) return; i.value=url; i.dispatchEvent(new Event('input')); }
async function handleImgFile(id,file){
  const st=document.querySelector('[data-imgst="'+id+'"]'), say=t=>{ if(st) st.textContent=t; }, c=getRemote();
  try{
    if(c.enabled&&c.token){
      say('Mengunggah ke Google Drive…');
      const d=await readImg(file,1400,.82);
      const j=await api('upload',{name:file.name.replace(/\.[^.]+$/,'')+'.jpg',mime:'image/jpeg',data:d.split(',')[1]});
      setImg(id,j.url); say('Terunggah ke Google Drive ✓');
    }else{
      let d=await readImg(file,900,.72); if(d.length>140000) d=await readImg(file,640,.6);
      setImg(id,d); say('Disimpan di browser ('+Math.round(d.length/1024)+' KB). Aktifkan Google Drive agar tampil di semua perangkat.');
    }
  }catch(e){ say('Gagal: '+e.message); }
}
function bindImgFields(){
  document.querySelectorAll('[data-imgup]').forEach(b=>b.onclick=()=>document.querySelector('[data-imgfile="'+b.dataset.imgup+'"]').click());
  document.querySelectorAll('[data-imgfile]').forEach(f=>f.onchange=()=>{ if(f.files[0]) handleImgFile(f.dataset.imgfile,f.files[0]); f.value=''; });
  document.querySelectorAll('[data-imgclr]').forEach(b=>b.onclick=()=>setImg(b.dataset.imgclr,''));
  document.querySelectorAll('[data-imgin]').forEach(i=>i.addEventListener('input',()=>{
    const p=document.querySelector('[data-imgprev="'+i.dataset.imgin+'"]'); if(!p) return;
    if(i.value){ p.src=imgUrl(i.value); p.hidden=false; } else { p.removeAttribute('src'); p.hidden=true; }
  }));
}
