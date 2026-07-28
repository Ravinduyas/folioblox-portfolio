import { Copy, Check, Download, FileText, Image as ImageIcon, Quote } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ARTIST,
  PRESS_PHOTOS,
  PRESS_QUOTES,
  RIDER,
  SHORT_BIO,
  upcomingShows,
} from "../data";
import { IMAGES } from "../assets/images";
import { downloadBio, downloadDateSheet, downloadRider } from "../lib/downloads";
import PageHero from "../components/PageHero";
import Reveal, { EASE } from "../components/motion/Reveal";
import TiltCard from "../components/motion/TiltCard";
import { Card, Eyebrow, PrimaryLink, SectionHeading } from "../components/ui";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/35 transition-colors hover:text-[#f25c27]"
    >
      {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
      {copied ? "Copied" : label}
    </button>
  );
}

/**
 * Self-serve EPK. A promoter should be able to announce the show from this
 * page alone — bio, photos, rider, dates — without sending a single email.
 */
export default function Press() {
  const nextShow = upcomingShows()[0];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageHero
        eyebrow="Press kit / EPK"
        title={
          <>
            Take what
            <br />
            you need.
          </>
        }
        intro="Everything on this page is cleared for use in announcements, listings and print. No login, no request form. Credit the photographer where one is named."
        image={IMAGES.still}
        objectPosition="70% 40%"
        glow="ellipse 48% 58% at 80% 30%"
        actions={
          <>
            <button
              onClick={downloadBio}
              data-cursor="save"
              className="inline-flex items-center gap-2 rounded-full bg-[#f25c27] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f25c27]/20 transition-all hover:bg-[#ff6d3a]"
            >
              <Download size={14} />
              Bio
            </button>
            <button
              onClick={downloadRider}
              data-cursor="save"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/15"
            >
              <Download size={14} />
              Technical rider
            </button>
          </>
        }
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {[
              { label: "In this kit", value: "Bio · short & long" },
              { label: "Photos", value: `${PRESS_PHOTOS.length} approved shots` },
              { label: "Technical", value: `Rider · ${RIDER.length} sections` },
              { label: "Coverage", value: `${PRESS_QUOTES.length} press quotes` },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-[5px]">
                <span
                  className="font-mono font-bold uppercase leading-none text-[#f25c27]"
                  style={{ fontSize: "11px" }}
                >
                  {item.label}
                </span>
                <span
                  className="whitespace-nowrap font-medium leading-none text-white/80"
                  style={{ fontSize: "11px" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        }
      />

      {/* One-line facts a listing needs — copy-ready */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Billing name", value: ARTIST.name, copy: ARTIST.name },
            { label: "Based in", value: ARTIST.basedIn },
            { label: "Genres", value: ARTIST.genres.join(", ") },
            { label: "Press contact", value: ARTIST.pressEmail, copy: ARTIST.pressEmail },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              whileHover={{ backgroundColor: "#15161b" }}
              className="bg-[#111214] p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                {item.label}
              </p>
              <p className="mt-1.5 truncate font-display text-sm font-bold text-white">
                {item.value}
              </p>
              {item.copy && (
                <div className="mt-2">
                  <CopyButton value={item.copy} label="Copy" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading
          eyebrow="Assets"
          title="Downloads"
          intro="Three files cover almost every announcement: the bio, the technical rider and the current date sheet."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FileText,
              title: "Artist bio",
              detail: "Short and long versions in one file, plus billing name and contacts.",
              action: downloadBio,
              cta: "Download bio (.txt)",
            },
            {
              icon: FileText,
              title: "Technical rider",
              detail: "Booth spec, sound, hospitality and admin requirements.",
              action: downloadRider,
              cta: "Download rider (.txt)",
            },
            {
              icon: FileText,
              title: "Date sheet",
              detail: "Confirmed upcoming dates and the recent archive, auto-generated.",
              action: downloadDateSheet,
              cta: "Download dates (.txt)",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} tilt={10}>
              <Card hover className="flex h-full flex-col p-7">
              <item.icon size={18} className="text-[#f25c27]" />
              <h3 className="mt-4 font-display text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{item.detail}</p>
              <motion.button
                onClick={item.action}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                data-cursor="save"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:border-[#f25c27]/40 hover:bg-white/10"
              >
                <Download size={13} />
                {item.cta}
              </motion.button>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Press photos */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading
          eyebrow="Imagery"
          title="Press photos"
          intro="Right-click or use the download button on each shot. Please keep the credit line attached."
        />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {PRESS_PHOTOS.map((photo, i) => (
            <Reveal key={photo.id} delay={i * 0.08} tilt={12}>
              <TiltCard intensity={13} lift={20} className="h-full">
                <figure className="group h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0e10]">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <a
                      href={photo.src}
                      download={`${ARTIST.displayName}-${photo.id}.png`}
                      data-cursor="save"
                      className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                        <Download size={12} />
                        Download
                      </span>
                    </a>
                  </div>
                  <figcaption className="space-y-1 px-4 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                      {photo.caption}
                    </p>
                    <p className="font-mono text-[10px] text-white/25">{photo.credit}</p>
                  </figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/25">
          <ImageIcon size={12} />
          {PRESS_PHOTOS.length} approved images · print resolution on request
        </p>
      </section>

      {/* Rider */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading
          eyebrow="Technical"
          title="Rider, in full"
          intro="Published openly so there are no surprises on the night. Most of it is negotiable — raise anything you can't meet before the contract is signed."
          action={
            <button
              onClick={downloadRider}
              data-cursor="save"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-[#f25c27]/40 hover:bg-white/10"
            >
              <Download size={14} />
              Download rider
            </button>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          {RIDER.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.07} direction={i % 2 ? "left" : "right"}>
              <Card className="h-full p-7">
                <h3 className="font-display text-base font-bold text-white">{section.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {section.items.map((item) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-white/50"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#f25c27]" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quotes */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading eyebrow="Coverage" title="Press quotes" />

        <div className="grid gap-6 md:grid-cols-3">
          {PRESS_QUOTES.map((quote, i) => (
            <Reveal key={quote.source} delay={i * 0.12} tilt={12}>
              <Card hover className="flex h-full flex-col p-7">
                <Quote size={16} className="text-[#f25c27]" />
                <p className="mt-4 flex-1 font-display text-base leading-relaxed text-white/80">
                  "{quote.quote}"
                </p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-white/35">
                  — {quote.source}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Announce helper */}
      <section className="mx-auto max-w-7xl px-6 py-16 pb-24 md:px-10">
        <Card className="p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Eyebrow>Ready-made</Eyebrow>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white">
                Announcement copy
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                Paste-ready for a listing or socials
                {nextShow ? `, using ${nextShow.city} as the example` : ""}.
              </p>
              <div className="mt-6">
                <PrimaryLink to="/booking">Booking enquiry</PrimaryLink>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#0d0e10] p-5">
              <p className="font-mono text-xs leading-relaxed text-white/60">
                {ARTIST.name} — {SHORT_BIO}
              </p>
              <div className="mt-4 border-t border-white/5 pt-4">
                <CopyButton value={`${ARTIST.name} — ${SHORT_BIO}`} label="Copy short bio" />
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
