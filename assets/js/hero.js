/* ==========================================================================
   Hero: sketch → photo brush reveal and the 3D ring of project cards.
   Depends on PROJECTS, openProject and reduceMotion from main.js.
   ========================================================================== */

(() => {
  const stage = document.querySelector('.hero-stage');
  const portrait = document.querySelector('.portrait');
  const ring = document.querySelector('.ring');
  if (!stage || !portrait || !ring) return;

  /* ---------- Sketch → photo, painted with a brush ----------
     The pointer lays textured brush dabs into an offscreen mask; every frame
     the mask fades a little, and the photo is drawn through it onto the
     visible canvas. So colour trails the cursor like wet paint and dries
     back to the sketch about two seconds after it stops. */
  const photo = portrait.querySelector('.portrait-photo');
  const paint = portrait.querySelector('.portrait-paint');
  const out = paint?.getContext('2d');
  const mask = document.createElement('canvas');
  const mctx = mask.getContext('2d');
  const FADE = 0.03; // mask alpha removed per frame: ~1.5s to dry at 60fps
  const IDLE_CLEAR = 150; // frames without input before wiping the 8-bit fade residue
  let brush = 0; // dab radius in canvas px
  let last = null; // previous pointer point, for filling gaps between events
  let idle = 0;
  let painting = 0; // rAF id while the paint loop runs

  // One bristly stamp, built once: soft core, ragged rim, streaks along x.
  // Dabs rotate to the stroke direction so the streaks read as bristles.
  const stamp = (() => {
    const s = document.createElement('canvas');
    s.width = s.height = 128;
    const c = s.getContext('2d');
    const g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(0.5, 'rgba(0,0,0,0.85)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 128, 128);
    c.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 280; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = 28 + Math.random() * 36;
      c.globalAlpha = 0.3 + Math.random() * 0.7;
      c.beginPath();
      c.arc(64 + Math.cos(a) * d, 64 + Math.sin(a) * d, 1 + Math.random() * 4, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 0.35;
    for (let i = 0; i < 16; i++) {
      const y = 14 + Math.random() * 100;
      c.lineWidth = 0.6 + Math.random() * 1.4;
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(128, y + (Math.random() - 0.5) * 8);
      c.stroke();
    }
    return s;
  })();

  function sizeCanvases() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(portrait.clientWidth * dpr);
    const h = Math.round(portrait.clientHeight * dpr);
    if (!w || !h || (paint.width === w && paint.height === h)) return;
    paint.width = mask.width = w;
    paint.height = mask.height = h;
    brush = w * 0.13;
  }

  function toCanvas(e) {
    const r = portrait.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * paint.width, y: ((e.clientY - r.top) / r.height) * paint.height };
  }

  function dab(x, y, angle) {
    const size = brush * (0.85 + Math.random() * 0.3) * 2;
    mctx.save();
    mctx.translate(x + (Math.random() - 0.5) * brush * 0.15, y + (Math.random() - 0.5) * brush * 0.15);
    mctx.rotate(angle + (Math.random() - 0.5) * 0.3);
    mctx.drawImage(stamp, -size / 2, -size / 2, size, size);
    mctx.restore();
  }

  function stroke(e) {
    if (!out || portrait.classList.contains('is-revealed')) return;
    sizeCanvases();
    const p = toCanvas(e);
    const from = last || p;
    const dx = p.x - from.x;
    const dy = p.y - from.y;
    const angle = Math.atan2(dy, dx);
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / (brush * 0.22)));
    for (let i = 1; i <= steps; i++) dab(from.x + (dx * i) / steps, from.y + (dy * i) / steps, angle);
    last = p;
    idle = 0;
    if (!painting) painting = requestAnimationFrame(frame);
  }

  function frame() {
    // Dry the mask a little.
    mctx.globalCompositeOperation = 'destination-out';
    mctx.fillStyle = `rgba(0,0,0,${FADE})`;
    mctx.fillRect(0, 0, mask.width, mask.height);
    mctx.globalCompositeOperation = 'source-over';
    if (++idle > IDLE_CLEAR) mctx.clearRect(0, 0, mask.width, mask.height);

    // Photo through the mask (object-fit: contain, anchored bottom like the <img>).
    out.globalCompositeOperation = 'source-over';
    out.clearRect(0, 0, paint.width, paint.height);
    out.drawImage(mask, 0, 0);
    if (photo.naturalWidth) {
      const s = Math.min(paint.width / photo.naturalWidth, paint.height / photo.naturalHeight);
      const w = photo.naturalWidth * s;
      const h = photo.naturalHeight * s;
      out.globalCompositeOperation = 'source-in';
      out.drawImage(photo, (paint.width - w) / 2, paint.height - h, w, h);
    }

    painting = idle > IDLE_CLEAR ? 0 : requestAnimationFrame(frame);
  }

  if (out) {
    portrait.addEventListener('pointermove', stroke);
    portrait.addEventListener('pointerdown', e => { last = null; stroke(e); });
    ['pointerleave', 'pointerup', 'pointercancel'].forEach(t =>
      portrait.addEventListener(t, () => { last = null; }),
    );
    new ResizeObserver(sizeCanvases).observe(portrait);
  }
  // Click keeps the whole photo; click again to go back to painting.
  portrait.addEventListener('click', () => portrait.classList.toggle('is-revealed'));

  /* ---------- 3D project ring ---------- */
  const cards = PROJECTS.map(p => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'ring-card';
    card.tabIndex = -1; // duplicate of the Work list, which is the keyboard path
    card.dataset.id = p.id;
    card.innerHTML = `<img src="${p.thumb}" alt="" loading="lazy" draggable="false"><span>${p.title}</span>`;
    ring.appendChild(card);
    return card;
  });

  const step = 360 / cards.length;
  let radius = 0;
  let angle = 0;
  let velocity = 0; // deg per frame, from drag flicks
  const AUTO_SPEED = reduceMotion ? 0 : 0.1; // deg per frame, ~6°/s at 60fps

  function layout() {
    const w = stage.clientWidth;
    const cardW = Math.round(Math.min(190, Math.max(120, w * 0.3)));
    radius = Math.round(Math.min(360, w * 0.5));
    stage.style.setProperty('--card-w', `${cardW}px`);
    render();
  }

  function render() {
    ring.style.transform = `rotateX(-10deg) rotateY(${angle}deg)`;
    cards.forEach((card, i) => {
      const a = i * step;
      // Orbit, then turn back to face the viewer so text never shows mirrored.
      card.style.transform = `rotateY(${a}deg) translateZ(${radius}px) rotateY(${-a - angle}deg)`;
      // Dim cards on the far side to read as depth.
      const facing = Math.cos(((a + angle) * Math.PI) / 180);
      card.style.opacity = (0.35 + 0.65 * (facing + 1) / 2).toFixed(2);
    });
  }

  /* Drag to spin, with inertia. A press that barely moves is a click. */
  let dragging = false;
  let moved = 0;
  let lastX = 0;

  ring.addEventListener('pointerdown', e => {
    const card = e.target.closest('.ring-card');
    if (!card) return;
    dragging = true;
    moved = 0;
    lastX = e.clientX;
    velocity = 0;
    card.setPointerCapture(e.pointerId);
    ring.classList.add('is-dragging');
  });

  ring.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    moved += Math.abs(dx);
    angle += dx * 0.35;
    velocity = dx * 0.35;
    render();
  });

  function endDrag() {
    dragging = false;
    ring.classList.remove('is-dragging');
  }
  ring.addEventListener('pointerup', endDrag);
  ring.addEventListener('pointercancel', () => {
    endDrag();
    velocity = 0;
  });

  ring.addEventListener('click', e => {
    const card = e.target.closest('.ring-card');
    if (!card || moved > 5) return;
    // Return focus to the matching Work row when the modal closes.
    const row = document.querySelector(`.project-row[data-id="${card.dataset.id}"]`);
    openProject(card.dataset.id, row);
  });

  /* Animation loop: runs only while the hero is on screen. Auto-rotate cycles
     all six projects past the viewer without interaction, and holds still
     while the pointer is over the stage so a card can be read or clicked. */
  let visible = true;
  let hovering = false;
  let rafId = 0;
  stage.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hovering = true; });
  stage.addEventListener('pointerleave', () => { hovering = false; });

  function tick() {
    const auto = hovering ? 0 : AUTO_SPEED;
    if (!dragging && (velocity || auto)) {
      velocity *= 0.94;
      if (Math.abs(velocity) < 0.01) velocity = 0;
      angle += velocity + auto;
      render();
    }
    rafId = visible ? requestAnimationFrame(tick) : 0;
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !rafId) rafId = requestAnimationFrame(tick);
  }).observe(stage);

  window.addEventListener('resize', layout, { passive: true });
  layout();
})();
