/* ==========================================================================
   Steven Alexander Grant — Portfolio
   Vanilla JS, no dependencies.
   Add a project by appending one object to PROJECTS and dropping two images
   into assets/img/projects/. Nothing else needs to change.
   ========================================================================== */

const PROJECTS = [
  {
    id: 'logistics',
    title: 'B2B Logistics Tracking Platform',
    role: 'Lead Software Engineer',
    period: 'Mar 2022 — Mar 2025',
    summary:
      'A live fleet management platform that replaced paper logs and WhatsApp check-ins for a working logistics operation.',
    tags: ['Laravel', 'MySQL', 'Responsive UI'],
    thumb: 'assets/img/projects/sanlogistic-thumb.png',
    hero: 'assets/img/projects/sanlogistic-hero.png',
    body: [
      {
        type: 'p',
        text: 'This started as a client running their entire fleet on paper logs and group chats. Drivers reported mileage by message, fuel receipts arrived as photos, and nobody could answer a simple question like how much a single route actually cost. I was brought in to build the system that replaced all of it, and stayed on for three years maintaining and extending it.',
      },
      { type: 'h', text: 'What I built' },
      {
        type: 'p',
        text: 'A Laravel and MySQL web application with a centralised admin dashboard giving real-time oversight of driver activity, odometer readings, fuel consumption, and toll expenses. Operations staff could finally see the fleet as a whole rather than as a pile of individual reports.',
      },
      {
        type: 'p',
        text: 'The interface was built mobile-responsive from the start, and not as an afterthought — the primary users were drivers submitting entries from their phones at truck stops, often on poor connections. That constraint drove most of the front-end decisions: lightweight pages, forgiving forms, and as few round trips as possible.',
      },
      { type: 'h', text: 'Outcome' },
      {
        type: 'p',
        text: 'The platform ran in production for over 20 active drivers across the full three years. Its real value was less the tracking itself than the fact that expense reconciliation stopped being a manual monthly exercise.',
      },
    ],
    stack: {
      Backend: ['Laravel', 'PHP', 'MySQL'],
      Frontend: ['Blade', 'JavaScript', 'Responsive CSS'],
      Practice: ['Requirements gathering', 'Production maintenance'],
    },
    links: [],
  },
  {
    id: 'companion-animal',
    title: 'Companion Animal Records',
    role: 'Undergraduate Thesis',
    period: '2024 — 2025',
    summary:
      'Digitalisation of companion animal data storage and vaccination history, built and defended as a final-year thesis.',
    tags: ['Full-stack', 'Database design', 'Research'],
    thumb: 'assets/img/projects/peta-thumb.png',
    hero: 'assets/img/projects/peta-hero.png',
    body: [
      {
        type: 'p',
        text: 'Veterinary records for companion animals are still largely paper-based, which means vaccination histories get lost between clinics, between owners, and between moves. A missing record often means a repeated vaccine or a missed booster.',
      },
      { type: 'h', text: 'What I built' },
      {
        type: 'p',
        text: 'An application for storing companion animal data and vaccination history in a structured, queryable form — modelling animals, owners, clinics, and immunisation events so that a history stays intact as it moves between them.',
      },
      { type: 'h', text: 'Why it mattered' },
      {
        type: 'p',
        text: 'The thesis contributed to graduating with high academic distinction at a GPA of 3.84 out of 4.00. More usefully, it was the project where I had to defend design decisions rather than just ship them — the data model went through several revisions before it held up under questioning.',
      },
    ],
    stack: {
      Backend: ['Laravel', 'PHP', 'MySQL'],
      Frontend: ['Blade', 'JavaScript', 'Responsive CSS'],
    },
    links: [],
  },
  {
    id: 'pisn',
    title: 'Penomoran Ijazah Dan Sertifikat Profesi Nasional',
    role: 'Programmer',
    period: '2023 — 2024',
    summary:
      'A national-scale platform developed to standardize and verify the numbering of university diplomas and professional certificates across Indonesia.',
    tags: ['Full-stack', 'Database design', 'Code Review'],
    thumb: 'assets/img/projects/pisn-thumb.png',
    hero: 'assets/img/projects/pisn-hero.png',
    body: [
      {
        type: 'p',
        text: 'The Ministry required a centralized, highly secure system to issue and validate National Diploma Numbers (PIN). The goal was to ensure the authenticity of academic credentials, prevent forgery, and synchronize data across various national university databases.',
      },
      { type: 'h', text: 'What I built' },
      {
        type: 'p',
        text: 'I contributed to the full-stack development using Laravel and MySQL. My role focused heavily on ensuring the database architecture could handle complex verification workflows and massive data integrations from external institutional systems.',
      },
      { type: 'h', text: 'Why it mattered' },
      {
        type: 'p',
        text: 'The platform successfully standardized certificate numbering nationwide. It provided a reliable, automated pipeline for academic verification, significantly reducing manual administrative overhead and improving the legal validation process of professional credentials.',
      },
    ],
    stack: {
      Backend: ['Laravel', 'PHP', 'MySQL'],
      Frontend: ['Blade', 'JavaScript', 'Responsive CSS'],
    },
    links: [{ label: 'Live Site', href: 'https://piln.kemdiktisaintek.go.id' }],
  },
  {
    id: 'piln',
    title: 'Penyetaraan Ijazah Luar Negeri',
    role: 'Programmer',
    period: '2022 — 2023',
    summary:
      'A digital service platform facilitating the equivalence evaluation and verification of foreign academic degrees for Indonesian citizens.',
    tags: ['Full-stack', 'Database design', 'Code Review'],
    thumb: 'assets/img/projects/piln-thumb.png',
    hero: 'assets/img/projects/piln-hero.png',
    body: [
      {
        type: 'p',
        text: 'Returning students needed a streamlined, transparent way to get their foreign degrees formally recognized by the Indonesian government for employment and education purposes. The legacy process was highly manual and prone to document bottlenecks.',
      },
      { type: 'h', text: 'What I built' },
      {
        type: 'p',
        text: 'I helped develop a secure portal using Laravel and MySQL to handle digital document submissions, administrative review workflows, and automated equivalency tracking. I ensured the frontend was accessible and intuitive for applicants while providing robust tracking tools for government reviewers.',
      },
      { type: 'h', text: 'Why it mattered' },
      {
        type: 'p',
        text: 'The system dramatically reduced processing times for degree equivalency. It transitioned a heavily paper-based administrative task into an efficient, paperless review pipeline, greatly improving the user experience for returning graduates.',
      },
    ],
    stack: {
      Backend: ['Laravel', 'PHP', 'MySQL'],
      Frontend: ['Blade', 'JavaScript', 'Responsive CSS'],
    },
    links: [{ label: 'Live Site', href: 'https://pisn.kemdiktisaintek.go.id' }],
  },
  {
    id: 'ada',
    title: 'Binus Alumni Dashboard',
    role: 'Programmer',
    period: '2024 — 2025',
    summary:
      'A centralized portal for university alumni to manage their professional profiles, access career resources, and maintain active engagement with the institution.',
    tags: ['Full-stack', 'Database design', 'Research'],
    thumb: 'assets/img/projects/ada-thumb.png',
    hero: 'assets/img/projects/ada-hero.png',
    body: [
      {
        type: 'p',
        text: 'The university needed a dedicated, modern space to maintain long-term relationships with its graduates. The goal was to facilitate continuous networking, streamline job placements, and track post-graduation employment metrics.',
      },
      { type: 'h', text: 'What I built' },
      {
        type: 'p',
        text: 'I developed highly interactive user interfaces using ReactJS and Material UI (MUI), ensuring a smooth, responsive experience. These were connected to a robust .NET Core and SQL Server backend to handle profile management, event registrations, and real-time institutional announcements.',
      },
      { type: 'h', text: 'Why it mattered' },
      {
        type: 'p',
        text: 'The dashboard successfully bridged the communication gap between the university and its alumni. It fostered a stronger community network and provided the institution with valuable, structured data insights into graduate career trajectories.',
      },
    ],
    stack: {
      Backend: ['.Net', 'SQL Server'],
      Frontend: ['ReactJS', 'MUI'],
    },
    links: [{ label: 'Live Site', href: 'https://ada.apps.binus.ac.id' }],
  },
  {
    id: 'bicar',
    title: 'Binus Career',
    role: 'Programmer',
    period: '2025 — 2026',
    summary:
      'An enterprise-scale career portal and recruitment platform supporting over 150,000 active users, connecting students with top industry employers.',
    tags: ['Full-stack', 'Database design', 'Code Review'],
    thumb: 'assets/img/projects/career-thumb.png',
    hero: 'assets/img/projects/career-hero.png',
    body: [
      {
        type: 'p',
        text: 'The institution required a highly scalable ecosystem to manage job postings, student applications, and B2B corporate partnerships. The system also needed to handle massive data synchronization between existing internal databases and external platforms without affecting performance.',
      },
      { type: 'h', text: 'What I built' },
      {
        type: 'p',
        text: 'I led the end-to-end development of the platform using ReactJS on the frontend and C# .NET on the backend. My most critical contribution was engineering a custom, multithreaded asynchronous backend engine capable of seamlessly syncing 2.7 million complex records without blocking main execution threads.',
      },
      { type: 'h', text: 'Why it mattered' },
      {
        type: 'p',
        text: 'The optimized architecture entirely eliminated critical data bottlenecks. The platform now securely and efficiently handles high-traffic recruitment cycles and B2B payment integrations, serving as the stable primary career bridge for over 150,000 users.',
      },
    ],
    stack: {
      Backend: ['.Net', 'SQL Server'],
      Frontend: ['ReactJS'],
      Focus: ['Schema design', 'CRUD workflows'],
    },
    links: [{ label: 'Live Site', href: 'https://career.apps.binus.edu' }],
  },
];

