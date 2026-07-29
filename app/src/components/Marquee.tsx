import { ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Longer = slower. */
  speed?: number;
  className?: string;
}

/**
 * Seamless horizontal ticker. The row is rendered twice and the track slides
 * exactly half its width, so the loop has no visible seam. Hovering pauses it,
 * and reduced-motion users get the plain wrapped row instead of a moving one.
 *
 * The second copy is aria-hidden so screen readers announce each item once.
 */
export default function Marquee({ children, speed = 32, className = "" }: MarqueeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-3 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
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
        style={{ ["--marquee-duration" as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-8 pr-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
