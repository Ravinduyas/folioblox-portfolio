import { IMAGES } from "./assets/images";
import {
  GalleryItem,
  Mix,
  PressPhoto,
  PressQuote,
  RadioShow,
  Release,
  RiderSection,
  Show,
  SocialLink,
} from "./types";

/**
 * Single place to rebrand the site. Everything user-facing reads from here.
 */
export const ARTIST = {
  name: "FOLIOBLOX",
  displayName: "Folioblox",
  role: "DJ · Producer",
  basedIn: "Berlin, DE",
  originally: "Melbourne, AU",
  genres: ["Deep techno", "Electro", "Breaks", "Dub"],
  bookingEmail: "bookings@folioblox.com",
  pressEmail: "press@folioblox.com",
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
  residentAdvisor: "https://ra.co/dj/folioblox",
  responseTime: "within 48 hours",
} as const;

/** Two-line bio used on the homepage and as the short EPK bio. */
export const SHORT_BIO =
  "Folioblox is a Berlin-based DJ and producer working the low, dubbed-out end of techno — long-form sets built on weight, patience and room-reading rather than peak-time shortcuts.";

export const LONG_BIO = [
  "Folioblox started out on Melbourne's warehouse circuit, playing the kind of six-hour opening sets that teach you restraint. A move to Berlin in 2022 sharpened that instinct: fewer records, more space between them, an ear for the moment a room tips over.",
  "The productions follow the same logic. Two EPs on Nightform and a self-released dub series have built a catalogue that sits between deep techno, electro and sound-system culture — drum machines pushed through tape, sub-bass doing the melodic work, arrangements that arrive rather than announce.",
  "Since 2024 the monthly Lowlight Transmissions show on Refuge Radio has become the clearest statement of that world: two hours of unreleased dubs, records pulled from the back of the bag, and no genre policing whatsoever.",
];

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
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=%2Ffolioblox%2Flowlight-transmissions-014%2F",
    url: "https://www.mixcloud.com/folioblox/lowlight-transmissions-014/",
    date: "2026-07-04",
    duration: "2h 02m",
    artwork: IMAGES.booth,
    tags: ["Dub techno", "Electro", "Unreleased"],
  },
  {
    id: "hors-serie-live",
    title: "Live at Hors Série — Closing",
    series: "Live set",
    platform: "SoundCloud",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/folioblox/hors-serie-closing&color=%23f25c27&hide_related=true&show_comments=false&visual=false",
    url: "https://soundcloud.com/folioblox/hors-serie-closing",
    date: "2026-06-14",
    duration: "3h 41m",
    artwork: IMAGES.hero,
    tags: ["Closing set", "Recorded live", "Paris"],
  },
  {
    id: "basalt-podcast-88",
    title: "Basalt Podcast 088",
    series: "Guest mix",
    platform: "SoundCloud",
    embedUrl:
      "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/basalt/podcast-088-folioblox&color=%23f25c27&hide_related=true&show_comments=false&visual=false",
    url: "https://soundcloud.com/basalt/podcast-088-folioblox",
    date: "2026-05-02",
    duration: "1h 12m",
    artwork: IMAGES.portrait,
    tags: ["Podcast", "Deep techno"],
  },
  {
    id: "lowlight-013",
    title: "Lowlight Transmissions 013",
    series: "Radio",
    platform: "Mixcloud",
    embedUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=%2Ffolioblox%2Flowlight-transmissions-013%2F",
    url: "https://www.mixcloud.com/folioblox/lowlight-transmissions-013/",
    date: "2026-06-06",
    duration: "2h 00m",
    artwork: IMAGES.still,
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
    artwork: IMAGES.still,
    platform: "Bandcamp",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=1234567890/size=large/bgcol=111214/linkcol=f25c27/tracklist=false/transparent=true/",
    url: "https://folioblox.bandcamp.com/album/sub-orbital-ep",
    tracks: ["Sub-Orbital", "Ground Station", "Null Island", "Sub-Orbital (Dub)"],
  },
  {
    id: "tape-dubs-vol-2",
    title: "Tape Dubs Vol. 2",
    label: "Self-released",
    catalogue: "TD002",
    year: "2025",
    format: "Digital",
    artwork: IMAGES.portrait,
    platform: "Bandcamp",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=1234567891/size=large/bgcol=111214/linkcol=f25c27/tracklist=false/transparent=true/",
    url: "https://folioblox.bandcamp.com/album/tape-dubs-vol-2",
    tracks: ["Ferrite", "Bias Current", "Head Gap", "Erase Pass"],
  },
  {
    id: "cold-storage",
    title: "Cold Storage",
    label: "Nightform",
    catalogue: "NGF007",
    year: "2024",
    format: "12\" vinyl",
    artwork: IMAGES.booth,
    platform: "Bandcamp",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=1234567892/size=large/bgcol=111214/linkcol=f25c27/tracklist=false/transparent=true/",
    url: "https://folioblox.bandcamp.com/album/cold-storage",
    tracks: ["Cold Storage", "Deadlift", "Anteroom"],
  },
];