/* ---------- Project list + modal ---------- */
const listEl = document.getElementById('project-list');
const modal = document.getElementById('project-modal');

function placeholderThumb(title) {
  // Inline SVG stand-in so rows look intentional before real screenshots land.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
    <rect width="320" height="200" fill="#F5F3EF"/>
    <rect x="16" y="16" width="288" height="168" rx="10" fill="none" stroke="#E4DFD6" stroke-dasharray="7 6"/>
    <circle cx="160" cy="92" r="26" fill="none" stroke="#D97706" stroke-width="2"/>
    <path d="M150 92h20M160 82v20" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
    <text x="160" y="140" font-family="Arial,sans-serif" font-size="11" fill="#6B6459" text-anchor="middle">screenshot pending</text>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function renderList() {
  if (!listEl) return;

  listEl.innerHTML = PROJECTS.map(
    (p, i) => `
    <li>
      <button class="project-row" type="button" data-id="${p.id}"
              aria-haspopup="dialog" aria-label="Open details for ${p.title}">
        <span class="project-thumb">
          <img src="${p.thumb}" alt="" loading="lazy"
               onerror="this.onerror=null;this.src='${placeholderThumb(p.title)}'">
        </span>
        <span class="project-info">
          <span class="project-num">${String(i + 1).padStart(2, '0')} / ${p.role}</span>
          <span class="project-title">${p.title}</span>
          <span class="project-summary">${p.summary}</span>
          <span class="tag-row">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</span>
        </span>
        <span class="project-open" aria-hidden="true">&#8599;</span>
      </button>
    </li>
  `,
  ).join('');

  listEl.querySelectorAll('.project-row').forEach(btn => {
    btn.addEventListener('click', () => openProject(btn.dataset.id, btn));
  });
}

let lastFocused = null;

function openProject(id, trigger) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p || !modal) return;

  lastFocused = trigger || document.activeElement;

  const img = document.getElementById('modal-img');
  img.src = p.hero;
  img.alt = p.title;
  img.onerror = () => {
    img.onerror = null;
    img.src = placeholderThumb(p.title);
  };

  document.getElementById('modal-meta').textContent = `${p.role} · ${p.period}`;
  document.getElementById('modal-title').textContent = p.title;

  document.getElementById('modal-text').innerHTML = p.body
    .map(b => (b.type === 'h' ? `<h4>${b.text}</h4>` : `<p>${b.text}</p>`))
    .join('');

  document.getElementById('modal-stack').innerHTML = Object.entries(p.stack)
    .map(
      ([label, items]) => `
      <div class="stack-group">
        <span class="stack-label">${label}</span>
        ${items.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>`,
    )
    .join('');

  document.getElementById('modal-links').innerHTML = (p.links || [])
    .map(
      l =>
        `<a class="btn btn-ghost" href="${l.href}" target="_blank" rel="noopener">${l.label} <span class="arrow" aria-hidden="true">&#8599;</span></a>`,
    )
    .join('');

  // Measure the scrollbar before hiding it, so locking the page behind the
  // modal doesn't shift the layout sideways.
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.setProperty('--sbw', sbw + 'px');
  document.body.classList.add('modal-open');

  modal.showModal();
  // Two possible scroll containers depending on breakpoint: the wrapper on
  // narrow screens, the text column once the layout goes side-by-side.
  modal.querySelector('.modal-inner').scrollTop = 0;
  modal.querySelector('.modal-body').scrollTop = 0;
}

