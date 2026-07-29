import { IMAGES } from "./assets/images";
import {
  Audience,
  GalleryItem,
  Mix,
  PressPhoto,
  PressQuote,
  RadioShow,
  Release,
  RiderSection,
  RosterArtist,
  Show,
  SiteSection,
  SocialLink,
} from "./types";

/**
 * Single place to rebrand the site. Everything user-facing reads from here.
 */
export const ARTIST = {
  name: "EXPLORATION RECORDINGS",
  displayName: "Exploration Recordings",
  role: "DJ · Producer",
  basedIn: "Berlin, DE",
  originally: "Melbourne, AU",
  genres: ["Deep techno", "Electro", "Breaks", "Dub"],
  bookingEmail: "bookings@explorationrecordings.com",
  pressEmail: "press@explorationrecordings.com",
  /** Empty string = independent, no agency. Fill in to show a booking agent. */
  agent: {
    name: "",
    company: "",
    email: "",
    territories: "",
  },
  management: {
    name: "",
    email: "",
  },
  residentAdvisor: "https://ra.co/dj/explorationrecordings",
  responseTime: "within 48 hours",
} as const;

/** Two-line bio used on the homepage and as the short EPK bio. */
export const SHORT_BIO =
  "Exploration Recordings is the project of a Berlin-based DJ and producer working the low, dubbed-out end of techno — long-form sets built on weight, patience and room-reading rather than peak-time shortcuts.";

export const LONG_BIO = [
  "Exploration Recordings started out on Melbourne's warehouse circuit, playing the kind of six-hour opening sets that teach you restraint. A move to Berlin in 2022 sharpened that instinct: fewer records, more space between them, an ear for the moment a room tips over.",
  "The productions follow the same logic. Two EPs on Nightform and a self-released dub series have built a catalogue that sits between deep techno, electro and sound-system culture — drum machines pushed through tape, sub-bass doing the melodic work, arrangements that arrive rather than announce.",
  "Since 2024 the monthly Lowlight Transmissions show on Refuge Radio has become the clearest statement of that world: two hours of unreleased dubs, records pulled from the back of the bag, and no genre policing whatsoever.",
];

/* ────────────────────  SITE STRUCTURE (from the architecture)  ──────────────────── */

/**
 * The proposed site structure, encoded once and consumed by the nav and the
 * footer, so the navigation cannot drift away from the approved architecture.
 */
export const SECTIONS: SiteSection[] = [
  {
    label: "Music",
    to: "/music",
    audience: "fan",
    contents: ["Mixes & sets", "Releases", "Radio show"],
    purpose: "Capture a curious listener with a play before they leave.",
  },
  {
    label: "Shows",
    to: "/shows",
    audience: "fan",
    contents: ["Tour dates", "Ticket links", "Past shows"],
    purpose: "Turn interest into a ticket, and prove the rooms already played.",
  },
  {
    label: "About",
    to: "/about",
    audience: "neutral",
    contents: ["Artist bio", "Roster", "Gallery"],
    purpose: "The neutral bridge — credibility for bookers, story for fans.",
  },
  {
    label: "Press / EPK",
    to: "/press",
    audience: "industry",
    contents: ["Press photos", "Tech rider", "Press quotes"],
    purpose: "Let a promoter announce the show without waiting on an email.",
  },
  {
    label: "Booking",
    to: "/booking",
    audience: "industry",
    contents: ["Inquiry form", "Agents / mgmt"],
    purpose: "Convert a vetted promoter into a paid offer.",
    navHidden: true,
  },
];

/**
 * Audience accents. The architecture legends fan-facing teal and industry
 * purple; purple fights the brand orange on a near-black page, so industry
 * keeps the brand colour — the coding stays, the palette stays intact.
 */
export const AUDIENCE_ACCENT: Record<Audience, string> = {
  fan: "#2ec9b0",
  neutral: "#d9d5cd",
  industry: "#f25c27",
};

export const AUDIENCE_LABEL: Record<Audience, string> = {
  fan: "Fan-facing",
  neutral: "Neutral",
  industry: "Industry / bookers",
};

export const FACTS = [
  { label: "Based in", value: ARTIST.basedIn },
  { label: "Set length", value: "2–6 hours" },
  { label: "Format", value: "Vinyl + USB / hybrid" },
  { label: "Booking", value: "Independent — direct" },
];

