/**
 * SEO / GEO / AEO — one source of truth for every page's head tags, structured
 * data, the sitemap and llms.txt.
 *
 * The build prerenders each route in ROUTES to static HTML with these tags
 * baked in (scripts/prerender.mjs), so crawlers and AI engines that don't run
 * JavaScript still get full content and metadata. In the browser, <Seo> in
 * App.tsx applies the same tags on every client-side navigation.
 *
 * Structured data only states facts the site can stand behind: placeholder
 * emails and social handles are deliberately left out of the JSON-LD.
 */
import { artistPhoto } from "./assets/artists";
import {
  ARTIST,
  FAQS,
  LONG_BIO,
  NEWS,
  RELEASES,
  ROSTER,
  SHORT_BIO,
  findArtistByName,
  findRelease,
  formatShowDate,
  latestNews,
  releasesFor,
} from "./data";
import { NewsItem, Release, RosterArtist } from "./types";

/** Host the site is published on — no trailing slash. */
export const ORIGIN = "https://ravinduyas.github.io";
/** The app's base path, matching Vite's `base`. */
export const BASE_PATH = "/folioblox-portfolio";
export const SITE_URL = `${ORIGIN}${BASE_PATH}`;

const SITE_NAME = ARTIST.displayName;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Every route the build prerenders, and the sitemap lists. */
export const ROUTES: string[] = [
  "/",
  "/news",
  ...NEWS.map((item) => `/news/${item.id}`),
  "/releases",
  "/artists",
  ...ROSTER.map((artist) => `/artists/${artist.id}`),
  "/booking",
  "/about",
  "/demo",
];

/** Left over from the single-artist site — reachable, but kept out of search. */
const NOINDEX = ["/shows", "/press"];

/* ─────────────────────────  URL helpers  ───────────────────────── */

/** Canonical URL for a route. Pages serves /news/index.html at /news/. */
export const pageUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`);

/** Absolute URL for a bundled asset (already base-prefixed by Vite). */
const assetUrl = (src: string) => (/^https?:/.test(src) ? src : `${ORIGIN}${src}`);

const LOGO_URL = `${SITE_URL}/logo.jpg`;

/** Adds the brand to a title, unless that pushes it past what results pages show. */
const branded = (title: string, sep = " - ") =>
  `${title}${sep}${SITE_NAME}`.length <= 60 ? `${title}${sep}${SITE_NAME}` : title;

/** "7:40" → "PT7M40S" */
const isoDuration = (duration: string) => {
  const [m, s] = duration.split(":").map(Number);
  return `PT${m}M${s}S`;
};

const artistId = (artist: RosterArtist) => `${pageUrl(`/artists/${artist.id}`)}#artist`;
const releaseId = (release: Release) => `${pageUrl("/releases")}#${release.id}`;

/* ─────────────────────────  JSON-LD builders  ───────────────────────── */

type Json = Record<string, unknown>;

/** The label as an entity — referenced by @id from everything else. */
function organization(): Json {
  const founders = ROSTER.filter((artist) => artist.resident);
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: ["EXPLORATION RECORDINGS", "EXPLRTN Recordings"],
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    image: LOGO_URL,
    description: SHORT_BIO,
    slogan: "Exploration through sound, crafted with intention.",
    foundingDate: ARTIST.founded,
    foundingLocation: { "@type": "Place", name: ARTIST.basedIn },
    areaServed: "Worldwide",
    knowsAbout: [...ARTIST.genres, "Electronic music", "Record label"],
    ...(founders.length ? { founder: founders.map((artist) => ({ "@id": artistId(artist) })) } : {}),
    sameAs: [ARTIST.profileUrl],
  };
}

function website(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SHORT_BIO,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

function artistEntity(artist: RosterArtist, full = false): Json {
  const photo = artistPhoto(artist.id, artist.photo);
  const external = artist.links.filter((link) => /^https?:/.test(link.href)).map((link) => link.href);
  return {
    "@type": "MusicGroup",
    "@id": artistId(artist),
    name: artist.name,
    url: pageUrl(`/artists/${artist.id}`),
    description: full ? artist.bio.join(" ") : artist.blurb,
    genre: "Progressive house",
    ...(photo ? { image: assetUrl(photo) } : {}),
    sameAs: external,
    ...(full
      ? {
          ...(artist.basedIn ? { foundingLocation: { "@type": "Place", name: artist.basedIn } } : {}),
          album: releasesFor(artist.name).map((release) => ({ "@id": releaseId(release) })),
        }
      : {}),
  };
}

function albumEntity(release: Release): Json {
  const byArtist = release.artists.map((name) => {
    const artist = findArtistByName(name);
    return artist ? { "@id": artistId(artist) } : { "@type": "MusicGroup", name };
  });
  return {
    "@type": "MusicAlbum",
    "@id": releaseId(release),
    name: `${release.title} EP`,
    albumReleaseType: "https://schema.org/EPRelease",
    byArtist,
    genre: release.genre,
    datePublished: release.date,
    image: assetUrl(release.artwork),
    description: release.description.join(" "),
    url: release.url,
    numTracks: release.tracks.length,
    albumRelease: {
      "@type": "MusicRelease",
      name: `${release.title} EP`,
      catalogNumber: release.catalogue,
      datePublished: release.date,
      recordLabel: { "@id": ORG_ID },
      musicReleaseFormat: "https://schema.org/DigitalFormat",
      url: release.url,
    },
    track: {
      "@type": "ItemList",
      numberOfItems: release.tracks.length,
      itemListElement: release.tracks.map((track, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "MusicRecording",
          name: `${track.title} (${track.version})`,
          duration: isoDuration(track.duration),
          byArtist,
          inAlbum: { "@id": releaseId(release) },
        },
      })),
    },
  };
}

