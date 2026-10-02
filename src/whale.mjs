import css from './whale.css';
import backgroundUrl from '../assets/harness-background.png';
import { STORAGE_KEY, normalizeSettings, chooseAction, swimBounds, clampPosition, clamp, stepMotion } from './core.mjs';
import { whaleArtwork, sprayArtwork, charmArtwork } from './artwork.mjs';
const HOST_ID = 'dsh-whale-pet';

export function mountWhale() {
  if (document.getElementById(HOST_ID)) return;
  const host = document.createElement('div');
  host.id = HOST_ID;
  const shadow = host.attachShadow({ mode: 'open' });
  const controller = new AbortController();
  const on = (target, type, handler, options = {}) => target.addEventListener(type, handler, { ...options, signal: controller.signal });
  let settings;
  try { settings = normalizeSettings(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { settings = normalizeSettings(); }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const whaleSVG = whaleArtwork('little-whale');
  shadow.innerHTML = `<style>${css}</style>
    <div class="pet" data-state="idle">
      <button class="hit" aria-label="小蓝鲸，点击页面移动，双击掉头，点击鲸鱼互动" title="点击页面：小鲸鱼游到那里 · 双击掉头 · 拖动搬家 · 右键设置">
        <div class="float"><div class="direction"><div class="actor">${whaleSVG}${sprayArtwork()}${charmArtwork()}</div></div></div>
      </button>
      <div class="effects" aria-hidden="true"></div>
       
      <button class="gear" aria-label="小蓝鲸设置" title="小蓝鲸设置" aria-expanded="false">⚙</button>
    </div>
    
     <section class="menu" role="dialog" aria-label="小蓝鲸设置" hidden>
      <header><h2>小蓝鲸 <span aria-hidden="true">·</span> 陪你游一会儿</h2><button class="close" aria-label="关闭设置">×</button></header>
      
      <label class="size-label" for="whale-size">鲸鱼大小 <output for="whale-size"></output></label>
      <input id="whale-size" type="range" min="56" max="160" step="2" aria-label="鲸鱼大小" />
      <div class="scale-hints"><span>小小只</span><span>胖乎乎</span></div>
      <label class="toggle-row" for="whale-swim"><span>自由游动</span><input id="whale-swim" type="checkbox" /></label>
      <button class="hide">让小鲸鱼休息一下</button>
      <p class="help">点击页面：游到指定位置<br/>双击鲸鱼掉头 · 拖动搬家 · 右键设置<br/>大小自动记住 · 方向键移动 / Enter 互动</p>
    </section>
    <button class="restore" hidden aria-label="唤醒小蓝鲸" title="唤醒小蓝鲸">${whaleArtwork('restore-whale')}</button>
    `;
  const background = document.createElement('div');
  background.id = 'dsh-whale-background';
  background.setAttribute('aria-hidden', 'true');
  document.body.prepend(background);
  document.body.append(host);

  // The app's sidebar is rendered with generated classes, so tint the actual
  // tall left-hand surface after the app mounts instead of relying on a class name.
  const sidebarStyle = document.createElement('style');
  sidebarStyle.dataset.dshSidebarTint = 'true';
  sidebarStyle.textContent = `
    #dsh-whale-background {
      position: fixed !important;
      inset: 0 !important;
      z-index: 0 !important;
      pointer-events: none !important;
      background-color: #f2faff !important;
      background-image: linear-gradient(rgba(242,250,255,.78), rgba(242,250,255,.78)), url("${backgroundUrl}") !important;
      background-position: center top, center top !important;
      background-size: cover, cover !important;
      background-repeat: no-repeat, no-repeat !important;
    }
    [data-dsh-sidebar-tint="true"] { background-color: #fcfdff !important; }
    [data-dsh-main-bg="true"] { background: transparent !important; background-color: transparent !important; background-image: none !important; }
  `;
  document.head.append(sidebarStyle);
  const tintSurfaces = () => {
    // Settings is a full-page surface in DSH, not the chat canvas. Never make
    // it transparent: otherwise the whale background leaks through every
    // settings card and makes the whole Settings view look washed out.
    const visibleText = document.body.innerText || '';
    const settingsMarkers = ['账户与余额', '通用设置', '内置插件', '桌面设置'];
    const settingsView = settingsMarkers.filter(marker => visibleText.includes(marker)).length >= 2;

    // Reconcile markers on every pass so switching between chat and Settings
    // immediately restores the app's own opaque backgrounds.
    for (const node of document.querySelectorAll('[data-dsh-main-bg="true"]')) {
      node.removeAttribute('data-dsh-main-bg');
    }
    if (settingsView) return;

    const maxSidebarWidth = innerWidth * .52;
    const minHeight = innerHeight * .30;
    for (const node of document.body.querySelectorAll('*')) {
      if (node === host || host.contains(node) || node === sidebarStyle || node === background) continue;
      const box = node.getBoundingClientRect();
      if (box.width <= 0 || box.height <= 0) continue;
      if (box.top <= 8 && box.height >= innerHeight * .72 && box.left <= 8 && box.width >= 180 && box.width <= maxSidebarWidth) {
        node.setAttribute('data-dsh-sidebar-tint', 'true');
      }
      // The chat pane can begin below a fixed header and may contain a second
      // opaque scrolling wrapper. Mark every large right-side surface, not just
      // the outermost one, so a late-rendered wrapper cannot cover the image.
      const reachesMainArea = box.left <= innerWidth * .30 && box.right >= innerWidth * .62;
      const largeSurface = box.width >= innerWidth * .35 && box.height >= minHeight;
      if (largeSurface && reachesMainArea && box.top <= innerHeight * .65) {
        node.setAttribute('data-dsh-main-bg', 'true');
      }
    }
  };
  const sidebarObserver = new MutationObserver(() => requestAnimationFrame(tintSurfaces));
  sidebarObserver.observe(document.body, { childList: true, subtree: true });
  tintSurfaces();
  const surfaceRefreshTimers = [80, 300, 900, 1800].map(delay => setTimeout(tintSurfaces, delay));

  const $ = selector => shadow.querySelector(selector);
  const pet = $('.pet'), hit = $('.hit'), actor = $('.actor'), direction = $('.direction');
  const effects = $('.effects'), jet = $('.jet'), charms = $('.charms');
  const menu = $('.menu'), gear = $('.gear'), slider = $('input[type=range]');
  const swimming = $('input[type=checkbox]'), restore = $('.restore');
  let position = { x: innerWidth - settings.size - 38, y: innerHeight * .57 };
  let target = { ...position }, destination = null, nextTarget = 0, facing = 1, frame = 0, previousTime = 0, trailAt = 0;
  let hover = false, focused = false, menuOpen = false, drag = null, suppressClick = false;
  let actionTimer = 0, actionAnimations = [], particles = new Set();
  let disposed = false;
  const bounds = () => swimBounds(innerWidth, innerHeight, settings.size);
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch { /* Private browsing / full storage must not break the pet. */ } };
  const paint = () => { pet.style.transform = `translate3d(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px, 0)`; };
  const constrain = () => { position = clampPosition(position, bounds()); target = clampPosition(target, bounds()); paint(); };

  function placeMenu() {
    const width = Math.min(244, innerWidth - 20);
    const height = menu.offsetHeight;
    menu.style.left = `${clamp(position.x + settings.size - width, 10, Math.max(10, innerWidth - width - 10))}px`;
    const y = position.y > height + 15 ? position.y - height - 10 : position.y + settings.size + 10;
    menu.style.top = `${clamp(y, 10, Math.max(10, innerHeight - height - 10))}px`;
  }

  function syncSettings() {
    pet.style.setProperty('--size', `${settings.size}px`);
    slider.value = String(settings.size);
    $('output').textContent = `${settings.size} px`;
    swimming.checked = settings.swimming;
    pet.hidden = settings.hidden;
    restore.hidden = !settings.hidden;
    constrain();
    if (menuOpen) placeMenu();
  }

  function setMenu(open, returnFocus = true) {
    menuOpen = open;
    menu.hidden = !open;
    pet.classList.toggle('menu-open', open);
    gear.setAttribute('aria-expanded', String(open));
    if (open) { placeMenu(); slider.focus({ preventScroll: true }); }
    else if (returnFocus) hit.focus({ preventScroll: true });
    start();
  }

  function bubble({ x, y, dx, dy, size = 5, duration = 1400, water = false, delay = 0 }) {
    if (particles.size >= 32) return;
    const dot = document.createElement('i');
    dot.className = `particle${water ? '' : ' air'}`;
    dot.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size * (water ? 1.35 : 1)}px`;
    effects.append(dot);
    const frames = water ? [
      { transform: 'translate(0,0) scale(.3)', opacity: 0, offset: 0 },
      { transform: `translate(${dx * .2}px,${dy * .65}px) scale(1)`, opacity: .95, offset: .25 },
      { transform: `translate(${dx * .6}px,${dy}px) scale(1)`, opacity: .8, offset: .55 },
      { transform: `translate(${dx}px,${dy * .18 + settings.size * .3}px) scale(.55)`, opacity: 0, offset: 1 },
    ] : [
      { transform: 'translate(0,0) scale(.3)', opacity: 0 },
      { opacity: .75, offset: .2 },
      { transform: `translate(${dx}px,${dy}px) scale(1.2)`, opacity: 0 },
    ];
    const animation = dot.animate(frames, { duration, delay, easing: 'linear', fill: 'both' });
    const item = { dot, animation };
    particles.add(item);
    animation.onfinish = () => { dot.remove(); particles.delete(item); };
  }

  function moveTo(clientX, clientY) {
    const next = clampPosition({ x: clientX - settings.size / 2, y: clientY - settings.size / 2 }, bounds());
    destination = next;
    target = next;
    if (Math.abs(next.x - position.x) > 3) {
      facing = next.x < position.x ? 1 : -1;
      direction.style.transform = `scaleX(${facing})`;
    }
    start();
  }

  function turnAround() {
    facing *= -1;
    direction.style.transform = `scaleX(${facing})`;
    const b = bounds();
    destination = clampPosition({ x: position.x + facing * Math.max(100, settings.size * 2.2), y: position.y }, b);
    target = destination;
    nextTarget = Number.POSITIVE_INFINITY;
    start();
  }

  function clearParticles() {
    for (const { animation, dot } of particles) { animation.cancel(); dot.remove(); }
    particles.clear();
  }

  function stopAction() {
    clearTimeout(actionTimer);
    for (const animation of actionAnimations) animation.cancel();
    actionAnimations = [];
    jet.setAttribute('hidden', '');
    charms.setAttribute('hidden', '');
    pet.dataset.state = 'idle';
  }

  function interact() {
    stopAction();
    clearParticles();
    const action = chooseAction();
    pet.dataset.state = action;
    const duration = reduced.matches ? 450 : action === 'charms' ? 1850 : action === 'spray' ? 1550 : 1650;
    // All three interactions are silent; only the visual effect changes.
    if (action === 'charms') {
      charms.removeAttribute('hidden');
      actionAnimations.push(charms.animate([
        { transform: 'scale(.35)', opacity: 0 },
        { transform: 'scale(1.08)', opacity: 1, offset: .25 },
        { transform: 'scale(1)', opacity: 1, offset: .7 },
        { transform: 'scale(1.08)', opacity: 0, offset: 1 },
      ], { duration, easing: 'ease-out', fill: 'both' }));
      actionAnimations.push(actor.animate([
        { transform: 'scale(1)' }, { transform: 'scale(1.035,.965)', offset: .22 }, { transform: 'scale(1)' },
      ], { duration: 650, easing: 'ease-in-out' }));
    } else if (action === 'spray') {
      jet.removeAttribute('hidden');
      actionAnimations.push(jet.animate([
        { transform: 'translateY(10px) scale(.5)', opacity: 0 },
        { transform: 'translateY(0) scale(1)', opacity: 1, offset: .2 },
        { transform: 'translateY(-5px) scale(1.02)', opacity: 1, offset: .68 },
        { transform: 'translateY(0) scale(.9)', opacity: 0 },
      ], { duration, easing: 'ease-in-out', fill: 'both' }));
      actionAnimations.push(actor.animate([
        { transform: 'scale(1)' }, { transform: 'scale(1.06,.94)', offset: .15 },
        { transform: 'translateY(3px) scale(.97,1.04)', offset: .35 }, { transform: 'scale(1)' },
      ], { duration, easing: 'ease-in-out' }));
    } else {
      const arc = Math.min(22, settings.size * .2);
      actionAnimations.push(actor.animate(reduced.matches ? [
        { transform: 'rotate(0deg)' }, { transform: 'rotate(-9deg)' }, { transform: 'rotate(0deg)' },
      ] : [
        { transform: 'translateY(0) rotate(0deg) scale(1)', offset: 0 },
        { transform: 'translateY(5px) rotate(-18deg) scale(1.07,.94)', offset: .13 },
        { transform: `translateY(-${arc}px) rotate(105deg) scale(.97,1.03)`, offset: .4 },
        { transform: `translateY(-${arc * .65}px) rotate(255deg) scale(1.03,.97)`, offset: .68 },
        { transform: 'translateY(3px) rotate(365deg) scale(1.04,.97)', offset: .88 },
        { transform: 'translateY(0) rotate(360deg) scale(1)', offset: 1 },
      ], { duration, easing: 'cubic-bezier(.37,0,.3,1)' }));
    }
    actionTimer = setTimeout(stopAction, duration);
  }

  function chooseTarget(now) {
    const b = bounds();
    target = { x: b.left + Math.random() * (b.right - b.left), y: b.top + Math.random() * (b.bottom - b.top) };
    nextTarget = now + 6500 + Math.random() * 6500;
  }

  function tick(now) {
    frame = 0;
    if (disposed || document.hidden || settings.hidden) return;
    const dt = previousTime ? (now - previousTime) / 1000 : 0;
    previousTime = now;
    if ((settings.swimming || destination) && (!reduced.matches || destination) && (!hover || destination) && (!focused || destination) && !menuOpen && !drag && pet.dataset.state === 'idle') {
      if (destination) target = destination;
      else if (now > nextTarget || Math.hypot(target.x - position.x, target.y - position.y) < 6) chooseTarget(now);
      const dx = target.x - position.x;
      if (Math.abs(dx) > 12) {
        facing = dx < 0 ? 1 : -1;
        direction.style.transform = `scaleX(${facing})`;
      }
      position = stepMotion(position, target, dt, 25);
      paint();
      if (destination && Math.hypot(target.x - position.x, target.y - position.y) < 6) {
        position = target;
        destination = null;
        nextTarget = now + 6500 + Math.random() * 6500;
        paint();
      }
      if (now - trailAt > 1100) {
        trailAt = now;
        bubble({ x: settings.size * (facing === 1 ? .87 : .13), y: settings.size * .52,
          dx: facing * (10 + Math.random() * 10), dy: -14 - Math.random() * 20, size: 3 + Math.random() * 3 });
      }
    }
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (!frame && !disposed && !document.hidden && !settings.hidden) { previousTime = 0; frame = requestAnimationFrame(tick); }
  }

  on(hit, 'click', event => {
    if (suppressClick && event.detail !== 0) { suppressClick = false; return; }
    interact();
  });
  on(hit, 'dblclick', event => {
    event.preventDefault();
    stopAction();
    clearParticles();
    turnAround();
  });
  on(pet, 'pointerenter', () => { hover = true; });
  on(pet, 'pointerleave', () => { hover = false; });
  on(pet, 'focusin', () => { focused = shadow.activeElement?.matches(':focus-visible') ?? false; });
  on(pet, 'focusout', () => { focused = false; });
  on(hit, 'keydown', event => {
    focused = true;
    const delta = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[event.key];
    if (!delta || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    position = clampPosition({ x: position.x + delta[0], y: position.y + delta[1] }, bounds());
    paint(); nextTarget = 0;
    if (menuOpen) placeMenu();
  });
  on(hit, 'contextmenu', event => { event.preventDefault(); setMenu(!menuOpen); });
  on(gear, 'click', () => setMenu(!menuOpen));
  on($('.close'), 'click', () => setMenu(false));
  on(document, 'pointerdown', event => {
    const path = event.composedPath();
    if (menuOpen && !path.includes(host)) setMenu(false, false);
    if (event.button !== 0 || !event.isPrimary || path.includes(host)) return;
    const hitsControl = path.some(node => node instanceof Element && node.matches('button, input, textarea, select, a, [contenteditable="true"], [role="button"], [role="textbox"]'));
    if (hitsControl) return;
    moveTo(event.clientX, event.clientY);
  });
  on(shadow, 'keydown', event => {
    if (event.key === 'Escape' && menuOpen) { event.preventDefault(); setMenu(false); }
  });
  on(slider, 'input', () => { settings.size = Number(slider.value); syncSettings(); save(); });
  on(swimming, 'change', () => { settings.swimming = swimming.checked; save(); start(); });
  on($('.hide'), 'click', () => {
    setMenu(false, false); settings.hidden = true; stopAction(); clearParticles();
    save(); syncSettings(); restore.focus({ preventScroll: true });
  });
  on(restore, 'click', event => {
    settings.hidden = false; hover = false; focused = false; save(); syncSettings();
    if (event.detail === 0) hit.focus({ preventScroll: true });
    start();
  });
  on(hit, 'pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary) return;
    suppressClick = false;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, start: { ...position }, moved: false };
    hit.setPointerCapture(event.pointerId);
  });
  on(hit, 'pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved) { stopAction(); clearParticles(); }
    drag.moved = true;
    position = clampPosition({ x: drag.start.x + dx, y: drag.start.y + dy }, bounds());
    paint();
    if (menuOpen) placeMenu();
  });
  const finishDrag = event => {
    if (!drag || event.pointerId !== drag.id) return;
    suppressClick = drag.moved || event.type === 'pointercancel';
    if (hit.hasPointerCapture(event.pointerId)) hit.releasePointerCapture(event.pointerId);
    drag = null; nextTarget = 0;
    // Do not freeze autonomous swimming just because a pointer click focused the button.
    if (event.pointerType !== '') { hit.blur(); focused = false; }
  };
  on(hit, 'pointerup', finishDrag);
  on(hit, 'pointercancel', finishDrag);
  on(hit, 'lostpointercapture', event => { if (drag && event.pointerId === drag.id) { suppressClick = drag.moved; drag = null; } });
  on(window, 'resize', () => { constrain(); if (menuOpen) placeMenu(); });
  on(document, 'visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frame); frame = 0; previousTime = 0; stopAction(); clearParticles();
    } else start();
  });
  on(reduced, 'change', () => { stopAction(); clearParticles(); start(); });
  on(window, 'storage', event => {
    if (event.key !== STORAGE_KEY) return;
    try { settings = normalizeSettings(JSON.parse(event.newValue)); syncSettings(); if (settings.hidden) setMenu(false, false); start(); } catch { /* Ignore corrupted external changes. */ }
  });

  syncSettings();
  start();

  // Provides an explicit cleanup for host integrations / development remounts.
  const dispose = () => {
    disposed = true; controller.abort(); cancelAnimationFrame(frame);
    stopAction(); clearParticles(); sidebarObserver.disconnect(); surfaceRefreshTimers.forEach(clearTimeout); sidebarStyle.remove(); background.remove();
    for (const node of document.querySelectorAll('[data-dsh-sidebar-tint="true"]')) node.removeAttribute('data-dsh-sidebar-tint');
    for (const node of document.querySelectorAll('[data-dsh-main-bg="true"]')) node.removeAttribute('data-dsh-main-bg');
    host.remove();
  };
  on(window, 'pagehide', event => { if (!event.persisted) dispose(); });
  host.whaleDispose = dispose;
  return dispose;
}
