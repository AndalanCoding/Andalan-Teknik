"use strict";
/* ---------- ROBOT SVG ---------- */
function robotSVG(){
 return `
 <svg id="robot" viewBox="0 0 460 540" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Robot AI Andalan Teknik">
  <defs>
   <filter id="rgl" x="-60%" y="-60%" width="220%" height="220%">
     <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
   </filter>
   <linearGradient id="scanl" x1="0" y1="0" x2="1" y2="0">
     <stop offset="0" stop-color="#35e0ff" stop-opacity="0"/><stop offset=".5" stop-color="#35e0ff" stop-opacity=".9"/><stop offset="1" stop-color="#35e0ff" stop-opacity="0"/>
   </linearGradient>
  </defs>
  <g class="ring ring1" style="transform-origin:230px 300px">
   <ellipse cx="230" cy="300" rx="212" ry="202" stroke="rgba(53,224,255,.22)" stroke-dasharray="4 10"/>
   <circle cx="230" cy="98" r="4" fill="#35e0ff" opacity=".8"/><circle cx="42" cy="300" r="3" fill="#3f7bff" opacity=".7"/>
  </g>
  <g class="ring ring2" style="transform-origin:230px 300px">
   <ellipse cx="230" cy="300" rx="176" ry="188" stroke="rgba(63,123,255,.3)" stroke-dasharray="30 14 6 14"/>
   <circle cx="406" cy="300" r="3.5" fill="#35e0ff" opacity=".75"/>
  </g>
  <ellipse cx="230" cy="492" rx="160" ry="20" stroke="rgba(53,224,255,.3)"/>
  <ellipse cx="230" cy="492" rx="95" ry="11" stroke="rgba(53,224,255,.18)"/>
  <path d="M110 492h40M310 492h40M150 486l14-40M310 486l-14-40M230 480v-40" stroke="rgba(120,170,255,.25)"/>
  <g class="float">
   <path d="M164 330h132l20 96a14 14 0 0 1-14 17H158a14 14 0 0 1-14-17l20-96z" fill="#0c1c38" stroke="rgba(120,170,255,.4)" stroke-width="1.4"/>
   <path d="M205 345h50M192 360h76M186 375h88" stroke="rgba(53,224,255,.28)" stroke-dasharray="2 6"/>
   <polygon points="230,352 254,366 254,394 230,408 206,394 206,366" fill="rgba(53,224,255,.08)" stroke="#35e0ff" stroke-width="1.5"/>
   <circle class="core-dot" cx="230" cy="380" r="7" fill="#35e0ff" filter="url(#rgl)"/>
   <rect x="214" y="306" width="32" height="24" rx="6" fill="#0c1c38" stroke="rgba(120,170,255,.4)" stroke-width="1.3"/>
   <path d="M120 330c-16 4-26 16-28 34l-4 40" stroke="rgba(120,170,255,.35)" stroke-width="10" stroke-linecap="round" opacity=".5"/>
   <path d="M340 330c16 4 26 16 28 34l4 40" stroke="rgba(120,170,255,.35)" stroke-width="10" stroke-linecap="round" opacity=".5"/>
   <line x1="230" y1="210" x2="230" y2="176" stroke="#35e0ff" stroke-width="1.6"/>
   <circle class="ant-tip" cx="230" cy="170" r="6" fill="#35e0ff" filter="url(#rgl)"/>
   <path d="M142 252c-14-3-24 2-28 12" stroke="rgba(120,170,255,.4)" stroke-width="8" stroke-linecap="round" opacity=".6"/>
   <path d="M318 252c14-3 24 2 28 12" stroke="rgba(120,170,255,.4)" stroke-width="8" stroke-linecap="round" opacity=".6"/>
   <rect x="138" y="212" width="184" height="92" rx="26" fill="#0d1e3d" stroke="rgba(120,170,255,.5)" stroke-width="1.6"/>
   <rect x="156" y="232" width="148" height="48" rx="16" fill="#05122a" stroke="rgba(53,224,255,.55)" stroke-width="1.3"/>
   <g id="eyes">
    <g class="eye"><circle cx="196" cy="256" r="10" fill="#35e0ff" filter="url(#rgl)"/><circle cx="196" cy="256" r="4" fill="#eaffff"/></g>
    <g class="eye"><circle cx="264" cy="256" r="10" fill="#35e0ff" filter="url(#rgl)"/><circle cx="264" cy="256" r="4" fill="#eaffff"/></g>
   </g>
   <rect class="scan" x="156" y="232" width="148" height="2" fill="url(#scanl)"/>
  </g>
  <g font-family="IBM Plex Mono,monospace" font-size="10" fill="#7ba7d8" letter-spacing="1.5">
   <path d="M330 230h44v-14" stroke="rgba(53,224,255,.4)" stroke-width="1"/><text x="378" y="212" text-anchor="start">OPTIC SENSOR</text>
   <path d="M132 370H88v-14" stroke="rgba(53,224,255,.4)" stroke-width="1"/><text x="86" y="352" text-anchor="end">AI CORE</text>
   <path d="M230 470v26" stroke="rgba(53,224,255,.3)" stroke-width="1" stroke-dasharray="3 4"/><text x="230" y="512" text-anchor="middle" fill="#35e0ff">SYS · ONLINE</text>
  </g>
 </svg>`;
}

