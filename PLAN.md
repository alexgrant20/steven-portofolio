# Portfolio Plan — Steven Alexander Grant

> **Status: built.** This document is the design record; the site now lives in
> `index.html`, `assets/css/styles.css`, and `assets/js/main.js`. See `README.md`
> for editing and deployment, and for the three assets still outstanding.

## Context
Build a personal portfolio site from scratch, sourced from the CV
(`Resume_Steven.pdf`). Goal: **simple but aesthetic** — a single-page site that
reads fast, looks considered, and needs no build tooling. Target audience is
recruiters and engineering managers who will skim for 30 seconds before deciding
to read properly.

Constraints given by the user:
- Stack: plain **HTML / CSS / JS** (no framework, no build step)
- Hosting: **private hosting** (own server / shared host) — so the output must be
  a folder of static files that can be uploaded via FTP/SFTP and served by any
  Apache or Nginx setup
- Content: derived from the CV, no placeholder lorem

---

## 1. Design direction

Reference: three portfolio shots supplied by the user (Dymas Alfin, Binjan, Madison).
The shared formula across all three, and what this build adopts:

1. A **cut-out portrait** — background fully removed — as the hero centerpiece
2. The name set **oversized**, with the portrait layered *between* type layers:
   headline behind the head, secondary type in front at the bottom
3. A **warm ground** (Binjan's cream, Madison's peach gradient) — the amber palette
   already chosen sits exactly here
4. An **"Available for…" pill** with a live colored dot
5. **Pill-shaped buttons with ↗ arrows**, dark on light, in a floating nav bar

