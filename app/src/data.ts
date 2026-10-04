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
  "Exploration Recordings is an independent progressive house label from Sri Lanka — a home for visionary artists and boundary-pushing sound, curating only tracks that transcend the ordinary.";

/** The label's own statement, from its Proton Radio profile. */
export const LONG_BIO = [
  "Exploration Recordings is a platform for visionary artists, a home for boundary-pushing sound. We curate only the most unique and specially crafted tracks that transcend the ordinary and speak to those who truly seek something deeper.",
  "This isn’t just a label; it’s a movement — a space for those who understand that music is more than sound. It’s an exploration of artistry, emotion and innovation.",
  "Founded in Sri Lanka in 2025 and co-founded by JUNIOR (SL), the label opened its catalogue with ALPHA21 & JUNIOR (SL)'s Time Machine EP, and followed it with the Liquid Aura EP alongside Poland's Sound Fusion — deep, driving progressive house, with remixes from Sri Lanka, Pakistan and Argentina.",
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
    label: "Contact Us",
    to: "/contact",
    audience: "neutral",
    contents: ["Email", "Demos", "Message"],
    purpose: "Get in touch — general, press or demos.",
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
    artists: ["JUNIOR (SL)", "Sound Fusion"],
    genre: "Progressive house",
    artwork: IMAGES.coverER002,
    description: [
      "Exploration Recordings continues its journey with ER002, welcoming co-founder JUNIOR (SL) alongside Sound Fusion for a powerful five-track statement.",
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
    artists: ["ALPHA21", "JUNIOR (SL)"],
    genre: "Progressive house",
    artwork: IMAGES.coverER001,
    description: [
      "Exploration Recordings opens its story with the debut EP from ALPHA21 & JUNIOR (SL).",
      "Time Machine EP showcases their vision of deep, driving progressive house across two originals and two standout remixes.",
      "The title track Time Machine unfolds with hypnotic grooves and cinematic tension, while Gate 8 Journey offers a more atmospheric and melodic voyage. On remix duties, Rockka injects peak-time energy with a powerful melodic rework, and Imal SL strips the original into a rolling underground interpretation.",
      "A statement first release — setting the tone for the journeys ahead.",
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
      "ER002 lands: JUNIOR (SL) & Sound Fusion with two deep progressive originals, plus remixes from Stereo Munk, Juani Ramirez and RNDØM.",
    body: [
      "The label's second release is out now. ER002 pairs co-founder JUNIOR (SL) with Poland's Sound Fusion on two originals — the immersive, slow-burning Liquid Aura and the darker, bass-driven Bleeding Shadow.",
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
      "Pre-orders are open for ER002, the Liquid Aura EP from JUNIOR (SL) & Sound Fusion, ahead of its full release on 3 July 2026.",
      "The remix package reaches across three countries. Islamabad's Stereo Munk — supported by Hernan Cattaneo and Nick Warren — takes the longest version on the EP at nearly nine minutes. Argentina's Juani Ramirez brings melodic depth and groove precision, and Kalutara's RNDØM closes the remixes with a rolling underground cut.",
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
      "The label's debut: ALPHA21 & JUNIOR (SL) with two originals, and remixes from Rockka and Imal SL.",
    body: [
      "ER001 is out. The debut release pairs two Weligama producers, ALPHA21 and JUNIOR (SL), on deep, driving progressive house.",
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
      "A new home for boundary-pushing progressive house from Sri Lanka opens its catalogue — ER001 is up for pre-order now.",
    body: [
      "Exploration Recordings is a platform for visionary artists, a home for boundary-pushing sound. The label curates only the most unique and specially crafted tracks — music for those who truly seek something deeper.",
      "The first release, ER001 — ALPHA21 & JUNIOR (SL)'s Time Machine EP — opens for pre-order today, ahead of its release on 21 September 2025.",
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
 * Everyone who has released or remixed on the label, founders first. Bios are
 * the artists' own, from their Proton Radio profiles; the two artists without
 * one (Sound Fusion, Juani Ramirez) have a short factual bio from their
 * catalogue instead.
 *
 * `name` must match the credit in RELEASES exactly — artist pages list their
 * releases on the label by matching it.
 *
 * PHOTOS: each artist's Proton avatar lives in assets/images/artists/ named
 * after the `id`, and is picked up automatically. See that folder's README.
 */
export const ROSTER: RosterArtist[] = [
  {
    id: "junior-sl",
    name: "JUNIOR (SL)",
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
      "Junior (SL) is a DJ and producer hailing from Weligama, Sri Lanka. From an early age he developed a deep passion for music and began to experiment with different genres and styles. His love for electronic music led him to pursue a career as a DJ and producer, and he quickly made a name for himself as one of the most promising talents in the scene.",
      "His sets are known for their energy, creativity and technical proficiency, and he has built a dedicated fanbase both in Sri Lanka and around the world. As a producer he has been signed to respected labels including Electronic Tree, Big Toys Production and Droid9, and his music has been supported by some of the biggest names in the industry.",
      "What sets Junior apart is his ability to infuse his music with emotion and soul. Whether he's working on a deep, melancholic house track or a more upbeat, dancefloor-friendly number, he strives to make music that connects with people on a deep and emotional level.",
      "He has remained true to his roots, drawing inspiration from his Sri Lankan heritage and incorporating elements of traditional music into his productions. A passionate advocate for the local scene, he has worked tirelessly to promote and support emerging talent in his home country — work that continues through Exploration Recordings, which he co-founded in 2025.",
    ],
    highlights: [
      { label: "On the label", value: "Co-founder · ER001 & ER002" },
      { label: "Also on", value: "Droid9 · COMET Records · AH Digital" },
      { label: "Active since", value: "2021 · 47 tracks on Proton" },
    ],
  },
  {
    id: "alpha21",
    name: "ALPHA21",
    role: "DJ · Producer",
    basedIn: "Weligama, Sri Lanka",
    since: "2025",
    blurb:
      "Lush soundscapes and organic rhythms inspired by Sri Lanka's natural world. Co-wrote the label's debut, Time Machine.",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/alpha21official" },
      { label: "Proton", href: "https://www.protonradio.com/artists/53254/alpha21" },
    ],
    bio: [
      "In the heart of Sri Lanka's Weligama lies a DJ and producer who goes by the name ALPHA21. His passion for music was sparked at an early age, but it was the serene beauty of nature that inspired him to create something truly unique. His sound is an embodiment of the natural world around him, with lush soundscapes and organic rhythms that transport listeners to another world.",
      "He's signed to some of the most renowned labels in the scene, including The Purr Music, Balkan Connection and Modern Agenda, and has shared the stage with names including Armen Miran, Eli Nissan, DJ Ruby, Emi Galvan, Dmitry Molosh, Ezequiel Arias, Darin Epsilon, Blanka Barbara, Forty Cats, Alar, Aaron Suiss and Matan Caspi.",
      "He spends countless hours in the studio perfecting his sound, always striving to create something that's never been heard before. When he isn't in the studio or playing gigs, he can be found exploring the natural wonders of Sri Lanka — from the jungles to the Indian Ocean — and he's dedicated to using his music to spread awareness about environmental issues.",
    ],
    highlights: [
      { label: "On the label", value: "ER001 — Time Machine EP" },
      { label: "Also on", value: "BC2 · Another Life Music · AH Digital" },
      { label: "Active since", value: "2019 · 122 tracks on Proton" },
    ],
  },
  {
    id: "sound-fusion",
    name: "Sound Fusion",
    role: "Producer",
    basedIn: "Poland",
    since: "2026",
    blurb:
      "Polish progressive house project, releasing since 2013. Co-wrote both originals on the Liquid Aura EP.",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/sound-fusion-music" },
      { label: "Proton", href: "https://www.protonradio.com/artists/16435/sound-fusion" },
    ],
    bio: [
      "Sound Fusion is a progressive house project from Poland, releasing since 2013, with more than ninety tracks catalogued on Proton Radio across labels including Electronic Tree, Addictive Sounds, Darkpload Records, AH Digital and Massive Harmony Records.",
      "Sound Fusion joined Exploration Recordings for ER002, co-writing both originals on the Liquid Aura EP — Liquid Aura and Bleeding Shadow — with label co-founder JUNIOR (SL).",
    ],
    highlights: [
      { label: "On the label", value: "ER002 — Liquid Aura EP" },
      { label: "Also on", value: "Electronic Tree · Addictive Sounds" },
      { label: "Active since", value: "2013 · 94 tracks on Proton" },
    ],
  },
  {
    id: "rockka",
    name: "Rockka",
    role: "Producer",
    basedIn: "Sri Lanka",
    since: "2025",
    blurb:
      "Lakith Adikaram — Sri Lankan progressive house producer behind the peak-time remix of Time Machine.",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/rockka01" },
      { label: "Proton", href: "https://www.protonradio.com/artists/52563/rockka" },
    ],
    bio: [
      "Music is a very interesting form of art that enhances emotions, imagination and physical movement. Progressive house has grown so much over the years and gained the attention of so many people around the world — and with influences like Guy J, Subandrio, Kyotto and John Cosani, it never fails to impress.",
      "Rockka, a.k.a. Lakith Adikaram, is a producer hailing from Sri Lanka. His music career began in 2018 as he set out to create beautiful moments with his music, with releases on labels such as Balkan Connection, Droid9 and Soundteller Records. Learning the ways of progressive house isn't always easy, but it's always satisfying to see the crowd dance to the music you dreamed of creating.",
    ],
    highlights: [
      { label: "On the label", value: "ER001 — Time Machine (Rockka Remix)" },
      { label: "Also on", value: "Mango Alley · Droid9 · AH Digital" },
      { label: "Active since", value: "2019 · 317 tracks on Proton" },
    ],
  },
  {
    id: "imal-sl",
    name: "Imal SL",
    role: "Producer",
    basedIn: "Sri Lanka",
    since: "2025",
    blurb:
      "Deep house, progressive house and progressive techno. Stripped Time Machine into a rolling underground remix.",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/imal-anjana-perera" },
      { label: "Proton", href: "https://www.protonradio.com/artists/59793/imal-sl" },
    ],
    bio: [
      "Enthralled by the joy music creates in the minds of its listeners, Imal set out to put smiles on the faces of audiences through his music. He took his first steps into the field in 2018, and has since mastered the skill of emoting through music.",
      "Although commercial music plays a key role in his home ground, Sri Lanka, Imal's interest has always lain in progressive music. Deep house, progressive house and progressive techno are his greatest strengths.",
    ],
    highlights: [
      { label: "On the label", value: "ER001 — Time Machine (Imal SL Remix)" },
      { label: "Also on", value: "AH Digital · Droid9 South America" },
      { label: "Active since", value: "2020 · 33 tracks on Proton" },
    ],
  },
  {
    id: "rndom",
    name: "RNDØM",
    role: "DJ · Producer",
    basedIn: "Kalutara, Sri Lanka",
    since: "2026",
    blurb:
      "Progressive and new progressive house from Kalutara. A rolling underground remix of Liquid Aura on ER002.",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/hirusha-akalanka" },
      { label: "Proton", href: "https://www.protonradio.com/artists/64745/rndom" },
    ],
    bio: [
      "RNDØM, born and raised in the vibrant city of Kalutara, Sri Lanka, has been on a musical journey since childhood. His passion for music ignited early on, but it wasn't until 2018 that he officially stepped into the industry. Specialising in progressive house and new progressive house, his sound is a fusion of melodic beats and soulful rhythms.",
      "His tracks have found homes on labels such as AH Digital, Massive Harmony, Soundteller, BC2, Another Life, La Foresta and Consapevole Recordings, among many more.",
      "He's also a dynamic DJ, known for electrifying performances, and has shared the stage with Roy Rosenfeld, Redspace, Sister Sweet, Kamilo Sanclemente and Amonita, among others.",
    ],
    highlights: [
      { label: "On the label", value: "ER002 — Liquid Aura (RNDØM Remix)" },
      { label: "Also on", value: "AH Digital · Big Bells Records" },
      { label: "Active since", value: "2021 · 34 tracks on Proton" },
    ],
  },
  {
    id: "stereo-munk",
    name: "STEREO MUNK",
    role: "DJ · Producer",
    basedIn: "Islamabad, Pakistan",
    since: "2026",
    blurb:
      "One of Pakistan's premier producers and DJs, supported by Hernan Cattaneo and Nick Warren. Remixed Liquid Aura.",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/stermunk" },
      { label: "Proton", href: "https://www.protonradio.com/artists/43860/stereo-munk" },
    ],
    bio: [
      "Muhammad Faisal, better known as Stereo Munk, is one of Pakistan's premier producers and DJs. Since 2000 he has crafted a signature blend of electronic music that defies genre boundaries — an ever-evolving auditory journey that resonates deeply with listeners.",
      "Hailing from Islamabad, he is known for innovative DJ sets and groundbreaking productions. His music is a narrative, a voyage through emotions and soundscapes rather than a collection of dancefloor hits — an approach that has earned him releases on Soundgarden, PlattenBank, Hoomidaas, Mango Alley, Movement, Balkan Connection and Juicebox, among others.",
      "His tracks have been supported by Hernan Cattaneo, Nick Warren, Emi Galvan and Armen Miran. With a focus on the underground and a passion for pushing boundaries, he continues to inspire and influence the global scene.",
    ],
    highlights: [
      { label: "On the label", value: "ER002 — Liquid Aura (STEREO MUNK Remix)" },
      { label: "Also on", value: "Mango Alley · BC2 · Soundteller Records" },
      { label: "Active since", value: "2017 · 119 tracks on Proton" },
    ],
  },
  {
    id: "juani-ramirez",
    name: "Juani Ramirez",
    role: "Producer",
    basedIn: "Argentina",
    since: "2026",
    blurb:
      "Argentinian progressive house producer. Brought melodic depth and groove precision to his Liquid Aura remix.",
    links: [
      { label: "SoundCloud", href: "https://soundcloud.com/juaniramirez" },
      { label: "Proton", href: "https://www.protonradio.com/artists/76359/juani-ramirez" },
    ],
    bio: [
      "Juani Ramirez is a progressive house producer from Argentina, releasing since 2022 on labels including SLC-6 Music, Future Avenue, Massive Harmony Records and Mango Alley.",
      "On ER002 he remixed Liquid Aura, adding his signature melodic depth and groove precision to the EP.",
    ],
    highlights: [
      { label: "On the label", value: "ER002 — Liquid Aura (Juani Ramirez Remix)" },
      { label: "Also on", value: "SLC-6 Music · Future Avenue" },
      { label: "Active since", value: "2022 · 34 tracks on Proton" },
    ],
  },
];

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

/** "JUNIOR (SL) & Sound Fusion" */
export const billing = (release: Release) => release.artists.join(" & ");
