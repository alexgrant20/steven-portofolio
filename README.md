# Portfolio — Steven Alexander Grant

Static single-page portfolio. Plain HTML, CSS, and JavaScript — no build step, no
dependencies, no npm install. Open `index.html` in a browser and it runs.

```
index.html                    all content except projects
assets/css/styles.css         all styling, tokens at the top
assets/js/main.js             project data + all behaviour
assets/img/                   portrait, project images
assets/Steven_Alexander_Grant_CV.pdf
contact.php                   no-JS mail fallback + IP guard
guard.php                     IP guard checked before EmailJS sends
inc/rate-limit.php            shared rate-limit logic
data/rate-limit.json          IP submission log (created at runtime)
```

---

## Before this goes live

Three things are still placeholders.

### 1. The portrait — this one matters most

The hero design layers your photo *between* two layers of type, so it needs a
**cut-out image with a transparent background**, not a square photo.

- Save it as `assets/img/portrait.png`
- Transparent background (PNG), chest-up, facing camera
- At least 1200px tall
- Compress it afterwards — aim for under 300KB ([squoosh.app](https://squoosh.app) works well)

Free background removal: [remove.bg](https://remove.bg), or Photoshop's
*Select Subject*, or the Photos app on Windows 11.

Then regenerate the pencil-sketch layer the hero reveals it from (needs
`pip install pillow`; the tool is not deployed):

```
python tools/make-sketch.py
```

Update the `width`/`height` attributes on both `.portrait` images in
`index.html` to the new photo's size.

Until that file exists the page shows a grey silhouette placeholder. Nothing
breaks — the layout and animations are already correct — but the design does not
land without the real cut-out.

### 2. Project screenshots

Each project needs two images:

```
assets/img/projects/logistics-thumb.jpg     ~640×400  (list row)
assets/img/projects/logistics-hero.jpg     ~1280×640  (modal header)
assets/img/projects/companion-thumb.jpg
assets/img/projects/companion-hero.jpg
```

Missing images fall back to a dashed "screenshot pending" placeholder, so the page
stays presentable while you gather them. If the logistics dashboard is
client-confidential, a redacted or blurred capture is fine.

### 3. Read the project write-ups

`assets/js/main.js` contains long-form descriptions I drafted from your CV. They
are accurate to what the CV says, but I filled in reasonable context around it —
**read them and correct anything I got wrong.** The modal is the one place on the
site with room to explain what you actually decided and why, so it is worth your
time.

---

## Editing content

**Text, experience, skills, education** — edit `index.html` directly. It is
plain semantic HTML with section comments; find the section and change the words.

**Projects** — edit the `PROJECTS` array at the top of `assets/js/main.js`.
To add one, append an object:

```js
{
  id: 'short-slug',
  title: 'Project Name',
  role: 'Your role',
  period: '2025',
  summary: 'One sentence for the list row.',
  tags: ['Tag', 'Tag', 'Tag'],
  thumb: 'assets/img/projects/slug-thumb.jpg',
  hero:  'assets/img/projects/slug-hero.jpg',
  body: [
    { type: 'p', text: 'Paragraph.' },
    { type: 'h', text: 'A subheading' },
    { type: 'p', text: 'Another paragraph.' }
  ],
  stack: { Backend: ['...'], Frontend: ['...'] },
  links: [{ label: 'Live site', href: 'https://...' }]
}
```

Then update the `[2]` count next to "Work" in the nav in `index.html`.

**Colours** — `assets/css/styles.css`, the `:root` block at the top. Light and
dark are defined separately; change both.

---

## Deploying to your host

Everything is static and every path is relative, so there is no configuration.

1. Upload the whole folder to your web root (`public_html`, `htdocs`, or similar)
   over FTP/SFTP. You can skip `PLAN.md` and `README.md` — they are documentation,
   not part of the site.
2. Make sure `index.html` sits at the root, so the site serves at `/`.
3. If your host runs **Apache**, the included `.htaccess` turns on gzip, sets
   cache headers, and forces HTTPS. Delete it if your host runs Nginx — it will be
   ignored there, but the settings are worth replicating in your server block.

### Before announcing the link

- Open it on a phone as well as a laptop
- Toggle the theme button, then toggle your OS dark mode
- Click a project row, close with `Esc`, and confirm the CV downloads
- Run Lighthouse in Chrome DevTools — a static page like this should score in the 90s

---

## The contact form

The form sends via **EmailJS** straight from the visitor's browser once you
configure it (no PHP mail server needed for delivery). Until you configure it,
or if a visitor has JavaScript off, it falls back to `contact.php`, which
emails you via `mail()` instead. Either way the message reaches
`stevenalexandergrant@gmail.com` (or wherever you point it).

### Setting up EmailJS

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. **Email Services** → add one (e.g. connect your Gmail). Note its **Service ID**.
3. **Email Templates** → create one using these variables, matching what the
   form sends: `{{from_name}}`, `{{from_email}}`, `{{message}}`. Note its
   **Template ID**.
4. **Account** → note your **Public Key**.
5. Open `assets/js/main.js`, find the three constants near the top of the
   "Contact form" section, and paste your IDs in:
   ```js
   const EMAILJS_PUBLIC_KEY  = 'your public key';
   const EMAILJS_SERVICE_ID  = 'your service id';
   const EMAILJS_TEMPLATE_ID = 'your template id';
   ```
   Leaving them as the placeholder strings keeps the site on the `contact.php`
   fallback — nothing breaks if you skip this.

Free EmailJS accounts cap out at 200 emails/month, plenty for a portfolio.

### The IP spam guard

Before every send — EmailJS or the `contact.php` fallback — the visitor's IP
is checked against limits enforced entirely on your server:

- max **3 messages per IP per 30 minutes**
- at least **60 seconds between messages** from the same IP

This lives in `inc/rate-limit.php` (a small JSON file at `data/rate-limit.json`
tracks IPs and timestamps) and is called from two places: `guard.php`, which
`main.js` checks via `fetch` right before calling EmailJS, and `contact.php`
itself for the no-JS path. Both draw from the same store, so a visitor gets
one limit no matter which path they use. `data/` and `inc/` each carry an
`.htaccess` denying direct web access, so nobody can browse to the raw IP log.

To change the numbers, edit the call in `guard.php` and `contact.php`:
```php
rl_check_and_record($ip, $storeFile, $maxPerWindow = 3, $windowSeconds = 1800, $minGapSeconds = 60)
```

**Honest limit of this guard:** EmailJS's public key ships in your page's
source, so a visitor determined enough to open devtools could call EmailJS's
API directly and skip `guard.php` entirely. This setup stops normal
repeat-submits and simple bots hammering the form — which is what "someone
spamming the contact form" usually means — but it is not a hardened defense
against a targeted attacker. If you need that, don't call EmailJS from the
browser at all; instead have `contact.php` (which the guard already covers
fully) call EmailJS's REST API server-side, so the public key never reaches
the client.

`data/rate-limit.json` needs to be writable by the PHP process (the default
permissions from creating the file are fine on most shared hosts; if the guard
always "fails open" — i.e. never blocks anyone — check that PHP can write to
the `data/` folder).

**Two things to check if you keep the `contact.php` fallback in play:**

1. **PHP must be enabled**, and `mail()` must be available. Many shared hosts
   allow it; some disable it.
2. **`mail()` frequently lands in spam**, because the message is sent without
   authentication. If that happens, switch to SMTP — install
   [PHPMailer](https://github.com/PHPMailer/PHPMailer) and send through your own
   mailbox, or use a free tier from Mailgun, Brevo, or Resend.

Change the destination address at the top of `contact.php` (`$TO`) if you ever
want messages going somewhere else.

---

## Notes

**Your phone number is deliberately not on the page.** It is in the CV PDF for
anyone who downloads it, but published on a live page it gets scraped. Add it to
the footer in `index.html` if you would rather have it there.

**Fonts load from Google Fonts** (Archivo, Inter, Instrument Serif). If you would
rather not depend on an external request, download the woff2 files, drop them in
`assets/fonts/`, and replace the `<link>` in `index.html` with `@font-face` rules.

**Motion respects `prefers-reduced-motion`.** Everything degrades to plain fades
when a visitor has that enabled at OS level.
