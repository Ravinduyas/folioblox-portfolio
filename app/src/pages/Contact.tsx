import { FormEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, CheckCircle2, Disc3, Mail, Newspaper, SendHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { IMAGES } from "../assets/images";
import { ARTIST, SOCIALS } from "../data";
import PageHero from "../components/PageHero";
import Reveal from "../components/motion/Reveal";
import { Card } from "../components/ui";

const TOPICS = ["General", "Press", "Demo submission", "Licensing", "Other"] as const;

interface Message {
  name: string;
  email: string;
  topic: (typeof TOPICS)[number];
  message: string;
}

const EMPTY: Message = { name: "", email: "", topic: "General", message: "" };

/**
 * TODO: post this to the real inbox. Until then it resolves locally, the same
 * as the booking form, so the flow can be demoed end to end.
 */
async function sendMessage(message: Message) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { ok: true, message };
}

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#f25c27]/60 focus:bg-white/[0.05]";
const labelClass = "block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1.5";

/** Where each kind of message should go. */
const CHANNELS: { icon: typeof Mail; title: string; text: string; email: string; action?: ReactNode }[] = [
  {
    icon: Newspaper,
    title: "General & press",
    text: "Interviews, features, premieres and anything else about the label.",
    email: ARTIST.pressEmail,
  },
  {
    icon: CalendarCheck,
    title: "Bookings",
    text: "Book a label artist for your event — the form gets you the fastest answer.",
    email: ARTIST.bookingEmail,
    action: (
      <Link
        to="/booking"
        className="inline-flex items-center gap-2 rounded-full bg-[#f25c27] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#ff6d3a]"
      >
        Booking form
      </Link>
    ),
  },
  {
    icon: Disc3,
    title: "Demos",
    text: "Progressive house that goes somewhere deeper. One private streaming link, no attachments.",
    email: ARTIST.pressEmail,
  },
];

export default function Contact() {
  const [form, setForm] = useState<Message>(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Message>(key: K, value: Message[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    await sendMessage(form);
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Contact us"
        title="Get in touch."
        intro={`General questions, press, demos or licensing — send a message and the label replies ${ARTIST.responseTime}.`}
        image={IMAGES.studioDark}
        objectPosition="50% 45%"
        glow="ellipse 46% 56% at 80% 44%"
        height={360}
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {[
              { label: "Reply time", value: ARTIST.responseTime },
              { label: "Based in", value: ARTIST.basedIn },
              { label: "Email", value: ARTIST.pressEmail },
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
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Message form */}
          <Reveal direction="right" className="lg:col-span-7">
            <Card className="p-7 md:p-9">
              {sent ? (
                <div className="py-8 text-center">
                  <motion.div
                    initial={{ scale: 0.6, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#f25c27]/30 bg-[#f25c27]/10 text-[#f25c27]"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                    Message sent.
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/50">
                    Thanks {form.name || "—"}. You'll hear back at{" "}
                    <span className="text-white">{form.email}</span> {ARTIST.responseTime}.
                  </p>
                  <button
                    onClick={() => {
                      setForm(EMPTY);
                      setSent(false);
                    }}
                    className="mt-7 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-display text-xs font-medium text-white transition-colors hover:border-[#f25c27] hover:bg-[#f25c27]/10"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold tracking-tight text-white">
                    Send a message
                  </h2>
                  <p className="mb-7 mt-1.5 text-sm text-white/45">
                    Booking an artist? The{" "}
                    <Link to="/booking" className="text-[#f25c27] hover:underline">
                      booking form
                    </Link>{" "}
                    asks for everything needed to give you a fee.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className={labelClass}>
                          Your name <span className="text-[#f25c27]">*</span>
                        </span>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          className={inputClass}
                        />
                      </label>
                      <label className="block">
                        <span className={labelClass}>
                          Email <span className="text-[#f25c27]">*</span>
                        </span>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className={labelClass}>Topic</span>
                      <select
                        value={form.topic}
                        onChange={(e) => set("topic", e.target.value as Message["topic"])}
                        className={`${inputClass} bg-[#121318]`}
                      >
                        {TOPICS.map((topic) => (
                          <option key={topic}>{topic}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className={labelClass}>
                        Message <span className="text-[#f25c27]">*</span>
                      </span>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder={
                          form.topic === "Demo submission"
                            ? "A few words about the track, plus one private streaming link"
                            : "How can we help?"
                        }
                        className={`${inputClass} resize-none`}
                      />
                    </label>
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
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <SendHorizontal size={14} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </Card>
          </Reveal>

          {/* Direct channels */}
          <div className="space-y-6 lg:col-span-5">
            {CHANNELS.map(({ icon: Icon, title, text, email, action }, i) => (
              <Reveal key={title} direction="left" delay={0.08 * (i + 1)}>
                <Card hover className="p-7">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-[#f25c27]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                      {title}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{text}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-2 font-mono text-xs text-white transition-colors hover:text-[#f25c27]"
                    >
                      <Mail size={12} />
                      {email}
                    </a>
                    {action}
                  </div>
                </Card>
              </Reveal>
            ))}

            <Reveal direction="left" delay={0.32}>
              <div className="flex flex-wrap gap-2 px-1">
                {SOCIALS.filter((link) => link.group === "social").map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="rounded-full border border-white/12 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white/70 transition-all hover:border-[#f25c27]/40 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
