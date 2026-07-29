import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ARTIST, AUDIENCE_ACCENT, SECTIONS } from "../data";
import { LogoMark } from "./Logo";
import Magnetic from "./motion/Magnetic";

/**
 * Nav order is the architecture's order — fan-facing, then the neutral bridge,
 * then industry — and comes from SECTIONS so the two cannot diverge. Booking
 * is excluded here because it rides as the standing CTA.
 */
const LINKS = SECTIONS.filter((section) => !section.navHidden);

export default function Nav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <nav className="sticky top-0 z-40 border-b border-white/[0.04] bg-[#0b0c0e]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" aria-label={ARTIST.displayName} className="group mr-4 flex items-center gap-3">
          <LogoMark
            size={34}
            className="transition-transform duration-500 group-hover:rotate-[60deg]"
          />
          <span className="font-display text-[13px] font-bold leading-none tracking-[0.16em] text-white transition-opacity group-hover:opacity-80 sm:text-sm md:text-base md:tracking-[0.12em]">
            {ARTIST.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {LINKS.map(({ label, to, audience, purpose }, i) => (
            <div key={to} className="flex items-center gap-5">
              {/* Divider where the architecture hands over from fans to industry */}
              {i > 0 && LINKS[i - 1].audience !== audience && (
                <span aria-hidden="true" className="h-3 w-px bg-white/12" />
              )}
              <Link
                to={to}
                title={purpose}
                className={`relative py-1 transition-colors hover:text-white ${
                  isActive(to) ? "font-medium text-white" : ""
                }`}
              >
                {label}
                {isActive(to) && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: AUDIENCE_ACCENT[audience] }}
                  />
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden md:flex">
          <Magnetic strength={0.28}>
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-all hover:border-[#f25c27]/40 hover:bg-white/10"
            >
              Booking
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f25c27] text-xs font-bold text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-[-45deg]">
                →
              </span>
            </Link>
          </Magnetic>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-white/5 bg-[#0d0e10] md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5 text-sm text-white/60">
              {LINKS.map(({ label, to, audience, contents }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-baseline gap-2.5 transition-colors hover:text-white ${
                    isActive(to) ? "font-medium text-white" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: AUDIENCE_ACCENT[audience] }}
                  />
                  {label}
                  <span className="ml-auto truncate font-mono text-[9px] uppercase tracking-wider text-white/25">
                    {contents.join(" · ")}
                  </span>
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-[#f25c27] py-2.5 text-center text-sm font-semibold text-white"
              >
                Booking
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
