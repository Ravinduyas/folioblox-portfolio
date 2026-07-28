import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./Reveal";

/**
 * Route-level transition: the outgoing page tips away from the viewer while
 * the incoming one swings up into place. Depth, not a crossfade.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, rotateX: 7, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, rotateX: -5, scale: 0.99 }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ transformPerspective: 1600, transformOrigin: "50% 0%" }}
    >
      {children}
    </motion.div>
  );
}
