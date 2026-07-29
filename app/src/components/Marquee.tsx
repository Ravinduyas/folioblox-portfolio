import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface MarqueeProps {
  children: ReactNode;
  /** Scroll rate in pixels per second — keeps the pace even whatever the content. */
  speed?: number;
  className?: string;
}

/**
 * Seamless horizontal ticker.
 *
 * The naive version — two copies, slide the track -50% — leaves a gap whenever
 * one copy is narrower than the container: the track simply runs out of content
 * before the loop restarts. So the row is measured and repeated enough times to
 * overflow the container, and the track slides by exactly ONE copy's width. At
 * that point copy 2 sits precisely where copy 1 started, so the reset is
 * invisible and no gap can appear at any width.
 *
 * Only the first copy is exposed to assistive tech; the rest are decorative.
 */
export default function Marquee({ children, speed = 45, className = "" }: MarqueeProps) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    if (reduce) return;

    const measure = () => {
      const container = containerRef.current?.offsetWidth ?? 0;
      const group = groupRef.current?.offsetWidth ?? 0;
      if (!group) return;
      setGroupWidth(group);
      // Enough copies to cover the container plus the one that scrolls off.
      setCopies(Math.max(2, Math.ceil(container / group) + 1));
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (groupRef.current) observer.observe(groupRef.current);
    return () => observer.disconnect();
  }, [reduce, children]);

  // Fonts land after first paint and change the row's width — re-measure then.
  useEffect(() => {
    if (reduce || !("fonts" in document)) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      const group = groupRef.current?.offsetWidth ?? 0;
      const container = containerRef.current?.offsetWidth ?? 0;
      if (group) {
        setGroupWidth(group);
        setCopies(Math.max(2, Math.ceil(container / group) + 1));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 ${className}`}>
        {children}
      </div>
    );
  }

  const duration = groupWidth ? groupWidth / speed : 0;

  return (
    <div
      ref={containerRef}
      className={`marquee relative overflow-hidden ${className}`}
      style={{
        // Fade both edges so items enter and leave instead of popping.
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
      }}
    >
      <div
        className="marquee-track flex w-max"
        style={
          groupWidth
            ? {
                ["--marquee-shift" as string]: `${groupWidth}px`,
                ["--marquee-duration" as string]: `${duration}s`,
              }
            : undefined
        }
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? groupRef : undefined}
            aria-hidden={i > 0 ? "true" : undefined}
            className="flex shrink-0 items-center gap-8 pr-8"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
