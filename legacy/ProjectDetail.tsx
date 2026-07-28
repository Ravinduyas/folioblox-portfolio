import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PROJECTS } from "../data";
import { useContact } from "../context/ContactContext";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { openContact } = useContact();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  const others = PROJECTS.filter((p) => p.id !== id);

  return (
    <div className="min-h-screen">

      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-mono transition-colors"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>
      </div>

      {/* Hero image */}
      <section className="mt-8 max-w-7xl mx-auto px-6 md:px-10">
        <div className="rounded-2xl overflow-hidden relative bg-[#111214]" style={{ maxHeight: "520px" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ maxHeight: "520px" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, #0b0c0e 0%, transparent 55%)" }}
          />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#f25c27] font-semibold">
              {project.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mt-2 leading-tight">
              {project.title}
            </h1>
          </div>
          <span className="absolute top-5 right-5 bg-black/60 backdrop-blur-md text-white font-mono text-[10px] px-3 py-1.5 rounded-full">
            {project.year}
          </span>
        </div>
      </section>

      {/* Tags */}
      <div className="mt-6 max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-wider text-white/60 border border-white/10 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Body */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12">

          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27] mb-2">Overview</p>
              <p className="text-white/55 text-sm leading-relaxed">{project.fullDescription}</p>
            </div>
            <div className="rounded-xl bg-[#111214] border border-white/[0.05] p-5 space-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase text-white/30 mb-1">Category</p>
                <p className="text-white text-sm font-medium">{project.category}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-white/30 mb-1">Year</p>
                <p className="text-white text-sm font-medium">{project.year}</p>
              </div>
            </div>
            <button
              onClick={openContact}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[#f25c27] hover:bg-[#ff6d3a] text-white text-sm font-semibold px-6 py-3.5 transition-all shadow-lg shadow-[#f25c27]/20"
            >
              Start a similar project
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#f25c27] text-xs font-bold">→</span>
            </button>
          </aside>

          {/* Main content */}
          <div className="md:col-span-8 space-y-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27] mb-3">The Challenge</p>
              <h2 className="font-display text-2xl font-bold text-white mb-4">Problem Space</h2>
              <p className="text-white/55 text-base leading-relaxed">{project.challenge}</p>
            </div>

            <div className="h-px bg-white/[0.05]" />

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27] mb-3">The Solution</p>
              <h2 className="font-display text-2xl font-bold text-white mb-4">Craft & Execution</h2>
              <p className="text-white/55 text-base leading-relaxed">{project.solution}</p>
            </div>

            {/* Second project image (reuse as detail visual) */}
            <div className="rounded-2xl overflow-hidden bg-[#111214] aspect-video">
              <img
                src={project.image}
                alt={`${project.title} detail`}
                className="w-full h-full object-cover opacity-70"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Other projects */}
      <section className="py-14 pb-24 border-t border-white/[0.05] max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-display text-xl font-bold text-white">More Projects</h3>
          <Link to="/projects" className="font-mono text-xs text-[#f25c27] hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {others.map((p) => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="flex gap-4 rounded-xl bg-[#111214] border border-white/[0.05] hover:border-[#f25c27]/25 p-4 group transition-all"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#0d0e10]">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-mono text-[10px] uppercase text-[#f25c27]">{p.category}</span>
                <h4 className="font-display font-bold text-white text-sm mt-0.5 group-hover:text-[#f25c27] transition-colors">{p.title}</h4>
                <p className="text-white/40 text-xs mt-0.5 line-clamp-1">{p.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
