import { FormEvent, useState } from "react";
import { CheckCircle2, SendHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { ARTIST } from "../data";

export interface BookingEnquiry {
  name: string;
  organisation: string;
  email: string;
  event: string;
  date: string;
  city: string;
  venue: string;
  capacity: string;
  setType: string;
  setLength: string;
  budget: string;
  message: string;
}

const EMPTY: BookingEnquiry = {
  name: "",
  organisation: "",
  email: "",
  event: "",
  date: "",
  city: "",
  venue: "",
  capacity: "",
  setType: "dj-set",
  setLength: "2h",
  budget: "",
  message: "",
};

/**
 * TODO: post this to the real inbox / CRM. Until then it resolves locally so
 * the funnel can be demoed end to end.
 */
async function sendEnquiry(enquiry: BookingEnquiry) {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  return { ok: true, enquiry };
}

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#f25c27]/60 focus:bg-white/[0.05]";
const labelClass =
  "block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1.5";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label} {required && <span className="text-[#f25c27]">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function BookingForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<BookingEnquiry>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof BookingEnquiry>(key: K, value: BookingEnquiry[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    await sendEnquiry(form);
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
        className="py-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.6, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#f25c27]/30 bg-[#f25c27]/10 text-[#f25c27]"
        >
          <CheckCircle2 size={32} />
        </motion.div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-white">Enquiry received.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/50">
          Thanks {form.name || "—"}. You'll get a reply at{" "}
          <span className="text-white">{form.email}</span> {ARTIST.responseTime}, including
          availability and a fee for {form.city || "your city"}.
        </p>
        <div className="mx-auto mt-7 max-w-sm rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-[#f25c27]">
            Summary
          </p>
          <div className="space-y-1 text-[12px] text-white/50">
            <p>
              • Event: <span className="font-medium text-white">{form.event || "—"}</span>
            </p>
            <p>
              • Date: <span className="font-medium text-white">{form.date || "—"}</span>
            </p>
            <p>
              • Set: <span className="font-medium text-white">{form.setType} · {form.setLength}</span>
            </p>
            <p>
              • Status: <span className="font-mono font-medium text-emerald-400">QUEUED</span>
            </p>
          </div>
        </div>
        <motion.button
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-7 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-display text-xs font-medium text-white transition-colors hover:border-[#f25c27] hover:bg-[#f25c27]/10"
        >
          Send another enquiry
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Your name" required>
          <input
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Booker / promoter name"
            className={inputClass}
          />
        </Field>
        <Field label="Promoter / venue / agency">
          <input
            value={form.organisation}
            onChange={(e) => set("organisation", e.target.value)}
            placeholder="Who you're booking for"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Email" required>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@promoter.com"
          className={inputClass}
        />
      </Field>

      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Event name" required>
          <input
            required
            value={form.event}
            onChange={(e) => set("event", e.target.value)}
            placeholder="Party / festival / series"
            className={inputClass}
          />
        </Field>
        <Field label="Date" required>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className={`${inputClass} [color-scheme:dark]`}
          />
        </Field>
      </div>

      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-3"}`}>
        <Field label="City / country" required>
          <input
            required
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Berlin, DE"
            className={inputClass}
          />
        </Field>
        <Field label="Venue">
          <input
            value={form.venue}
            onChange={(e) => set("venue", e.target.value)}
            placeholder="Room / club"
            className={inputClass}
          />
        </Field>
        <Field label="Capacity">
          <input
            value={form.capacity}
            onChange={(e) => set("capacity", e.target.value)}
            placeholder="e.g. 600"
            className={inputClass}
          />
        </Field>
      </div>

      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-3"}`}>
        <Field label="Set type">
          <select
            value={form.setType}
            onChange={(e) => set("setType", e.target.value)}
            className={`${inputClass} bg-[#121318]`}
          >
            <option value="dj-set">DJ set</option>
            <option value="extended">Extended / all-night</option>
            <option value="opening">Opening set</option>
            <option value="closing">Closing set</option>
            <option value="b2b">B2B</option>
            <option value="radio">Radio / broadcast</option>
          </select>
        </Field>
        <Field label="Set length">
          <select
            value={form.setLength}
            onChange={(e) => set("setLength", e.target.value)}
            className={`${inputClass} bg-[#121318]`}
          >
            <option value="1h">1 hour</option>
            <option value="2h">2 hours</option>
            <option value="3h">3 hours</option>
            <option value="4h+">4 hours +</option>
            <option value="all-night">All night long</option>
          </select>
        </Field>
        <Field label="Fee / budget" required>
          <input
            required
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            placeholder="Incl. currency"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Anything else">
        <textarea
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Line-up, set times, travel and accommodation, promo plan…"
          className={`${inputClass} resize-none`}
        />
      </Field>

      <motion.button
        type="submit"
        disabled={sending}
        whileHover={sending ? undefined : { scale: 1.015 }}
        whileTap={sending ? undefined : { scale: 0.985 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f25c27] px-6 py-3.5 font-display text-sm font-semibold text-white shadow-lg shadow-[#f25c27]/15 transition-colors hover:bg-[#ff6d3a] disabled:opacity-50"
      >
        {sending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Sending enquiry…
          </>
        ) : (
          <>
            Send booking enquiry
            <SendHorizontal size={14} />
          </>
        )}
      </motion.button>

      <p className="text-center font-mono text-[10px] uppercase tracking-wider text-white/25">
        Replies {ARTIST.responseTime} · or email {ARTIST.bookingEmail}
      </p>
    </form>
  );
}
