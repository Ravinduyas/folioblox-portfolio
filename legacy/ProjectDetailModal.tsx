import { Project } from "../types";
import { X, ArrowRight, Check, Calendar, Folder, Tag } from "lucide-react";
import { motion } from "motion/react";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
  onOpenContact,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#060709d0] backdrop-blur-md"
        id="modal-backdrop"
      />

      {/* Main Panel Content */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-white/5 bg-brand-dark/95 p-8 shadow-2xl md:p-12"
        id="modal-content"
      >
        {/* Close Button Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange hover:text-white"
          aria-label="Close project modal"
          id="btn-close-modal"
        >
          <X size={18} />
        </button>

        {/* Project Header Info */}
        <div className="mt-8 select-none">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">
            {project.category}
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            {project.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-brand-gray">
            {project.subtitle}
          </p>
        </div>

        {/* Key Project Meta Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/5 py-4 font-mono text-xs text-brand-gray select-none">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-orange" />
            <span>Project Year: <strong className="text-white">{project.year}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Folder size={14} className="text-brand-orange" />
            <span>Niche Focus: <strong className="text-white">{project.category.split(" / ")[0]}</strong></span>
          </div>
        </div>

        {/* Dynamic Image Representation */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/5 bg-[#121318]">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover object-center transition-all duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
            id="modal-project-img"
          />
        </div>

        {/* Core Case Study Content */}
        <div className="mt-10 space-y-8">
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Overview</h3>
            <p className="mt-2 text-base leading-relaxed text-brand-gray">
              {project.fullDescription}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-brand-orange">The Challenge</h4>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                {project.challenge}
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-green-400">The Solution</h4>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                {project.solution}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white mb-3">Key Technologies & Capabilities</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white"
                >
                  <Tag size={10} className="text-brand-orange" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 rounded-2xl bg-mesh-red-orange p-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-xl font-bold text-white">Like what you see?</h4>
            <p className="text-sm text-brand-gray mt-1">Let's craft your next major visual story together.</p>
          </div>
          <button
            onClick={() => {
              onClose();
              setTimeout(onOpenContact, 200);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange hover:bg-brand-orange-light px-6 py-3 font-display font-medium text-white transition-all duration-300 shadow-lg shadow-brand-orange/20 cursor-pointer text-sm"
            id="modal-cta-get-in-touch"
          >
            Start Project
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
