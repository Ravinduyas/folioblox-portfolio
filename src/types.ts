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

export interface RiderSection {
  title: string;
  items: string[];
}