/* ─────────────────────────  MUSIC  ───────────────────────── */

/**
 * NOTE: embedUrl / url values below are placeholders in the correct shape for
 * each platform. Swap them for the real ones — nothing else needs to change.
 */
export const MIXES: Mix[] = [
  {
    id: "lowlight-014",
    title: "Lowlight Transmissions 014",
    series: "Radio",
    platform: "Mixcloud",
    embedUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=%2Fexplorationrecordings%2Flowlight-transmissions-014%2F",
    url: "https://www.mixcloud.com/explorationrecordings/lowlight-transmissions-014/",
    date: "2026-07-04",
    duration: "2h 02m",
    artwork: IMAGES.mixerBlue,
    tags: ["Dub techno", "Electro", "Unreleased"],
  },
  {
    id: "hors-serie-live",
    title: "Live at Hors Série — Closing",
    series: "Live set",
    platform: "SoundCloud",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/explorationrecordings/hors-serie-closing&color=%23f25c27&hide_related=true&show_comments=false&visual=false",
    url: "https://soundcloud.com/explorationrecordings/hors-serie-closing",
    date: "2026-06-14",
    duration: "3h 41m",
    artwork: IMAGES.overheadSmoke,
    tags: ["Closing set", "Recorded live", "Paris"],
  },
  {
    id: "basalt-podcast-88",
    title: "Basalt Podcast 088",
    series: "Guest mix",
    platform: "SoundCloud",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/basalt/podcast-088-explorationrecordings&color=%23f25c27&hide_related=true&show_comments=false&visual=false",
    url: "https://soundcloud.com/basalt/podcast-088-explorationrecordings",
    date: "2026-05-02",
    duration: "1h 12m",
    artwork: IMAGES.studioDark,
    tags: ["Podcast", "Deep techno"],
  },
  {
    id: "lowlight-013",
    title: "Lowlight Transmissions 013",
    series: "Radio",
    platform: "Mixcloud",
    embedUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=%2Fexplorationrecordings%2Flowlight-transmissions-013%2F",
    url: "https://www.mixcloud.com/explorationrecordings/lowlight-transmissions-013/",
    date: "2026-06-06",
    duration: "2h 00m",
    artwork: IMAGES.deckBokeh,
    tags: ["Dub", "Ambient opening"],
  },
];

export const RELEASES: Release[] = [
  {
    id: "sub-orbital-ep",
    title: "Sub-Orbital EP",
    label: "Nightform",
    catalogue: "NGF012",
    year: "2026",
    format: "12\" vinyl / digital",
    artwork: IMAGES.vinyl,
    platform: "Bandcamp",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=1234567890/size=large/bgcol=111214/linkcol=f25c27/tracklist=false/transparent=true/",
    url: "https://explorationrecordings.bandcamp.com/album/sub-orbital-ep",
    tracks: ["Sub-Orbital", "Ground Station", "Null Island", "Sub-Orbital (Dub)"],
  },
  {
    id: "tape-dubs-vol-2",
    title: "Tape Dubs Vol. 2",
    label: "Self-released",
    catalogue: "TD002",
    year: "2025",
    format: "Digital",
    artwork: IMAGES.coverTapeDubs,
    platform: "Bandcamp",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=1234567891/size=large/bgcol=111214/linkcol=f25c27/tracklist=false/transparent=true/",
    url: "https://explorationrecordings.bandcamp.com/album/tape-dubs-vol-2",
    tracks: ["Ferrite", "Bias Current", "Head Gap", "Erase Pass"],
  },
  {
    id: "cold-storage",
    title: "Cold Storage",
    label: "Nightform",
    catalogue: "NGF007",
    year: "2024",
    format: "12\" vinyl",
    artwork: IMAGES.coverColdStorage,
    platform: "Bandcamp",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=1234567892/size=large/bgcol=111214/linkcol=f25c27/tracklist=false/transparent=true/",
    url: "https://explorationrecordings.bandcamp.com/album/cold-storage",
    tracks: ["Cold Storage", "Deadlift", "Anteroom"],
  },
];

export const RADIO: RadioShow = {
  name: "Lowlight Transmissions",
  station: "Refuge Radio",
  schedule: "First Saturday of the month · 23:00–01:00 CET",
  description:
    "Two hours a month with no brief: unreleased dubs, records that didn't fit the club, and long stretches where nothing much happens on purpose. Archived in full on Mixcloud.",
  url: "https://www.mixcloud.com/explorationrecordings/",
  platform: "Mixcloud",
  embedUrl:
    "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=%2Fexplorationrecordings%2Flowlight-transmissions-014%2F",
  artwork: IMAGES.radioOnAir,
};

