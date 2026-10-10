import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { ArtistMix } from "../types";
import { Card } from "./ui";

const artworkFiles = import.meta.glob("../assets/images/mixes/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/** Mix artwork by file key, e.g. "alpha21-1". */
const mixArtwork = (key?: string) =>
  key ? Object.entries(artworkFiles).find(([path]) => path.endsWith(`/${key}.jpg`))?.[1] : undefined;

/** SoundCloud's embeddable player for a track URL, in the site's orange. */
const embedUrl = (url: string) =>
  `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23f25c27&auto_play=true&visual=true&hide_related=true&show_comments=false&show_reposts=false&show_teaser=false`;

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const formatLength = (minutes: number) =>
  minutes >= 60 ? `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m` : `${minutes} min`;

/**
 * A podcast or mix from the artist's SoundCloud. The artwork shows until
 * someone presses play; only then is SoundCloud's player loaded, in the same
 * square — so a page with six mixes doesn't load six players up front.
 */
export default function MixCard({ mix, artist }: { mix: ArtistMix; artist: string }) {
  const [playing, setPlaying] = useState(false);
  const artwork = mixArtwork(mix.artwork);

  return (
    <Card hover tilt={false} className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-[#0d0e10]">
        {playing ? (
          <iframe
            src={embedUrl(mix.url)}
            title={`${mix.title} - SoundCloud player`}
            allow="autoplay"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Play ${mix.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {artwork ? (
              <img
                src={artwork}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#16171d] to-[#0d0e10] font-display text-sm text-white/30">
                {artist}
              </span>
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f25c27] text-white shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-110">
              <Play size={17} className="ml-0.5" fill="currentColor" />
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-md">
              {formatLength(mix.minutes)}
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-display text-sm font-bold leading-snug text-white">{mix.title}</h3>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <time dateTime={mix.date} className="font-mono text-[10px] uppercase tracking-wider text-white/35">
            {formatDate(mix.date)}
          </time>
          <a
            href={mix.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="open"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/50 transition-colors hover:text-[#f25c27]"
          >
            SoundCloud
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </Card>
  );
}
