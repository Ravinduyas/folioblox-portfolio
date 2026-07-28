import { Link } from "react-router-dom";
import { IMAGES } from "../assets/images";
import { ARTIST, FACTS, GALLERY, LONG_BIO, SHORT_BIO } from "../data";
import PageHero from "../components/PageHero";
import Reveal from "../components/motion/Reveal";
import TiltCard from "../components/motion/TiltCard";
import { Card, Eyebrow, GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <PageHero
        eyebrow="The artist"
        title={ARTIST.displayName}
        intro={SHORT_BIO}
        image={IMAGES.portrait}
        objectPosition="66% 22%"
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