**Adaptation note.** All three references are *designer* portfolios — they sell
personality, and their content is thin by design ("Service [4]", "190+ Happy
Clients"). This site borrows the visual language but keeps engineering substance
underneath: a real experience timeline and project detail modals. Freelance-style
client-count sections are dropped; the stat row instead carries facts from the CV.

### Type

| Role | Face | Use |
|---|---|---|
| Display | **Archivo** (variable, weights 400–900, Expanded widths) | The giant hero name, section headings, project numbers |
| Body | **Inter** | Everything else |
| Accent *(optional)* | **Instrument Serif**, italic | One or two words only — the Madison "*Hey, there*" move |

Display sizing is fluid: `clamp(3rem, 13vw, 11rem)` for the hero name, tight
tracking (`-0.04em`), line-height 0.85 so the two lines nearly touch.

### Palette (locked, unchanged)

```
Light   bg #FCFBF9   surface #F5F3EF   text #17150F   muted #6B6459   accent #D97706
Dark    bg #100E0A   surface #1A1712   text #EDEAE4   muted #9A9287   accent #F59E0B
```

Amber's job expands slightly from the earlier plan: it now also drives the soft
radial gradient wash behind the portrait (Madison's peach halo), plus links, the
primary CTA, section rules, and timeline markers. Still never a large flat fill.

### Motion

The first reference is titled "Animations" — motion is part of the design, not
decoration. All of it is CSS transitions plus a little vanilla JS, no library:

- **Load**: hero name animates in word-by-word (staggered `translateY` + fade,
  ~60ms apart), portrait fades and scales from 0.96, nav pills cascade in last
- **Availability dot**: slow pulse via `@keyframes`
- **Buttons**: magnetic hover — the pill translates a few px toward the cursor;
  the ↗ arrow slides up-right on hover
- **Scroll**: sections reveal on `IntersectionObserver`; the hero name drifts
  slightly on scroll (cheap parallax via `transform`, no scroll-jacking)
- **Project rows**: image scales up subtly, row background warms on hover
- All of it inside `@media (prefers-reduced-motion: reduce)` guards that cut
  transforms down to plain fades

### Structural motifs

- **Floating nav bar**: rounded pill container, `position: sticky`, translucent
  with `backdrop-filter: blur()`. Left: availability pill. Center: anchor links
  with bracketed counts, Dymas-style — `Work [2]`, `Experience [4y]`. Right: a
  dark `Let's Talk ↗` pill.
- **Card-on-ground frame**: the page content sits on an inset rounded card over a
  warm ground, as in the Dymas shot. Applied to the hero only, not the whole page
  — full-page framing eats horizontal space badly on mobile.
- **Stat row** below the hero, adapting Binjan's counters to real CV facts:
  `4 yrs experience · 150k+ alumni served · 2.7M+ records synced · 3.84/4.00 GPA`.
  Numbers count up once on scroll into view.

### The one hard dependency

**This design does not work without a background-removed portrait.** The cut-out
is the entire trick in all three references — a square photo in a rounded box
produces something completely different and much flatter. Needed: a PNG with
transparent background, shot from roughly chest up, facing camera, ideally 1200px+
tall. remove.bg or Photoshop's subject-select both do this in a minute. The build
ships a silhouette placeholder so layout and animation are correct before the real
file lands, but this is the blocking asset for the look you picked.

---

## 2. Site structure (single page, anchor nav)

1. **Hero** — a three-layer z-stack, not a two-column split:
   - *back*: `STEVEN` outlined (`-webkit-text-stroke`, transparent fill) +
     `GRANT` solid black, the Dymas split-weight move, set enormous
   - *middle*: the cut-out portrait, centered, overlapping the name's baseline so
     the head occludes the type — sitting on a soft amber radial wash
   - *front*: bottom-left role block — "Senior Programmer", the one-line CV
     positioning, and a dark `Let's collaborate ↗` pill; bottom-right a stack of
     pill links (LinkedIn, Email, Download CV)

   Below it, the stat row (see §1). On mobile the stack degrades gracefully: name
   above, portrait below, role block beneath that, socials become a horizontal row.
2. **About** — 3–4 sentences: the CV summary expanded, including the notable
   detail of 2.5 years full-time work concurrent with the CS degree (GPA 3.84).
3. **Experience** — vertical timeline, three roles at Bina Nusantara IT Division:
   - Senior Programmer (Apr 2026 – Present) — BINUS Career portal, 150k+ alumni ATS;
     B2B checkout + voucher engine; SNAP VA BCA payment gateway; Hangfire + Meta API
     scheduler; led 4 engineers
   - Programmer (Apr 2024 – Apr 2026) — Alumni Dashboard (React/TS/.NET), Excel bulk
     processing with multi-stage approvals; CI/CD stabilization in GitHub Actions
   - Junior Programmer (Sep 2022 – Apr 2024) — PILN & PISN national systems; Laravel
     graduation-eligibility engine syncing 2.7M+ records with PDDIKTI; RBAC workflow
   Each entry: role, org, dates, 2–4 tight bullets. Collapse older bullets behind a
   "show more" if the section gets long.
4. **Projects** — a **vertical list**, not a grid. Each row is a full-width card:
   thumbnail image on the left (16:10, ~200px wide), title + one-line summary +
   3–4 tech tags on the right. Rows stack to image-above-text below 768px.
   The whole row is clickable and opens a **detail view**.

   *Detail view* — a native `<dialog>` modal, opened with `showModal()`:
   - larger hero image of the project at the top
   - long-form description: the problem, what was built, decisions made, outcome
   - full tech stack as tagged chips, grouped (frontend / backend / infra)
   - optional links row (live site / repo) — omitted per project if not applicable
   - closes on the × button, `Esc`, and backdrop click; `<dialog>` handles focus
     trapping and inert-background natively, so this needs no library and no
     custom focus management

   *Data shape* — because each project now carries a long description, the content
   moves out of hand-written markup into a `PROJECTS` array at the top of
   `main.js`. One object per project (`id`, `title`, `summary`, `thumb`, `hero`,
   `tags`, `body`, `links`). The list rows and the modal both render from it, so a
   new project means adding one object and one image — nothing else. This is the
   one place a data layer earns its keep.

   *Seed content:*
   - **B2B Logistics Tracking Platform** — Laravel, MySQL. Live fleet management for
     20+ drivers; digitized manual workflows into an admin dashboard tracking
     mileage (ODO), fuel, and toll expenses; mobile-responsive for on-the-go use.
     Ran Mar 2022 – Mar 2025 as lead engineer.
   - **Companion Animal Records** (thesis) — digitalization of pet data storage and
     vaccination history.

   Two rows read fine as a list, where two cards in a grid would look sparse — this
   is part of why the list works better here.

5. **Skills** — grouped chips: Languages (C#, PHP, TypeScript, JavaScript, SQL),
   Frameworks (.NET, Laravel, React, Next.js, Node), Databases (SQL Server, MySQL,
   PostgreSQL), DevOps (Git, GitHub Actions, Docker, Hangfire, REST, SSL).
   No skill-level bars — they read as filler.
6. **Education & Certification** — BINUS University, BCS 2020–2025, GPA 3.84,
   thesis title; Docker & Kubernetes course (in progress, Aug 2026).
7. **Contact / Footer** — email, phone, LinkedIn, location (West Jakarta).
   `mailto:` link, no form (a form needs a backend; private hosting may not have PHP mail configured).

---

## 3. File structure

```
Portofolio/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/            # headshot, project thumbs + hero shots, favicon
│   │   ├── portrait.png    # background-removed cut-out — see §1
│   │   └── projects/   # <id>-thumb.jpg and <id>-hero.jpg per project
│   └── Steven_Alexander_Grant_CV.pdf
├── .htaccess           # only if Apache: gzip, cache headers, force HTTPS
└── README.md           # how to edit content + how to deploy
```

Content lives directly in `index.html` for every section **except Projects**, which
renders from the `PROJECTS` array in `main.js` (see §2.4). For a site this size, one
file you can Ctrl-F beats a template loop — but project detail bodies are too long
to keep readable inline, and they need to appear in two places (row + modal).

`styles.css` organized as: reset → custom properties (light + dark) → base type →
layout primitives → section styles → responsive breakpoints (single breakpoint at
768px; the layout is mostly one column anyway).

`main.js` is a handful of small functions, no dependencies:
- the `PROJECTS` data array
- render project rows, and open/close the `<dialog>` detail modal
- theme toggle + `localStorage` persistence
- `IntersectionObserver` scroll reveal
- active-section highlighting in the nav

---

## 4. Build order

1. **Scaffold** — `index.html` skeleton with all sections and real CV content, unstyled.
   Getting the words right first prevents designing around the wrong content.
2. **Design tokens** — CSS custom properties for color, spacing scale, type scale;
   both themes defined up front.
3. **Style top-down** — hero z-stack first (it is the hardest and sets the tone),
   then nav → stat row → experience timeline → projects → skills → footer.
4. **JS behaviors** — hero load animation, magnetic buttons, stat counters,
   project list rendering + detail modal, theme toggle, scroll reveal, active nav link.
5. **Responsive pass** — verify at 375px, 768px, 1440px.
6. **Polish** — favicon, `<title>`, meta description, Open Graph tags (so the link
   previews well when shared), semantic landmarks, alt text, focus-visible states.
7. **Deploy** — upload folder to the host.

---

## 5. Decisions still open

- **Portrait cut-out** *(blocking for the look)*: transparent-background PNG at
  `assets/img/portrait.png`, chest-up, 1200px+ tall. A silhouette placeholder ships
  until then. See §1.
- **Accent serif**: use Instrument Serif italic for one or two words in the hero
  (the Madison move), or keep the hero all-sans like Dymas?
- **The Apr 2026 date** on the current role reads as future-dated relative to today
  (Aug 2026 is current) — it is fine, but worth confirming the promotion date is right
  before it goes public.
- **CV PDF**: the file needs copying into `assets/` for the download button to work.
- **Project images**: each project needs a thumbnail and a larger hero shot. Screenshots
  of the logistics dashboard would be ideal — if the app is client-confidential, a
  blurred/redacted capture or a simple abstract graphic works instead.
- **Project long-form copy**: I can draft both descriptions from the CV, but you will
  want to review them — the detail modal is the one place on the site with room to
  say what you actually decided and why.
- **Public contact details**: the CV carries a phone number. Publishing it on a live
  page invites scraping — recommend email + LinkedIn only, phone kept in the PDF.

*Resolved: accent = amber; headshot = yes.*

## 6. Verification

- Open `index.html` directly in a browser (no server needed — everything is relative paths).
- Check both themes, and toggle the OS theme to confirm the default follows it.
- DevTools device toolbar: 375px / 768px / 1440px, confirm no horizontal scroll.
- Keyboard-only pass: tab through nav and all links, focus rings visible. Open a
  project row with `Enter`, confirm focus lands inside the modal and `Esc` closes it
  and returns focus to the row that opened it.
- Lighthouse: target 95+ on Performance, Accessibility, Best Practices, SEO.
  Watch two things this design introduces: the portrait PNG must be compressed
  (transparent PNGs get large fast — target under 300KB), and `backdrop-filter`
  on the nav should be checked for jank on a mid-range phone.
- Toggle OS "reduce motion" on and confirm the hero still reads correctly with
  transforms disabled.
- After upload: confirm HTTPS, confirm the CV PDF downloads, confirm no 404s in the console.
