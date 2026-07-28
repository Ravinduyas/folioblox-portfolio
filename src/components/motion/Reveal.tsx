import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

/** House easing — fast out of the gate, long settle. Used everywhere. */
export const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Degrees of X-rotation to open from — the "card tipping upright" feel. */
  tilt?: number;
  once?: boolean;
}

/**
 * Scroll-triggered entrance. Everything on the site arrives the same way:
 * a small rise plus a slight rotation in depth, never a bare fade.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  tilt = 6,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = OFFSETS[direction];

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y, rotateX: -tilt }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration, delay, ease: EASE }}
      style={{ transformPerspective: 1200, transformOrigin: "50% 100%" }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children of a grid/list without hand-writing delays. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  direction = "up",
  tilt = 6,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
  direction?: Direction;
  tilt?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={delay + i * stagger} direction={direction} tilt={tilt}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
