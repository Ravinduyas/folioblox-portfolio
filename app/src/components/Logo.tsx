import { IMAGES } from "../assets/images";
import { ARTIST } from "../data";

/**
 * The mark is a white-on-black JPEG with no alpha channel, so it is composited
 * with `screen`: black pixels drop to nothing against the site's near-black
 * surfaces and only the white linework survives. That also swallows the JPEG's
 * edge artefacts. If a transparent PNG or an SVG of the mark turns up, swap the
 * <img> and delete the blend class — nothing else here changes.
 *
 * Because it relies on a dark backdrop, never place this on a light surface.
 */
export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={IMAGES.logo}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 select-none mix-blend-screen ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Mark plus wordmark. `stacked` centres the two for the footer; the default
 * sets them side by side for the nav.
 */
export default function Logo({
  size = 32,
  stacked = false,
  showWordmark = true,
  className = "",
  wordmarkClassName = "",
}: {
  size?: number;
  stacked?: boolean;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span
      role="img"
      aria-label={ARTIST.displayName}
      className={`inline-flex ${
        stacked ? "flex-col items-start gap-2.5" : "flex-row items-center gap-2.5"
      } ${className}`}
    >
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className={`font-display font-bold leading-none tracking-[0.16em] text-white ${wordmarkClassName}`}
        >
          {ARTIST.name}
        </span>
      )}
    </span>
  );
}