function newsArticle(item: NewsItem): Json {
  const release = findRelease(item.releaseId);
  return {
    "@type": "NewsArticle",
    "@id": `${pageUrl(`/news/${item.id}`)}#article`,
    headline: item.title,
    description: item.excerpt,
    articleBody: item.body.join("\n\n"),
    datePublished: item.date,
    dateModified: item.date,
    image: [item.cover, item.image].filter(Boolean).map((src) => assetUrl(src!)),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: pageUrl(`/news/${item.id}`),
    articleSection: item.category,
    inLanguage: "en",
    ...(release ? { about: { "@id": releaseId(release) } } : {}),
  };
}

function breadcrumbs(trail: [string, string][]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as [string, string], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: pageUrl(path),
    })),
  };
}

function webPage(type: string, path: string, name: string, description: string, extra: Json = {}): Json {
  return {
    "@type": type,
    "@id": `${pageUrl(path)}#webpage`,
    url: pageUrl(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    ...extra,
  };
}

/* ─────────────────────────  Per-page SEO  ───────────────────────── */

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: "website" | "article" | "profile" | "music.album";
  noindex?: boolean;
  publishedTime?: string;
  jsonLd: Json[];
}

const latestRelease = RELEASES[0];
const DEFAULT_IMAGE = assetUrl(latestRelease.artwork);
const DEFAULT_IMAGE_ALT = `${latestRelease.title} EP artwork - ${latestRelease.artists.join(" & ")}`;

