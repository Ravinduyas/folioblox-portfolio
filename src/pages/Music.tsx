import { useState } from "react";
import { ExternalLink, Radio as RadioIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IMAGES } from "../assets/images";
import { MIXES, RADIO, RELEASES, latestMixes } from "../data";
import EmbedPlayer from "../components/EmbedPlayer";
import PageHero from "../components/PageHero";
import Reveal, { EASE } from "../components/motion/Reveal";
import { Card, Pill, SectionHeading } from "../components/ui";

const FILTERS = ["All", "Radio", "Live set", "Guest mix"] as const;

export default function Music() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const mixes = latestMixes().filter((m) => filter === "All" || m.series === filter);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageHero
        eyebrow="Mixes · Releases · Radio"
        title={
          <>
            Everything
            <br />
            worth hearing.
          </>
        }
        intro="Sets are hosted where they belong — SoundCloud, Mixcloud and Bandcamp — so they keep working for you in each platform's own discovery. Nothing here is gated. Press play."
        image={IMAGES.booth}
        objectPosition="72% 30%"
        glow="ellipse 50% 60% at 78% 32%"
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {[
              { count: `${MIXES.length}`, label: "Mixes & sets", href: "#mixes" },
              { count: `${RELEASES.length}`, label: "Releases", href: "#releases" },
              { count: "Monthly", label: "Radio show", href: "#radio" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="group flex flex-col gap-[5px]">
                <span
                  className="font-mono font-bold leading-none text-[#f25c27]"
                  style={{ fontSize: "11px" }}
                >
                  {item.count}
                </span>
                <span
                  className="whitespace-nowrap font-medium leading-none text-white/80 transition-colors group-hover:text-white"
                  style={{ fontSize: "11px" }}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        }
      />

      {/* Mixes & sets */}
      <section id="mixes" className="mx-auto max-w-7xl scroll-mt-24 border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading
          eyebrow="Mixes & sets"
          title="Recorded sets"
          intro="Long-form recordings from clubs, radio and guest podcasts — the fastest way to know whether this is for you."
          action={
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    filter === f
                      ? "border-[#f25c27] text-[#f25c27]"
                      : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white"
                  }`}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="music-filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#f25c27]/10"
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          }
        />

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {mixes.map((mix, i) => (
              <motion.div
                key={mix.id}
                layout
                initial={{ opacity: 0, y: 26, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.94, rotateX: 8 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                style={{ transformPerspective: 1200 }}
              >
                <Card hover className="overflow-hidden p-5">
                  <EmbedPlayer
                    title={mix.title}
                    platform={mix.platform}
                    embedUrl={mix.embedUrl}
                    url={mix.url}
                    artwork={mix.artwork}
                    meta={mix.duration}
                  />
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Pill tone="orange">{mix.series}</Pill>
                    {mix.tags.slice(0, 2).map((tag) => (
                      <Pill key={tag}>{tag}</Pill>
                    ))}
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-white/25">
                      {mix.duration}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {mixes.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-10 text-center text-sm text-white/40"
          >
            Nothing filed under {filter} yet.
          </motion.p>
        )}

        <p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-white/25">
          {MIXES.length} sets archived · new radio episode monthly
        </p>
      </section>

      {/* Releases */}
      <section
        id="releases"
        className="mx-auto max-w-7xl scroll-mt-24 border-b border-white/[0.05] px-6 py-16 md:px-10"
      >
        <SectionHeading
          eyebrow="Discography"
          title="Releases"
          intro="Vinyl and digital, on labels and self-released. Buy links go straight to Bandcamp — the artist keeps the margin."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {RELEASES.map((release, i) => (
            <Reveal key={release.id} delay={i * 0.1} tilt={10}>
              <Card hover className="overflow-hidden">
              <div className="group relative aspect-square overflow-hidden bg-[#0d0e10]">
                <img
                  src={release.artwork}
                  alt={`${release.title} artwork`}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-md">
                  {release.year}
                </span>
              </div>
              <div className="p-5">
                <span className="font-mono text-[10px] font-semibold uppercase text-[#f25c27]">
                  {release.label} · {release.catalogue}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-white">
                  {release.title}
                </h3>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/30">
                  {release.format}
                </p>

                <ol className="mt-4 space-y-1.5">
                  {release.tracks.map((track, i) => (
                    <li key={track} className="flex gap-3 text-xs text-white/45">
                      <span className="font-mono text-white/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {track}
                    </li>
                  ))}
                </ol>

                <a
                  href={release.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-all hover:border-[#f25c27]/40 hover:bg-white/10"
                >
                  Buy on {release.platform}
                  <ExternalLink size={11} />
                </a>
              </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Radio show */}
      <section id="radio" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 pb-24 md:px-10">
        <SectionHeading eyebrow="Residency" title="Radio show" />

        <Reveal tilt={8}>
          <Card className="overflow-hidden">
          <div className="grid gap-8 p-7 md:grid-cols-2 md:p-9">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f25c27]/30 bg-[#f25c27]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#f25c27]">
                <RadioIcon size={11} />
                {RADIO.station}
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
                {RADIO.name}
              </h3>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-white/40">
                {RADIO.schedule}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/50">{RADIO.description}</p>
              <a
                href={RADIO.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f25c27] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#ff6d3a]"
              >
                Full archive
                <ExternalLink size={13} />
              </a>
            </div>

            <EmbedPlayer
              title={`${RADIO.name} — latest episode`}
              platform={RADIO.platform}
              embedUrl={RADIO.embedUrl}
              url={RADIO.url}
              artwork={RADIO.artwork}
              meta="Latest episode"
              ratio="16 / 11"
            />
          </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
