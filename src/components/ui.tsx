import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Magnetic from "./motion/Magnetic";
import TiltCard from "./motion/TiltCard";

/** Small orange mono label that sits above every section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#f25c27] font-semibold">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mt-2 leading-tight tracking-tight">
          {title}
        </h2>
        {intro && <p className="mt-4 text-white/50 text-sm md:text-base leading-relaxed">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

const PRIMARY =
  "inline-flex items-center gap-2.5 rounded-full bg-[#f25c27] hover:bg-[#ff6d3a] text-white text-sm font-semibold px-6 py-3 transition-all shadow-lg shadow-[#f25c27]/20 group";
const GHOST =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-6 py-3 transition-all";

function Arrow() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#f25c27] text-xs font-bold group-hover:translate-x-0.5 transition-transform">
      →
    </span>
  );
}

export function PrimaryLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Magnetic strength={0.3}>
      <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
        <Link to={to} className={PRIMARY}>
          {children}
          <Arrow />
        </Link>
      </motion.span>
    </Magnetic>
  );
}

export function PrimaryButton({
  onClick,
  children,
  type = "button",
  disabled,
  className = "",
}: {
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      className={`${PRIMARY} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
      <Arrow />
    </motion.button>
  );
}

export function GhostLink({
  to,
  href,
  children,
  download,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  download?: string;
}) {
  if (to) {
    return (
      <Link to={to} className={GHOST}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      download={download}
      target={download ? undefined : "_blank"}
      rel="noreferrer"
      className={GHOST}
    >
      {children}
    </a>
  );
}

/**
 * The standard dark card. `hover` opts a card into the interactive treatment:
 * border warms up and the whole surface tilts in 3D under the pointer.
 */
export function Card({
  children,
  className = "",
  hover = false,
  tilt,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  /** Defaults to `hover` — pass false to keep an interactive card flat. */
  tilt?: boolean;
}) {
  const surface = (
    <div
      className={`h-full rounded-2xl border border-white/[0.06] bg-[#111214] ${
        hover ? "hover:border-[#f25c27]/25 transition-colors duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );

  return (tilt ?? hover) ? <TiltCard className="h-full">{surface}</TiltCard> : surface;
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "orange" | "green" | "muted" }) {
  const tones = {
    neutral: "border-white/12 bg-white/5 text-white/70",
    orange: "border-[#f25c27]/35 bg-[#f25c27]/10 text-[#f25c27]",
    green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-400",
    muted: "border-white/8 bg-white/[0.03] text-white/35",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
