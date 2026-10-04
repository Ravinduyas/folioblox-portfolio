import { KeyboardEvent, TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { findRelease, formatShowDate } from "../data";
import { NewsItem } from "../types";
import { EASE } from "./motion/Reveal";
import TiltCard from "./motion/TiltCard";
import { PrimaryLink } from "./ui";

/** How long each story holds before the next one slides in. */
const SLIDE_MS = 6500;

/**
 * A fixed height, not a minimum — so the hero never grows or shrinks as stories
 * with longer or shorter titles slide in. Never taller than 82vh, so the tabs
 * strip stays in view on a laptop. Titles and excerpts are line-clamped to fit.
 */
const HERO_H = "clamp(520px, 82vh, 640px)";

/**
 * Copy slides in from the side it's travelling towards. `custom` is the signed
 * offset, read at exit time too, so the outgoing story leaves the right way.
 */
const SLIDE = {
  enter: (shift: number) => ({ opacity: 0, x: shift }),
  center: { opacity: 1, x: 0 },
  exit: (shift: number) => ({ opacity: 0, x: -shift }),
};

/**
 * The homepage hero: an auto-advancing slider of the latest label news.
 *
 * Advances every SLIDE_MS whether or not the mouse is over it. Holds only
 * while anything inside has keyboard focus, while the tab is hidden, or once
 * the viewer presses pause (WCAG 2.2.2). Arrow keys and swipes move between
 * stories. With reduced motion it does not auto-advance at all and slides
 * cross-fade without movement.
 */
export default function NewsSlider({ items }: { items: NewsItem[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [userPaused, setUserPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touchX = useRef<number | null>(null);

  const count = items.length;
  const autoplay = !reduce && count > 1;
  const paused = !autoplay || userPaused || focused || hidden;

  // Progress of the current slide, 0 → 1, driven per frame so it can pause mid-way.
  const elapsed = useRef(0);
  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, (p) => `${p * 100}%`);

  const go = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
      elapsed.current = 0;
      progress.set(0);
    },
    [count, progress],
  );
  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useAnimationFrame((_, delta) => {
    if (paused) return;
    elapsed.current += delta;
    progress.set(Math.min(elapsed.current / SLIDE_MS, 1));
    if (elapsed.current >= SLIDE_MS) next();
  });

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  };

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next();
    else prev();
  };

  if (count === 0) return null;
  const item = items[index];
  const release = findRelease(item.releaseId);
  const date = formatShowDate(item.date);

  const shift = reduce ? 0 : 60 * direction;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Latest news"
      className="relative overflow-hidden"
      style={{ height: HERO_H }}
      // Keyboard focus only — clicking an arrow shouldn't stop the show for good.
      onFocus={(e) => {
        if ((e.target as HTMLElement).matches(":focus-visible")) setFocused(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Backdrop — cross-fades, with a slow push-in while the slide holds */}
      <AnimatePresence initial={false}>
        <motion.img
          key={item.id}
          src={item.image}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          style={{ objectPosition: item.imagePosition ?? "50% 40%" }}
          initial={{ opacity: 0, scale: reduce ? 1 : 1.12 }}
          animate={{ opacity: 1, scale: reduce ? 1 : 1.03 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.9, ease: "easeOut" },
            scale: { duration: SLIDE_MS / 1000 + 1, ease: "linear" },
          }}
        />
      </AnimatePresence>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,5,3,0.94) 0%, rgba(10,5,3,0.84) 24%, rgba(10,5,3,0.58) 48%, rgba(10,5,3,0.2) 70%, rgba(10,5,3,0.35) 100%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 62% at 74% 40%, rgba(215,60,15,0.55) 0%, rgba(190,45,10,0.26) 42%, transparent 72%)",
        }}
        animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: "50%",
          background:
            "linear-gradient(to top, rgba(8,4,2,0.92) 0%, rgba(8,4,2,0.5) 55%, transparent 100%)",
        }}
      />

      <div
        className="relative z-10 flex flex-col px-6 pb-6 pt-9 sm:px-8 md:px-12 md:pt-14 lg:px-16"
        style={{ height: HERO_H }}
      >
        {/* Slide copy */}
        <div className="flex min-h-0 flex-1 items-center">
          <AnimatePresence mode="wait" initial={false} custom={shift}>
            <motion.div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${item.title}`}
              className="flex w-full items-center justify-between gap-10"
              custom={shift}
              variants={SLIDE}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="flex w-full flex-col md:max-w-[58%]">
                <p
                  className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono font-semibold uppercase tracking-[0.20em] text-[#f25c27]"
                  style={{ fontSize: "11px" }}
                >
                  <span className="rounded-full border border-[#f25c27]/40 bg-[#f25c27]/10 px-2.5 py-1">
                    {item.category}
                  </span>
                  <time dateTime={item.date} className="text-white/55">
                    {date.full}
                  </time>
                </p>
                <h2
                  className="line-clamp-3 font-display font-extrabold leading-[0.95] tracking-tight text-white"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.9rem)" }}
                >
                  {item.title}
                </h2>
                <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                  {item.excerpt}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <PrimaryLink to={`/news/${item.id}`}>Read the story</PrimaryLink>
                  {release && (
                    <a
                      href={release.url}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                    >
                      Buy / stream {release.catalogue}
                    </a>
                  )}
                </div>
              </div>

              {item.cover && (
                <div className="hidden shrink-0 md:block">
                  <TiltCard intensity={12} lift={20}>
                    <Link to={`/news/${item.id}`} tabIndex={-1} aria-hidden="true">
                      <img
                        src={item.cover}
                        alt=""
                        className="w-[clamp(200px,24vw,300px)] rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10"
                      />
                    </Link>
                  </TiltCard>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 border-t border-white/20 pt-4">
          <div className="flex items-center gap-4">
            {/* Story tabs — titles on desktop, bars on phones */}
            <div role="tablist" aria-label="Choose a story" className="flex min-w-0 flex-1 gap-2 md:gap-4">
              {items.map((story, i) => {
                const active = i === index;
                return (
                  <button
                    key={story.id}
                    role="tab"
                    aria-selected={active}
                    aria-label={`Story ${i + 1}: ${story.title}`}
                    onClick={() => go(i, i > index ? 1 : -1)}
                    className="group min-w-0 flex-1 py-2 text-left"
                  >
                    <span className="relative block h-[2px] overflow-hidden rounded-full bg-white/15">
                      {active ? (
                        <motion.span
                          className="absolute inset-y-0 left-0 rounded-full bg-[#f25c27]"
                          style={{ width: autoplay ? progressWidth : "100%" }}
                        />
                      ) : (
                        <span className="absolute inset-0 rounded-full bg-white/0 transition-colors group-hover:bg-white/30" />
                      )}
                    </span>
                    <span className="mt-2.5 hidden items-baseline gap-2 md:flex">
                      <span
                        className={`font-mono text-[10px] font-bold ${active ? "text-[#f25c27]" : "text-white/35"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`truncate text-[12px] font-medium transition-colors ${
                          active ? "text-white" : "text-white/45 group-hover:text-white/75"
                        }`}
                      >
                        {story.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                onClick={prev}
                aria-label="Previous story"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#f25c27]/50 hover:bg-white/10"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next story"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#f25c27]/50 hover:bg-white/10"
              >
                <ChevronRight size={16} />
              </button>
              {autoplay && (
                <button
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                  aria-pressed={userPaused}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#f25c27]/50 hover:bg-white/10"
                >
                  {userPaused ? <Play size={14} /> : <Pause size={14} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Announce slide changes only when the viewer is driving */}
      <p className="sr-only" aria-live={paused ? "polite" : "off"} aria-atomic="true">
        {`Story ${index + 1} of ${count}: ${item.title}`}
      </p>
    </section>
  );
}
