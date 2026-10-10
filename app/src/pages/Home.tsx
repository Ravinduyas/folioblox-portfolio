import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Disc3, Mail } from "lucide-react";
import { IMAGES } from "../assets/images";
import { ARTIST, FACTS, LONG_BIO, RELEASES, ROSTER, SHORT_BIO, latestNews } from "../data";
import ArtistSlider from "../components/ArtistSlider";
import NewsSlider from "../components/NewsSlider";
import ReleaseCard from "../components/ReleaseCard";
import Reveal from "../components/motion/Reveal";
import TiltCard from "../components/motion/TiltCard";
import { Eyebrow, GhostLink, SectionHeading } from "../components/ui";

/** How many stories the hero slider cycles through. */
const HERO_STORIES = 4;

function SectionLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-1.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/45 transition-colors hover:text-[#f25c27]"
    >
      {children}
      <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * The homepage is a hub: the latest news up top, then the catalogue, the
 * label, the artists — and straight out to bookings or contact.
 */
export default function Home() {

  return (
    <>
      {/* The page's h1 names the label — the slider's story titles are h2s. */}
      <h1 className="sr-only">
        {ARTIST.displayName} — independent progressive house record label from {ARTIST.basedIn}
      </h1>

      {/* ─── HERO: auto-sliding news ─── */}
      <section className="px-3 pt-3 pb-0 md:px-5">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem]">
          <NewsSlider items={latestNews(HERO_STORIES)} />
        </div>
      </section>

      {/* ─── RELEASES ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Catalogue"
            title="Latest releases"
            action={<SectionLink to="/releases">All releases</SectionLink>}
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RELEASES.map((release, i) => (
            <Reveal key={release.id} delay={i * 0.1} tilt={10} className="h-full">
              <ReleaseCard release={release} compact />
            </Reveal>
          ))}

          {/* Fills the row while the catalogue is young */}
          <Reveal delay={RELEASES.length * 0.1} tilt={10} className="h-full sm:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-white/10 bg-[#0d0e10] p-8">
              <div>
                <Disc3 size={18} className="text-[#f25c27]" />
                <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white">
                  {RELEASES.length} EPs in. The journey's just starting.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
                  Deep, driving progressive house from Sri Lanka and beyond. Every release is on
                  Proton Radio — and the next one lands here first.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <GhostLink to="/news">Label news</GhostLink>
                <GhostLink to="/demo">Send a demo</GhostLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── THE LABEL ─── */}
      <section className="mx-auto max-w-7xl border-t border-white/[0.05] px-6 py-20 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <Reveal direction="right" className="md:col-span-5">
            <TiltCard intensity={9} lift={20}>
              <img
                src={IMAGES.artistDecks}
                alt=""
                aria-hidden="true"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl shadow-black/50"
                style={{ objectPosition: "38% 28%" }}
              />
            </TiltCard>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="md:col-span-7">
            <Eyebrow>The label</Eyebrow>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              A home for boundary-pushing sound.
            </h2>
            <p data-speakable className="mt-5 text-sm leading-relaxed text-white/55 md:text-base">
              {SHORT_BIO} {LONG_BIO[0]}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.06] pt-7 sm:grid-cols-4">
              {FACTS.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-[5px]">
                  <dt className="font-mono text-[10px] font-bold uppercase leading-none tracking-wider text-[#f25c27]">
                    {fact.label}
                  </dt>
                  <dd className="text-[13px] font-medium leading-snug text-white/80">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <GhostLink to="/about">About us</GhostLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ARTISTS ─── */}
      <section className="mx-auto max-w-7xl border-t border-white/[0.05] px-6 py-20 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Roster"
            title="The artists"
            intro={`${ROSTER.length} producers and DJs have released or remixed on the label so far.`}
            action={<SectionLink to="/artists">All artists</SectionLink>}
          />
        </Reveal>

        <Reveal tilt={8}>
          <ArtistSlider artists={ROSTER} />
        </Reveal>
      </section>

      {/* ─── ROUTING: bookings / contact ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal direction="right">
            <TiltCard intensity={7} lift={16} className="h-full">
              <div className="h-full rounded-2xl border border-[#f25c27]/20 bg-[#111214] p-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  Promoters
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white">
                  Book a label artist.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Bring Exploration Recordings to your floor — pick an artist, tell us the date, and
                  get availability and a fee back fast.
                </p>
                <div className="mt-6">
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f25c27] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#ff6d3a]"
                  >
                    <CalendarCheck size={14} /> Bookings
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <TiltCard intensity={7} lift={16} className="h-full">
              <div className="h-full rounded-2xl border border-emerald-400/15 bg-[#111214] p-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                  Everyone else
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white">
                  Got a record for us?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  Finished progressive house that goes somewhere deeper. Send one private SoundCloud link —
                  we listen to every demo and always reply.
                </p>
                <div className="mt-6">
                  <Link
                    to="/demo"
                    className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/12"
                  >
                    <Mail size={14} /> Submit a demo
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
