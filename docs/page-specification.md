# Page-by-page specification

The next step the architecture recommends after structure sign-off: the exact
content blocks, calls-to-action and booking-form fields for every page. This
document describes what is **built**, so it doubles as the spec and the record
of what shipped.

Read alongside [site-architecture.md](site-architecture.md), which covers the
structure, the audience model and what was deliberately deferred.

Conventions used below:

- **Primary CTA** — one per screenful, brand orange, the action the page exists for.
- **Secondary CTA** — ghost/outline, the reasonable alternative.
- **Tertiary** — inline text links, no button weight.
- Source file is given per page; shared blocks are listed once at the end.

---

## `/` — Home

**Audience:** both · **Job:** answer who / what's new / what's next in seconds,
then route the visitor out. A hub, not a destination.
**Source:** [`app/src/pages/Home.tsx`](../app/src/pages/Home.tsx)

| # | Block | Content | CTAs |
|---|-------|---------|------|
| 1 | Hero | Artist name, role + base, one-line positioning, next 3 dates strip | **Listen** (primary) · Book a date (secondary) · All dates (tertiary) |
| 2 | Streaming strip | Platform wordmarks — where the music lives | — |
| 3 | What's new | Latest mix embed + latest release with artwork, label, cat. no., format | Buy / stream (primary) · Tracklist · All music (tertiary) |
| 4 | Next dates | Up to 4 upcoming shows, full rows with ticket links | Tickets per row (primary) · All N dates (tertiary) |
| 5 | Radio residency | Show name, station, schedule, description, latest episode embed | Full archive · Every episode |
| 6 | Who's playing | Portrait, first bio paragraph, the four artist facts | Read the full bio |
| 7 | Press | Three press quotes | Press kit (tertiary) |
| 8 | Audience routing | Two cards: fan-facing (teal) and industry (orange) | Mixes & sets · Tour dates ‖ Press kit · **Booking enquiry** |
| 9 | Newsletter | Email capture band | **Sign up** (primary) |

