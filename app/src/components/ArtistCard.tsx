import { Link } from "react-router-dom";
import { artistPhoto } from "../assets/artists";
import { artistMeta } from "../data";
import { RosterArtist } from "../types";
import { LogoMark } from "./Logo";
import TiltCard from "./motion/TiltCard";

/** "Tunnel Sound System" → "TSS". Used where an artist has no photo. */
export function initials(name: string) {
  // "ESH (SL)" → "ESH": country tags in brackets aren't part of the name.
  const words = name
    .replace(/\(.*?\)/g, "")
    .split(/[\s-]+/)
    .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter(Boolean);
  // A short one-word name reads better whole: "DLC", "ESH".
  if (words.length === 1 && words[0].length <= 4) return words[0].toUpperCase();
  return words
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

const LINK_PILL =
  "relative z-10 rounded-full border border-white/12 bg-white/5 px-3 py-2 font-mono text-[9px] uppercase tracking-wider sm:px-2.5 sm:py-1 text-white/70 transition-all hover:border-[#f25c27]/40 hover:text-white";

/**
 * Roster card — photo, credits, short blurb, and links out. The whole card opens
 * the artist's page: the name link's ::after stretches over the card (links
 * can't nest), and the pill links sit above it on z-10 so they still work.
 */
export default function ArtistCard({ artist }: { artist: RosterArtist }) {
  const photo = artistPhoto(artist.id, artist.photo);

  return (
    <TiltCard intensity={9} lift={14} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214] transition-colors hover:border-[#f25c27]/25">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0e10]">
          {photo ? (
            <img
              src={photo}
              alt={artist.name}
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              style={{ objectPosition: artist.photoPosition ?? "50% 30%" }}
            />
          ) : (
            /* No press shot yet — monogram tile rather than a stock face */
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#16171d] to-[#0d0e10]">
              <span className="font-display text-3xl font-black tracking-tight text-white/12 transition-colors duration-500 group-hover:text-white/20">
                {initials(artist.name)}
              </span>
              <LogoMark
                size={18}
                className="absolute bottom-2.5 right-2.5 opacity-25 transition-opacity duration-500 group-hover:opacity-60"
              />
            </div>
          )}
          {artist.resident && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-black/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#f25c27] backdrop-blur-md">
              Co-founder
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-display text-[15px] font-bold leading-tight tracking-tight text-white">
            <Link
              to={`/artists/${artist.id}`}
              className="inline-block py-0.5 transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:text-[#f25c27]"
            >
              {artist.name}
            </Link>
          </h3>
          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-[#f25c27]">
            {artist.role}
          </p>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-white/30">
            {artistMeta(artist)}
          </p>
          <p className="mt-2.5 line-clamp-3 flex-1 text-xs leading-relaxed text-white/50">
            {artist.blurb}
          </p>

          <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-3">
            <Link
              to={`/artists/${artist.id}`}
              className="relative z-10 rounded-full border border-[#f25c27]/40 bg-[#f25c27]/10 px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-[#f25c27] transition-all hover:bg-[#f25c27]/20 sm:px-2.5 sm:py-1"
            >
              Biography
            </Link>
            {artist.links.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.label} to={link.href} className={LINK_PILL}>
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className={LINK_PILL}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
