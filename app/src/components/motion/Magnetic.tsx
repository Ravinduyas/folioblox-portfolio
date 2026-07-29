import { PointerEvent, ReactNode, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { usePointerFine } from "../../lib/usePointerFine";

const SPRING = { stiffness: 260, damping: 18, mass: 0.5 };

/**
 * Pulls its contents a few pixels toward the cursor. Used on the primary CTAs
 * only — everywhere would be noise.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const finePointer = usePointerFine();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  // On touch this would drag the button out from under the finger mid-tap.
  if (reduce || !finePointer) return <div className={className}>{children}</div>;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
