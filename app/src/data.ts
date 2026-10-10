import { IMAGES } from "./assets/images";
import {
  Audience,
  NewsItem,
  PressPhoto,
  PressQuote,
  Release,
  RiderSection,
  RosterArtist,
  Show,
  SiteSection,
  SocialLink,
} from "./types";

/**
 * Single place to rebrand the site. Everything user-facing reads from here.
 *
 * Label facts, releases, tracklists and artist bios below come from the label's
 * Proton Radio catalogue (protonradio.com/labels/4587). Email addresses are
 * still placeholders.
 */
export const ARTIST = {
  name: "EXPLORATION RECORDINGS",
  displayName: "Exploration Recordings",
  role: "Independent record label",
  basedIn: "Sri Lanka",
  founded: "2025",
  genres: ["Progressive house", "Deep progressive", "Melodic"],
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
  /** The label's catalogue page — where every release can be bought or streamed. */
  profileUrl: "https://www.protonradio.com/labels/4587/exploration-recordings",
  responseTime: "within 48 hours",
} as const;

/** Two-line bio used on the homepage and as the short EPK bio. */
export const SHORT_BIO =
  "Exploration Recordings is an independent progressive house label from Sri Lanka - a home for visionary artists and boundary-pushing sound, curating only tracks that transcend the ordinary.";

/** The label's own statement, from its Proton Radio profile. */
export const LONG_BIO = [
  "Exploration Recordings is a platform for visionary artists, a home for boundary-pushing sound. We curate only the most unique and specially crafted tracks that transcend the ordinary and speak to those who truly seek something deeper.",
  "This isn’t just a label; it’s a movement - a space for those who understand that music is more than sound. It’s an exploration of artistry, emotion and innovation.",
  "Founded in Sri Lanka in 2025 by Weligama producers JUNIOR and ALPHA21, the label opened its catalogue with the co-founders' own Time Machine EP, and followed it with the Liquid Aura EP alongside Poland's Sound Fusion - deep, driving progressive house, with remixes from Sri Lanka, Pakistan and Argentina.",
];

/* ────────────────────  SITE STRUCTURE  ──────────────────── */

/**
 * The site structure, encoded once and consumed by the nav and the footer, so
 * the two cannot drift apart. Order here is nav order.
 */
