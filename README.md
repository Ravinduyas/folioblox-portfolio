# FOLIOBLOX — artist site

Web presence for an independent electronic artist, built to the approved site
architecture: convert interest into **paid bookings**, and turn listeners into an
**audience you own**.

Originally scaffolded in AI Studio:
https://ai.studio/apps/5b2f3dd5-8a70-443a-b2c4-c8748ad6ef97

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit
npm run build    # → dist/
npm run preview  # serves the build at the real deployed subpath
npm run deploy   # build, then copy the result to the repo root (see Deployment)
```

Source lives in [`app/`](app/), not the repo root — see **Deployment** for why.

## Structure

| Route      | Page        | Contains                                                      | Audience |
| ---------- | ----------- | ------------------------------------------------------------- | -------- |
| `/`        | Home        | Hub: who / what's new / what's next, then routes visitors out  | Both     |
| `/music`   | Music       | Mixes & sets, releases, radio show                             | Fan      |
| `/shows`   | Shows       | Tour dates, ticket links, past shows, RA profile               | Fan      |
| `/about`   | About       | Artist bio, gallery                                            | Neutral  |
| `/press`   | Press / EPK | Press photos, technical rider, press quotes                    | Industry |
| `/booking` | Booking     | Inquiry form, agent / management                               | Industry |

Sitewide (footer, every page): newsletter signup, social & streaming links,
contact.

Deliberately **not** built yet — later phase: shop / merch, gated press area,
blog, multi-language.

## Editing content

Everything user-facing lives in [`app/src/data.ts`](app/src/data.ts):

- `ARTIST` — name, location, emails, RA profile, agent/management. Filling in
  `ARTIST.agent.name` automatically switches the booking page from "no agency"
  to an agent contact card.
- `SHORT_BIO` / `LONG_BIO` / `FACTS` — About page and the EPK bio download.
- `MIXES`, `RELEASES`, `RADIO` — the Music page.
- `SHOWS` — one list; `upcomingShows()` / `pastShows()` split it by date, so a
  show moves into the archive on its own.
- `PRESS_PHOTOS`, `PRESS_QUOTES`, `RIDER`, `GALLERY`, `SOCIALS`.

Images are imported through [`app/src/assets/images.ts`](app/src/assets/images.ts) so
Vite fingerprints them at build time.

## Before launch — placeholders to replace

1. **Embeds.** `embedUrl` / `url` on every mix, release and the radio show are
   correctly-shaped placeholders. Paste in the real SoundCloud / Mixcloud /
   Bandcamp URLs; nothing else changes. Players are click-to-load, so no
   third-party request fires until a visitor presses play.
2. **Booking form.** `sendEnquiry()` in
   [`app/src/components/BookingForm.tsx`](app/src/components/BookingForm.tsx) resolves
   locally. Point it at a real inbox / CRM endpoint.
3. **Newsletter.** `subscribe()` in
   [`app/src/components/NewsletterForm.tsx`](app/src/components/NewsletterForm.tsx) —
   wire to Mailchimp / Buttondown / Resend.
4. **Ticket + RA links** in `SHOWS` and `ARTIST.residentAdvisor`.
5. **Press assets.** The EPK generates the bio, rider and date sheet as `.txt`
   downloads straight from `data.ts` (see
   [`app/src/lib/downloads.ts`](app/src/lib/downloads.ts)) so they can't drift from the
   site. Swap for PDFs if promoters ask, and replace the placeholder press
   photos with print-resolution files.

## Deployment

Live at **https://ravinduyas.github.io/folioblox-portfolio/**.

GitHub Pages is set to **Deploy from a branch** (`main` / root), which means it
serves this repo's root verbatim and builds nothing. So the *compiled* site has
to live at the root, committed:

```bash
npm run deploy     # vite build → dist/, then copy up to the repo root
git commit -am "…" && git push
```

`scripts/publish.mjs` only ever replaces four paths — `index.html`, `404.html`,
`static/` and `.nojekyll`. Everything else at the root is left alone.

**This is why the source tree lives in [`app/`](app/).** The built `index.html`
must own the repo root, so the source entry cannot also sit there — they would
overwrite each other. Vite's `root` is `app/`, and build output goes to
`static/` rather than `assets/` to stay clear of the existing `assets/` folder.

Two more details, both in [`vite.config.ts`](vite.config.ts):

- **Base path.** `base` is `/folioblox-portfolio/` for build *and* preview, `/`
  for the dev server — so `npm run preview` reproduces Pages exactly, subpath
  included. The router's `basename` follows `import.meta.env.BASE_URL`.
- **Deep links.** Pages has no rewrite rule, so a hard load of `/music` would
  404. The build writes a copy of `index.html` to `404.html`; Pages serves it for
  unmatched paths and the client router takes over. Note those URLs still return
  a 404 *status* — fine for browsers, but search engines won't index them.

### Better options

Committing build output is a workaround for the branch-mode setting. Either of
these is cleaner, and both need the Pages source changed in repo settings:

1. **Source → GitHub Actions.** Push source only; a workflow builds and deploys.
   A working workflow is in git history at `.github/workflows/deploy.yml`
   (`git show 738e92c:.github/workflows/deploy.yml`).
2. **A host with real rewrites** (Netlify, Vercel, Cloudflare Pages) — fixes the
   404-status problem too, and drops the `app/` split entirely.

## Archived

[`legacy/`](legacy/) holds the previous design-portfolio components (projects
grid, project detail, old contact modal). They are excluded from the TypeScript
build and can be deleted once you're happy with the new site.