if (modal) {
  modal
    .querySelector('.modal-close')
    .addEventListener('click', () => modal.close());

  // Click the backdrop (i.e. outside the dialog box) to dismiss.
  modal.addEventListener('click', e => {
    const r = modal.getBoundingClientRect();
    const inside =
      e.clientX >= r.left &&
      e.clientX <= r.right &&
      e.clientY >= r.top &&
      e.clientY <= r.bottom;
    if (!inside) modal.close();
  });

  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('--sbw');
    if (lastFocused) lastFocused.focus();
  });
}

/* ---------- Theme ---------- */
const root = document.documentElement;
const stored = (() => {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
})();
if (stored === 'dark' || stored === 'light')
  root.setAttribute('data-theme', stored);

document.querySelector('.theme-toggle')?.addEventListener('click', () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current =
    root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';

  root.setAttribute('data-theme', next);
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* private mode */
  }

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', next === 'dark' ? '#100E0A' : '#FCFBF9');
});

/* ---------- Mobile menu ---------- */
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function setMenu(open) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !open;
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

// Close after choosing a destination, on Esc, and on click-away.
mobileMenu?.addEventListener('click', e => {
  if (e.target.tagName === 'A') setMenu(false);
});
document.addEventListener('keydown', e => {
  if (
    e.key === 'Escape' &&
    menuToggle?.getAttribute('aria-expanded') === 'true'
  ) {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', e => {
  if (!mobileMenu || mobileMenu.hidden) return;
  if (!e.target.closest('.nav-wrap')) setMenu(false);
});

/* ---------- Scroll reveal ---------- */
const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

/* ---------- Snappy anchor scrolling ---------- */
/* Native `scroll-behavior: smooth` doesn't allow controlling speed, and its
   default timing feels slow over the page's full height. This replaces it
   with a short, fixed-duration animation so anchor jumps feel immediate. */
const NAV_OFFSET = 110; // matches html's scroll-padding-top

function smoothScrollTo(targetY, duration = 420) {
  const startY = window.scrollY;
  const diff = targetY - startY;

  if (reduceMotion || Math.abs(diff) < 2) {
    window.scrollTo(0, targetY);
    return;
  }

  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    window.scrollTo(0, startY + diff * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute('href');
  if (id.length < 2) return; // bare "#", nothing to scroll to

  const target = document.querySelector(id);
  if (!target) return;

  e.preventDefault();
  const targetY = Math.max(
    target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
    0,
  );
  smoothScrollTo(targetY);
  history.pushState(null, '', id);
});

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
);

