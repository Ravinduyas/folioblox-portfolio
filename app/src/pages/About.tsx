import { Link } from "react-router-dom";
import { IMAGES } from "../assets/images";
import { artistPhoto } from "../assets/artists";
import { ARTIST, FACTS, GALLERY, LONG_BIO, ROSTER, SHORT_BIO } from "../data";
import PageHero from "../components/PageHero";
import { LogoMark } from "../components/Logo";
import Reveal from "../components/motion/Reveal";
import TiltCard from "../components/motion/TiltCard";
import { Card, Eyebrow, GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

/** "Tunnel Sound System" → "TSS". Used on roster cards with no press shot. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        eyebrow="The artist"
        title={ARTIST.displayName}
        intro={SHORT_BIO}
        image={IMAGES.portraitShades}
        objectPosition="52% 30%"
        glow="ellipse 52% 58% at 74% 36%"
        height={460}
        actions={
          <>
            <PrimaryLink to="/music">Hear a set</PrimaryLink>
            <GhostLink to="/press">Press kit</GhostLink>
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

      {/* Biography */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Biography</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white">
              Melbourne warehouses to Berlin back rooms.
            </h2>
            <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-white/30">
              Long-form bio · free to reprint
            </p>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-white/55 md:col-span-8">
            {LONG_BIO.map((para, i) => (
              <Reveal key={i} delay={i * 0.12} tilt={4}>
                <p>{para}</p>
              </Reveal>
            ))}
            <p className="text-sm text-white/35">
              Need this as a file? The short and long bios are downloadable on the{" "}
              <Link to="/press" className="text-[#f25c27] hover:underline">
                press page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Roster */}
      <section
        id="roster"
        className="mx-auto max-w-7xl scroll-mt-24 border-b border-white/[0.05] px-6 py-16 md:px-10"
      >
        <SectionHeading
          eyebrow="Roster"
          title="Artists"
          intro={`${ROSTER.length} artists on the label. Each one books and releases independently — get in touch through their own channels, or through booking for the label projects.`}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROSTER.map((artist, i) => (
            <Reveal key={artist.id} delay={i * 0.07} tilt={10}>
              <TiltCard intensity={9} lift={14} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214] transition-colors hover:border-[#f25c27]/25">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0e10]">
                    {artistPhoto(artist.id, artist.photo) ? (
                      <img
                        src={artistPhoto(artist.id, artist.photo)}
                        alt={artist.name}
                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        style={{ objectPosition: artist.photoPosition ?? "50% 30%" }}
                      />
                    ) : (
                      /* No press shot yet — monogram tile rather than a stock face */
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#16171d] to-[#0d0e10]">
                        <span className="font-display text-3xl font-black tracking-tight text-white/12 transition-colors duration-500 group-hover:text-white/20">
                          {initials(artist.name)}
                        </span>
                        <LogoMark
                          size={18}
                          className="absolute bottom-2.5 right-2.5 opacity-25 transition-opacity duration-500 group-hover:opacity-60"
                        />
                      </div>
                    )}
                    {artist.resident && (
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-black/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#f25c27] backdrop-blur-md">
                        Label project
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-[15px] font-bold leading-tight tracking-tight text-white">
                      <Link
                        to={`/artists/${artist.id}`}
                        className="inline-block py-0.5 transition-colors hover:text-[#f25c27]"
                      >
                        {artist.name}
                      </Link>
                    </h3>
                    <p className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-[#f25c27]">
                      {artist.role}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-white/30">
                      {artist.basedIn} · {artist.since}
                    </p>
                    <p className="mt-2.5 line-clamp-3 flex-1 text-xs leading-relaxed text-white/50">
                      {artist.blurb}
                    </p>

                    <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-3">
                      <Link
                        to={`/artists/${artist.id}`}
                        className="rounded-full border border-[#f25c27]/40 bg-[#f25c27]/10 px-3 py-2 font-mono text-[9px] uppercase tracking-wider sm:px-2.5 sm:py-1 text-[#f25c27] transition-all hover:bg-[#f25c27]/20"
                      >
                        Biography
                      </Link>
                      {artist.links.map((link) =>
                        link.href.startsWith("/") ? (
                          <Link
                            key={link.label}
                            to={link.href}
                            className="rounded-full border border-white/12 bg-white/5 px-3 py-2 font-mono text-[9px] uppercase tracking-wider sm:px-2.5 sm:py-1 text-white/70 transition-all hover:border-[#f25c27]/40 hover:text-white"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="open"
                            className="rounded-full border border-white/12 bg-white/5 px-3 py-2 font-mono text-[9px] uppercase tracking-wider sm:px-2.5 sm:py-1 text-white/70 transition-all hover:border-[#f25c27]/40 hover:text-white"
                          >
                            {link.label}
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-white/25">
          Demos: {ARTIST.pressEmail} · one link, no attachments
        </p>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading
          eyebrow="Gallery"
          title="On the road"
          intro="Live shots, studio and artwork. Higher-resolution press-approved images live in the EPK."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((item, i) => (
            <Reveal key={i} delay={i * 0.09} tilt={10}>
              <TiltCard intensity={12} lift={18} className="h-full">
                <figure className="group h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214]">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-white/35">
                    {item.caption}
                  </figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bridge — About is the neutral hand-off to either audience */}
      <section className="mx-auto max-w-7xl px-6 py-16 pb-24 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal direction="right">
            <Card hover className="p-8">
            <Eyebrow>Listeners</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-bold text-white">
              Two hours a month, free.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Lowlight Transmissions on Refuge Radio, archived in full.
            </p>
            <div className="mt-5">
              <GhostLink to="/music">Listen</GhostLink>
            </div>
            </Card>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <Card hover className="p-8">
            <Eyebrow>Promoters</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-bold text-white">
              Booking direct, {ARTIST.responseTime}.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Rider, photos and past dates ready to download — no email chain first.
            </p>
            <div className="mt-5">
              <PrimaryLink to="/booking">Booking</PrimaryLink>
            </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
