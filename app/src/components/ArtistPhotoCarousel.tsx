import { TouchEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import TiltCard from "./motion/TiltCard";

/** How long each photo holds. */
const PHOTO_MS = 3500;

/**
 * The artist page's photo carousel: a portrait frame that cross-fades through
 * the artist's photos. Auto-advances unless reduced motion is on or the tab is
 * hidden; dots jump to a photo, and swipes work on touch.
 */
export default function ArtistPhotoCarousel({
  photos,
  name,
  position = "50% 22%",
}: {
  photos: string[];
  name: string;
  /** object-position for the crop. */
  position?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = photos.length;

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Restart the timer on every change, so a tapped dot gets a full hold too.
  useEffect(() => {
    if (reduce || hidden || count < 2) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), PHOTO_MS);
    return () => clearTimeout(timer);
  }, [index, reduce, hidden, count]);

  // Warm the cache so the next photo is ready before it fades in.
  useEffect(() => {
    if (count < 2) return;
    const next = new Image();
    next.src = photos[(index + 1) % count];
  }, [index, photos, count]);

  if (count === 0) return null;

  const go = (i: number) => setIndex(((i % count) + count) % count);
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div className="mx-auto w-full max-w-[220px] md:max-w-none">
      <TiltCard intensity={8} lift={16}>
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#0d0e10] shadow-2xl shadow-black/60 ring-1 ring-white/10"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="group"
          aria-roledescription="carousel"
          aria-label={`Photos of ${name}`}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={photos[index]}
              src={photos[index]}
              alt={`${name} - photo ${index + 1} of ${count}`}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: position }}
              initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.7 }, scale: { duration: PHOTO_MS / 1000 + 0.7, ease: "linear" } }}
            />
          </AnimatePresence>

          {count > 1 && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
              <span className="font-mono text-[10px] text-white/70">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {photos.map((photo, i) => (
                  <button
                    key={photo}
                    onClick={() => go(i)}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index}
                    className="flex h-6 items-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-5 bg-[#f25c27]" : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </TiltCard>
    </div>
  );
}
