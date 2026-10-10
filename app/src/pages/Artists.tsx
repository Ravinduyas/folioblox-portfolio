import { Link } from "react-router-dom";
import { artistPhoto } from "../assets/artists";
import { ARTIST, ROSTER } from "../data";
import ArtistCard from "../components/ArtistCard";
import PageHero, { HeroSlide } from "../components/PageHero";
import Reveal from "../components/motion/Reveal";
import { GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

/**
 * Full-width hero shots, one per artist (1600px, from the originals — the
 * 1100px gallery photos go soft stretched across the band). Falls back to the
 * artist's lead photo.
 */
const HERO_FILES = import.meta.glob("../assets/images/artist-heroes/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const heroPhoto = (id: string) =>
  Object.entries(HERO_FILES).find(([path]) => path.endsWith(`/${id}.jpg`))?.[1];

/**
 * Vertical crop of each shot in the hero photo panel (the right half on
 * desktop), framing head and shoulders.
 */
const HERO_CROP: Record<string, string> = {
  "junior-sl": "50% 14%",
  alpha21: "50% 30%",
  "esh-sl": "50% 12%",
  "c-groove": "50% 18%",
  dlc: "50% 22%",
};

/** One full-width slide per artist: their lead photo, linking to their page. */
const SLIDES: HeroSlide[] = ROSTER.flatMap((artist) => {
  const src = heroPhoto(artist.id) ?? artistPhoto(artist.id, artist.photo);
  return src
    ? [{ src, label: artist.name, to: `/artists/${artist.id}`, position: HERO_CROP[artist.id] ?? "50% 15%" }]
    : [];
});

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
        slides={SLIDES}
        glow="ellipse 52% 58% at 74% 36%"
        height={440}
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