export const RADIO: RadioShow = {
  name: "Lowlight Transmissions",
  station: "Refuge Radio",
  schedule: "First Saturday of the month · 23:00–01:00 CET",
  description:
    "Two hours a month with no brief: unreleased dubs, records that didn't fit the club, and long stretches where nothing much happens on purpose. Archived in full on Mixcloud.",
  url: "https://www.mixcloud.com/folioblox/",
  platform: "Mixcloud",
  embedUrl:
    "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&light=0&feed=%2Ffolioblox%2Flowlight-transmissions-014%2F",
  artwork: IMAGES.booth,
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
    lineup: ["Folioblox", "Ayako Mori", "Deadstock"],
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
    lineup: ["Folioblox", "Sunju Hargun"],
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
    caption: "Press shot 01 — live, Paris 2026",
    credit: "Photo: Lena Vogt",
    src: IMAGES.hero,
    orientation: "landscape",
  },
  {
    id: "press-02",
    caption: "Press shot 02 — booth portrait",
    credit: "Photo: Lena Vogt",
    src: IMAGES.booth,
    orientation: "portrait",
  },
  {
    id: "press-03",
    caption: "Press shot 03 — studio portrait",
    credit: "Photo: Ilya Renko",
    src: IMAGES.portrait,
    orientation: "portrait",
  },
  {
    id: "press-04",
    caption: "Press shot 04 — artwork still",
    credit: "Photo: Ilya Renko",
    src: IMAGES.still,
    orientation: "portrait",
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
      "Artwork and billing to use the name FOLIOBLOX in caps",
      "Recording of the set permitted with prior written agreement only",
    ],
  },
];

export const GALLERY: GalleryItem[] = [
  { src: IMAGES.hero, caption: "La Station, Paris — June 2026" },
  { src: IMAGES.booth, caption: "Refuge Radio, Berlin — 2026" },
  { src: IMAGES.portrait, caption: "Studio, Neukölln — 2025" },
  { src: IMAGES.still, caption: "Sub-Orbital EP artwork" },
];

/* ─────────────────────────  SITEWIDE  ───────────────────────── */

export const SOCIALS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/folioblox", icon: "instagram", group: "social" },
  { label: "Resident Advisor", href: ARTIST.residentAdvisor, icon: "ra", group: "social" },
  { label: "SoundCloud", href: "https://soundcloud.com/folioblox", icon: "soundcloud", group: "streaming" },
  { label: "Mixcloud", href: "https://mixcloud.com/folioblox", icon: "youtube", group: "streaming" },
  { label: "Bandcamp", href: "https://folioblox.bandcamp.com", icon: "bandcamp", group: "streaming" },
  { label: "Spotify", href: "https://open.spotify.com/artist/folioblox", icon: "spotify", group: "streaming" },
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
