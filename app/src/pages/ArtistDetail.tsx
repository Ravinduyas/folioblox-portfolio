import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Cloud, ExternalLink, Facebook, Instagram, Mail, Radio } from "lucide-react";
import { ARTIST, ROSTER, releasesFor } from "../data";
import { artistPhoto, artistPhotos } from "../assets/artists";
import ArtistPhotoCarousel from "../components/ArtistPhotoCarousel";
import { initials } from "../components/ArtistCard";
import PageHero from "../components/PageHero";
import ReleaseCard from "../components/ReleaseCard";
import MixCard from "../components/MixCard";
import { LogoMark } from "../components/Logo";
import Reveal from "../components/motion/Reveal";
import TiltCard from "../components/motion/TiltCard";
import { Card, Eyebrow, GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

/** Icon per link label — lucide has no SoundCloud mark, so a cloud stands in (as in the footer). */
const LINK_ICONS = { Instagram, Facebook, SoundCloud: Cloud, Proton: Radio } as Record<string, typeof Cloud>;

/**
 * Biography page for one roster artist, with their releases on the label.
 * Each artist keeps their own links, because they release independently.
 */
export default function ArtistDetail() {
  const { artistId } = useParams();
  const artist = ROSTER.find((entry) => entry.id === artistId);
  const others = ROSTER.filter((entry) => entry.id !== artistId);
  const releases = artist ? releasesFor(artist.name) : [];
  const photos = artist ? artistPhotos(artist.id, artist.photo) : [];
  const soundcloud = artist?.links.find((link) => link.label === "SoundCloud")?.href;

  // Always three facts in the hero strip: location, roster year and role where
  // known, topped up from the artist's highlights (short ones only, so the row
  // never breaks) when some are unknown.
  const heroFacts = artist
    ? (() => {
        const known = [
          { label: "Based in", value: artist.basedIn },
          { label: "On the roster", value: artist.since && `Since ${artist.since}` },
          { label: "Role", value: artist.role },
        ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));
        const extra = artist.highlights.filter(
          (h) => h.value.length <= 40 && !known.some((k) => k.label === h.label || k.value === h.value),
        );
        return [...known, ...extra].slice(0, Math.max(3, known.length));
      })()
    : [];

  if (!artist) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center md:px-10">
        <Eyebrow>Not on the roster</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white">
          No artist by that name.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
          The link may be out of date, or the artist may have left the roster.
        </p>
        <div className="mt-7">
          <PrimaryLink to="/artists">Back to the roster</PrimaryLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={`${artist.role} · ${ARTIST.displayName}`}
        title={artist.name}
        intro={artist.blurb}
        // Photos sit in the carousel on the right; the band behind stays a
        // gradient so portrait shots aren't cropped to a sliver.
        watermark={
          photos.length === 0 && (
            <span className="font-display text-[clamp(6rem,18vw,14rem)] font-black leading-none tracking-tight text-white/[0.05]">
              {initials(artist.name)}
            </span>
          )
        }
        aside={
          photos.length > 0 && (
            <ArtistPhotoCarousel photos={photos} name={artist.name} position={artist.photoPosition} />
          )
        }
        glow="ellipse 50% 58% at 76% 38%"
        height={photos.length > 0 ? 460 : 420}
        actions={
          <>
            <PrimaryLink to={`/booking?artist=${artist.id}`}>Book {artist.name}</PrimaryLink>
            <GhostLink to="/artists">All artists</GhostLink>
          </>
        }
        meta={
          <div className="flex flex-wrap items-end justify-between gap-x-9 gap-y-5">
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {heroFacts.map((fact) => (
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

          {/* The artist's own channels, on the right of the strip */}
          <div className="flex flex-wrap gap-2">
            {artist.links
              .filter((link) => /^https?:/.test(link.href))
              .map((link) => {
                const Icon = LINK_ICONS[link.label] ?? ExternalLink;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    aria-label={`${artist.name} on ${link.label}`}
                    title={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-colors hover:border-[#f25c27]/60 hover:text-[#f25c27]"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
          </div>
          </div>
        }
      />

      {/* Biography */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <Eyebrow>Biography</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white">
              {artist.name}
            </h2>
            <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-white/30">
              Free to reprint · credit the artist
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {artist.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="rounded-full border border-white/12 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white/70 transition-all hover:border-[#f25c27]/40 hover:text-white"
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
                    className="rounded-full border border-white/12 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white/70 transition-all hover:border-[#f25c27]/40 hover:text-white"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </div>

          <div className="space-y-5 text-base leading-relaxed text-white/55 md:col-span-8">
            {artist.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.12} tilt={4}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-14 md:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {artist.highlights.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} tilt={8}>
              <Card hover className="h-full p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-base font-bold leading-snug text-white">
                  {item.value}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Releases on the label */}
      {releases.length > 0 && (
        <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
          <SectionHeading eyebrow="Discography" title={`On ${ARTIST.displayName}`} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {releases.map((release, i) => (
              <Reveal key={release.id} delay={i * 0.1} tilt={8} className="h-full">
                <ReleaseCard release={release} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Podcasts & mixes from their SoundCloud */}
      {artist.mixes && artist.mixes.length > 0 && (
        <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
          <SectionHeading
            eyebrow="Listen"
            title="Podcasts & mixes"
            intro={`${artist.name}'s latest podcasts, live sets and DJ mixes. Press play to listen here.`}
            action={
              soundcloud && (
                <a
                  href={soundcloud}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="group inline-flex items-center gap-1.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/45 transition-colors hover:text-[#f25c27]"
                >
                  All on SoundCloud
                  <ExternalLink size={12} />
                </a>
              )
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {artist.mixes.map((mix, i) => (
              <Reveal key={mix.url} delay={(i % 3) * 0.07} tilt={6} className="h-full">
                <MixCard mix={mix} artist={artist.name} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Booking */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <Reveal>
          <Card className="grid items-center gap-8 p-8 md:grid-cols-12 md:p-10">
            <div className="md:col-span-8">
              <Eyebrow>Booking</Eyebrow>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                Book {artist.name}.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
                {`Send the enquiry through the label and it goes straight to ${artist.name} - availability and a fee back ${ARTIST.responseTime}.`}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <PrimaryLink to={`/booking?artist=${artist.id}`}>Booking enquiry</PrimaryLink>
              <a
                href={`mailto:${ARTIST.bookingEmail}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-[#f25c27]/40 hover:bg-white/10"
              >
                <Mail size={14} />
                Email
              </a>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* Rest of the roster */}
      <section className="mx-auto max-w-7xl px-6 py-16 pb-24 md:px-10">
        <SectionHeading
          eyebrow="Roster"
          title="Also on the label"
          action={
            <Link
              to="/artists"
              className="group inline-flex items-center gap-1.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/45 transition-colors hover:text-[#f25c27]"
            >
              <ArrowLeft
                size={12}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Full roster
            </Link>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, i) => (
            <Reveal key={other.id} delay={i * 0.08} tilt={8}>
              <TiltCard intensity={8} lift={14} className="h-full">
                <Link
                  to={`/artists/${other.id}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#111214] p-4 transition-colors hover:border-[#f25c27]/25"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#16171d] to-[#0d0e10]">
                    {artistPhoto(other.id, other.photo) ? (
                      <img
                        src={artistPhoto(other.id, other.photo)}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        style={{ objectPosition: other.photoPosition ?? "50% 30%" }}
                      />
                    ) : (
                      <span className="font-display text-sm font-black text-white/25">
                        {initials(other.name)}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm font-bold text-white">
                      {other.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wider text-white/35">
                      {[other.role, other.basedIn].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <ArrowRight
                    size={14}
                    className="ml-auto shrink-0 text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#f25c27]"
                  />
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2">
          <LogoMark size={18} />
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/25">
            Demos:{" "}
            <Link to="/demo" className="text-[#f25c27] hover:underline">
              submit through the demo form
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
