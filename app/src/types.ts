export type Platform = "SoundCloud" | "Mixcloud" | "Bandcamp" | "YouTube" | "Spotify";

export interface Track {
  title: string;
  /** "Original Mix", "Rockka Remix" … */
  version: string;
  /** Remixer, when the version is a remix — links to their roster page. */
  remixer?: string;
  /** "7:40" */
  duration: string;
}

/** A label release, as catalogued on Proton Radio. */
export interface Release {
  id: string;
  title: string;
  /** "ER002" */
  catalogue: string;
  /** ISO release date. */
  date: string;
  /** ISO pre-order date, where there was one. */
  preOrderDate?: string;
  /** Headline (original) artists, in billing order. */
  artists: string[];
  genre: string;
  artwork: string;
  /** Liner notes, one string per paragraph. */
  description: string[];
  /** The release on Proton Radio — buy / stream links live there. */
  url: string;
  tracks: Track[];
}

/** A label announcement — the homepage hero slides through the newest. */
export interface NewsItem {
  id: string;
  /** ISO date. */
  date: string;
  category: "Release" | "Pre-order" | "Label";
  title: string;
  /** One or two sentences — shown on the slider and the news cards. */
  excerpt: string;
  /** Full story, one string per paragraph. */
  body: string[];
  /** Wide backdrop photo for the hero slide. */
  image: string;
  /** objectPosition for the backdrop crop. */
  imagePosition?: string;
  /** Square artwork shown beside the headline, usually a release cover. */
  cover?: string;
  /** Catalogue release this story is about, if any. */
  releaseId?: string;
}

export type ShowStatus = "on-sale" | "sold-out" | "tba";

export interface Show {
  id: string;
  /** ISO date — the single source of truth for upcoming vs past. */
  date: string;
  event: string;
  venue: string;
  city: string;
  country: string;
  status: ShowStatus;
  ticketUrl?: string;
  setType: string;
  lineup?: string[];
}

export interface PressQuote {
  quote: string;
  source: string;
  url?: string;
}

export interface PressPhoto {
  id: string;
  caption: string;
  credit: string;
  src: string;
  orientation: "portrait" | "landscape";
}

/** An artist listed on the About page roster. */
export interface RosterArtist {
  id: string;
  name: string;
  /** "DJ · Producer", "Live", "Producer" … */
  role: string;
  /** Leave out when unknown — never guess. */
  basedIn?: string;
  /** Year they joined the roster. Leave out when unknown. */
  since?: string;
  blurb: string;
  /**
   * Stand-in press shot. A file dropped into assets/images/artists/ named
   * after this artist's `id` overrides it. Without either, the card shows a
   * monogram tile.
   */
  photo?: string;
  /** object-position for the crop, e.g. "60% 22%". Defaults to centre-ish. */
  photoPosition?: string;
  /** Flags the label's founders so they sort and read first. */
  resident?: boolean;
  links: { label: string; href: string }[];
  /** Long-form biography, one string per paragraph — their own page. */
  bio: string[];
  /** Career markers shown as a strip on the biography page. */
  highlights: { label: string; value: string }[];
}

export interface GalleryItem {
  src: string;
  caption: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** lucide-react icon name resolved in the Footer/Nav. */
  icon: "instagram" | "soundcloud" | "bandcamp" | "spotify" | "youtube" | "mail" | "ra" | "proton";
  group: "social" | "streaming";
}

/**
 * Who a section is built for. Straight from the architecture's legend:
 * fan-facing pulls listeners deeper, industry lets bookers self-serve, and
 * About is the neutral bridge between the two.
 */
export type Audience = "fan" | "neutral" | "industry";

export interface SiteSection {
  label: string;
  to: string;
  audience: Audience;
  /** The sub-items the architecture files under this section. */
  contents: string[];
  /** The job this section does, in the architecture's terms. */
  purpose: string;
  /** Hidden from the main nav (still listed in the footer). */
  navHidden?: boolean;
}

export interface RiderSection {
  title: string;
  items: string[];
}
