import { Link } from "react-router-dom";
import { Check, Clock, Mail, UserRound, Users } from "lucide-react";
import { motion } from "motion/react";
import { IMAGES } from "../assets/images";
import { ARTIST, ROSTER } from "../data";
import BookingForm from "../components/BookingForm";
import PageHero from "../components/PageHero";
import Reveal, { EASE } from "../components/motion/Reveal";
import { Card } from "../components/ui";

const CHECKLIST = [
  "Which artist - or the kind of set you need, and we'll recommend",
  "Date, city and venue (or the shortlist you're choosing between)",
  "Room capacity and expected attendance",
  "Set length and slot - opening, peak, closing, all-night",
  "Fee offer including currency, plus who covers travel and hotel",
  "Whether the line-up is already announced",
];

export default function Booking() {
  const hasAgent = Boolean(ARTIST.agent.name);
  const hasManagement = Boolean(ARTIST.management.name);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageHero
        eyebrow="Bookings"
        title="Book an artist."
        intro={`Bring an ${ARTIST.displayName} artist to your event. Enquiries come straight to the label, and answers come back ${ARTIST.responseTime} with availability and a fee.`}
        image={IMAGES.boothPov}
        objectPosition="45% 35%"
        glow="ellipse 46% 56% at 82% 46%"
        height={360}
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {[
              { label: "Reply time", value: ARTIST.responseTime },
              { label: "Roster", value: `${ROSTER.length} artists` },
              { label: "Direct", value: ARTIST.bookingEmail },
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

      {/* Form + sidebar */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Form */}
          <Reveal direction="right" className="lg:col-span-7">
            <Card className="p-7 md:p-9">
              <h2 className="font-display text-xl font-bold tracking-tight text-white">
                Enquiry form
              </h2>
              <p className="mb-7 mt-1.5 text-sm text-white/45">
                Fields marked <span className="text-[#f25c27]">*</span> are the ones needed to give
                you a straight answer.
              </p>
              <BookingForm />
            </Card>
          </Reveal>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal direction="left" delay={0.08}>
            <Card hover className="p-7">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#f25c27]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  What to include
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                Get a firm answer first time.
              </h3>
              <ul className="mt-4 space-y-2.5">
                {CHECKLIST.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-white/50"
                  >
                    <Check size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </Card>
            </Reveal>

            <Reveal direction="left" delay={0.16}>
            <Card hover className="p-7">
              <div className="flex items-center gap-2">
                <UserRound size={14} className="text-[#f25c27]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  {hasAgent || hasManagement ? "Agents & management" : "Representation"}
                </span>
              </div>

              {hasAgent || hasManagement ? (
                <div className="mt-4 space-y-4">
                  {hasAgent && (
                    <div>
                      <p className="font-display text-sm font-bold text-white">
                        {ARTIST.agent.name} · {ARTIST.agent.company}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                        {ARTIST.agent.territories}
                      </p>
                      <a
                        href={`mailto:${ARTIST.agent.email}`}
                        className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-white transition-colors hover:text-[#f25c27]"
                      >
                        <Mail size={11} />
                        {ARTIST.agent.email}
                      </a>
                    </div>
                  )}
                  {hasManagement && (
                    <div>
                      <p className="font-display text-sm font-bold text-white">
                        {ARTIST.management.name}
                      </p>
                      <a
                        href={`mailto:${ARTIST.management.email}`}
                        className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-white transition-colors hover:text-[#f25c27]"
                      >
                        <Mail size={11} />
                        {ARTIST.management.email}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">
                    Booked through the label.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Bookings for every roster artist are handled by the label directly. If an
                    artist signs with an agency, their details will appear here.
                  </p>
                  <a
                    href={`mailto:${ARTIST.bookingEmail}`}
                    className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-white transition-colors hover:text-[#f25c27]"
                  >
                    <Mail size={12} />
                    {ARTIST.bookingEmail}
                  </a>
                </>
              )}
            </Card>
            </Reveal>

            <Reveal direction="left" delay={0.24}>
            <Card hover className="p-7">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[#f25c27]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  The roster
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                Not sure who to book?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Every artist page has a full biography and their releases on the label - or leave
                the artist blank and we'll recommend someone for the room.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {ROSTER.map((artist) => (
                  <Link
                    key={artist.id}
                    to={`/artists/${artist.id}`}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/70 transition-all hover:border-[#f25c27]/40 hover:text-white"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>
            </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