/* ---------- HERO FX (canvas + mata robot + terminal) ---------- */
let heroLive=false, fxCtx=null, fxParts=[], fxRAF=null, eyeTarget={x:0,y:0}, eyePos={x:0,y:0};
function initHeroFX(){
  const cv=$('#fx'); if(!cv) return;
  const hero=cv.closest('.hero');
  const dpr=Math.min(window.devicePixelRatio||1,2);
  function size(){ cv.width=hero.clientWidth*dpr; cv.height=hero.clientHeight*dpr; }
  size(); fxCtx=cv.getContext('2d');
  const N=innerWidth<760?22:40;
  fxParts=Array.from({length:N},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0006,vy:(Math.random()-.5)*.0006,r:Math.random()*1.6+.6}));
  const mo=new IntersectionObserver(es=>{heroLive=es[0].isIntersecting;},{threshold:.05});
  mo.observe(hero);
  const ro=new ResizeObserver(size); ro.observe(hero);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function loop(){
    fxRAF=requestAnimationFrame(loop);
    if(document.hidden||!heroLive) return;
    // mata robot lerp
    eyePos.x+=(eyeTarget.x-eyePos.x)*.14; eyePos.y+=(eyeTarget.y-eyePos.y)*.14;
    const eyes=$('#eyes'); if(eyes) eyes.setAttribute('transform','translate('+(eyePos.x*8).toFixed(1)+','+(eyePos.y*5).toFixed(1)+')');
    if(reduced){ fxCtx.clearRect(0,0,cv.width,cv.height); return; }
    fxCtx.clearRect(0,0,cv.width,cv.height);
    const W=cv.width,H=cv.height;
    fxParts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>1)p.vx*=-1; if(p.y<0||p.y>1)p.vy*=-1;
    });
    fxCtx.strokeStyle='rgba(53,224,255,.10)'; fxCtx.lineWidth=1;
    for(let i=0;i<fxParts.length;i++)for(let j=i+1;j<fxParts.length;j++){
      const a=fxParts[i],b=fxParts[j],dx=(a.x-b.x)*W,dy=(a.y-b.y)*H,d=Math.hypot(dx,dy);
      if(d<W*.09){ fxCtx.beginPath();fxCtx.moveTo(a.x*W,a.y*H);fxCtx.lineTo(b.x*W,b.y*H);fxCtx.stroke(); }
    }
    fxCtx.fillStyle='rgba(53,224,255,.5)';
    fxParts.forEach(p=>{ fxCtx.beginPath();fxCtx.arc(p.x*W,p.y*H,p.r*dpr,0,7);fxCtx.fill(); });
  }
  loop(); pageTimers.push({stop:()=>cancelAnimationFrame(fxRAF)});
  window.addEventListener('pointermove',onPointerMove,{passive:true});
  function onPointerMove(e){
    const st=$('#robot'); if(!st||!heroLive) return;
    const r=st.getBoundingClientRect();
    eyeTarget.x=Math.max(-1,Math.min(1,(e.clientX-(r.left+r.width/2))/(r.width)));
    eyeTarget.y=Math.max(-1,Math.min(1,(e.clientY-(r.top+r.height/2))/(r.height)));
  }
  // blink mata
  const rb=$('#robot');
  every(()=>{ if(rb&&!document.hidden){ rb.classList.add('blink'); setTimeout(()=>rb.classList.remove('blink'),200);} },3400+Math.random()*2000);
  // terminal typing
  const term=$('#term-ln');
  if(term){
    const lines=[
      ['> ANDALAN-OS v3.2 — inisialisasi',''],
      ['> modul: service.exe',' OK'],
      ['> modul: cctv.watchdog',' OK'],
      ['> modul: netgrid.link',' 5 NODE'],
      ['> status: SIAP MELAYANI','']
    ];
    let li=0,ci=0;
    function step(){
      if(li>=lines.length){ term.parentElement.querySelector('.t-head span').textContent='SIAP'; return; }
      const [txt,tag]=lines[li];
      if(ci===0&&li>0) term.innerHTML+='<br>';
      term.innerHTML=esc(txt.slice(0,ci+1))+(li===lines.length-1?'':'');
      ci++;
      if(ci>=txt.length){ term.innerHTML=esc(txt)+' <span class="ok">'+tag+'</span>'; li++;ci=0; later(step,tag?420:230); }
      else later(step,13);
    }
    later(step,600);
  }
}

