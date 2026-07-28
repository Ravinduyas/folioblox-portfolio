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
npm run build
```

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

Everything user-facing lives in [`src/data.ts`](src/data.ts):

- `ARTIST` — name, location, emails, RA profile, agent/management. Filling in
  `ARTIST.agent.name` automatically switches the booking page from "no agency"
  to an agent contact card.
- `SHORT_BIO` / `LONG_BIO` / `FACTS` — About page and the EPK bio download.
- `MIXES`, `RELEASES`, `RADIO` — the Music page.
- `SHOWS` — one list; `upcomingShows()` / `pastShows()` split it by date, so a
  show moves into the archive on its own.
- `PRESS_PHOTOS`, `PRESS_QUOTES`, `RIDER`, `GALLERY`, `SOCIALS`.

Images are imported through [`src/assets/images.ts`](src/assets/images.ts) so
Vite fingerprints them at build time.

## Before launch — placeholders to replace

1. **Embeds.** `embedUrl` / `url` on every mix, release and the radio show are
   correctly-shaped placeholders. Paste in the real SoundCloud / Mixcloud /
   Bandcamp URLs; nothing else changes. Players are click-to-load, so no
   third-party request fires until a visitor presses play.
2. **Booking form.** `sendEnquiry()` in
   [`src/components/BookingForm.tsx`](src/components/BookingForm.tsx) resolves
   locally. Point it at a real inbox / CRM endpoint.
3. **Newsletter.** `subscribe()` in
   [`src/components/NewsletterForm.tsx`](src/components/NewsletterForm.tsx) —
   wire to Mailchimp / Buttondown / Resend.
4. **Ticket + RA links** in `SHOWS` and `ARTIST.residentAdvisor`.
5. **Press assets.** The EPK generates the bio, rider and date sheet as `.txt`
   downloads straight from `data.ts` (see
   [`src/lib/downloads.ts`](src/lib/downloads.ts)) so they can't drift from the
   site. Swap for PDFs if promoters ask, and replace the placeholder press
   photos with print-resolution files.
## Deployment

Live at **https://ravinduyas.github.io/folioblox-portfolio/**, published from
`main` by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) — every
push builds with Vite and uploads `dist/` to GitHub Pages. Nothing to run by
hand.

Two details make an SPA work on Pages, both handled in
[`vite.config.ts`](vite.config.ts):

- **Base path.** The site is served from a subdirectory, so the workflow builds
  with `GITHUB_PAGES=true`, which sets Vite's `base` to `/folioblox-portfolio/`
  and the router's `basename` to match. Local `dev` and `build` stay at `/`.
- **Deep links.** Pages has no rewrite rule, so a hard load of `/music` would
  404. The build writes a copy of `index.html` to `404.html`; Pages serves it for
  unmatched paths and the client router takes over.

Moving to a host with real rewrites (Netlify `_redirects`, Vercel rewrites, nginx
`try_files`) means dropping `GITHUB_PAGES` and using those instead.

## Archived

[`legacy/`](legacy/) holds the previous design-portfolio components (projects
grid, project detail, old contact modal). They are excluded from the TypeScript
build and can be deleted once you're happy with the new site.
