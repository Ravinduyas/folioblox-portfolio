import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Disc3,
  Download,
  Headphones,
  Mail,
  Quote,
  Radio as RadioIcon,
  Ticket,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IMAGES } from "../assets/images";
import {
  ARTIST,
  FACTS,
  LONG_BIO,
  PRESS_QUOTES,
  RADIO,
  RELEASES,
  SHORT_BIO,
  formatShowDate,
  latestMixes,
  upcomingShows,
} from "../data";
import EmbedPlayer from "../components/EmbedPlayer";
import NewsletterForm from "../components/NewsletterForm";
import ShowRow from "../components/ShowRow";
import Reveal, { EASE, RevealGroup } from "../components/motion/Reveal";
import TiltCard from "../components/motion/TiltCard";
import { Card, Eyebrow, GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32, rotateX: -14 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.75, ease: EASE } },
};

/**
 * The homepage is a hub, not a destination: who, what's new, what's next —
 * then straight out to Music / Shows (fans) or Booking / EPK (promoters).
 */
export default function Home() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const allUpcoming = upcomingShows();
  const next = allUpcoming.slice(0, 3);
  const nextDates = allUpcoming.slice(0, 4);
  const latestMix = latestMixes(1)[0];
  const latestRelease = RELEASES[0];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="px-3 pt-3 pb-0 md:px-5">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
          <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "560px" }}>
            <motion.img
              src={IMAGES.hero}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              style={
                reduce
                  ? { objectPosition: "65% 20%" }
                  : {
                      objectPosition: "65% 20%",
                      y: imageY,
                      scale: imageScale,
                      willChange: "transform",
                    }
              }
              initial={reduce ? undefined : { scale: 1.2, opacity: 0 }}
              animate={reduce ? undefined : { scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.3, ease: EASE }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(10,5,3,0.92) 0%, rgba(10,5,3,0.82) 20%, rgba(10,5,3,0.55) 42%, rgba(10,5,3,0.10) 65%, transparent 80%)",
              }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 58% 65% at 68% 38%, rgba(215,60,15,0.72) 0%, rgba(190,45,10,0.38) 40%, transparent 70%)",
              }}
              animate={reduce ? undefined : { opacity: [0.82, 1, 0.82] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0"
              style={{
                height: "45%",
                background:
                  "linear-gradient(to top, rgba(8,4,2,0.88) 0%, rgba(8,4,2,0.50) 50%, transparent 100%)",
              }}
            />

            <motion.div
              variants={reduce ? undefined : container}
              initial={reduce ? undefined : "hidden"}
              animate={reduce ? undefined : "show"}
              style={
                reduce
                  ? { minHeight: "560px" }
                  : {
                      minHeight: "560px",
                      y: contentY,
                      opacity: contentOpacity,
                      transformPerspective: 1200,
                    }
              }
              className="relative z-10 flex flex-col px-8 py-10 md:px-12 md:py-14 lg:px-16"
            >
              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex flex-col" style={{ maxWidth: "52%" }}>
                  <motion.p
                    variants={reduce ? undefined : item}
                    className="mb-3 font-mono font-semibold uppercase tracking-[0.20em] text-[#f25c27]"
                    style={{ fontSize: "11px" }}
                  >
                    {ARTIST.role} · {ARTIST.basedIn}
                  </motion.p>
                  <motion.h1
                    variants={reduce ? undefined : item}
                    className="font-display font-extrabold leading-[0.88] tracking-tight text-white"
                    style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)" }}
                  >
                    {ARTIST.name}
                  </motion.h1>

                  <motion.div
                    variants={reduce ? undefined : item}
                    className="mt-7 flex flex-wrap gap-3"
                  >
                    <PrimaryLink to="/music">Listen</PrimaryLink>
                    <GhostLink to="/booking">Book a date</GhostLink>
                  </motion.div>
                </div>

                <motion.div
                  variants={reduce ? undefined : item}
                  className="hidden flex-col pt-1 md:flex"
                  style={{ maxWidth: "32%", marginLeft: "auto" }}
                >
                  <h2
                    className="font-display font-bold leading-snug tracking-tight text-white"
                    style={{ fontSize: "1.15rem" }}
                  >
                    Weight, patience,
                    <br />
                    and a room read properly.
                  </h2>
                  <p className="mt-2.5 leading-relaxed text-white/55" style={{ fontSize: "11.5px" }}>
                    {ARTIST.genres.join(" · ")}
                  </p>
                </motion.div>
              </div>

              {/* Next dates — the "what's next" half of the hub */}
              <motion.div variants={reduce ? undefined : item} className="mt-auto">
                <div className="border-t border-white/20 pt-5">
                  <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
                    {next.map((show) => {
                      const date = formatShowDate(show.date);
                      return (
                        <motion.div
                          key={show.id}
                          whileHover={reduce ? undefined : { y: -3 }}
                          className="flex flex-col gap-[5px]"
                        >
                          <span
                            className="font-mono font-bold leading-none text-[#f25c27]"
                            style={{ fontSize: "11px" }}
                          >
                            {date.day} {date.month}
                          </span>
                          <span
                            className="whitespace-nowrap font-medium leading-none text-white/80"
                            style={{ fontSize: "11px" }}
                          >
                            {show.city} — {show.venue}
                          </span>
                        </motion.div>
                      );
                    })}
                    <Link
                      to="/shows"
                      className="group inline-flex items-center gap-1.5 font-mono leading-none text-white/50 transition-colors hover:text-white"
                      style={{ fontSize: "11px" }}
                    >
                      All dates
                      <ArrowRight
                        size={11}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Streaming strip */}
          <div style={{ background: "#0a0b0d" }}>
            <div className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] px-8 py-8 sm:flex-row md:px-12 lg:px-16">
              <p
                className="font-mono uppercase leading-[1.9] tracking-[0.14em] text-white/40"
                style={{ fontSize: "10px" }}
              >
                Sets, releases &amp; radio
                <br />
                <span className="font-bold text-white/65">Everywhere you listen</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-7">
                {["SoundCloud", "Mixcloud", "Bandcamp", "Spotify", "Resident Advisor"].map(
                  (platform, i) => (
                    <motion.span
                      key={platform}
                      initial={reduce ? undefined : { opacity: 0, y: 10 }}
                      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                      whileHover={reduce ? undefined : { y: -2, color: "#ffffff" }}
                      className="cursor-default font-display font-semibold text-white/55"
                      style={{ fontSize: "13px" }}
                    >
                      {platform}
                    </motion.span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT'S NEW ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <Reveal>
          <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Latest</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                What's new
              </h2>
            </div>
            <Link
              to="/music"
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/45 transition-colors hover:text-[#f25c27]"
            >
              All music
              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {latestMix && (
            <Reveal direction="right" delay={0.05}>
              <Card className="overflow-hidden">
                <div className="flex items-center gap-2 px-5 pt-5">
                  <Headphones size={13} className="text-[#f25c27]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                    Latest {latestMix.series.toLowerCase()}
                  </span>
                </div>
                <div className="p-5">
                  <EmbedPlayer
                    title={latestMix.title}
                    platform={latestMix.platform}
                    embedUrl={latestMix.embedUrl}
                    url={latestMix.url}
                    artwork={latestMix.artwork}
                    meta={latestMix.duration}
                  />
                </div>
              </Card>
            </Reveal>
          )}

          <Reveal direction="left" delay={0.12}>
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2 px-5 pt-5">
                <Disc3 size={13} className="text-[#f25c27]" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  Latest release
                </span>
              </div>
              <div className="flex flex-col gap-5 p-5 sm:flex-row">
                <TiltCard intensity={14} lift={22} className="shrink-0">
                  <img
                    src={latestRelease.artwork}
                    alt={`${latestRelease.title} artwork`}
                    className="h-40 w-40 rounded-xl object-cover shadow-xl shadow-black/40"
                  />
                </TiltCard>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">
                    {latestRelease.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    {latestRelease.label} · {latestRelease.catalogue} · {latestRelease.year}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/30">
                    {latestRelease.format}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <motion.a
                      href={latestRelease.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={reduce ? undefined : { scale: 1.05 }}
                      whileTap={reduce ? undefined : { scale: 0.95 }}
                      className="rounded-full bg-[#f25c27] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#ff6d3a]"
                    >
                      Buy / stream
                    </motion.a>
                    <Link
                      to="/music"
                      className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white/10"
                    >
                      Tracklist
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ─── NEXT DATES ─── */}
      <section className="mx-auto max-w-7xl border-t border-white/[0.05] px-6 py-20 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="On tour"
            title="Where to catch it"
            intro="The hero strip is the glance version — this is the one with ticket links."
            action={
              <Link
                to="/shows"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/45 transition-colors hover:text-[#f25c27]"
              >
                All {allUpcoming.length} dates
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            }
          />
        </Reveal>

        <RevealGroup className="flex flex-col gap-3">
          {nextDates.map((show) => (
            <ShowRow key={show.id} show={show} />
          ))}
        </RevealGroup>
      </section>

      {/* ─── RADIO RESIDENCY ─── */}
      <section className="mx-auto max-w-7xl border-t border-white/[0.05] px-6 py-20 md:px-10">
        <div className="grid items-start gap-10 md:grid-cols-12">
          <Reveal direction="right" className="md:col-span-5">
            <Eyebrow>Monthly residency</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {RADIO.name}
            </h2>
            <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#f25c27]">
              <RadioIcon size={12} />
              {RADIO.station}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/30">
              {RADIO.schedule}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/50">{RADIO.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GhostLink href={RADIO.url}>Full archive</GhostLink>
              <Link
                to="/music"
                className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/12"
              >
                <Headphones size={14} /> Every episode
              </Link>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="md:col-span-7">
            <Card className="overflow-hidden p-5">
              <EmbedPlayer
                title={`${RADIO.name} — latest episode`}
                platform={RADIO.platform}
                embedUrl={RADIO.embedUrl}
                url={RADIO.url}
                artwork={RADIO.artwork}
                meta={RADIO.station}
              />
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ─── WHO'S PLAYING ─── */}
      <section className="mx-auto max-w-7xl border-t border-white/[0.05] px-6 py-20 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <Reveal direction="right" className="md:col-span-5">
            <TiltCard intensity={9} lift={20}>
              <img
                src={IMAGES.portrait}
                alt={`${ARTIST.displayName} — portrait`}
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl shadow-black/50"
                style={{ objectPosition: "60% 25%" }}
              />
            </TiltCard>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="md:col-span-7">
            <Eyebrow>The artist</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Melbourne warehouses to Berlin back rooms.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/55 md:text-base">{LONG_BIO[0]}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.06] pt-7 sm:grid-cols-4">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-[5px]">
                  <dt className="font-mono text-[10px] font-bold uppercase leading-none tracking-wider text-[#f25c27]">
                    {fact.label}
                  </dt>
                  <dd className="text-[13px] font-medium leading-snug text-white/80">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <GhostLink to="/about">Read the full bio</GhostLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRESS ─── */}
      <section className="mx-auto max-w-7xl border-t border-white/[0.05] px-6 py-20 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Press"
            title="What gets written"
            action={
              <Link
                to="/press"
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/45 transition-colors hover:text-[#f25c27]"
              >
                Press kit
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            }
          />
        </Reveal>

        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {PRESS_QUOTES.map((quote) => (
            <Card key={quote.source} hover className="flex h-full flex-col p-7">
              <Quote size={18} className="mb-4 shrink-0 text-[#f25c27]" />
              <blockquote className="flex-1 font-display text-[15px] font-medium leading-relaxed text-white/85">
                {quote.quote}
              </blockquote>
              <cite className="mt-5 block border-t border-white/[0.06] pt-4 font-mono text-[10px] uppercase not-italic tracking-wider text-white/35">
                {quote.source}
              </cite>
            </Card>
          ))}
        </RevealGroup>
      </section>

      {/* ─── AUDIENCE ROUTING ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal direction="right">
            <TiltCard intensity={7} lift={16} className="h-full">
              <div className="h-full rounded-2xl border border-emerald-400/15 bg-[#111214] p-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                  If you're here for the music
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white">
                  Start with a set.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{SHORT_BIO}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/music"
                    className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/12"
                  >
                    <Headphones size={14} /> Mixes &amp; sets
                  </Link>
                  <Link
                    to="/shows"
                    className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/12"
                  >
                    <Ticket size={14} /> Tour dates
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <TiltCard intensity={7} lift={16} className="h-full">
              <div className="h-full rounded-2xl border border-[#f25c27]/20 bg-[#111214] p-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  If you're booking
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white">
                  Everything you need, no email required.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Bio, press shots, technical rider and past dates are all downloadable. Fee and
                  availability come back {ARTIST.responseTime}.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/press"
                    className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/12"
                  >
                    <Download size={14} /> Press kit
                  </Link>
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f25c27] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#ff6d3a]"
                  >
                    <Mail size={14} /> Booking enquiry
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214] px-8 py-12 md:px-14 md:py-16">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 120% at 85% 50%, rgba(215,60,15,0.22) 0%, transparent 70%)",
              }}
              animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <Eyebrow>Stay close</Eyebrow>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  New dates and dubs, straight to you.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50">
                  A short email when there's a record out or a show near you — no algorithm deciding
                  whether you see it. Nothing else, and one click to leave.
                </p>
              </div>
              <div className="md:col-span-5">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
