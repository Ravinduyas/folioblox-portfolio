import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RosterArtist } from "../types";
import ArtistCard from "./ArtistCard";

const ARROW =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#f25c27]/50 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30";

/**
 * Horizontal slider of roster cards — four across on desktop, two on tablets,
 * one and a peek on phones.
 *
 * It's a native scroll-snap row, so touch swipes, trackpads and shift+wheel
 * all work without any gesture code; the arrows just scroll it one card at a
 * time. Arrows disable at either end, and the bar underneath tracks position.
 */
export default function ArtistSlider({ artists }: { artists: RosterArtist[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState({ left: 0, width: 100 });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    const width = (el.clientWidth / el.scrollWidth) * 100;
    setProgress({ width, left: max > 0 ? (el.scrollLeft / max) * (100 - width) : 0 });
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  /** One card plus the gap — measured, so it's right at every breakpoint. */
  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={track}
        onScroll={update}
        aria-label="Artists on the label"
        role="region"
        // Vertical padding gives the cards' hover lift room inside the scroller.
        className="no-scrollbar -my-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-4"
      >
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]"
          >
            <ArtistCard artist={artist} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-5">
        <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
          <span
            className="absolute inset-y-0 rounded-full bg-[#f25c27] transition-[left] duration-150"
            style={{ left: `${progress.left}%`, width: `${progress.width}%` }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
          {artists.length} artists
        </span>
        <div className="flex gap-1.5">
          <button onClick={() => step(-1)} disabled={atStart} aria-label="Previous artists" className={ARROW}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => step(1)} disabled={atEnd} aria-label="Next artists" className={ARROW}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
