var xe=`:host { all: initial; position: fixed; inset: 0; z-index: 2147480000; pointer-events: none; color-scheme: light dark; font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif; }
*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
button, input { font: inherit; }
button { -webkit-tap-highlight-color: transparent; }
button:focus-visible, input:focus-visible { outline: 3px solid #79c6ff; outline-offset: 4px; }
.pet { position: absolute; left: 0; top: 0; width: var(--size, 96px); height: var(--size, 96px); pointer-events: none; will-change: transform; }
.hit { all: unset; display: block; position: absolute; inset: 0; cursor: pointer; pointer-events: auto; touch-action: none; border-radius: 48%; -webkit-user-select: none; user-select: none; }
.hit:focus-visible { outline: 2px dashed #78b9fa; outline-offset: 5px; }
.float, .direction, .actor { width: 100%; height: 100%; }
.float { animation: bob 3.6s ease-in-out infinite; }
.direction { transition: transform .55s ease-in-out; }
.actor { position: relative; transform-origin: 50% 52%; }
.whale, .jet, .charms { position: absolute; inset: 0; display: block; width: 100%; height: 100%; overflow: visible; }
.whale { filter: drop-shadow(0 5px 5px #1464c92b); }
.body-fill, .belly { transition: fill .2s ease; }
.body-outline { paint-order: stroke fill; }
.eye { transform-box: fill-box; transform-origin: center; }
.charms { transform-origin: 50% 55%; }
.jet { transform-origin: 50% 100%; }
.water-drop { transform-box: fill-box; transform-origin: center bottom; }
.charm { transform-box: fill-box; transform-origin: center; }
.gear { all: unset; position: absolute; right: -3px; bottom: 0; width: 26px; height: 26px; display: grid; place-items: center; border: 1px solid #cce2f9; border-radius: 50%; background: #f7fbffed; color: #4a7dad; box-shadow: 0 2px 8px #32608a12; font-size: 16px; opacity: 0; pointer-events: none; cursor: pointer; transition: opacity .15s; }
.pet:hover .gear, .pet:focus-within .gear, .pet.menu-open .gear { opacity: 1; pointer-events: auto; }
.pet:hover .float, .pet:has(:focus-visible) .float { animation-play-state: paused; }
.effects { position: absolute; inset: 0; overflow: visible; pointer-events: none; }
.particle { position: absolute; display: block; border-radius: 50%; pointer-events: none; background: #79d8ff; border: 1px solid #d9f7ff; box-shadow: 0 0 3px #51bfff30; }
.particle.air { background: #bceeff35; border: 1px solid #73c3edb0; }
.menu { position: fixed; width: 244px; max-width: calc(100vw - 20px); max-height: calc(100dvh - 20px); overflow-y: auto; padding: 17px; border: 1px solid #d8e8f7; border-radius: 18px; background: #f8fcfffa; box-shadow: 0 12px 42px #214c8526, 0 2px 8px #214c8510; color: #244668; pointer-events: auto; backdrop-filter: blur(18px); font-size: 13px; }
.menu header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
.menu h2 { margin: 0; font-size: 15px; font-weight: 650; }
.menu .subtitle { margin: 0 0 18px; color: #58748d; font-size: 11px; }
.menu .close { border: 0; border-radius: 8px; width: 25px; height: 25px; background: transparent; color: #7290a9; font-size: 20px; cursor: pointer; }
.menu .close:hover { background: #e7f2ff; }
.size-label { display: flex; justify-content: space-between; align-items: center; }
.size-label output { color: #3d709f; font-size: 11px; font-variant-numeric: tabular-nums; }
input[type=range] { display: block; width: 100%; margin: 12px 0 6px; accent-color: #4a8df6; cursor: pointer; }
.scale-hints { display: flex; justify-content: space-between; font-size: 10px; color: #58748d; margin-bottom: 17px; }
.toggle-row { display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 12px 0; border-top: 1px solid #e2edf8; }
input[type=checkbox] { width: 31px; height: 17px; accent-color: #4a8df6; cursor: pointer; }
.hide { width: 100%; border: 1px solid #d5e7fa; border-radius: 10px; padding: 8px; background: #edf6ff; color: #486a8b; cursor: pointer; margin-top: 4px; }
.hide:hover { background: #e1efff; }
.help { margin: 13px 0 0; font-size: 10px; line-height: 1.8; color: #58748d; }
.restore { all: unset; position: fixed; bottom: 116px; right: 14px; display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid #d3e7fb; background: #f0f8fff0; border-radius: 50%; cursor: pointer; pointer-events: auto; box-shadow: 0 2px 10px #2762a51a; }
.restore svg { width: 23px; height: 23px; }
@keyframes bob { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-5px) rotate(2deg); } }
@media (hover: none) { .gear { opacity: .85; pointer-events: auto; } }
@media (prefers-reduced-motion: reduce) { .float { animation: none; } .direction { transition: none; } }
@media (prefers-color-scheme: dark) {
  .menu { background: #15263afa; border-color: #2b4560; color: #d5e8fd; box-shadow: 0 12px 42px #0005; }
  .menu .subtitle, .help, .scale-hints { color: #8ba5c0; }
  .toggle-row { border-color: #2b4560; }
  .size-label output { color: #98bde0; }
  .hide, .gear, .restore { background: #1f3852ee; color: #a2caf2; border-color: #345b7b; }
  .hide:hover, .menu .close:hover { background: #2b4560; }
}
`;var R="dsh.little-whale.v1",re=Object.freeze({size:96,swimming:!0,hidden:!1}),A=(r,i,u)=>Math.min(u,Math.max(i,r));function X(r){let i=r&&typeof r=="object"?r:{};return{size:typeof i.size=="number"&&Number.isFinite(i.size)?A(Math.round(i.size),56,160):re.size,swimming:typeof i.swimming=="boolean"?i.swimming:re.swimming,hidden:typeof i.hidden=="boolean"?i.hidden:re.hidden}}function ge(r=Math.random){let i=r();return i<1/3?"charms":i<2/3?"spray":"roll"}function ye(r,i,u){let a=Math.min(18,Math.max(0,(r-u)/2)),o=Math.min(76,Math.max(0,(i-u)/3));return{left:a,right:Math.max(a,r-u-a),top:o,bottom:Math.max(o,i-u-Math.min(140,i*.22))}}function S(r,i){return{x:A(r.x,i.left,i.right),y:A(r.y,i.top,i.bottom)}}function we(r,i,u,a=27){let o=i.x-r.x,v=i.y-r.y,T=Math.hypot(o,v);if(T<.1)return{...r};let y=Math.min(T,a*A(u,0,.05));return{x:r.x+o/T*y,y:r.y+v/T*y}}var ne="180 465 960 960",ae=`M270 984
  C266 868 342 751 471 713
  C590 675 694 700 783 751
  C848 790 900 795 903 713
  C905 684 894 661 890 648
  C885 632 899 619 915 620
  C961 611 993 651 997 702
  C1037 693 1078 716 1091 744
  C1105 774 1076 774 1056 777
  C1009 782 983 801 983 847
  C984 1011 916 1121 796 1179
  C685 1233 514 1220 379 1179
  C301 1154 253 1128 250 1073
  C246 1032 255 1008 270 984 Z`;function ie(r="little-whale"){return`<svg class="whale" xmlns="http://www.w3.org/2000/svg" viewBox="${ne}" aria-hidden="true" data-artwork="reference-cartoon">
    <defs>
      <clipPath id="${r}-body"><path d="${ae}"/></clipPath>
      <filter id="${r}-pencil" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".12" numOctaves="2" seed="8" result="grain"/>
        <feDisplacementMap in="SourceGraphic" in2="grain" scale="2.8" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <g filter="url(#${r}-pencil)">
      <path class="body-fill" d="${ae}" fill="#a4d4de"/>
      <path class="belly" d="M246 1080 C362 1165 567 1174 715 1136 C853 1115 946 1037 989 938 L1041 1300 H230 Z" fill="#fffaf0" clip-path="url(#${r}-body)"/>
      <path class="body-outline" d="${ae}" fill="none" stroke="#111315" stroke-width="29" stroke-linejoin="round" stroke-linecap="round"/>
      <ellipse class="cheek" cx="522" cy="1056" rx="43" ry="45" fill="#f8d2df" transform="rotate(-12 522 1056)"/>
      <path class="eye" d="M439 1025 C440 1008 454 998 471 998 C491 998 501 1011 502 1028 C503 1047 489 1058 472 1059 C452 1059 438 1046 439 1025 Z" fill="#111315"/>
      <path class="flipper" d="M603 1150 C615 1200 655 1253 711 1243 C760 1239 803 1211 786 1160 L766 1124" fill="#a4d4de" stroke="#64bed1" stroke-width="23" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`}function Ce(){return`<svg class="jet" hidden viewBox="${ne}" aria-hidden="true">
    <g fill="#a4d4de" stroke="#111315" stroke-width="29" stroke-linecap="round" stroke-linejoin="round">
      <path class="water-drop drop-left" d="M320 701 C298 680 314 645 344 622 C380 595 434 602 465 631 C478 643 471 657 455 659 C416 664 381 687 349 711 C337 720 326 713 320 701 Z"/>
      <path class="water-drop drop-centre" d="M519 620 C500 600 498 570 505 540 C512 511 532 486 555 482 C575 479 587 492 586 515 C584 549 559 576 536 598 C528 606 523 614 519 620 Z"/>
      <path class="water-drop drop-right" d="M560 652 C566 631 589 619 612 620 C634 621 650 633 650 647 C650 659 638 666 623 665 C601 662 580 655 560 652 Z"/>
    </g>
  </svg>`}var ve="M0 22 C-13 12 -40 -7 -37 -25 C-34 -43 -13 -43 0 -26 C13 -43 34 -43 37 -25 C40 -7 13 12 0 22 Z",ke="M0 -34 Q5 -36 11 -16 L29 -17 Q36 -15 23 0 L29 18 Q29 24 9 18 L-2 34 Q-8 38 -13 16 L-32 11 Q-39 6 -20 -5 L-20 -25 Q-17 -33 -1 -19 Z";function Me(){return`<svg class="charms" hidden viewBox="${ne}" aria-hidden="true">
    <g class="charm heart" style="--turn:-12deg" transform="translate(204 906) rotate(-12)"><path d="${ve}" fill="#f49cc8"/></g>
    <g class="charm heart" style="--turn:14deg" transform="translate(1038 1070) rotate(14)"><path d="${ve}" fill="#f49cc8"/></g>
    <g class="charm star" style="--turn:12deg" transform="translate(821 590) rotate(12)"><path d="${ke}" fill="#65bed2"/></g>
    <g class="charm star" style="--turn:-10deg" transform="translate(416 1292) rotate(-10) scale(.86)"><path d="${ke}" fill="#65bed2"/></g>
  </svg>`}var ze="dsh-whale-pet";function $e(){if(document.getElementById(ze))return;let r=document.createElement("div");r.id=ze;let i=r.attachShadow({mode:"open"}),u=new AbortController,a=(e,t,n,l={})=>e.addEventListener(t,n,{...l,signal:u.signal}),o;try{o=X(JSON.parse(localStorage.getItem(R)))}catch{o=X()}let v=matchMedia("(prefers-reduced-motion: reduce)"),T=ie("little-whale");i.innerHTML=`<style>${xe}</style>
    <div class="pet" data-state="idle">
      <button class="hit" aria-label="\u5C0F\u84DD\u9CB8\uFF0C\u70B9\u51FB\u9875\u9762\u79FB\u52A8\uFF0C\u53CC\u51FB\u6389\u5934\uFF0C\u70B9\u51FB\u9CB8\u9C7C\u4E92\u52A8" title="\u70B9\u51FB\u9875\u9762\uFF1A\u5C0F\u9CB8\u9C7C\u6E38\u5230\u90A3\u91CC \xB7 \u53CC\u51FB\u6389\u5934 \xB7 \u62D6\u52A8\u642C\u5BB6 \xB7 \u53F3\u952E\u8BBE\u7F6E">
        <div class="float"><div class="direction"><div class="actor">${T}${Ce()}${Me()}</div></div></div>
      </button>
      <div class="effects" aria-hidden="true"></div>
       
      <button class="gear" aria-label="\u5C0F\u84DD\u9CB8\u8BBE\u7F6E" title="\u5C0F\u84DD\u9CB8\u8BBE\u7F6E" aria-expanded="false">\u2699</button>
    </div>
    
     <section class="menu" role="dialog" aria-label="\u5C0F\u84DD\u9CB8\u8BBE\u7F6E" hidden>
      <header><h2>\u5C0F\u84DD\u9CB8 <span aria-hidden="true">\xB7</span> \u966A\u4F60\u6E38\u4E00\u4F1A\u513F</h2><button class="close" aria-label="\u5173\u95ED\u8BBE\u7F6E">\xD7</button></header>
      <p class="subtitle">\u4F60\u7684\u8FF7\u4F60\u6D77\u6D0B\u4F19\u4F34</p>
      <label class="size-label" for="whale-size">\u9CB8\u9C7C\u5927\u5C0F <output for="whale-size"></output></label>
      <input id="whale-size" type="range" min="56" max="160" step="2" aria-label="\u9CB8\u9C7C\u5927\u5C0F" />
      <div class="scale-hints"><span>\u5C0F\u5C0F\u53EA</span><span>\u80D6\u4E4E\u4E4E</span></div>
      <label class="toggle-row" for="whale-swim"><span>\u81EA\u7531\u6E38\u52A8</span><input id="whale-swim" type="checkbox" /></label>
      <button class="hide">\u8BA9\u5C0F\u9CB8\u9C7C\u4F11\u606F\u4E00\u4E0B</button>
      <p class="help">\u70B9\u51FB\u9875\u9762\uFF1A\u6E38\u5230\u6307\u5B9A\u4F4D\u7F6E<br/>\u53CC\u51FB\u9CB8\u9C7C\u6389\u5934 \xB7 \u62D6\u52A8\u642C\u5BB6 \xB7 \u53F3\u952E\u8BBE\u7F6E<br/>\u5927\u5C0F\u81EA\u52A8\u8BB0\u4F4F \xB7 \u65B9\u5411\u952E\u79FB\u52A8 / Enter \u4E92\u52A8</p>
    </section>
    <button class="restore" hidden aria-label="\u5524\u9192\u5C0F\u84DD\u9CB8" title="\u5524\u9192\u5C0F\u84DD\u9CB8">${ie("restore-whale")}</button>
    `;let y=document.createElement("div");y.id="dsh-whale-background",y.setAttribute("aria-hidden","true"),document.body.prepend(y),document.body.append(r);let L=document.createElement("style");L.dataset.dshSidebarTint="true",L.textContent=`
    [data-dsh-sidebar-tint="true"] { background-color: #fcfdff !important; }
    [data-dsh-main-bg="true"] { background: transparent !important; background-color: transparent !important; background-image: none !important; }
  `,document.head.append(L);let G=()=>{let e=innerWidth*.52,t=innerHeight*.3;for(let n of document.body.querySelectorAll("*")){if(n===r||r.contains(n)||n===L||n===y)continue;let l=n.getBoundingClientRect();if(l.width<=0||l.height<=0)continue;l.top<=8&&l.height>=innerHeight*.72&&l.left<=8&&l.width>=180&&l.width<=e&&n.setAttribute("data-dsh-sidebar-tint","true");let Z=l.left<=innerWidth*.3&&l.right>=innerWidth*.62;l.width>=innerWidth*.35&&l.height>=t&&Z&&l.top<=innerHeight*.65&&n.setAttribute("data-dsh-main-bg","true")}},se=new MutationObserver(()=>requestAnimationFrame(G));se.observe(document.body,{childList:!0,subtree:!0}),G();let Ae=[80,300,900,1800].map(e=>setTimeout(G,e)),d=e=>i.querySelector(e),h=d(".pet"),f=d(".hit"),Q=d(".actor"),K=d(".direction"),Se=d(".effects"),_=d(".jet"),V=d(".charms"),W=d(".menu"),le=d(".gear"),N=d("input[type=range]"),J=d("input[type=checkbox]"),U=d(".restore"),s={x:innerWidth-o.size-38,y:innerHeight*.57},p={...s},m=null,Y=0,x=1,k=0,j=0,ce=0,B=!1,E=!1,b=!1,c=null,O=!1,de=0,C=[],P=new Set,ee=!1,M=()=>ye(innerWidth,innerHeight,o.size),q=()=>{try{localStorage.setItem(R,JSON.stringify(o))}catch{}},H=()=>{h.style.transform=`translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`},fe=()=>{s=S(s,M()),p=S(p,M()),H()};function D(){let e=Math.min(244,innerWidth-20),t=W.offsetHeight;W.style.left=`${A(s.x+o.size-e,10,Math.max(10,innerWidth-e-10))}px`;let n=s.y>t+15?s.y-t-10:s.y+o.size+10;W.style.top=`${A(n,10,Math.max(10,innerHeight-t-10))}px`}function F(){h.style.setProperty("--size",`${o.size}px`),N.value=String(o.size),d("output").textContent=`${o.size} px`,J.checked=o.swimming,h.hidden=o.hidden,U.hidden=!o.hidden,fe(),b&&D()}function z(e,t=!0){b=e,W.hidden=!e,h.classList.toggle("menu-open",e),le.setAttribute("aria-expanded",String(e)),e?(D(),N.focus({preventScroll:!0})):t&&f.focus({preventScroll:!0}),g()}function Te({x:e,y:t,dx:n,dy:l,size:Z=5,duration:he=1400,water:oe=!1,delay:je=0}){if(P.size>=32)return;let I=document.createElement("i");I.className=`particle${oe?"":" air"}`,I.style.cssText=`left:${e}px;top:${t}px;width:${Z}px;height:${Z*(oe?1.35:1)}px`,Se.append(I);let Oe=oe?[{transform:"translate(0,0) scale(.3)",opacity:0,offset:0},{transform:`translate(${n*.2}px,${l*.65}px) scale(1)`,opacity:.95,offset:.25},{transform:`translate(${n*.6}px,${l}px) scale(1)`,opacity:.8,offset:.55},{transform:`translate(${n}px,${l*.18+o.size*.3}px) scale(.55)`,opacity:0,offset:1}]:[{transform:"translate(0,0) scale(.3)",opacity:0},{opacity:.75,offset:.2},{transform:`translate(${n}px,${l}px) scale(1.2)`,opacity:0}],me=I.animate(Oe,{duration:he,delay:je,easing:"linear",fill:"both"}),be={dot:I,animation:me};P.add(be),me.onfinish=()=>{I.remove(),P.delete(be)}}function Ye(e,t){let n=S({x:e-o.size/2,y:t-o.size/2},M());m=n,p=n,Math.abs(n.x-s.x)>3&&(x=n.x<s.x?1:-1,K.style.transform=`scaleX(${x})`),g()}function Ee(){x*=-1,K.style.transform=`scaleX(${x})`;let e=M();m=S({x:s.x+x*Math.max(100,o.size*2.2),y:s.y},e),p=m,Y=Number.POSITIVE_INFINITY,g()}function $(){for(let{animation:e,dot:t}of P)e.cancel(),t.remove();P.clear()}function w(){clearTimeout(de);for(let e of C)e.cancel();C=[],_.setAttribute("hidden",""),V.setAttribute("hidden",""),h.dataset.state="idle"}function Ie(){w(),$();let e=ge();h.dataset.state=e;let t=v.matches?450:e==="charms"?1850:e==="spray"?1550:1650;if(e==="charms")V.removeAttribute("hidden"),C.push(V.animate([{transform:"scale(.35)",opacity:0},{transform:"scale(1.08)",opacity:1,offset:.25},{transform:"scale(1)",opacity:1,offset:.7},{transform:"scale(1.08)",opacity:0,offset:1}],{duration:t,easing:"ease-out",fill:"both"})),C.push(Q.animate([{transform:"scale(1)"},{transform:"scale(1.035,.965)",offset:.22},{transform:"scale(1)"}],{duration:650,easing:"ease-in-out"}));else if(e==="spray")_.removeAttribute("hidden"),C.push(_.animate([{transform:"translateY(10px) scale(.5)",opacity:0},{transform:"translateY(0) scale(1)",opacity:1,offset:.2},{transform:"translateY(-5px) scale(1.02)",opacity:1,offset:.68},{transform:"translateY(0) scale(.9)",opacity:0}],{duration:t,easing:"ease-in-out",fill:"both"})),C.push(Q.animate([{transform:"scale(1)"},{transform:"scale(1.06,.94)",offset:.15},{transform:"translateY(3px) scale(.97,1.04)",offset:.35},{transform:"scale(1)"}],{duration:t,easing:"ease-in-out"}));else{let n=Math.min(22,o.size*.2);C.push(Q.animate(v.matches?[{transform:"rotate(0deg)"},{transform:"rotate(-9deg)"},{transform:"rotate(0deg)"}]:[{transform:"translateY(0) rotate(0deg) scale(1)",offset:0},{transform:"translateY(5px) rotate(-18deg) scale(1.07,.94)",offset:.13},{transform:`translateY(-${n}px) rotate(105deg) scale(.97,1.03)`,offset:.4},{transform:`translateY(-${n*.65}px) rotate(255deg) scale(1.03,.97)`,offset:.68},{transform:"translateY(3px) rotate(365deg) scale(1.04,.97)",offset:.88},{transform:"translateY(0) rotate(360deg) scale(1)",offset:1}],{duration:t,easing:"cubic-bezier(.37,0,.3,1)"}))}de=setTimeout(w,t)}function Le(e){let t=M();p={x:t.left+Math.random()*(t.right-t.left),y:t.top+Math.random()*(t.bottom-t.top)},Y=e+6500+Math.random()*6500}function pe(e){if(k=0,ee||document.hidden||o.hidden)return;let t=j?(e-j)/1e3:0;if(j=e,(o.swimming||m)&&(!v.matches||m)&&(!B||m)&&(!E||m)&&!b&&!c&&h.dataset.state==="idle"){m?p=m:(e>Y||Math.hypot(p.x-s.x,p.y-s.y)<6)&&Le(e);let n=p.x-s.x;Math.abs(n)>12&&(x=n<0?1:-1,K.style.transform=`scaleX(${x})`),s=we(s,p,t,25),H(),m&&Math.hypot(p.x-s.x,p.y-s.y)<6&&(s=p,m=null,Y=e+6500+Math.random()*6500,H()),e-ce>1100&&(ce=e,Te({x:o.size*(x===1?.87:.13),y:o.size*.52,dx:x*(10+Math.random()*10),dy:-14-Math.random()*20,size:3+Math.random()*3}))}k=requestAnimationFrame(pe)}function g(){!k&&!ee&&!document.hidden&&!o.hidden&&(j=0,k=requestAnimationFrame(pe))}a(f,"click",e=>{if(O&&e.detail!==0){O=!1;return}Ie()}),a(f,"dblclick",e=>{e.preventDefault(),w(),$(),Ee()}),a(h,"pointerenter",()=>{B=!0}),a(h,"pointerleave",()=>{B=!1}),a(h,"focusin",()=>{E=i.activeElement?.matches(":focus-visible")??!1}),a(h,"focusout",()=>{E=!1}),a(f,"keydown",e=>{E=!0;let t={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,-12],ArrowDown:[0,12]}[e.key];!t||e.altKey||e.ctrlKey||e.metaKey||(e.preventDefault(),s=S({x:s.x+t[0],y:s.y+t[1]},M()),H(),Y=0,b&&D())}),a(f,"contextmenu",e=>{e.preventDefault(),z(!b)}),a(le,"click",()=>z(!b)),a(d(".close"),"click",()=>z(!1)),a(document,"pointerdown",e=>{let t=e.composedPath();b&&!t.includes(r)&&z(!1,!1),!(e.button!==0||!e.isPrimary||t.includes(r)||t.some(l=>l instanceof Element&&l.matches('button, input, textarea, select, a, [contenteditable="true"], [role="button"], [role="textbox"]')))&&Ye(e.clientX,e.clientY)}),a(i,"keydown",e=>{e.key==="Escape"&&b&&(e.preventDefault(),z(!1))}),a(N,"input",()=>{o.size=Number(N.value),F(),q()}),a(J,"change",()=>{o.swimming=J.checked,q(),g()}),a(d(".hide"),"click",()=>{z(!1,!1),o.hidden=!0,w(),$(),q(),F(),U.focus({preventScroll:!0})}),a(U,"click",e=>{o.hidden=!1,B=!1,E=!1,q(),F(),e.detail===0&&f.focus({preventScroll:!0}),g()}),a(f,"pointerdown",e=>{e.button!==0||!e.isPrimary||(O=!1,c={id:e.pointerId,x:e.clientX,y:e.clientY,start:{...s},moved:!1},f.setPointerCapture(e.pointerId))}),a(f,"pointermove",e=>{if(!c||e.pointerId!==c.id)return;let t=e.clientX-c.x,n=e.clientY-c.y;!c.moved&&Math.hypot(t,n)<6||(c.moved||(w(),$()),c.moved=!0,s=S({x:c.start.x+t,y:c.start.y+n},M()),H(),b&&D())});let ue=e=>{!c||e.pointerId!==c.id||(O=c.moved||e.type==="pointercancel",f.hasPointerCapture(e.pointerId)&&f.releasePointerCapture(e.pointerId),c=null,Y=0,e.pointerType!==""&&(f.blur(),E=!1))};a(f,"pointerup",ue),a(f,"pointercancel",ue),a(f,"lostpointercapture",e=>{c&&e.pointerId===c.id&&(O=c.moved,c=null)}),a(window,"resize",()=>{fe(),b&&D()}),a(document,"visibilitychange",()=>{document.hidden?(cancelAnimationFrame(k),k=0,j=0,w(),$()):g()}),a(v,"change",()=>{w(),$(),g()}),a(window,"storage",e=>{if(e.key===R)try{o=X(JSON.parse(e.newValue)),F(),o.hidden&&z(!1,!1),g()}catch{}}),F(),g();let te=()=>{ee=!0,u.abort(),cancelAnimationFrame(k),w(),$(),se.disconnect(),Ae.forEach(clearTimeout),L.remove(),y.remove();for(let e of document.querySelectorAll('[data-dsh-sidebar-tint="true"]'))e.removeAttribute("data-dsh-sidebar-tint");for(let e of document.querySelectorAll('[data-dsh-main-bg="true"]'))e.removeAttribute("data-dsh-main-bg");r.remove()};return a(window,"pagehide",e=>{e.persisted||te()}),r.whaleDispose=te,te}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$e,{once:!0}):$e();export{$e as mountWhale};
