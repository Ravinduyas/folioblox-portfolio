import { motion, useScroll, useSpring } from "motion/react";

/** Hairline read-position bar pinned under the nav. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#f25c27] via-[#ff7442] to-[#f25c27]"
    />
  );
}
