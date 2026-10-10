import { PointerEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { EASE } from "./motion/Reveal";
import { usePointerFine } from "../lib/usePointerFine";

/** One full-width backdrop in a hero slideshow. */
export interface HeroSlide {
  src: string;
  /** object-position for the crop. */
  position?: string;
  /** Caption shown bottom-right, e.g. the artist's name. */
  label?: string;
  /** Where the caption links. */
  to?: string;
}

/** How long each backdrop holds in a slideshow. */
const SLIDE_MS = 3500;

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Omit for a gradient panel — used by roster artists with no press shot. */
  image?: string;
  /** Sits where the photo would be when there isn't one, e.g. initials. */
  watermark?: ReactNode;
  /** object-position for the photo — pick a crop that keeps the subject clear of the text. */
  objectPosition?: string;
  /** Where the orange light-leak sits, so no two pages glow in the same place. */
  glow?: string;
  actions?: ReactNode;
  /** Bottom strip above the fold — dates, counts, quick links. */
  meta?: ReactNode;
  /** Desktop height. Phones get a shorter hero so content starts sooner. */
  height?: number;
  /** Sits to the right of the copy on desktop, below it on phones — e.g. a photo carousel. */
  aside?: ReactNode;
  /**
   * Full-width backdrops that cross-fade in turn, in place of `image`. Holds
   * while the tab is hidden; no auto-advance under reduced motion.
   */
  slides?: HeroSlide[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 26, rotateX: -12 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * The interior-page counterpart to the homepage hero. The photo parallaxes
 * against the copy on scroll, a spotlight tracks the pointer, and the content
 * stack tips upright on entry.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  watermark,
  objectPosition = "50% 25%",
  glow = "ellipse 55% 60% at 72% 40%",
  actions,
  meta,
  height = 420,
  aside,
  slides,
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const finePointer = usePointerFine();
  const ref = useRef<HTMLDivElement>(null);

  const slideCount = slides?.length ?? 0;
  const [slide, setSlide] = useState(0);
  const [tabHidden, setTabHidden] = useState(false);
  useEffect(() => {
    if (slideCount < 2) return;
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [slideCount]);
  // Restarts on every change, so a tapped dot gets a full hold.
  useEffect(() => {
    if (reduce || tabHidden || slideCount < 2) return;
    const timer = setTimeout(() => setSlide((i) => (i + 1) % slideCount), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [slide, reduce, tabHidden, slideCount]);
  useEffect(() => {
    if (slideCount < 2 || !slides) return;
    new Image().src = slides[(slide + 1) % slideCount].src; // warm the next one
  }, [slide, slides, slideCount]);
  const current = slides?.[slide];

  /**
   * Scale the hero down on small screens rather than holding a desktop height:
   * 420px of photo on a 667px phone pushes everything below the fold. Never
   * taller than 62vh, never shorter than 300px.
   */
  const heroHeight = `clamp(300px, 62vh, ${height}px)`;

  // Scroll parallax — image drifts slower than the page, copy lifts away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pointer spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 90, damping: 20 });
  const sy = useSpring(my, { stiffness: 90, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(circle 380px at ${sx}% ${sy}%, rgba(255,150,90,0.20), transparent 70%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section className="px-3 pt-3 pb-0 md:px-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
        <div
          ref={ref}
          onPointerMove={reduce || !finePointer ? undefined : handleMove}
          className="relative overflow-hidden"
          style={{ minHeight: heroHeight }}
        >
          {current ? (
            <AnimatePresence initial={false}>
              {/*
                Portrait photos stretched across a wide band zoom in to a slice
                of face. On desktop the sharp photo fills the right half at full
                height (head and shoulders), fading in from the left, over a
                blurred copy that fills the band. On phones the band is tall, so
                the photo simply covers it.
              */}
              <motion.div
                key={current.src}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
              >
                <img
                  src={current.src}
                  alt=""
                  className="absolute inset-0 hidden h-full w-full scale-110 select-none object-cover opacity-40 blur-2xl md:block"
                />
                <motion.img
                  src={current.src}
                  alt=""
                  className="absolute inset-y-0 right-0 h-full w-full select-none object-cover md:w-[55%] md:[mask-image:linear-gradient(to_right,transparent,black_38%)] lg:w-1/2"
                  style={{ objectPosition: current.position ?? objectPosition }}
                  initial={{ scale: reduce ? 1 : 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: SLIDE_MS / 1000 + 0.9, ease: "linear" }}
                />
              </motion.div>
            </AnimatePresence>
          ) : image ? (
            <motion.img
              src={image}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              style={
                reduce
                  ? { objectPosition }
                  : { objectPosition, y: imageY, scale: imageScale, willChange: "transform" }
              }
              initial={reduce ? undefined : { scale: 1.16, opacity: 0 }}
              animate={reduce ? undefined : { scale: 1.06, opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          ) : (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-end bg-gradient-to-br from-[#17181f] via-[#101116] to-[#0b0c0e] pr-[8%]"
              style={reduce ? undefined : { y: imageY }}
            >
              {watermark}
            </motion.div>
          )}

          {/* Left-to-right darkening so the headline always has contrast */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(10,5,3,0.94) 0%, rgba(10,5,3,0.84) 22%, rgba(10,5,3,0.55) 45%, rgba(10,5,3,0.12) 68%, transparent 82%)",
            }}
          />

          {/* Orange light leak */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(${glow}, rgba(215,60,15,0.62) 0%, rgba(190,45,10,0.30) 42%, transparent 72%)`,
            }}
          />

          {/* Pointer spotlight */}
          {!reduce && finePointer && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: spotlight }}
            />
          )}

          {/* Bottom fade for the meta strip */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0"
            style={{
              height: "50%",
              background:
                "linear-gradient(to top, rgba(8,4,2,0.90) 0%, rgba(8,4,2,0.50) 55%, transparent 100%)",
            }}
          />

          <motion.div
            variants={reduce ? undefined : container}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            style={
              reduce
                ? { minHeight: heroHeight }
                : {
                    minHeight: heroHeight,
                    y: contentY,
                    opacity: contentOpacity,
                    transformPerspective: 1200,
                  }
            }
            className="relative z-10 flex flex-col px-6 py-9 sm:px-8 md:px-12 md:py-12 lg:px-16"
          >
            <div className="flex flex-1 flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col justify-center">
              <motion.p
                variants={reduce ? undefined : item}
                className="mb-3 font-mono font-semibold uppercase tracking-[0.20em] text-[#f25c27]"
                style={{ fontSize: "11px" }}
              >
                {eyebrow}
              </motion.p>
              <motion.h1
                variants={reduce ? undefined : item}
                className="font-display font-extrabold leading-[0.9] tracking-tight text-white"
                style={{ fontSize: "clamp(2.6rem, 6.5vw, 4.6rem)" }}
              >
                {title}
              </motion.h1>

              {intro && (
                <motion.p
                  variants={reduce ? undefined : item}
                  className="mt-5 max-w-lg text-sm leading-relaxed text-white/60 md:text-base"
                >
                  {intro}
                </motion.p>
              )}

              {actions && (
                <motion.div
                  variants={reduce ? undefined : item}
                  className="mt-7 flex flex-wrap gap-3"
                >
                  {actions}
                </motion.div>
              )}
            </div>

            {aside && (
              <motion.div variants={reduce ? undefined : item} className="shrink-0 md:w-[min(24%,250px)]">
                {aside}
              </motion.div>
            )}
            </div>

            {meta && (
              <motion.div variants={reduce ? undefined : item} className="mt-8">
                <div className="border-t border-white/20 pt-5">{meta}</div>
              </motion.div>
            )}
          </motion.div>

          {current && slideCount > 1 && (
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 sm:right-8 md:bottom-9 md:right-12 lg:right-16">
              {current.label &&
                (current.to ? (
                  <Link
                    to={current.to}
                    className="rounded-full bg-black/45 px-3 py-1.5 font-display text-xs font-bold text-white backdrop-blur-md transition-colors hover:text-[#f25c27]"
                  >
                    {current.label}
                  </Link>
                ) : (
                  <span className="rounded-full bg-black/45 px-3 py-1.5 font-display text-xs font-bold text-white backdrop-blur-md">
                    {current.label}
                  </span>
                ))}
              <div className="flex gap-1.5" role="group" aria-label="Choose a photo">
                {slides!.map((item, i) => (
                  <button
                    key={item.src}
                    onClick={() => setSlide(i)}
                    aria-label={item.label ? `Show ${item.label}` : `Show photo ${i + 1}`}
                    aria-current={i === slide}
                    className="flex h-6 items-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === slide ? "w-5 bg-[#f25c27]" : "w-1.5 bg-white/45 hover:bg-white/80"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