/* ─────────────────────────  SHOWS  ───────────────────────── */

export const SHOWS: Show[] = [
  {
    id: "rso-berlin",
    date: "2026-08-08",
    event: "Nightform Label Night",
    venue: "RSO",
    city: "Berlin",
    country: "DE",
    status: "on-sale",
    ticketUrl: "https://ra.co/events/1",
    setType: "3h DJ set",
    lineup: ["Exploration Recordings", "Ayako Mori", "Deadstock"],
  },
  {
    id: "dekmantel-amsterdam",
    date: "2026-08-22",
    event: "Lowlight Stage",
    venue: "Het Sieraad",
    city: "Amsterdam",
    country: "NL",
    status: "on-sale",
    ticketUrl: "https://ra.co/events/2",
    setType: "2h DJ set",
    lineup: ["Exploration Recordings", "Sunju Hargun"],
  },
  {
    id: "concrete-paris",
    date: "2026-09-05",
    event: "Hors Série",
    venue: "La Station",
    city: "Paris",
    country: "FR",
    status: "sold-out",
    ticketUrl: "https://ra.co/events/3",
    setType: "Closing set — 4h",
  },
  {
    id: "sub-club-glasgow",
    date: "2026-09-19",
    event: "Sub Club presents",
    venue: "Sub Club",
    city: "Glasgow",
    country: "UK",
    status: "on-sale",
    ticketUrl: "https://ra.co/events/4",
    setType: "Extended set — 5h",
  },
  {
    id: "warehouse-melbourne",
    date: "2026-11-14",
    event: "Homecoming",
    venue: "TBA",
    city: "Melbourne",
    country: "AU",
    status: "tba",
    setType: "All-night long",
  },
  /* Past */
  {
    id: "berghain-kantine",
    date: "2026-06-27",
    event: "Kantine am Berghain",
    venue: "Kantine",
    city: "Berlin",
    country: "DE",
    status: "on-sale",
    setType: "Opening set — 3h",
  },
  {
    id: "fold-london",
    date: "2026-05-30",
    event: "Lowlight × FOLD",
    venue: "FOLD",
    city: "London",
    country: "UK",
    status: "sold-out",
    setType: "B2B with Deadstock",
  },
  {
    id: "tresor-berlin",
    date: "2026-04-11",
    event: "Tresor Nights",
    venue: "Tresor",
    city: "Berlin",
    country: "DE",
    status: "on-sale",
    setType: "2h DJ set",
  },
  {
    id: "hor-berlin",
    date: "2026-02-20",
    event: "HÖR Berlin",
    venue: "HÖR",
    city: "Berlin",
    country: "DE",
    status: "on-sale",
    setType: "1h broadcast",
  },
];

/* ─────────────────────────  PRESS / EPK  ───────────────────────── */

export const PRESS_PHOTOS: PressPhoto[] = [
  {
    id: "press-01",
    caption: "Press shot 01 — booth portrait",
    credit: "Photo: Lena Vogt",
    src: IMAGES.pressPortrait,
    orientation: "portrait",
  },
  {
    id: "press-02",
    caption: "Press shot 02 — live, green room lighting",
    credit: "Photo: Lena Vogt",
    src: IMAGES.pressGreen,
    orientation: "portrait",
  },
  {
    id: "press-03",
    caption: "Press shot 03 — main room, closing set",
    credit: "Photo: Ilya Renko",
    src: IMAGES.crowdHands,
    orientation: "landscape",
  },
  {
    id: "press-04",
    caption: "Press shot 04 — floor, La Station",
    credit: "Photo: Ilya Renko",
    src: IMAGES.crowdDance,
    orientation: "landscape",
  },
];

export const PRESS_QUOTES: PressQuote[] = [
  {
    quote:
      "Four hours that never once reached for the obvious — the rare closing set people talk about for weeks afterwards.",
    source: "Crack Magazine",
  },
  {
    quote:
      "Sub-Orbital is dub techno with the lights off: patient, physical, and completely uninterested in impressing you quickly.",
    source: "Resident Advisor — RA Recommends",
  },
  {
    quote: "One of the most convincing new voices coming out of Berlin's smaller rooms.",
    source: "Groove Magazin",
  },
];

