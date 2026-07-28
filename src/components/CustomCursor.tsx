import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type CursorState = "default" | "link" | "text" | "play" | "save" | "tickets" | "open";

/** Ring size + label per state. The dot only shows in the neutral state. */
const STATES: Record<CursorState, { size: number; label?: string; filled?: boolean }> = {
  default: { size: 32 },
  link: { size: 54, filled: true },
  text: { size: 30 },
  play: { size: 84, label: "Play", filled: true },
  save: { size: 78, label: "Save", filled: true },
  tickets: { size: 82, label: "Tickets", filled: true },
  open: { size: 74, label: "Open", filled: true },
};

const INTERACTIVE = 'a, button, [role="button"], summary';
const TEXT_FIELDS = "input, textarea, select";

/**
 * Pointer-following ring. Replaces the OS cursor on fine-pointer devices only
 * — touch, coarse pointers and reduced-motion users keep the native one.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Raw pointer position — the dot tracks it exactly, the ring lags behind.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.35 });

  // Only take over the cursor where a real pointing device is in use.
  useEffect(() => {
    if (reduce || typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>(`[data-cursor], ${INTERACTIVE}, ${TEXT_FIELDS}`);

      if (!el) return setState("default");
      const custom = el.dataset.cursor as CursorState | undefined;
      if (custom && custom in STATES) return setState(custom);
      if (el.matches(TEXT_FIELDS)) return setState("text");
      return setState("link");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const config = STATES[state];
  const isTextCaret = state === "text";

  return (
    <>
      {/* Ring — springs after the pointer, resizes per context */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isTextCaret ? 2 : config.size,
          height: isTextCaret ? 26 : config.size,
          borderRadius: isTextCaret ? 1 : "50%",
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.86 : 1,
          borderColor: config.filled ? "rgba(242,92,39,0.85)" : "rgba(255,255,255,0.45)",
          backgroundColor: isTextCaret
            ? "rgba(242,92,39,0.9)"
            : config.filled
              ? "rgba(242,92,39,0.14)"
              : "rgba(242,92,39,0)",
          backdropFilter: config.label ? "blur(2px)" : "blur(0px)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.5 }}
        initial={false}
      >
        <motion.span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white"
          animate={{ opacity: config.label ? 1 : 0, scale: config.label ? 1 : 0.6 }}
          transition={{ duration: 0.18 }}
        >
          {config.label}
        </motion.span>
      </motion.div>

      {/* Dot — locked to the true pointer position so clicking stays accurate */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[5px] w-[5px] rounded-full bg-[#f25c27]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && state === "default" ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        initial={false}
      />
    </>
  );
}