/** Title, description, social card and structured data for a route. */
export function pageSeo(rawPath: string): PageSeo {
  const path = rawPath.replace(/\/+$/, "") || "/";
  const base = { path, image: DEFAULT_IMAGE, imageAlt: DEFAULT_IMAGE_ALT, type: "website" as const };

  if (path === "/") {
    const description =
      "Exploration Recordings is an independent progressive house label from Sri Lanka. New releases, label news and the artists behind deep, melodic, boundary-pushing sound.";
    return {
      ...base,
      title: "Exploration Recordings - Progressive House Label, Sri Lanka",
      description,
      jsonLd: [
        organization(),
        website(),
        webPage("WebPage", "/", SITE_NAME, description, {
          about: { "@id": ORG_ID },
          primaryImageOfPage: DEFAULT_IMAGE,
          speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-speakable]"] },
        }),
      ],
    };
  }

  if (path === "/news") {
    const description =
      "Label news from Exploration Recordings: release announcements, pre-orders and updates from the Sri Lankan progressive house label, newest first.";
    return {
      ...base,
      title: "News - Exploration Recordings",
      description,
      jsonLd: [
        organization(),
        webPage("CollectionPage", path, "News", description, {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: latestNews().map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: pageUrl(`/news/${item.id}`),
              name: item.title,
            })),
          },
        }),
        breadcrumbs([["News", "/news"]]),
      ],
    };
  }

  const newsMatch = path.match(/^\/news\/([^/]+)$/);
  const item = newsMatch && NEWS.find((entry) => entry.id === newsMatch[1]);
  if (item) {
    const release = findRelease(item.releaseId);
    return {
      ...base,
      title: branded(item.title),
      description: item.excerpt,
      image: assetUrl(item.cover ?? item.image),
      imageAlt: release ? `${release.title} EP artwork` : item.title,
      type: "article",
      publishedTime: item.date,
      jsonLd: [
        organization(),
        newsArticle(item),
        ...(release ? [albumEntity(release)] : []),
        breadcrumbs([
          ["News", "/news"],
          [item.title, path],
        ]),
      ],
    };
  }

  if (path === "/releases") {
    const description = `The Exploration Recordings catalogue: ${RELEASES.map(
      (release) => `${release.catalogue} ${release.title} EP (${release.artists.join(" & ")})`,
    ).join(", ")} - tracklists, liner notes and where to buy.`;
    return {
      ...base,
      title: "Releases - Progressive House EPs | Exploration Recordings",
      description,
      type: "music.album",
      jsonLd: [
        organization(),
        webPage("CollectionPage", path, "Releases", description, {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: RELEASES.map((release, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@id": releaseId(release) },
            })),
          },
        }),
        ...RELEASES.map(albumEntity),
        breadcrumbs([["Releases", "/releases"]]),
      ],
    };
  }

  if (path === "/artists") {
    const description = `The Exploration Recordings roster: ${ROSTER.map((artist) => artist.name).join(", ")} - progressive and organic house DJs and producers from Sri Lanka.`;
    return {
      ...base,
      title: "Artists - Exploration Recordings Roster",
      description,
      jsonLd: [
        organization(),
        webPage("CollectionPage", path, "Artists", description, {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: ROSTER.map((artist, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: artistEntity(artist),
            })),
          },
        }),
        breadcrumbs([["Artists", "/artists"]]),
      ],
    };
  }

  const artistMatch = path.match(/^\/artists\/([^/]+)$/);
  const artist = artistMatch && ROSTER.find((entry) => entry.id === artistMatch[1]);
  if (artist) {
    const photo = artistPhoto(artist.id, artist.photo);
    return {
      ...base,
      title: branded(`${artist.name} - ${artist.role}`, " | "),
      description: artist.basedIn ? `${artist.name} (${artist.basedIn}): ${artist.blurb}` : `${artist.name}: ${artist.blurb}`,
      image: photo ? assetUrl(photo) : DEFAULT_IMAGE,
      imageAlt: artist.name,
      type: "profile",
      jsonLd: [
        organization(),
        webPage("ProfilePage", path, artist.name, artist.blurb, { mainEntity: { "@id": artistId(artist) } }),
        artistEntity(artist, true),
        breadcrumbs([
          ["Artists", "/artists"],
          [artist.name, path],
        ]),
      ],
    };
  }

  if (path === "/booking") {
    const description = `Book an Exploration Recordings artist for your event - ${ROSTER.length} progressive house DJs and producers. Send an enquiry and get availability and a fee back ${ARTIST.responseTime}.`;
    return {
      ...base,
      title: "Book an Artist - Exploration Recordings",
      description,
      jsonLd: [organization(), webPage("WebPage", path, "Bookings", description), breadcrumbs([["Bookings", "/booking"]])],
    };
  }

  if (path === "/about") {
    const description = `About Exploration Recordings: an independent progressive house label founded in Sri Lanka in ${ARTIST.founded} by JUNIOR and ALPHA21. Our story, our sound, the catalogue and FAQs.`;
    return {
      ...base,
      title: "About Exploration Recordings - Sri Lankan Progressive House Label",
      description,
      image: LOGO_URL,
      imageAlt: `${SITE_NAME} logo`,
      jsonLd: [
        organization(),
        webPage("AboutPage", path, `About ${SITE_NAME}`, description, { about: { "@id": ORG_ID } }),
        {
          "@type": "FAQPage",
          "@id": `${pageUrl(path)}#faq`,
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
        breadcrumbs([["About Us", "/about"]]),
      ],
    };
  }

  if (path === "/demo") {
    const description =
      "Submit a demo to Exploration Recordings, the Sri Lankan progressive house label. Send finished, titled tracks in one private SoundCloud link - every demo gets a reply.";
    return {
      ...base,
      title: "Submit a Demo - Exploration Recordings",
      description,
      jsonLd: [
        organization(),
        webPage("WebPage", path, "Demo Submission", description, { about: { "@id": ORG_ID } }),
        breadcrumbs([["Demo Submission", "/demo"]]),
      ],
    };
  }

  // Unknown or legacy route: still titled, never indexed.
  return {
    ...base,
    title: SITE_NAME,
    description: SHORT_BIO,
    noindex: true,
    jsonLd: NOINDEX.includes(path) ? [] : [organization()],
  };
}

/* ─────────────────────────  Head tags  ───────────────────────── */

export interface HeadTag {
  tag: "meta" | "link";
  attrs: Record<string, string>;
}

/** Every tag <Seo> manages, in one list — server and client render the same set. */
export function headTags(seo: PageSeo): HeadTag[] {
  const url = pageUrl(seo.path);
  const meta = (key: "name" | "property", id: string, content: string): HeadTag => ({
    tag: "meta",
    attrs: { [key]: id, content },
  });
  return [
    meta("name", "description", seo.description),
    meta("name", "robots", seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"),
    { tag: "link", attrs: { rel: "canonical", href: url } },
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:locale", "en_US"),
    meta("property", "og:type", seo.type),
    meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description),
    meta("property", "og:url", url),
    meta("property", "og:image", seo.image),
    meta("property", "og:image:alt", seo.imageAlt),
    ...(seo.publishedTime ? [meta("property", "article:published_time", seo.publishedTime)] : []),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", seo.image),
    meta("name", "twitter:image:alt", seo.imageAlt),
  ];
}