> **Open point.** The architecture calls the homepage "a hub, not a long
> scrolling story". Blocks 4–7 were added after structure sign-off and push it
> toward a scrolling story. They are strong sections; the question is whether
> they belong on Home or on their own pages, where each already exists. See
> [site-architecture.md](site-architecture.md#deviations-from-the-approved-architecture).

---

## `/music` — Mixes, releases, radio

**Audience:** fan · **Job:** capture a curious listener with a play before they leave.
**Source:** [`app/src/pages/Music.tsx`](../app/src/pages/Music.tsx)

| # | Block | Content | CTAs |
|---|-------|---------|------|
| 1 | Hero | "Everything worth hearing", counts of sets/releases/radio linking to anchors | Anchor jumps |
| 2 | Mixes & sets `#mixes` | Filterable grid of embeds — series pill, tags, duration | Play (facade → embed) · Open on platform |
| 3 | Releases `#releases` | Artwork, label + catalogue number, year, format, full tracklist | **Buy on Bandcamp** per release |
| 4 | Radio show `#radio` | Station, schedule, description, latest episode embed | **Full archive** |

**Rules**
- Every player is a **facade**: artwork + play button, iframe only on click.
  Nothing third-party loads until the visitor asks for it.
- Sets are never self-hosted — SoundCloud, Mixcloud and Bandcamp keep their own
  discovery working. Swap `embedUrl` / `url` in `data.ts`; nothing else changes.

---

## `/shows` — Tour dates

**Audience:** fan · **Job:** turn interest into a ticket; prove the rooms already played.
**Source:** [`app/src/pages/Shows.tsx`](../app/src/pages/Shows.tsx)

| # | Block | Content | CTAs |
|---|-------|---------|------|
| 1 | Hero | Confirmed date count, next three dates | **Resident Advisor profile** (credibility link) |
| 2 | Upcoming | One row per date: date, event, venue, city, set type, status | **Tickets** (on sale) · "No tickets left" · "On sale soon" |
| 3 | Past shows | Same rows, dimmed, collapsed to 4 with expand | Show all N past shows |

**Rules**
- Upcoming vs past is derived from the ISO date at render — never a manual flag.
- Ticket links point at the promoter or RA, never a page that re-sells.
- Past shows are load-bearing for bookers, not nostalgia: they are the evidence
  a promoter checks before making an offer.

---

## `/about` — Artist bio + gallery

**Audience:** neutral — the bridge · **Job:** credibility for bookers, story for fans.
**Source:** [`app/src/pages/About.tsx`](../app/src/pages/About.tsx)

| # | Block | Content | CTAs |
|---|-------|---------|------|
| 1 | Hero | Name, short bio, the four artist facts in the strip | **Hear a set** · Press kit |
| 2 | Biography | Three-paragraph long bio | — |
| 3 | Roster `#roster` | One card per artist: name, role, base, year joined, one-line blurb, own links. Label project flagged; artists without a press shot get a monogram tile | Per-artist links · demo address |
| 4 | Gallery | Four captioned shots, tilt on hover | — |
| 5 | Bridge | Two cards, one per audience | Listen ‖ **Booking** |

The roster is an **addition** beyond the approved architecture, which lists About
as bio + gallery only. It fits the neutral bridge: a promoter reads it as depth,
a listener as more to hear. Roster content lives in `ROSTER` in `data.ts`; every
name there is currently a placeholder.

---

## `/press` — Press kit / EPK

**Audience:** industry · **Job:** let a promoter announce the show without
sending a single email.
**Source:** [`app/src/pages/Press.tsx`](../app/src/pages/Press.tsx)

| # | Block | Content | CTAs |
|---|-------|---------|------|
| 1 | Hero | What's in the kit: bio, photos, rider sections, quote count | **Bio** · Technical rider (both download immediately) |
| 2 | Listing facts | Billing name, based in, genres, press contact — each copy-to-clipboard | Copy |
| 3 | Two-minute vet | Sounds like + set length + format ‖ rooms already played + RA cross-check ‖ lead quote + direct booking address | Cross-check on RA · Email |
| 4 | Downloads | Artist bio, technical rider, current date sheet | Download ×3 |
| 5 | Press photos | Approved shots with credit lines, per-photo download | Download per photo |
| 6 | Rider in full | Every rider section on-page, so nothing needs opening to read | — |
| 7 | Press quotes | Full quote set | — |
| 8 | Announce helper | Pre-written announcement copy for the next confirmed date | Copy |

**Rules**
- No gate, no form, no login. The architecture is explicit: waiting on an email
  costs bookings, and self-serve signals professionalism.
- Every asset is generated from `data.ts` at click time, so the kit cannot go
  stale relative to the site.
- Credit lines travel with the photos; the rider is readable on-page *and*
  downloadable.

---

## `/booking` — Inquiry form + representation

**Audience:** industry · **Job:** convert a vetted promoter into a paid offer.
**Source:** [`app/src/pages/Booking.tsx`](../app/src/pages/Booking.tsx)

| # | Block | Content | CTAs |
|---|-------|---------|------|
| 1 | Hero | Reply time, representation status, direct address | — |
| 2 | Enquiry form | Fields below | **Send booking enquiry** (primary) |
| 3 | What to include | Checklist of what makes an enquiry answerable first time | — |
| 4 | Agents / management | Agent + management when set; otherwise "no agency, no gatekeeper" and the direct address | Email |
| 5 | Before you ask | Rider is already public — read before offering | Technical rider · Full press kit |

### Booking-form fields

Source: [`app/src/components/BookingForm.tsx`](../app/src/components/BookingForm.tsx)

| Field | Type | Required | Why it's asked |
|-------|------|----------|----------------|
| Your name | text | ● | Who is making the offer |
| Promoter / venue / agency | text | | Who they book for — establishes the ask |
| Email | email | ● | The only reply channel |
| Event name | text | ● | Party, festival or series |
| Date | date | ● | First availability check |
| City / country | text | ● | Drives travel cost and routing |
| Venue | text | | Room matters as much as the city |
| Capacity | text | | Sets the scale of the offer |
| Set type | select | | DJ · extended/all-night · opening · closing · B2B · radio |
| Set length | select | | 1h · 2h · 3h · 4h+ · all night |
| Fee / budget | text | ● | **Required on purpose.** No number means another round trip, and the architecture's whole point is fewer of those |
| Anything else | textarea | | Line-up, set times, travel, promo plan |

**On submit** — confirmation naming the reply window, an echo of event / date /
set so the promoter can check it, and the direct email address as a fallback.

> **Not yet wired.** `sendEnquiry()` resolves locally after ~1.1s so the funnel
> demos end to end. Point it at a real inbox, form endpoint or CRM before
> launch — it is the single blocking task between this build and taking live
> enquiries. Same applies to `NewsletterForm`.

---

## Sitewide blocks

Present on every page, per the architecture's sitewide bar.

| Block | Where | Contents |
|-------|-------|----------|
| Newsletter signup | Footer band, plus a full section on Home | Email capture, "a few emails a year", one-click-to-leave promise |
| Social links | Footer, icon row | Instagram, SoundCloud, Bandcamp, YouTube |
| Streaming links | Footer, "Listen" column | Every platform the music is on |
| Contact | Footer, "Contact" column | Booking address, press address, "bookings direct — no agency" |
| Credibility | Footer bar | RA profile link, "taking bookings" status |
| Navigation | Header + footer | Generated from `SECTIONS` in `data.ts`, audience-coded |

---

## Wireframes

The architecture puts wireframes after this specification. They are **not**
included here — the built pages now serve that purpose, and re-deriving
wireframes from shipped screens would be busywork. If a wireframe round is
still wanted for client review, the blocks tables above are the input.
