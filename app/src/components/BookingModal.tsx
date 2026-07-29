import { useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";
import { ARTIST } from "../data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#060709eb] backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        role="dialog"
        aria-modal="true"
        aria-label="Booking enquiry"
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0d0e12]/95 p-7 shadow-2xl md:p-9"
      >
        <div className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#f25c27]/20 blur-3xl" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-[#f25c27] hover:bg-[#f25c27]/10"
          aria-label="Close booking form"
        >
          <X size={16} />
        </button>

        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#f25c27]/30 bg-[#f25c27]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#f25c27]">
            <Sparkles size={11} />
            Booking enquiry
          </div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-white">
            Let's get a date in.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            Direct to {ARTIST.displayName} — no agency in between. Everything a promoter needs is
            on the{" "}
            <Link to="/press" onClick={onClose} className="text-[#f25c27] hover:underline">
              press kit
            </Link>
            .
          </p>
        </div>

        <BookingForm compact />
      </motion.div>
    </div>
  );
}
