import { Link } from "react-router-dom";
import { Cloud, Compass, Disc3, Instagram, Mail, Music2, Radio, Youtube } from "lucide-react";
import { ARTIST, AUDIENCE_ACCENT, SECTIONS, SOCIALS } from "../data";
import { LogoMark } from "./Logo";
import NewsletterForm from "./NewsletterForm";

const ICONS = {
  instagram: Instagram,
  soundcloud: Cloud,
  bandcamp: Disc3,
  spotify: Music2,
  youtube: Radio,
  mail: Mail,
  ra: Compass,
} as const;

/** Same structure the nav uses — the architecture, encoded once. */
const NAV = SECTIONS;

export default function Footer() {
  const social = SOCIALS.filter((s) => s.group === "social");
  const streaming = SOCIALS.filter((s) => s.group === "streaming");

  return (
    <footer className="border-t border-white/[0.05] bg-[#0a0b0d] text-white/50">
      {/* Sitewide email capture */}
      <div className="border-b border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="max-w-md">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#f25c27]">
              Mailing list
            </p>
            <h4 className="mt-2 font-display text-xl font-bold text-white">
              New music and dates, first.
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed">
              A few emails a year — tour dates, releases, radio. No algorithm in between.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LogoMark size={40} />
              <h4 className="font-display text-base font-black leading-snug tracking-[0.12em] text-white">
                {ARTIST.name}
              </h4>
            </div>
            <p className="max-w-xs text-xs leading-relaxed">
              {ARTIST.role} · {ARTIST.basedIn}
              <br />
              {ARTIST.genres.join(" · ")}
            </p>
            <div className="flex gap-3 pt-1">
              {social.map((link) => {
                const Icon = ICONS[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[#f25c27] hover:text-[#f25c27]"
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    title={item.contents.join(" · ")}
                    className="group flex items-center gap-2 py-1 transition-colors hover:text-[#f25c27]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                      style={{ backgroundColor: AUDIENCE_ACCENT[item.audience] }}
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              Listen
            </h5>
            <ul className="space-y-2 text-xs">
              {streaming.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block py-1 transition-colors hover:text-[#f25c27]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              Contact
            </h5>
            <p className="text-xs">Bookings direct — no agency.</p>
            <a
              href={`mailto:${ARTIST.bookingEmail}`}
              className="inline-flex items-center gap-2 font-mono text-xs text-white transition-colors hover:text-[#f25c27]"
            >
              <Mail size={12} />
              {ARTIST.bookingEmail}
            </a>
            <a
              href={`mailto:${ARTIST.pressEmail}`}
              className="inline-flex items-center gap-2 font-mono text-xs text-white/60 transition-colors hover:text-[#f25c27]"
            >
              <Mail size={12} />
              {ARTIST.pressEmail}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] pt-8 font-mono text-[11px] text-white/40 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {ARTIST.displayName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href={ARTIST.residentAdvisor}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#f25c27]"
            >
              RA PROFILE
            </a>
            <span className="text-white/20">|</span>
            <span className="font-bold text-emerald-400">TAKING BOOKINGS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
