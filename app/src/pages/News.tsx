import { IMAGES } from "../assets/images";
import { formatShowDate, latestNews } from "../data";
import NewsCard from "../components/NewsCard";
import PageHero from "../components/PageHero";
import Reveal from "../components/motion/Reveal";
import { SectionHeading } from "../components/ui";

export default function News() {
  const news = latestNews();
  const newest = news[0] ? formatShowDate(news[0].date) : undefined;

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="News"
        title={
          <>
            From the
            <br />
            label.
          </>
        }
        intro="Release announcements, pre-orders and label news - newest first."
        image={IMAGES.festival}
        objectPosition="55% 45%"
        glow="ellipse 50% 60% at 78% 34%"
        height={380}
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {[
              { label: "Stories", value: String(news.length) },
              ...(newest ? [{ label: "Latest", value: newest.full }] : []),
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

      <section className="mx-auto max-w-7xl px-6 py-16 pb-24 md:px-10">
        <SectionHeading eyebrow="All stories" title="Latest news" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} tilt={8} className="h-full">
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
