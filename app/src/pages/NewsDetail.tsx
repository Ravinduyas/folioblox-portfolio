import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { NEWS, findRelease, formatShowDate, latestNews } from "../data";
import NewsCard from "../components/NewsCard";
import PageHero from "../components/PageHero";
import ReleaseCard from "../components/ReleaseCard";
import Reveal from "../components/motion/Reveal";
import { Eyebrow, GhostLink, PrimaryLink, SectionHeading } from "../components/ui";

/** One news story, with the release it's about alongside. */
export default function NewsDetail() {
  const { newsId } = useParams();
  const item = NEWS.find((entry) => entry.id === newsId);

  if (!item) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center md:px-10">
        <Eyebrow>Not found</Eyebrow>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white">
          No story by that name.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
          The link may be out of date.
        </p>
        <div className="mt-7">
          <PrimaryLink to="/news">All news</PrimaryLink>
        </div>
      </div>
    );
  }

  const date = formatShowDate(item.date);
  const release = findRelease(item.releaseId);
  const more = latestNews().filter((entry) => entry.id !== item.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow={`${item.category} · ${date.full}`}
        title={item.title}
        intro={item.excerpt}
        image={item.image}
        objectPosition={item.imagePosition ?? "50% 40%"}
        glow="ellipse 50% 58% at 76% 38%"
        height={420}
        actions={
          <>
            {release && (
              <a
                href={release.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#f25c27] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f25c27]/20 transition-all hover:bg-[#ff6d3a]"
              >
                Buy / stream {release.catalogue}
              </a>
            )}
            <GhostLink to="/news">All news</GhostLink>
          </>
        }
      />

      <section className="mx-auto max-w-7xl border-b border-white/[0.05] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <article className="space-y-5 text-base leading-relaxed text-white/60 md:col-span-7 md:sticky md:top-28 md:self-start">
            <time
              dateTime={item.date}
              className="block font-mono text-[10px] uppercase tracking-wider text-white/30"
            >
              {date.full}
            </time>
            {item.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.1} tilt={4}>
                <p>{para}</p>
              </Reveal>
            ))}
            <Link
              to="/news"
              className="group inline-flex items-center gap-1.5 pt-4 font-mono text-[11px] uppercase tracking-wider text-white/45 transition-colors hover:text-[#f25c27]"
            >
              <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to news
            </Link>
          </article>

          {release && (
            <aside className="md:col-span-5 md:sticky md:top-28 md:self-start">
              <Reveal direction="left" delay={0.1}>
                <ReleaseCard release={release} />
              </Reveal>
            </aside>
          )}
        </div>
      </section>

      {more.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 pb-24 md:px-10">
          <SectionHeading eyebrow="Keep reading" title="More news" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {more.map((entry, i) => (
              <Reveal key={entry.id} delay={i * 0.08} tilt={8} className="h-full">
                <NewsCard item={entry} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
