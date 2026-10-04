import { Link } from "react-router-dom";
import { IMAGES } from "../assets/images";
import { ARTIST, FACTS, FAQS, LONG_BIO, RELEASES, ROSTER, SHORT_BIO, billing, formatShowDate } from "../data";
import ArtistCard from "../components/ArtistCard";
import PageHero from "../components/PageHero";
import Reveal from "../components/motion/Reveal";
import { Card, Eyebrow, GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

/** What the label signs, in its own words (from the label statement). */
const PILLARS = [
  {
    title: "Boundary-pushing",
    text: "A platform for visionary artists — tracks that transcend the ordinary rather than follow the formula.",
  },
  {
    title: "Deep & driving",
    text: "Progressive house rooted in hypnotic rhythms, deep textures and emotional storytelling.",
  },
  {
    title: "Crafted with intention",
    text: "Only the most unique, specially crafted records — exploration through sound, never filler.",
  },
];

export default function About() {
  const founders = ROSTER.filter((artist) => artist.resident);
  // Oldest first — the label's story in order.
  const timeline = [...RELEASES].reverse();

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="About us"
        title={ARTIST.displayName}
        intro={SHORT_BIO}
        image={IMAGES.handsBw}
        objectPosition="52% 40%"
        glow="ellipse 52% 58% at 74% 36%"
        height={460}
        actions={
          <>
            <PrimaryLink to="/releases">Hear the releases</PrimaryLink>
            <GhostLink to="/contact">Contact us</GhostLink>
          </>
        }
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-[5px]">
                <span
                  className="font-mono font-bold uppercase leading-none text-[#f25c27]"
                  style={{ fontSize: "11px" }}
                >
                  {fact.label}
                </span>
                <span
                  className="whitespace-nowrap font-medium leading-none text-white/80"
                  style={{ fontSize: "11px" }}
                >
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        }
      />

      {/* Story */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white">
              Not just a label — a movement.
            </h2>
            <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-white/30">
              {ARTIST.basedIn} · since {ARTIST.founded}
            </p>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-white/55 md:col-span-8">
            {LONG_BIO.map((para, i) => (
              <Reveal key={i} delay={i * 0.12} tilt={4}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sound */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading
          eyebrow="The sound"
          title="What we release"
          intro={`${ARTIST.genres.join(" · ")} — for those who truly seek something deeper.`}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08} tilt={8} className="h-full">
              <Card hover className="h-full p-7">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-white">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{pillar.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading eyebrow="So far" title="The catalogue" />
        <ol className="relative space-y-8 border-l border-white/10 pl-8">
          {timeline.map((release, i) => (
            <li key={release.id} className="relative">
              <Reveal delay={i * 0.1} direction="left" tilt={4}>
                <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#f25c27] ring-4 ring-[#0b0c0e]" />
                <time
                  dateTime={release.date}
                  className="font-mono text-[10px] uppercase tracking-wider text-[#f25c27]"
                >
                  {formatShowDate(release.date).full}
                </time>
                <Link
                  to={`/releases#${release.id}`}
                  className="group mt-2 flex items-center gap-4"
                >
                  <img
                    src={release.artwork}
                    alt=""
                    aria-hidden="true"
                    className="h-16 w-16 shrink-0 rounded-lg ring-1 ring-white/10"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold text-white transition-colors group-hover:text-[#f25c27]">
                      {release.catalogue} — {release.title} EP
                    </span>
                    <span className="block text-sm text-white/50">
                      {billing(release)} · {release.tracks.length} tracks
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Founders */}
      {founders.length > 0 && (
        <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
          <SectionHeading
            eyebrow="The people"
            title="Behind the label"
            action={<GhostLink to="/artists">Full roster</GhostLink>}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {founders.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ — plain answers people (and answer engines) can quote; marked up as FAQPage in seo.ts */}
      <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="grid gap-x-12 gap-y-9 md:grid-cols-2">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 2) * 0.08} tilt={4}>
              <h3 className="font-display text-lg font-bold leading-snug text-white">{faq.question}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55">{faq.answer}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bridge */}
      <section className="mx-auto max-w-7xl px-6 py-16 pb-24 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal direction="right">
            <Card hover className="p-8">
              <Eyebrow>Artists</Eyebrow>
              <h3 className="mt-2 font-display text-xl font-bold text-white">Got a record for us?</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Send one private streaming link to {ARTIST.pressEmail} — no attachments.
              </p>
              <div className="mt-5">
                <GhostLink to="/contact">Send a demo</GhostLink>
              </div>
            </Card>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <Card hover className="p-8">
              <Eyebrow>Promoters</Eyebrow>
              <h3 className="mt-2 font-display text-xl font-bold text-white">
                Book a label artist, reply {ARTIST.responseTime}.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Pick from the roster, tell us the date and the room.
              </p>
              <div className="mt-5">
                <PrimaryLink to="/booking">Bookings</PrimaryLink>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
