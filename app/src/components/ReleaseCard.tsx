import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { findArtistByName, formatShowDate } from "../data";
import { Release } from "../types";
import { Card } from "./ui";

/** A credited name — a link when the artist has a roster page. */
export function Credit({ name }: { name: string }) {
  const artist = findArtistByName(name);
  if (!artist) return <>{name}</>;
  return (
    <Link to={`/artists/${artist.id}`} className="transition-colors hover:text-[#f25c27]">
      {name}
    </Link>
  );
}

/** Artists joined for billing, each linked to their roster page. */
export function Billing({ names }: { names: string[] }) {
  return (
    <>
      {names.map((name, i) => (
        <span key={name}>
          {i > 0 && " & "}
          <Credit name={name} />
        </span>
      ))}
    </>
  );
}

/**
 * One release: artwork, credits, full tracklist and the buy link. `compact`
 * drops the tracklist for the homepage.
 */
export default function ReleaseCard({ release, compact = false }: { release: Release; compact?: boolean }) {
  const date = formatShowDate(release.date);

  return (
    <Card hover className="overflow-hidden">
      <div className="group relative aspect-square overflow-hidden bg-[#0d0e10]">
        <img
          src={release.artwork}
          alt={`${release.title} artwork`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-md">
          {release.catalogue}
        </span>
      </div>
      <div className="p-5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#f25c27]">
          <time dateTime={release.date}>{date.full}</time> · {release.genre}
        </span>
        <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-white">
          {release.title} EP
        </h3>
        <p className="mt-0.5 text-sm text-white/55">
          <Billing names={release.artists} />
        </p>

        {!compact && (
          <ol className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-4">
            {release.tracks.map((track, i) => (
              <li key={`${track.title}-${track.version}`} className="flex gap-3 text-xs text-white/50">
                <span className="font-mono text-white/25">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span className="text-white/75">{track.title}</span>{" "}
                  <span className="text-white/40">
                    ({track.remixer ? (
                      <>
                        <Credit name={track.remixer} />
                        {track.version.slice(track.remixer.length)}
                      </>
                    ) : (
                      track.version
                    )}
                    )
                  </span>
                </span>
                <span className="font-mono text-white/30">{track.duration}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={release.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="open"
            className="inline-flex items-center gap-2 rounded-full bg-[#f25c27] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#ff6d3a]"
          >
            Buy / stream
            <ExternalLink size={11} />
          </a>
          {compact && (
            <Link
              to={`/releases#${release.id}`}
              className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-all hover:border-[#f25c27]/40 hover:bg-white/10"
            >
              Tracklist
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