export const SECTIONS: SiteSection[] = [
  {
    label: "News",
    to: "/news",
    audience: "fan",
    contents: ["Announcements", "Release news"],
    purpose: "What's happening at the label, newest first.",
  },
  {
    label: "Releases",
    to: "/releases",
    audience: "fan",
    contents: ["Catalogue", "Tracklists", "Buy / stream"],
    purpose: "The full catalogue, with a way to buy every record.",
  },
  {
    label: "Artists",
    to: "/artists",
    audience: "neutral",
    contents: ["Roster", "Biographies"],
    purpose: "Everyone who has released or remixed on the label.",
  },
  {
    label: "Bookings",
    to: "/booking",
    audience: "industry",
    contents: ["Inquiry form", "Agents / mgmt"],
    purpose: "Book a label artist for your event.",
  },
  {
    label: "About Us",
    to: "/about",
    audience: "neutral",
    contents: ["The label", "Story", "Sound"],
    purpose: "Who we are and what we release.",
  },
  {
    label: "Demo Submission",
    to: "/demo",
    audience: "fan",
    contents: ["Submit a demo", "Demo guide"],
    purpose: "Send the label your finished tracks.",
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

/* ─────────────────────────  RELEASES  ───────────────────────── */

/** The catalogue, newest first. Tracklists and liner notes from Proton Radio. */
export const RELEASES: Release[] = [
  {
    id: "er002",
    title: "Liquid Aura",
    catalogue: "ER002",
    date: "2026-07-03",
    preOrderDate: "2026-06-17",
    artists: ["JUNIOR", "Sound Fusion"],
    genre: "Progressive house",
    artwork: IMAGES.coverER002,
    description: [
      "Exploration Recordings continues its journey with ER002, welcoming co-founder JUNIOR alongside Sound Fusion for a powerful five-track statement.",
      "The EP features two originals, “Liquid Aura” and “Bleeding Shadow”, both rooted in deep progressive textures, hypnotic rhythms and emotional storytelling. Liquid Aura flows with subtle tension and immersive atmospheres, while Bleeding Shadow dives darker, driven by pulsating basslines and haunting melodic layers.",
      "On remix duties, Stereo Munk delivers a refined and dynamic reinterpretation, Juani Ramirez adds his signature melodic depth and groove precision, and RNDØM crafts a rolling underground version that pushes the energy forward.",
      "This release represents what Exploration Recordings stands for: exploration through sound, crafted with intention.",
    ],
    url: "https://www.protonradio.com/releases/293837/liquid-aura",
    tracks: [
      { title: "Liquid Aura", version: "Original Mix", duration: "6:51" },
      { title: "Liquid Aura", version: "STEREO MUNK Remix", remixer: "STEREO MUNK", duration: "8:59" },
      { title: "Liquid Aura", version: "Juani Ramirez Remix", remixer: "Juani Ramirez", duration: "7:28" },
      { title: "Liquid Aura", version: "RNDØM Remix", remixer: "RNDØM", duration: "7:57" },
      { title: "Bleeding Shadow", version: "Original Mix", duration: "7:08" },
    ],
  },
  {
    id: "er001",
    title: "Time Machine",
    catalogue: "ER001",
    date: "2025-09-21",
    preOrderDate: "2025-08-27",
    artists: ["ALPHA21", "JUNIOR"],
    genre: "Progressive house",
    artwork: IMAGES.coverER001,
    description: [
      "Exploration Recordings opens its story with the debut EP from ALPHA21 & JUNIOR.",
      "Time Machine EP showcases their vision of deep, driving progressive house across two originals and two standout remixes.",
      "The title track Time Machine unfolds with hypnotic grooves and cinematic tension, while Gate 8 Journey offers a more atmospheric and melodic voyage. On remix duties, Rockka injects peak-time energy with a powerful melodic rework, and Imal SL strips the original into a rolling underground interpretation.",
      "A statement first release - setting the tone for the journeys ahead.",
    ],
    url: "https://www.protonradio.com/releases/270063/time-machine",
    tracks: [
      { title: "Time Machine", version: "Original Mix", duration: "7:40" },
      { title: "Time Machine", version: "Rockka Remix", remixer: "Rockka", duration: "7:05" },
      { title: "Time Machine", version: "Imal SL Remix", remixer: "Imal SL", duration: "7:37" },
      { title: "Gate 8 Journey", version: "Original Mix", duration: "7:35" },
    ],
  },
];

const TRACK_COUNT = RELEASES.reduce((sum, release) => sum + release.tracks.length, 0);

export const FACTS = [
  { label: "Based in", value: ARTIST.basedIn },
  { label: "Founded", value: ARTIST.founded },
  { label: "Sound", value: ARTIST.genres[0] },
  { label: "Catalogue", value: `${RELEASES.length} EPs · ${TRACK_COUNT} tracks` },
];

/* ─────────────────────────  NEWS  ───────────────────────── */

/**
 * Label announcements, newest first. The homepage hero auto-slides through
 * these, so every item needs a wide `image`; `cover` adds release artwork.
 */
export const NEWS: NewsItem[] = [
  {
    id: "liquid-aura-out-now",
    date: "2026-07-03",
    category: "Release",
    title: "Liquid Aura EP is out now",
    excerpt:
      "ER002 lands: JUNIOR & Sound Fusion with two deep progressive originals, plus remixes from Stereo Munk, Juani Ramirez and RNDØM.",
    body: [
      "The label's second release is out now. ER002 pairs co-founder JUNIOR with Poland's Sound Fusion on two originals - the immersive, slow-burning Liquid Aura and the darker, bass-driven Bleeding Shadow.",
      "Three remixes widen the frame: Stereo Munk's refined and dynamic reinterpretation, Juani Ramirez's melodic, groove-locked take, and RNDØM's rolling underground version.",
      "Five tracks, nearly forty minutes of music, and the clearest statement yet of what the label stands for: exploration through sound, crafted with intention.",
    ],
    image: IMAGES.lasers,
    imagePosition: "60% 45%",
    cover: IMAGES.coverER002,
    releaseId: "er002",
  },
  {
    id: "er002-pre-order",
    date: "2026-06-17",
    category: "Pre-order",
    title: "ER002 pre-order: three remixers, three countries",
    excerpt:
      "Pre-orders open for Liquid Aura, with remixes from Pakistan's Stereo Munk, Argentina's Juani Ramirez and Sri Lanka's RNDØM. Out 3 July.",
    body: [
      "Pre-orders are open for ER002, the Liquid Aura EP from JUNIOR & Sound Fusion, ahead of its full release on 3 July 2026.",
      "The remix package reaches across three countries. Islamabad's Stereo Munk - supported by Hernan Cattaneo and Nick Warren - takes the longest version on the EP at nearly nine minutes. Argentina's Juani Ramirez brings melodic depth and groove precision, and Kalutara's RNDØM closes the remixes with a rolling underground cut.",
    ],
    image: IMAGES.overheadSmoke,
    cover: IMAGES.coverER002,
    releaseId: "er002",
  },
  {
    id: "time-machine-out-now",
    date: "2025-09-21",
    category: "Release",
    title: "Time Machine EP is out now",
    excerpt:
      "The label's debut, from co-founders ALPHA21 & JUNIOR: two originals, and remixes from Rockka and Imal SL.",
    body: [
      "ER001 is out. The debut release comes from the label's two co-founders, Weligama producers ALPHA21 and JUNIOR, on deep, driving progressive house.",
      "The title track unfolds with hypnotic grooves and cinematic tension, while Gate 8 Journey takes a more atmospheric, melodic route. Rockka's remix pushes Time Machine into peak-time territory, and Imal SL strips it back into a rolling underground interpretation.",
    ],
    image: IMAGES.heroBooth,
    imagePosition: "62% 42%",
    cover: IMAGES.coverER001,
    releaseId: "er001",
  },
  {
    id: "label-launch",
    date: "2025-08-27",
    category: "Label",
    title: "Exploration Recordings launches",
    excerpt:
      "A new home for boundary-pushing progressive house from Sri Lanka opens its catalogue - ER001 is up for pre-order now.",
    body: [
      "Exploration Recordings is a platform for visionary artists, a home for boundary-pushing sound. The label curates only the most unique and specially crafted tracks - music for those who truly seek something deeper.",
      "The first release, ER001 - ALPHA21 & JUNIOR's Time Machine EP - opens for pre-order today, ahead of its release on 21 September 2025.",
    ],
    image: IMAGES.crowdHands,
    cover: IMAGES.coverER001,
    releaseId: "er001",
  },
];


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
    setType: "Closing set - 4h",
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
    setType: "Extended set - 5h",
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
    setType: "Opening set - 3h",
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
    caption: "Press shot 01 - booth portrait",
    credit: "Photo: Lena Vogt",
    src: IMAGES.pressPortrait,
    orientation: "portrait",
  },
  {
    id: "press-02",
    caption: "Press shot 02 - live, green room lighting",
    credit: "Photo: Lena Vogt",
    src: IMAGES.pressGreen,
    orientation: "portrait",
  },
  {
    id: "press-03",
    caption: "Press shot 03 - main room, closing set",
    credit: "Photo: Ilya Renko",
    src: IMAGES.crowdHands,
    orientation: "landscape",
  },
  {
    id: "press-04",
    caption: "Press shot 04 - floor, La Station",
    credit: "Photo: Ilya Renko",
    src: IMAGES.crowdDance,
    orientation: "landscape",
  },
];

