import { Ticket } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Show } from "../types";
import { usePointerFine } from "../lib/usePointerFine";
import { formatShowDate } from "../data";
import { Pill } from "./ui";

export default function ShowRow({ show, past = false }: { show: Show; past?: boolean }) {
  const date = formatShowDate(show.date);
  const reduce = useReducedMotion();
  const finePointer = usePointerFine();

  return (
    <motion.div
      whileHover={
        reduce || past || !finePointer
          ? undefined
          : { rotateY: -1.6, rotateX: 1.2, x: 6, scale: 1.012, transition: { duration: 0.35 } }
      }
      style={{ transformPerspective: 1100, transformStyle: "preserve-3d" }}
      className={`grid grid-cols-[auto_1fr] md:grid-cols-[92px_1fr_auto] items-center gap-x-5 gap-y-3 rounded-2xl border border-white/[0.06] bg-[#111214] px-5 py-5 transition-colors ${
        past ? "opacity-55 hover:opacity-80" : "hover:border-[#f25c27]/25"
      }`}
    >
      {/* Date block */}
      <div className="text-center md:text-left">
        <p className="font-display text-2xl font-extrabold leading-none text-white">{date.day}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
          {date.month} {date.year}
        </p>
      </div>

      {/* Detail */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-bold tracking-tight text-white">
            {show.city}, {show.country}
          </h3>
          {!past && show.status === "sold-out" && <Pill tone="muted">Sold out</Pill>}
          {!past && show.status === "tba" && <Pill tone="neutral">Date confirmed · venue TBA</Pill>}
        </div>
        <p className="mt-1 truncate text-sm text-white/55">
          {show.event} · {show.venue}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/30">
          {show.setType}
          {show.lineup ? ` · w/ ${show.lineup.filter((n) => n !== "Exploration Recordings").join(", ")}` : ""}
        </p>
      </div>

      {/* Action */}
      <div className="col-span-2 md:col-span-1 md:justify-self-end">
        {past ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/25">Played</span>
        ) : show.status === "on-sale" && show.ticketUrl ? (
          <motion.a
            href={show.ticketUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={reduce ? undefined : { scale: 1.06 }}
            whileTap={reduce ? undefined : { scale: 0.94 }}
            data-cursor="tickets"
            className="group inline-flex items-center gap-2 rounded-full bg-[#f25c27] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff6d3a]"
          >
            <Ticket
              size={14}
              className="transition-transform duration-300 group-hover:-rotate-12"
            />
            Tickets
          </motion.a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/35">
            {show.status === "sold-out" ? "No tickets left" : "On sale soon"}
          </span>
        )}
      </div>
    </motion.div>
  );
}