export const RIDER: RiderSection[] = [
  {
    title: "DJ booth — required",
    items: [
      "2 × Pioneer CDJ-3000 (linked, latest firmware)",
      "1 × Pioneer DJM-900NXS2 or A9",
      "2 × Technics SL-1200 with working pitch + fresh Ortofon Concorde styli",
      "Booth monitor at head height, independently controllable",
      "Isolated, earthed power — no shared circuit with lighting",
    ],
  },
  {
    title: "Booth — preferred",
    items: [
      "Rotary mixer (Alpha Recording System / Model 1) where available",
      "Table space of at least 60 cm for a record bag",
      "Dimmable booth light, no strobes pointed at the DJ position",
    ],
  },
  {
    title: "Sound",
    items: [
      "Sound check access 60 minutes before doors, or 30 minutes before the set",
      "System capable of clean sub reproduction below 40 Hz",
      "Engineer present or reachable for the duration of the set",
    ],
  },
  {
    title: "Hospitality & travel",
    items: [
      "Return travel from BER, economy, booked no later than 21 days out",
      "Hotel within 20 minutes of the venue, late checkout where the set ends after 04:00",
      "2 × guest list, still water and a hot meal option on arrival",
      "Ground transfer between airport, hotel and venue",
    ],
  },
  {
    title: "Admin",
    items: [
      "Fee, currency and withholding tax confirmed in writing before announcement",
      "Artwork and billing to use the name EXPLORATION RECORDINGS in caps",
      "Recording of the set permitted with prior written agreement only",
    ],
  },
];

/* ─────────────────────────  ROSTER  ───────────────────────── */

/**
 * Artists listed on the About page.
 *
 * PLACEHOLDER: every name, handle and blurb below is invented. Replace with the
 * real roster before launch.
 *
 * PHOTOS: `photo` below is a STAND-IN — the site's own stock photography, so
 * the roster reads as finished. Drop a real file into assets/images/artists/
 * named after the `id` (halide.jpg, low-arc.jpg …) and it overrides the
 * stand-in automatically; nothing here needs deleting. See that folder's
 * README. An entry with neither shows a monogram tile.
 *
 * Four entries fill the grid's single row exactly; a fifth wraps onto a second.
 */
