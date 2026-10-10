import { Link } from "react-router-dom";
import { IMAGES } from "../assets/images";
import { ARTIST, ROSTER } from "../data";
import ArtistCard from "../components/ArtistCard";
import PageHero from "../components/PageHero";
import Reveal from "../components/motion/Reveal";
import { GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

export default function Artists() {

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
        intro="The DJs and producers of Exploration Recordings - progressive and organic house from Sri Lanka."
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
              { label: "Co-founders", value: String(ROSTER.filter((artist) => artist.resident).length) },
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
          intro="Each artist page has their full biography, their links and their releases on the label."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROSTER.map((artist, i) => (
            <Reveal key={artist.id} delay={(i % 4) * 0.07} tilt={10} className="h-full">
              <ArtistCard artist={artist} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-wider text-white/25">
          Demos:{" "}
            <Link to="/demo" className="text-[#f25c27] hover:underline">
              submit through the demo form
            </Link>
        </p>
      </section>
    </div>
  );
}
