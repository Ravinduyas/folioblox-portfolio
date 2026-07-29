import { PointerEvent, ReactNode, useRef } from "react";
import {
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
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const finePointer = usePointerFine();
  const ref = useRef<HTMLDivElement>(null);

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
          {image ? (
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
            <div className="flex flex-1 flex-col justify-center">
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

            {meta && (
              <motion.div variants={reduce ? undefined : item} className="mt-8">
                <div className="border-t border-white/20 pt-5">{meta}</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
