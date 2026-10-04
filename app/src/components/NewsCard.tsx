import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatShowDate } from "../data";
import { NewsItem } from "../types";
import TiltCard from "./motion/TiltCard";

/** A news story teaser — the whole card links to the full story. */
export default function NewsCard({ item }: { item: NewsItem }) {
  const date = formatShowDate(item.date);

  return (
    <TiltCard intensity={8} lift={14} className="h-full">
      <Link
        to={`/news/${item.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214] transition-colors hover:border-[#f25c27]/25"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0e10]">
          <img
            src={item.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            style={{ objectPosition: item.imagePosition ?? "50% 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-[#111214]/30 to-transparent" />
          {item.cover && (
            <img
              src={item.cover}
              alt=""
              aria-hidden="true"
              className="absolute bottom-3 right-3 h-16 w-16 rounded-lg shadow-xl shadow-black/50 ring-1 ring-white/10"
            />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#f25c27] backdrop-blur-md">
            {item.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <time
            dateTime={item.date}
            className="font-mono text-[10px] uppercase tracking-wider text-white/35"
          >
            {date.full}
          </time>
          <h3 className="mt-1.5 font-display text-lg font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-[#f25c27]">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-white/50">
            {item.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/45 transition-colors group-hover:text-[#f25c27]">
            Read the story
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