export const PRESS_QUOTES: PressQuote[] = [
  {
    quote:
      "Four hours that never once reached for the obvious - the rare closing set people talk about for weeks afterwards.",
    source: "Crack Magazine",
  },
  {
    quote:
      "Sub-Orbital is dub techno with the lights off: patient, physical, and completely uninterested in impressing you quickly.",
    source: "Resident Advisor - RA Recommends",
  },
  {
    quote: "One of the most convincing new voices coming out of Berlin's smaller rooms.",
    source: "Groove Magazin",
  },
];

export const RIDER: RiderSection[] = [
  {
    title: "DJ booth - required",
    items: [
      "2 × Pioneer CDJ-3000 (linked, latest firmware)",
      "1 × Pioneer DJM-900NXS2 or A9",
      "2 × Technics SL-1200 with working pitch + fresh Ortofon Concorde styli",
      "Booth monitor at head height, independently controllable",
      "Isolated, earthed power - no shared circuit with lighting",
    ],
  },
  {
    title: "Booth - preferred",
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
 * The label's artists, founders first. Bios are the artists' own.
 *
 * `basedIn` and `since` are optional — leave them out rather than guess, and
 * the cards and artist pages simply skip them.
 *
 * `name` must match the credit in RELEASES exactly — artist pages list their
 * releases on the label by matching it.
 *
 * LINKS: Instagram / Facebook are the profiles each artist lists on their own
 * SoundCloud page — artists who list none have none here. Social links come
 * first; the artist page shows them on the right of its hero strip.
 *
 * PHOTOS: drop a file into assets/images/artists/ named after the `id` and it
 * is picked up automatically; without one the card shows a monogram tile. See
 * that folder's README.
 */
export const ROSTER: RosterArtist[] = [
  {
    id: "junior-sl",
    name: "JUNIOR",
    role: "Co-founder · DJ · Producer",
    basedIn: "Weligama, Sri Lanka",
    since: "2025",
    blurb:
      "Label co-founder. Emotional, soulful progressive house from Weligama, on both of the label's releases so far.",
    resident: true,
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/juniorlkofficial" },
      { label: "Proton", href: "https://www.protonradio.com/artists/62896/junior-sl" },
    ],
    bio: [
      "JUNIOR is a highly talented DJ and producer hailing from Weligama, Sri Lanka. From an early age, he developed a deep passion for music and began to experiment with different genres and styles. His love for electronic music led him to pursue a career as a DJ and producer, and he quickly made a name for himself as one of the most promising talents in the industry.",
      "Over the years, JUNIOR has honed his skills as a DJ, blending a range of different sounds and styles to create a unique and captivating sound. His sets are known for their energy, creativity and technical proficiency, and he has built a dedicated fanbase both in Sri Lanka and around the world.",
      "In addition to his work as a DJ, JUNIOR is also an accomplished producer, with a string of successful releases under his belt. He has been signed to a number of respected labels, including Electronic Tree, Big Toys Production and Droid9, and his music has been supported by some of the biggest names in the industry.",
      "What sets JUNIOR apart as a producer is his ability to infuse his music with emotion and soul. He is a true artist, always creating music from the heart and pouring his own experiences and emotions into each track. Whether he's working on a deep, melancholic house track or a more upbeat, dancefloor-friendly number, he always strives to make music that connects with people on a deep and emotional level.",
      "As his career has continued to evolve, JUNIOR has remained true to his roots, drawing inspiration from his Sri Lankan heritage and incorporating elements of traditional music into his productions. He is a passionate advocate for the local music scene and has worked tirelessly to promote and support emerging talent in his home country.",
      "Looking to the future, JUNIOR shows no signs of slowing down. He is committed to continuing to push the boundaries of his art and to create music that speaks to the heart and soul of his listeners. His dedication, talent and passion make him one of the most exciting and promising artists in the electronic music scene today, and we can't wait to see what he has in store next.",
    ],
    highlights: [
      { label: "On the label", value: "Co-founder · ER001 & ER002" },
      { label: "Also on", value: "Electronic Tree · Big Toys Production · Droid9" },
      { label: "Home", value: "Weligama, Sri Lanka" },
    ],
  },
  {
    id: "alpha21",
    name: "ALPHA21",
    role: "Co-founder · DJ · Producer",
    basedIn: "Weligama, Sri Lanka",
    since: "2025",
    blurb:
      "Label co-founder. Lush soundscapes and organic rhythms inspired by Sri Lanka's natural world; co-wrote the debut, Time Machine.",
    resident: true,
    links: [
      { label: "Facebook", href: "https://www.facebook.com/djalpha21official" },
      { label: "SoundCloud", href: "https://soundcloud.com/alpha21official" },
      { label: "Proton", href: "https://www.protonradio.com/artists/53254/alpha21" },
    ],
    bio: [
      "In the heart of Sri Lanka's Weligama lies a DJ and producer who goes by the name ALPHA21. His passion for music was sparked at an early age, but it was the serene beauty of nature that inspired him to create something truly unique. His sound is an embodiment of the natural world around him, with lush soundscapes and organic rhythms that transport listeners to another world.",
      "He's signed to some of the most renowned labels in the scene, including The Purr Music, Balkan Connection and Modern Agenda, and has shared the stage with names including Armen Miran, Eli Nissan, DJ Ruby, Emi Galvan, Dmitry Molosh, Ezequiel Arias, Darin Epsilon, Blanka Barbara, Forty Cats, Alar, Aaron Suiss and Matan Caspi.",
      "He spends countless hours in the studio perfecting his sound, always striving to create something that's never been heard before. When he isn't in the studio or playing gigs, he can be found exploring the natural wonders of Sri Lanka - from the jungles to the Indian Ocean - and he's dedicated to using his music to spread awareness about environmental issues.",
      "In 2025 he co-founded Exploration Recordings with fellow Weligama producer JUNIOR, and the pair's Time Machine EP became the label's first release.",
    ],
    highlights: [
      { label: "On the label", value: "Co-founder · ER001 Time Machine" },
      { label: "Also on", value: "BC2 · Another Life Music · AH Digital" },
      { label: "Active since", value: "2019 · 122 tracks on Proton" },
    ],
  },
  {
    id: "esh-sl",
    photoPosition: "50% 14%",
    name: "ESH (SL)",
    role: "DJ · Producer",
    basedIn: "Sri Lanka",
    blurb:
      "Progressive and organic house - hypnotic grooves, atmospheric textures and melodic depth, shaped by years of DJing in Dubai.",
    links: [],
    bio: [
      "ESH (SL) is a Sri Lanka–based DJ and producer specialising in Progressive and Organic House. His journey began in Sri Lanka in 2018, followed by performances across Dubai from 2019 to 2024, where he developed a strong understanding of crowd energy and immersive DJ sets.",
      "Since moving into production in 2024, ESH (SL) has shaped a sound built around hypnotic grooves, atmospheric textures, dark ambient elements and melodic depth. His music blends years of dancefloor experience with modern Progressive and Organic House storytelling, creating emotional journeys designed for both clubs and personal listening.",
    ],
    highlights: [
      { label: "Sound", value: "Progressive · Organic House" },
      { label: "DJing", value: "Since 2018 · Dubai 2019–2024" },
      { label: "Producing", value: "Since 2024" },
    ],
  },
  {
    id: "c-groove",
    photoPosition: "50% 22%",
    name: "C-Groove",
    role: "DJ · Producer",
    blurb: "Rooted in the electronic scene since 2014 - driven by passion, dedication and a love for underground sound.",
    links: [],
    bio: [
      "C-Groove is a DJ and producer who has been deeply rooted in the electronic music scene since 2014. From the very beginning, his journey has been driven by pure passion, dedication and an unwavering love for underground sound. Always present in the scene, always evolving.",
    ],
    highlights: [
      { label: "In the scene", value: "Since 2014" },
      { label: "Sound", value: "Underground electronic" },
      { label: "Role", value: "DJ · Producer" },
    ],
  },
  {
    id: "dlc",
    photoPosition: "50% 18%",
    name: "DLC",
    role: "Artist",
    basedIn: "South coast, Sri Lanka",
    blurb:
      "Melodic, driving progressive house built for peak time, from the south coast of Sri Lanka - shaped by a life spent surfing.",
    links: [],
    bio: [
      "DLC is a progressive house artist from the south coast of Sri Lanka, who began his musical journey in 2016, shaping melodic, driving soundscapes built for peak-time energy. A passionate surfer, his connection to the ocean influences his sound, blending flow, rhythm and energy into every track.",
      "With a strong focus on groove, emotion and atmosphere, his music combines powerful drops with immersive breakdowns designed for both club and festival settings.",
      "Working closely with producers under his creative direction, DLC crafts each release with a clear vision, delivering a consistent, modern sound that connects deeply on the dancefloor.",
    ],
    highlights: [
      { label: "Sound", value: "Melodic, peak-time progressive" },
      { label: "Active since", value: "2016" },
      { label: "Home", value: "South coast, Sri Lanka" },
    ],
  },
];

/** "Weligama, Sri Lanka · on the label since 2025" — whichever parts are known. */
export const artistMeta = (artist: RosterArtist) =>
  [artist.basedIn, artist.since && `on the label since ${artist.since}`].filter(Boolean).join(" · ");


/* ─────────────────────────  SITEWIDE  ───────────────────────── */

/**
 * The Proton Radio link is real. The Instagram / SoundCloud / Bandcamp /
 * Spotify handles are PLACEHOLDERS in the right shape — swap in the label's.
 */
export const SOCIALS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/explorationrecordings", icon: "instagram", group: "social" },
  { label: "Proton Radio", href: ARTIST.profileUrl, icon: "proton", group: "social" },
  { label: "Proton Radio", href: ARTIST.profileUrl, icon: "proton", group: "streaming" },
  { label: "SoundCloud", href: "https://soundcloud.com/explorationrecordings", icon: "soundcloud", group: "streaming" },
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

export function formatShowDate(iso: string) {
  const d = parseDate(iso);
  return {
    day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    year: String(d.getFullYear()),
    full: d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  };
}

/** News, newest first — the order the homepage slider plays in. */
export function latestNews(count?: number): NewsItem[] {
  const sorted = [...NEWS].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
  );
  return count ? sorted.slice(0, count) : sorted;
}

