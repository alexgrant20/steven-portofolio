/* ==========================================================================
   Hero: sketch → photo reveal and the 3D ring of project cards.
   Depends on PROJECTS, openProject and reduceMotion from main.js.
   ========================================================================== */

(() => {
  const stage = document.querySelector('.hero-stage');
  const portrait = document.querySelector('.portrait');
  const ring = document.querySelector('.ring');
  if (!stage || !portrait || !ring) return;

  /* ---------- Sketch → photo reveal ---------- */
  // The photo layer is masked by a circle at (--mx, --my); radius --r is
  // animated in CSS via the .is-active / .is-revealed classes.
  function moveMask(e) {
    const r = portrait.getBoundingClientRect();
    portrait.style.setProperty('--mx', `${e.clientX - r.left}px`);
    portrait.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  portrait.addEventListener('pointerenter', e => {
    moveMask(e);
    portrait.classList.add('is-active');
  });
  portrait.addEventListener('pointermove', moveMask);
  portrait.addEventListener('pointerdown', e => {
    moveMask(e);
    portrait.classList.add('is-active');
  });
  ['pointerleave', 'pointercancel'].forEach(type =>
    portrait.addEventListener(type, () => portrait.classList.remove('is-active')),
  );
  // Touch: lifting the finger ends the reveal, like leaving with a mouse.
  portrait.addEventListener('pointerup', e => {
    if (e.pointerType !== 'mouse') portrait.classList.remove('is-active');
  });
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
