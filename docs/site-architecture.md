# Site architecture — as built

Traces the approved architecture (*Site Architecture & Structure, Underground
DJ artist, May 2026*) to the code that implements it. Every element of that
document appears below with where it lives and, where relevant, where the build
knowingly diverges.

Page-level detail lives in [page-specification.md](page-specification.md).

---

## What this website is for

Two jobs, and every structural decision serves one of them:

1. **Convert interest into paid bookings.** A promoter can vet the artist and
   collect bio, photos and rider without sending an email, then make an offer
   through a form that asks for everything needed to answer in one round trip.
2. **Turn listeners into an audience you own.** Music plays on the page,
   and the mailing list is reachable from every screen — a direct channel
   instead of a platform's algorithm.

---

## Structure

| Section | Route | Audience | Contents (per the architecture) |
|---------|-------|----------|--------------------------------|
| Home | `/` | Both | Hub — who, what's new, what's next |
| Music | `/music` | Fan-facing | Mixes & sets · Releases · Radio show |
| Shows | `/shows` | Fan-facing | Tour dates · Ticket links · Past shows |
| About | `/about` | Neutral | Artist bio · Gallery |
| Press / EPK | `/press` | Industry | Press photos · Tech rider · Press quotes |
| Booking | `/booking` | Industry | Inquiry form · Agents / mgmt |
| *Sitewide* | — | — | Newsletter signup · Social & streaming links · Contact |

This table is not decorative — it is encoded as `SECTIONS` in
[`app/src/data.ts`](../app/src/data.ts) and consumed by both
[`Nav.tsx`](../app/src/components/Nav.tsx) and
[`Footer.tsx`](../app/src/components/Footer.tsx). Navigation cannot drift from
the approved structure without editing the structure itself.

### Audience coding

The architecture colour-codes sections by who they serve. That coding is live
in the UI:

- **Fan-facing** (Music, Shows) — teal `#2ec9b0`
- **Neutral** (About) — bone `#d9d5cd`
- **Industry** (Press / EPK, Booking) — brand orange `#f25c27`

Where it shows: the nav's active underline takes the section's audience colour,
a hairline divider marks the fan → industry handover, the mobile menu and
footer carry audience dots, and Home's routing cards are teal and orange.

**Substitution:** the source document legends industry as purple. Purple fights
the brand orange on a near-black page, so industry keeps the brand colour. The
*coding* is intact — fan and industry remain visually distinct — while the
palette stays whole. Change `AUDIENCE_ACCENT` in `data.ts` if purple is wanted.

---

## Who it serves

**The booker / promoter** — skeptical, short on time. Vet in under two minutes,
then take the assets without asking.

| Need | Where it's served |
|------|-------------------|
| Vet fast | `/press` → *Vet in two minutes*: sound, set length, format, rooms already played, lead quote, RA cross-check |
| Photos, rider, bio without emailing | `/press` → Downloads + per-photo download, rider readable on-page |
| Make an offer | `/booking` → form that asks for date, city, venue, capacity, set type and fee |
| Confirm it's real | RA profile on `/shows`, in the vet panel and in the footer |

**The fan** — curious after one set. Capture before they leave.

| Need | Where it's served |
|------|-------------------|
| Hear something now | Embeds on `/` and `/music`, one click to play |
| Follow | Social + streaming links in the footer, every page |
| Get told next time | Newsletter in the footer band and as a full Home section |
| See them live | `/shows` with ticket links straight to the promoter or RA |

---

## How the structure supports the goals

- **Homepage is a hub.** Identity, latest mix and release, next dates, then two
  routing cards that split fans from promoters. (See the open point below.)
- **Music runs on embeds.** SoundCloud, Mixcloud and Bandcamp, never custom
  players — budget saved, platform discovery fed. Implemented as click-to-load
  facades so nothing third-party loads uninvited.
- **Self-serve press kit.** No gate, no login, no request form. Bio, rider and
  date sheet generate from site data at click time, so the kit can't go stale.
- **Credibility links.** The Resident Advisor profile is surfaced on Shows, in
  the two-minute vet panel and in the footer.

---

## What we build first

**Shipped — first release**

- [x] Home · Music · Shows · About
- [x] Booking inquiry form
- [x] EPK essentials — bio, photos, rider
- [x] Email capture
- [x] Social & streaming links

**Deliberately deferred — later phase**

- [ ] Online shop / merch
- [ ] Gated press area
- [ ] Blog or journal
- [ ] Multi-language

These are absent by design, not oversight: each adds ongoing upkeep and is
best introduced once there is demand. No stub links point at them.

**Blocking before launch:** `sendEnquiry()` in `BookingForm.tsx` and the
submit handler in `NewsletterForm.tsx` both resolve locally. Until they post
somewhere real, the funnel demos but does not deliver.

---

## Deviations from the approved architecture

### The homepage has grown past "a hub"

The architecture is explicit: *"It answers who you are, what's new and what's
next within seconds, then routes each visitor toward their goal — it is not a
long scrolling story."*

Home currently runs nine blocks: hero, streaming strip, what's new, next dates,
radio residency, artist, press quotes, audience routing, newsletter. Blocks 4–7
were added after structure sign-off and duplicate content that already has its
own page.

Three options, no work done on this yet:

1. **Keep it.** Accept a longer homepage; more of the story lands before anyone
   clicks. Costs the "seconds to route" property.
2. **Trim to the hub** — hero, what's new, routing cards, newsletter. Closest
   to the approved architecture; the trimmed sections lose nothing because
   `/music`, `/shows`, `/about` and `/press` already carry them.
3. **Compress.** Keep all seven topics but as one-line teasers rather than full
   sections.

### Industry accent is orange, not purple

See *Audience coding* above.

---

## Assumptions

Carried from the architecture. If any changes, priorities shift:

| Assumption | Where it shows in the build |
|------------|-----------------------------|
| Bookings are the primary goal | Booking is the standing nav CTA; every page ends within one click of it |
| The artist is independent — no agency | `ARTIST.agent` / `ARTIST.management` are empty, so Booking renders "No agency. No gatekeeper." Fill either in and the agent block appears automatically |
| No physical merchandise sold yet | No shop, no cart, no merch links anywhere |

---

## Content ownership

All copy, dates, mixes, releases, photos, rider and quotes live in
[`app/src/data.ts`](../app/src/data.ts). Adding a show or swapping an embed URL
is a data edit, not a code change. Embed URLs are placeholders in the correct
per-platform shape — replace them and nothing else needs touching.