export const findRelease = (id?: string) => RELEASES.find((release) => release.id === id);

/** Roster entry for a credited name, so credits can link to artist pages. */
export const findArtistByName = (name: string) => ROSTER.find((artist) => artist.name === name);

/** Releases an artist appears on, as an original artist or a remixer. */
export function releasesFor(name: string): Release[] {
  return RELEASES.filter(
    (release) =>
      release.artists.includes(name) || release.tracks.some((track) => track.remixer === name),
  );
}

/** "JUNIOR & Sound Fusion" */
export const billing = (release: Release) => release.artists.join(" & ");

/* ─────────────────────────  FAQ (AEO)  ───────────────────────── */

/** ["A", "B", "C"] → "A, B and C" */
const listJoin = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/**
 * Plain-language answers to the questions people actually ask about the label.
 * Shown on the About page and marked up as FAQPage, so search engines and AI
 * assistants can quote them directly. Built from the data above, so answers
 * never drift from the catalogue.
 */
export const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is Exploration Recordings?",
    answer: `Exploration Recordings is an independent progressive house record label from Sri Lanka, founded in ${ARTIST.founded} by Weligama producers JUNIOR and ALPHA21. It releases deep, driving, melodic progressive house from Sri Lankan and international artists, and every release is available on Proton Radio.`,
  },
  {
    question: "Who founded Exploration Recordings?",
    answer:
      "Exploration Recordings was co-founded in 2025 by JUNIOR and ALPHA21, two progressive house DJs and producers from Weligama, Sri Lanka. Their Time Machine EP was the label's first release.",
  },
  {
    question: "Where is Exploration Recordings based?",
    answer:
      "The label is based in Sri Lanka. Co-founders JUNIOR and ALPHA21 are from Weligama, DLC is from the south coast, and ESH (SL) is Sri Lanka–based after years performing in Dubai. Releases also feature collaborators and remixers from Poland, Pakistan and Argentina.",
  },
  {
    question: "What has Exploration Recordings released?",
    answer: `${RELEASES.length} EPs so far: ${[...RELEASES]
      .reverse()
      .map(
        (release) =>
          `${release.catalogue} ${release.title} by ${release.artists.join(" & ")} (${formatShowDate(release.date).full}), with remixes from ${listJoin(
            release.tracks.flatMap((track) => (track.remixer ? [track.remixer] : [])),
          )}`,
      )
      .join("; ")}.`,
  },
  {
    question: "What kind of music does the label release?",
    answer:
      "Progressive house - deep textures, hypnotic rhythms and emotional, melodic storytelling, from slow-burning atmospheric originals to rolling underground and peak-time remixes. The label curates only unique, specially crafted tracks.",
  },
  {
    question: "Where can I buy or stream Exploration Recordings releases?",
    answer:
      "Every release is on Proton Radio, where you can buy or stream each EP and its individual tracks. Each release on this site links straight to its Proton Radio page.",
  },
  {
    question: "How do I book an Exploration Recordings artist?",
    answer: `Use the booking form: choose an artist (or leave it open for a recommendation), add the date, city, venue and fee offer, and the label replies ${ARTIST.responseTime} with availability.`,
  },
  {
    question: "How do I submit a demo to Exploration Recordings?",
    answer:
      "Use the Demo Submission page on this site. Send finished tracks only, each with a title, in one private SoundCloud link - no downloads or attachments. Every demo gets listened to and answered.",
  },
];
