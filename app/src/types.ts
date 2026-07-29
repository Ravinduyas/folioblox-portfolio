export type Platform = "SoundCloud" | "Mixcloud" | "Bandcamp" | "YouTube" | "Spotify";

/** A mix, live set or radio episode — always hosted on a platform, embedded here. */
export interface Mix {
  id: string;
  title: string;
  series: string;
  platform: Platform;
  /** Iframe src used by <EmbedPlayer>. Replace with the real embed URL. */
  embedUrl: string;
  /** Canonical page on the platform — used for the "open on …" fallback. */
  url: string;
  date: string;
  duration: string;
  artwork: string;
  tags: string[];
}

export interface Release {
  id: string;
  title: string;
  label: string;
  catalogue: string;
  year: string;
  format: string;
  artwork: string;
  platform: Platform;
  embedUrl: string;
  url: string;
  tracks: string[];
}

export interface RadioShow {
  name: string;
  station: string;
  schedule: string;
  description: string;
  url: string;
  platform: Platform;
  embedUrl: string;
  artwork: string;
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
  basedIn: string;
  /** Year they joined the roster. */
  since: string;
  blurb: string;
  /**
   * Stand-in press shot. A file dropped into assets/images/artists/ named
   * after this artist's `id` overrides it. Without either, the card shows a
   * monogram tile.
   */
  photo?: string;
  /** object-position for the crop, e.g. "60% 22%". Defaults to centre-ish. */
  photoPosition?: string;
  /** Flags the flagship project so it sorts and reads first. */
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
  icon: "instagram" | "soundcloud" | "bandcamp" | "spotify" | "youtube" | "mail" | "ra";
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
  /** Hidden from the main nav (it lives as the standing CTA instead). */
  navHidden?: boolean;
}

export interface RiderSection {
  title: string;
  items: string[];
}