export const ROSTER: RosterArtist[] = [
  {
    id: "exploration-recordings",
    name: "Exploration Recordings",
    role: "DJ · Producer",
    basedIn: "Berlin, DE",
    since: "2021",
    blurb:
      "The founding project. Long-form sets at the low, dubbed-out end of techno, and the Lowlight Transmissions radio show.",
    photoPosition: "58% 26%",
    resident: true,
    links: [
      { label: "Music", href: "/music" },
      { label: "Bandcamp", href: "https://explorationrecordings.bandcamp.com" },
    ],
    bio: LONG_BIO,
    highlights: [
      { label: "Residency", value: "Lowlight Transmissions · Refuge Radio" },
      { label: "Releases", value: "2 EPs on Nightform, 2 self-released" },
      { label: "Sets", value: "2–6 hours · vinyl + USB" },
    ],
  },
  {
    id: "halide",
    name: "Halide",
    role: "Live",
    basedIn: "Glasgow, UK",
    since: "2023",
    blurb:
      "All-hardware live sets built on tape saturation and a modular rig that never plays the same way twice.",
    photoPosition: "50% 20%",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/halide" },
      { label: "Bandcamp", href: "https://halide.bandcamp.com" },
    ],
    bio: [
      "Halide plays live, and only live. The rig is a fixed set of machines — two drum boxes, a mono synth, a tape delay that has never quite been serviced — patched into a mixer and driven hard. Nothing is sequenced in advance, which means the set finds its shape somewhere in the first fifteen minutes or not at all.",
      "That approach came out of a decade in Glasgow's back rooms, where the sound systems reward low end and punish anything fussy. The records followed the sets rather than the other way around: two EPs cut from board recordings, mastered loud, with the mistakes left in.",
      "Joined the roster in 2023. Currently touring a version of the live set built for longer slots — closer to two hours, with far more space in the first half.",
    ],
    highlights: [
      { label: "Format", value: "Live hardware only — no laptop" },
      { label: "Releases", value: "2 EPs, both cut from board recordings" },
      { label: "Set length", value: "60–120 minutes" },
    ],
  },
  {
    id: "low-arc",
    name: "Low Arc",
    role: "Producer",
    basedIn: "Lisbon, PT",
    since: "2023",
    blurb:
      "Sub-heavy electro and broken rhythm records. Two EPs on the label and a standing residency at Cru.",
    photoPosition: "50% 24%",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/low-arc" },
      { label: "Resident Advisor", href: "https://ra.co/dj/lowarc" },
    ],
    bio: [
      "Low Arc makes records for rooms with proper sub. The productions sit between electro and broken techno — drum programming that swings rather than marches, and basslines carrying the melody because nothing else is asked to.",
      "Based in Lisbon since 2019, with a standing residency at Cru that runs long and starts slow. The residency is where most of the material gets tested: if it does not work at 2am on a floor that has heard everything, it does not get pressed.",
      "Two EPs on the label so far, with a third in mastering. Also produces for other artists, credited and uncredited.",
    ],
    highlights: [
      { label: "Residency", value: "Cru, Lisbon — monthly" },
      { label: "Releases", value: "2 EPs on the label, third in mastering" },
      { label: "Also", value: "Production and mix work for others" },
    ],
  },
  {
    id: "marisa-volt",
    name: "Marisa Volt",
    role: "DJ",
    basedIn: "Detroit, US",
    since: "2024",
    blurb:
      "Vinyl-only sets that run from Motor City electro into dub plates, often in the same hour.",
    photoPosition: "55% 28%",
    links: [
      { label: "Resident Advisor", href: "https://ra.co/dj/marisavolt" },
      { label: "Instagram", href: "https://instagram.com/marisavolt" },
    ],
    bio: [
      "Marisa Volt has played vinyl only since starting out, which is less a position than a working method: the bag is packed for a specific room, and what is not in it cannot be played. Sets move from Detroit electro into dub plates and back, often inside the same hour.",
      "Twenty years of records, a good share of them bought the week they came out, means the selection reaches further back than most. The through-line is rhythm rather than genre — anything with the right swing is fair game, whatever year it landed.",
      "Joined the roster in 2024 and tours Europe two weekends a month, usually in the closing slot.",
    ],
    highlights: [
      { label: "Format", value: "Vinyl only" },
      { label: "Usual slot", value: "Closing" },
      { label: "Touring", value: "Europe, two weekends a month" },
    ],
  },
];

export const GALLERY: GalleryItem[] = [
  { src: IMAGES.crowdConfetti, caption: "Kantine am Berghain — May 2026" },
  { src: IMAGES.crowdBooth, caption: "La Station, Paris — June 2026" },
  { src: IMAGES.radioDesk, caption: "Refuge Radio, Berlin — 2026" },
  { src: IMAGES.studioVinyl, caption: "Studio, Neukölln — 2025" },
];

/* ─────────────────────────  SITEWIDE  ───────────────────────── */

export const SOCIALS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/explorationrecordings", icon: "instagram", group: "social" },
  { label: "Resident Advisor", href: ARTIST.residentAdvisor, icon: "ra", group: "social" },
  { label: "SoundCloud", href: "https://soundcloud.com/explorationrecordings", icon: "soundcloud", group: "streaming" },
  { label: "Mixcloud", href: "https://mixcloud.com/explorationrecordings", icon: "youtube", group: "streaming" },
  { label: "Bandcamp", href: "https://explorationrecordings.bandcamp.com", icon: "bandcamp", group: "streaming" },
  { label: "Spotify", href: "https://open.spotify.com/artist/explorationrecordings", icon: "spotify", group: "streaming" },
];

/* ─────────────────────────  HELPERS  ───────────────────────── */

const parseDate = (iso: string) => new Date(`${iso}T00:00:00`);

/** Shows still to come, soonest first. */
export function upcomingShows(now: Date = new Date()): Show[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return SHOWS.filter((s) => parseDate(s.date) >= today).sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
  );
}

/** Shows already played, most recent first. */
export function pastShows(now: Date = new Date()): Show[] {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return SHOWS.filter((s) => parseDate(s.date) < today).sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
  );
}

export function latestMixes(count?: number): Mix[] {
  const sorted = [...MIXES].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
  );
  return count ? sorted.slice(0, count) : sorted;
}

export function formatShowDate(iso: string) {
  const d = parseDate(iso);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    year: String(d.getFullYear()),
    full: d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  };
}
