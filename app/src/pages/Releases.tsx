import { ExternalLink } from "lucide-react";
import { IMAGES } from "../assets/images";
import { ARTIST, RELEASES, formatShowDate } from "../data";
import PageHero from "../components/PageHero";
import { Billing, Credit } from "../components/ReleaseCard";
import Reveal from "../components/motion/Reveal";
import TiltCard from "../components/motion/TiltCard";
import { GhostLink, Pill } from "../components/ui";

export default function Releases() {
  const trackCount = RELEASES.reduce((sum, release) => sum + release.tracks.length, 0);

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Catalogue"
        title={
          <>
            Every
            <br />
            release.
          </>
        }
        intro="The full Exploration Recordings catalogue - liner notes, tracklists, and a link to buy or stream every record on Proton Radio."
        image={IMAGES.realRedDecks}
        objectPosition="60% 30%"
        glow="ellipse 50% 60% at 78% 32%"
        height={400}
        actions={<GhostLink href={ARTIST.profileUrl}>Label on Proton Radio</GhostLink>}
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {[
              { label: "Releases", value: String(RELEASES.length) },
              { label: "Tracks", value: String(trackCount) },
              { label: "Genre", value: ARTIST.genres[0] },
            ].map((fact) => (
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

      <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        {RELEASES.map((release) => {
          const date = formatShowDate(release.date);
          const preOrder = release.preOrderDate ? formatShowDate(release.preOrderDate) : undefined;

          return (
            <section
              key={release.id}
              id={release.id}
              className="scroll-mt-24 border-b border-white/[0.05] py-16 last:border-b-0"
            >
              <div className="grid gap-10 md:grid-cols-12">
                <Reveal direction="right" className="md:col-span-5 md:sticky md:top-28 md:self-start">
                  <TiltCard intensity={10} lift={20}>
                    <img
                      src={release.artwork}
                      alt={`${release.title} artwork`}
                      className="aspect-square w-full rounded-2xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/10"
                    />
                  </TiltCard>
                </Reveal>

                <Reveal direction="left" delay={0.08} className="md:col-span-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="orange">{release.catalogue}</Pill>
                    <Pill>{release.genre}</Pill>
                    <Pill tone="muted">
                      <time dateTime={release.date}>{date.full}</time>
                    </Pill>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {release.title} EP
                  </h2>
                  <p className="mt-1.5 font-display text-lg font-semibold text-white/70">
                    <Billing names={release.artists} />
                  </p>

                  <div className="mt-5 space-y-3 text-sm leading-relaxed text-white/50">
                    {release.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Not <Card>: its h-full would stretch this to the whole grid column
                      and push the buy row down into the next release. */}
                  <div className="mt-7 rounded-2xl border border-white/[0.06] bg-[#111214] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                      Tracklist
                    </p>
                    <ol className="mt-3 divide-y divide-white/[0.05]">
                      {release.tracks.map((track, i) => (
                        <li
                          key={`${track.title}-${track.version}`}
                          className="flex items-baseline gap-4 py-2.5 text-sm"
                        >
                          <span className="font-mono text-[11px] text-white/25">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="font-medium text-white/85">{track.title}</span>
                            <span className="text-white/40">
                              {" "}
                              (
                              {track.remixer ? (
                                <>
                                  <Credit name={track.remixer} />
                                  {track.version.slice(track.remixer.length)}
                                </>
                              ) : (
                                track.version
                              )}
                              )
                            </span>
                          </span>
                          <span className="font-mono text-[11px] text-white/35">{track.duration}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={release.url}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-2 rounded-full bg-[#f25c27] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#ff6d3a]"
                    >
                      Buy / stream on Proton
                      <ExternalLink size={13} />
                    </a>
                    {preOrder && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                        Pre-order opened {preOrder.full}
                      </span>
                    )}
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
