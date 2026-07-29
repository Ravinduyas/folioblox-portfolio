import { useState } from "react";
import { Compass, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IMAGES } from "../assets/images";
import Reveal, { EASE } from "../components/motion/Reveal";
import { ARTIST, formatShowDate, pastShows, upcomingShows } from "../data";
import PageHero from "../components/PageHero";
import ShowRow from "../components/ShowRow";
import { PrimaryLink, SectionHeading } from "../components/ui";

export default function Shows() {
  const upcoming = upcomingShows();
  const past = pastShows();
  const [showAllPast, setShowAllPast] = useState(false);
  const visiblePast = showAllPast ? past : past.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageHero
        eyebrow="Live"
        title={
          <>
            Where to
            <br />
            catch a set.
          </>
        }
        intro={`${upcoming.length} confirmed dates. Tickets go through the promoter or RA — this page always links to the official source.`}
        image={IMAGES.hero}
        objectPosition="60% 18%"
        glow="ellipse 55% 62% at 70% 42%"
        actions={
          <a
            href={ARTIST.residentAdvisor}
            target="_blank"
            rel="noreferrer"
            data-cursor="open"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-[#f25c27]/40 hover:bg-white/15"
          >
            <Compass size={14} />
            Resident Advisor profile
            <ExternalLink size={12} className="text-white/40" />
          </a>
        }
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {upcoming.slice(0, 3).map((show) => {
              const date = formatShowDate(show.date);
              return (
                <div key={show.id} className="flex flex-col gap-[5px]">
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
                </div>
              );
            })}
            <span
              className="font-mono leading-none text-white/40"
              style={{ fontSize: "11px" }}
            >
              +{Math.max(upcoming.length - 3, 0)} more below
            </span>
          </div>
        }
      />

      {/* Upcoming */}
      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <SectionHeading
          eyebrow="Tour dates"
          title="Upcoming"
          action={<PrimaryLink to="/booking">Book a date</PrimaryLink>}
        />

        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((show, i) => (
              <Reveal key={show.id} delay={i * 0.07} tilt={8}>
                <ShowRow show={show} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-[#111214] p-10 text-center">
            <p className="text-sm text-white/50">
              No dates announced right now — the next run is being confirmed.
            </p>
            <div className="mt-5 flex justify-center">
              <PrimaryLink to="/booking">Enquire about a booking</PrimaryLink>
            </div>
          </div>
        )}
      </section>

      {/* Past */}
      <section className="mx-auto max-w-7xl px-6 py-16 pb-24 md:px-10">
        <SectionHeading
          eyebrow="Archive"
          title="Past shows"
          intro="A working record of where the sets have landed — useful for promoters checking routing and draw."
        />

        <motion.div layout className="space-y-3">
          <AnimatePresence initial={false}>
            {visiblePast.map((show, i) => (
              <motion.div
                key={show.id}
                layout
                initial={{ opacity: 0, y: 20, rotateX: -8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -12, rotateX: 6 }}
                transition={{ duration: 0.45, delay: i < 4 ? i * 0.06 : (i - 4) * 0.05, ease: EASE }}
                style={{ transformPerspective: 1100 }}
              >
                <ShowRow show={show} past />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {past.length > 4 && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAllPast(!showAllPast)}
            className="mt-6 rounded-full border border-white/12 bg-white/[0.03] px-6 py-2.5 font-mono text-[10px] uppercase tracking-wider text-white/50 transition-all hover:border-[#f25c27]/40 hover:text-white"
          >
            {showAllPast ? "Show fewer" : `Show all ${past.length} past shows`}
          </motion.button>
        )}
      </section>
    </div>
  );
}
