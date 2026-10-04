import { IMAGES } from "../assets/images";
import { ARTIST, ROSTER } from "../data";
import ArtistCard from "../components/ArtistCard";
import PageHero from "../components/PageHero";
import Reveal from "../components/motion/Reveal";
import { GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

export default function Artists() {
  const countries = new Set(ROSTER.map((artist) => artist.basedIn.split(", ").pop()));

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Roster"
        title={
          <>
            The
            <br />
            artists.
          </>
        }
        intro="Everyone who has released or remixed on Exploration Recordings — producers and DJs from Sri Lanka and beyond."
        image={IMAGES.portraitShades}
        objectPosition="52% 30%"
        glow="ellipse 52% 58% at 74% 36%"
        height={400}
        actions={
          <>
            <PrimaryLink to="/booking">Book an artist</PrimaryLink>
            <GhostLink to="/releases">Hear the releases</GhostLink>
          </>
        }
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {[
              { label: "Artists", value: String(ROSTER.length) },
              { label: "Countries", value: String(countries.size) },
              { label: "Home", value: ARTIST.basedIn },
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

      <section id="roster" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 pb-24 md:px-10">
        <SectionHeading
          eyebrow="On the label"
          title="Roster"
          intro="Original artists and remixers across the catalogue. Each artist page has their full biography and their releases on the label."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROSTER.map((artist, i) => (
            <Reveal key={artist.id} delay={(i % 4) * 0.07} tilt={10} className="h-full">
              <ArtistCard artist={artist} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-white/25">
          Demos: {ARTIST.pressEmail} · one link, no attachments
        </p>
      </section>
    </div>
  );
}