function observeReveals() {
  document.querySelectorAll('.reveal:not(.is-in)').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    revealObserver.observe(el);
  });
}

/* ---------- Stat counters ---------- */
const statObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.6 },
);

function countUp(el) {
  const to = parseFloat(el.dataset.to);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';

  if (reduceMotion) {
    el.textContent = to.toFixed(decimals) + suffix;
    return;
  }

  const duration = 1400;
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = (to * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- Active nav link ---------- */
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => {
        a.classList.toggle(
          'is-active',
          a.getAttribute('href') === `#${entry.target.id}`,
        );
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px' },
);

sections.forEach(s => navObserver.observe(s));

/* ---------- Contact form ---------- */
/* Sends via EmailJS straight from the browser once configured below; a
   PHP guard (guard.php) checks the visitor's IP against a rate limit
   first so the same person can't resend endlessly. Until EmailJS is
   configured, or if JS is off, it falls back to a normal POST to
   contact.php, which enforces the same limit server-side. */

// Sign up free at https://www.emailjs.com, add an Email Service and a
// Template (see README "Contact form" section), then paste the three IDs
// below. Leave them as-is to keep using the contact.php fallback.
const EMAILJS_PUBLIC_KEY = 'QPgUKMhUrvn886pSh';
const EMAILJS_SERVICE_ID = 'service_jucbze8';
const EMAILJS_TEMPLATE_ID = 'template_riy4l7r';
const EMAILJS_READY =
  EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
  EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
  EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';

if (EMAILJS_READY && window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

function setStatus(text, state) {
  if (!formStatus) return;
  formStatus.textContent = text;
  formStatus.classList.remove('is-ok', 'is-error');
  if (state) formStatus.classList.add(state);
}

contactForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const honeypot = contactForm.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) return; // bot filled the trap, drop silently

  const submit = document.getElementById('cf-submit');
  const original = submit.innerHTML;

  submit.disabled = true;
  submit.textContent = 'Sending…';
  setStatus('');

  try {
    if (EMAILJS_READY && window.emailjs) {
      // Server-side IP check first — EmailJS itself has no way to know
      // this visitor already sent three messages in the last half hour.
      const guardRes = await fetch('guard.php', {
        method: 'POST',
        headers: { 'X-Requested-With': 'fetch' },
      });
      const guard = await guardRes
        .json()
        .catch(() => ({ ok: true, message: '' }));

      if (!guard.ok) {
        setStatus(
          guard.message ||
            'Please wait a moment before sending another message.',
          'is-error',
        );
        return;
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        message: contactForm.message.value,
      });

      contactForm.reset();
      setStatus('Thanks — your message has been sent.', 'is-ok');
    } else {
      // EmailJS not configured yet — contact.php enforces the same IP
      // limit itself, so this path is guarded too.
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'X-Requested-With': 'fetch' },
      });

      // A host without PHP returns the file's source or a 404 rather than JSON.
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('The form endpoint did not respond correctly.');
      }

      if (data.ok) {
        contactForm.reset();
        setStatus(
          data.message || 'Thanks — your message has been sent.',
          'is-ok',
        );
      } else {
        setStatus(
          data.message || 'Something went wrong. Please try again.',
          'is-error',
        );
      }
    }
  } catch (err) {
    setStatus(
      'Could not send right now — please email me directly instead.',
      'is-error',
    );
  } finally {
    submit.disabled = false;
    submit.innerHTML = original;
  }
});

// Surface the no-JS redirect result (contact.php sends ?sent=1 / ?sent=0).
const sent = new URLSearchParams(location.search).get('sent');
if (sent === '1') setStatus('Thanks — your message has been sent.', 'is-ok');
if (sent === '0')
  setStatus('Something went wrong. Please email me directly.', 'is-error');

/* ---------- Magnetic buttons ---------- */
function initMagnetic() {
  if (reduceMotion || window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

/* ---------- Hero parallax ---------- */
function initParallax() {
  const name = document.querySelector('.hero-name');
  // Target the <img>, not .hero-portrait: that element runs an entrance
  // animation with fill-mode forwards, which would outrank an inline transform.
  const portrait = document.querySelector('.hero-portrait img');
  if (!name || !portrait || reduceMotion) return;
  if (window.innerWidth < 900) return;

  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          name.style.transform = `translateY(${y * 0.18}px)`;
          portrait.style.transform = `translateY(${y * -0.05}px)`;
        }
        ticking = false;
      });
    },
    { passive: true },
  );
}

/* ---------- Boot ---------- */
renderList();
observeReveals();
document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));
initMagnetic();
initParallax();