/** One @graph so every entity can reference the label by @id. */
export const jsonLdGraph = (seo: PageSeo) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": seo.jsonLd }).replace(/</g, "\\u003c");

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The head block the prerender bakes into each page's HTML. */
export function headHtml(path: string): string {
  const seo = pageSeo(path);
  const tags = headTags(seo).map(
    ({ tag, attrs }) =>
      `<${tag} ${Object.entries(attrs)
        .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
        .join(" ")} data-seo />`,
  );
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    ...tags,
    ...(seo.jsonLd.length ? [`<script type="application/ld+json" data-seo>${jsonLdGraph(seo)}</script>`] : []),
  ].join("\n    ");
}

/* ─────────────────────────  Sitemap & llms.txt  ───────────────────────── */

/** Newest content date — the honest lastmod for pages that list everything. */
const SITE_UPDATED = [...NEWS.map((item) => item.date), ...RELEASES.map((release) => release.date)].sort().pop()!;

function lastModified(path: string): string {
  const news = NEWS.find((item) => path === `/news/${item.id}`);
  if (news) return news.date;
  const artist = ROSTER.find((entry) => path === `/artists/${entry.id}`);
  if (artist) {
    const dates = releasesFor(artist.name).map((release) => release.date).sort();
    return dates.pop() ?? SITE_UPDATED;
  }
  return SITE_UPDATED;
}

export function sitemapXml(): string {
  const urls = ROUTES.map((path) => {
    const priority = path === "/" ? "1.0" : path.split("/").length > 2 ? "0.7" : "0.8";
    return `  <url>\n    <loc>${pageUrl(path)}</loc>\n    <lastmod>${lastModified(path)}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

/**
 * llms.txt (llmstxt.org) — a plain-text brief for AI assistants and answer
 * engines: who the label is, the facts, the catalogue and where to look next.
 */
export function llmsTxt(): string {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SHORT_BIO}`,
    "",
    ...LONG_BIO.flatMap((para) => [para, ""]),
    "## Key facts",
    "",
    `- Type: independent record label`,
    `- Based in: ${ARTIST.basedIn}`,
    `- Founded: ${ARTIST.founded}`,
    `- Co-founders: ${ROSTER.filter((artist) => artist.resident).map((artist) => artist.name).join(" and ")}`,
    `- Genre: ${ARTIST.genres.join(", ")}`,
    `- Catalogue: ${RELEASES.length} EPs, ${RELEASES.reduce((n, r) => n + r.tracks.length, 0)} tracks`,
    `- Releases available on: Proton Radio (${ARTIST.profileUrl})`,
    `- Website: ${SITE_URL}/`,
    "",
    "## Releases",
    "",
  ];
  for (const release of RELEASES) {
    lines.push(
      `### ${release.catalogue} - ${release.title} EP - ${release.artists.join(" & ")}`,
      "",
      `Released ${formatShowDate(release.date).full}. ${release.genre}. Buy / stream: ${release.url}`,
      "",
      release.description.join(" "),
      "",
      ...release.tracks.map((track, i) => `${i + 1}. ${track.title} (${track.version}) - ${track.duration}`),
      "",
    );
  }
  lines.push("## Artists", "");
  for (const artist of ROSTER) {
    lines.push(`- [${artist.name}](${pageUrl(`/artists/${artist.id}`)}): ${[artist.role, artist.basedIn].filter(Boolean).join(", ")}. ${artist.blurb}`);
  }
  lines.push("", "## Frequently asked questions", "");
  for (const faq of FAQS) lines.push(`### ${faq.question}`, "", faq.answer, "");
  lines.push(
    "## Pages",
    "",
    `- [News](${pageUrl("/news")}): release announcements and label news`,
    ...latestNews().map((item) => `  - [${item.title}](${pageUrl(`/news/${item.id}`)}) (${item.date})`),
    `- [Releases](${pageUrl("/releases")}): full catalogue with tracklists`,
    `- [Artists](${pageUrl("/artists")}): roster and biographies`,
    `- [Bookings](${pageUrl("/booking")}): book a label artist`,
    `- [About Us](${pageUrl("/about")}): label story and FAQ`,
    `- [Demo Submission](${pageUrl("/demo")}): submit a demo - finished tracks, one private SoundCloud link`,
    "",
  );
  return lines.join("\n");
}
