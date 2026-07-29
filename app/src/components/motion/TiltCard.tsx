import { PointerEvent, ReactNode, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. Big surfaces want less. */
  intensity?: number;
  /** How far the card lifts toward the viewer on hover. */
  lift?: number;
  /** Sheen that tracks the pointer, as if a light were above the card. */
  glare?: boolean;
  perspective?: number;
}

const SPRING = { stiffness: 210, damping: 20, mass: 0.6 };

/**
 * Pointer-tracked 3D tilt. The whole card rotates around its centre and the
 * glare follows the cursor, so hovering feels like handling a physical sleeve.
 */
export default function TiltCard({
  children,
  className = "",
  intensity = 9,
  lift = 14,
  glare = true,
  perspective = 900,
}: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Normalised pointer position within the card, 0…1 on both axes.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hovering = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), SPRING);
  const z = useSpring(useTransform(hovering, [0, 1], [0, lift]), SPRING);
  const glareOpacity = useSpring(useTransform(hovering, [0, 1], [0, 0.16]), SPRING);

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 0%, rgba(242,92,39,0.35) 35%, transparent 65%)`;

  if (reduce) return <div className={className}>{children}</div>;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    hovering.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerEnter={() => hovering.set(1)}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, z, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}

        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
            style={{ background: glareBackground, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}
