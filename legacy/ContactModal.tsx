import React, { useState } from "react";
import { X, Send, CheckCircle2, Sparkles, SendHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("identity-design");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    // Simulate real high-end interaction
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setService("identity-design");
    setMessage("");
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#060709eb] backdrop-blur-md"
        id="contact-backdrop"
      />

      {/* Contact Card Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0d0e12]/95 p-8 shadow-2xl md:p-10"
        id="contact-modal-box"
      >
        {/* Glow decoration */}
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />

        {/* Close Button button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-brand-orange hover:bg-brand-orange/10"
          aria-label="Close contact form"
          id="btn-close-contact"
        >
          <X size={16} />
        </button>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="contact-form-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-3 py-1 font-mono text-[10px] text-brand-orange uppercase tracking-wider mb-3">
                  <Sparkles size={11} className="animate-pulse" />
                  Initiate Design Alignment
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                  Let's craft something invisible.
                </h3>
                <p className="text-sm text-brand-gray mt-2 leading-relaxed">
                  Have a challenging project? Drop a message for consultation on branding, strategy, or high-end product experiences.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-gray mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ravindu Yasanka"
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all focus:border-brand-orange/60 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-gray mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ravindu@example.com"
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all focus:border-brand-orange/60 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-gray mb-1.5">
                    Primary Service Requirement
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-[#121318] px-4 py-3 font-sans text-sm text-white outline-none transition-all focus:border-brand-orange/60"
                  >
                    <option value="brand-strategy">#01 Brand Strategy</option>
                    <option value="identity-design">#02 Brand Identity Design</option>
                    <option value="packaging-design">#03 Packaging Design</option>
                    <option value="creative-direction">#04 Creative Direction</option>
                    <option value="full-alignment">Comprehensive Brand Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-gray mb-1.5">
                    Tell me about your parameters *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Project details, target milestones, architectural boundaries..."
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all focus:border-brand-orange/60 focus:bg-white/[0.05] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-brand-orange-light px-6 py-3.5 font-display text-sm font-semibold text-white transition-all cursor-pointer shadow-lg shadow-brand-orange/15 disabled:opacity-50"
                  id="btn-submit-contact"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Establishing Connection...
                    </>
                  ) : (
                    <>
                      Send Transmission
                      <SendHorizontal size={14} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="contact-success-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/30">
                <CheckCircle2 size={36} className="animate-bounce" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Alignment Transmitted!
              </h3>
              <p className="mt-2 text-sm text-brand-gray max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your parameters have been registered. I will respond to <strong>{email}</strong> within 12 standard business hours.
              </p>

              <div className="mt-8 rounded-xl bg-white/[0.02] p-4 text-left border border-white/5 max-w-sm mx-auto">
                <div className="font-mono text-[9px] uppercase tracking-wider text-brand-orange mb-1">Receipt details:</div>
                <div className="text-[12px] text-brand-gray space-y-1">
                  <p>• Client: <span className="text-white font-medium">{name}</span></p>
                  <p>• Department: <span className="text-white font-medium">#{service.replace("-", " ")}</span></p>
                  <p>• Status: <span className="text-green-400 font-medium font-mono">ENQUEUED</span></p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-8 rounded-full border border-white/10 hover:border-brand-orange bg-white/5 hover:bg-brand-orange/10 px-6 py-2.5 font-display text-xs font-medium text-white transition-all cursor-pointer"
                id="btn-reset-success"
              >
                Close Receipt
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
