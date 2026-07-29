import { useEffect, useState } from "react";

/**
 * True only where a real pointing device is driving — mouse, trackpad, stylus.
 *
 * Touch screens report pointermove during taps and scrolls, so the tilt,
 * magnetic and spotlight effects would fire on contact and leave cards stuck
 * mid-rotation with no hover-out to reset them. Everything pointer-driven is
 * gated on this and simply renders flat on phones and tablets.
 *
 * Starts false so touch devices never see a frame of the effect, and so the
 * server/first paint matches the quieter branch.
 */
export function usePointerFine() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(pointer: fine)");
    const apply = () => setFine(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return fine;
}
