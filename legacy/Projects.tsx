import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { PROJECTS } from "../data";
import { useContact } from "../context/ContactContext";

export default function Projects() {
  const { openContact } = useContact();

  return (
    <div className="min-h-screen">

      {/* Header */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-10 border-b border-white/[0.05]">
        <div className="grid md:grid-cols-2 gap-10 items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#f25c27] font-bold">
              Behind the Designs
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-2 leading-tight">
              Shaping<br />
              Experiences That<br />
              Make Life Simpler
            </h1>
          </div>

          <div className="flex flex-col gap-6 pb-1">
            <p className="text-white/55 text-base leading-relaxed">
              I'm a product designer focused on building clean, intuitive interfaces that solve real-world problems.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <span className="font-mono text-xs text-[#f25c27]/70">
                Let's Build Something<br />Meaningful Together
              </span>
              <button
                onClick={openContact}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#f25c27] hover:bg-[#ff6d3a] text-white text-sm font-semibold px-6 py-3 transition-all shadow-lg shadow-[#f25c27]/20 group"
              >
                Get in touch
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#f25c27] text-xs font-bold group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 pb-28 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.12 }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="block rounded-2xl overflow-hidden bg-[#111214] border border-white/[0.05] hover:border-[#f25c27]/25 group transition-all duration-300"
              >
                <div className="overflow-hidden aspect-[3/4] relative bg-[#0d0e10]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-mono text-xs text-white border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
                      View Project →
                    </span>
                  </div>
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-1 rounded-full">
                    {project.year}
                  </span>
                </div>

                <div className="p-5">
                  <span className="font-mono text-[10px] uppercase text-[#f25c27] font-semibold">
                    {project.category}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-white tracking-tight group-hover:text-[#f25c27] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/45 leading-relaxed line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
