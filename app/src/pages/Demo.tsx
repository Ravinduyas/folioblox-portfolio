import { FormEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Check, CheckCircle2, Mail, Newspaper, SendHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { IMAGES } from "../assets/images";
import { ARTIST } from "../data";
import PageHero from "../components/PageHero";
import Reveal, { EASE } from "../components/motion/Reveal";
import { Card } from "../components/ui";

/**
 * Demo submission — the questions from the label's Notion demo form, built as
 * native fields.
 *
 * The Notion API doesn't expose the form's choice lists publicly, so the
 * choice questions below use options written for this label: review them in
 * DEMO_OPTIONS.
 */

export const DEMO_OPTIONS = {
  genre: ["Progressive House", "Melodic House", "Deep House", "Organic House", "Melodic Techno", "Other"],
  mastering: ["Yes, mastered", "No, unmastered"],
  releasedWithUs: ["Yes", "No"],
  previousReleases: ["Yes", "No"],
  exclusive: ["Only sent to Exploration Recordings", "Also sent to other labels"],
  foundUs: ["SoundCloud", "Instagram", "Proton Radio", "Beatport", "A friend or artist", "Other"],
} as const;

export interface DemoSubmission {
  artistName: string;
  firstName: string;
  email: string;
  title: string;
  soundcloud: string;
  trackCount: string;
  tracklist: string;
  genre: string;
  mastering: string;
  releasedWithUs: string;
  previousReleases: string;
  foundUs: string;
  exclusive: string;
  confirmed: boolean;
  message: string;
}

const EMPTY: DemoSubmission = {
  artistName: "",
  firstName: "",
  email: "",
  title: "",
  soundcloud: "",
  trackCount: "1",
  tracklist: "",
  genre: "",
  mastering: "",
  releasedWithUs: "",
  previousReleases: "",
  foundUs: "",
  exclusive: "",
  confirmed: false,
  message: "",
};

/**
 * TODO: send to the real destination (the Notion database via a serverless
 * function, or an email form service). Until then it resolves locally, like
 * the booking form, so the flow can be demoed end to end.
 */
async function sendDemo(demo: DemoSubmission) {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  return { ok: true, demo };
}

/** From the demo guide — what every submission is checked for. */
const GUIDE = [
  "Every track needs a title - not “ID”.",
  "Finished, final tracks only. No works in progress.",
  "One private SoundCloud link. EPs: 2 or more tracks in one private playlist.",
  "Open your link in a private browsing window first and check it plays.",
  "No Google Drive, Dropbox or download links.",
  "All vocals and samples must be copyright-free or cleared in writing.",
  "AI-generated tracks are not accepted.",
];

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 font-sans text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#f25c27]/60 focus:bg-white/[0.05] aria-[invalid=true]:border-red-400/60";
const labelClass = "block font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1.5";

/**
 * A labelled question. `group` renders a fieldset + legend instead of a label,
 * for choice questions — each pill is already its own label, and labels can't nest.
 */
function Field({
  label,
  help,
  error,
  group = false,
  children,
}: {
  label: string;
  help?: ReactNode;
  error?: string;
  group?: boolean;
  children: ReactNode;
}) {
  const Wrapper = group ? "fieldset" : "label";
  const Title = group ? "legend" : "span";
  return (
    <Wrapper className="block">
      <Title className={labelClass}>
        {label} <span className="text-[#f25c27]">*</span>
      </Title>
      {help && <span className="mb-2 block text-xs leading-relaxed text-white/40">{help}</span>}
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </Wrapper>
  );
}

/** Pill-style single choice — tappable, and keyboard-accessible as radios. */
function Choice({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label
          key={option}
          className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#f25c27]/60 ${
            value === option
              ? "border-[#f25c27] bg-[#f25c27]/10 text-[#f25c27]"
              : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            required
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

/** Checks the rules the Notion form spells out, before anything is sent. */
function validate(demo: DemoSubmission): Partial<Record<keyof DemoSubmission, string>> {
  const errors: Partial<Record<keyof DemoSubmission, string>> = {};
  const artist = demo.artistName.trim().toLowerCase();
  if (artist && demo.title.toLowerCase().includes(artist)) {
    errors.title = "Only the track or EP title - leave your artist name out.";
  }
  if (/drive\.google|dropbox|wetransfer|mega\.nz/i.test(demo.soundcloud)) {
    errors.soundcloud = "We can't accept Google Drive, Dropbox or download links - use a private SoundCloud link.";
  } else if (demo.soundcloud && !/^https?:\/\/(www\.|m\.|on\.)?soundcloud\.com\//i.test(demo.soundcloud.trim())) {
    errors.soundcloud = "This needs to be a private SoundCloud link.";
  }
  return errors;
}

function DemoForm() {
  const [demo, setDemo] = useState<DemoSubmission>(EMPTY);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof DemoSubmission>(key: K, value: DemoSubmission[K]) => {
    setDemo((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const firstTime = demo.releasedWithUs === "No";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const found = validate(demo);
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;
    setSending(true);
    // The follow-up answers only apply to first-time submitters.
    await sendDemo(firstTime ? demo : { ...demo, previousReleases: "", foundUs: "" });
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="py-8 text-center">
        <motion.div
          initial={{ scale: 0.6, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#f25c27]/30 bg-[#f25c27]/10 text-[#f25c27]"
        >
          <CheckCircle2 size={32} />
        </motion.div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-white">Demo received.</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/50">
          Thanks {demo.firstName}. We listen to every demo and always reply - the answer goes to{" "}
          <span className="text-white">{demo.email}</span>.
        </p>
        <div className="mx-auto mt-6 max-w-sm space-y-1 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left text-[12px] text-white/50">
          <p>
            • Artist: <span className="font-medium text-white">{demo.artistName}</span>
          </p>
          <p>
            • Title: <span className="font-medium text-white">{demo.title}</span> ({demo.trackCount}{" "}
            {demo.trackCount === "1" ? "track" : "tracks"})
          </p>
          <p>
            • Genre: <span className="font-medium text-white">{demo.genre}</span>
          </p>
        </div>
        <button
          onClick={() => {
            setDemo(EMPTY);
            setSent(false);
          }}
          className="mt-7 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-display text-xs font-medium text-white transition-colors hover:border-[#f25c27] hover:bg-[#f25c27]/10"
        >
          Submit another demo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Artist name">
          <input required value={demo.artistName} onChange={(e) => set("artistName", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Your first name">
          <input required value={demo.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputClass} />
        </Field>
      </div>

      <Field label="Email">
        <input
          type="email"
          required
          value={demo.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </Field>

      <Field
        label="Title"
        help={
          <>
            Track title or EP name.{" "}
            <strong className="text-white/70">Only the title</strong> - don't include your artist name or
            add anything else (no “unreleased”, labels or symbols).
          </>
        }
        error={errors.title}
      >
        <input
          required
          value={demo.title}
          onChange={(e) => set("title", e.target.value)}
          aria-invalid={Boolean(errors.title)}
          className={inputClass}
        />
      </Field>

      <Field
        label="Private SoundCloud link"
        help={
          <>
            Submitting more than one track? Group them in a single{" "}
            <strong className="text-white/70">private SoundCloud playlist</strong>. No Google Drive, Dropbox or
            other file-sharing links - and please double-check your link.
          </>
        }
        error={errors.soundcloud}
      >
        <input
          type="url"
          required
          value={demo.soundcloud}
          onChange={(e) => set("soundcloud", e.target.value)}
          placeholder="https://soundcloud.com/…/s-…"
          aria-invalid={Boolean(errors.soundcloud)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
        <Field label="# Tracks">
          <input
            type="number"
            required
            min={1}
            max={20}
            value={demo.trackCount}
            onChange={(e) => set("trackCount", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Tracklist" help="Every track name, in the order you'd want them released.">
          <textarea
            required
            rows={3}
            value={demo.tracklist}
            onChange={(e) => set("tracklist", e.target.value)}
            placeholder={"1. Track name\n2. Track name"}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      <Field group label="Genre">
        <Choice name="genre" options={DEMO_OPTIONS.genre} value={demo.genre} onChange={(v) => set("genre", v)} />
      </Field>

      <Field group label="Mastering" help="Are your tracks mastered or not?">
        <Choice name="mastering" options={DEMO_OPTIONS.mastering} value={demo.mastering} onChange={(v) => set("mastering", v)} />
      </Field>

      <Field group label="Have you released on Exploration Recordings before?">
        <Choice
          name="releasedWithUs"
          options={DEMO_OPTIONS.releasedWithUs}
          value={demo.releasedWithUs}
          onChange={(v) => set("releasedWithUs", v)}
        />
      </Field>

      {/* Asked only of first-time submitters, as in the Notion form */}
      <AnimatePresence initial={false}>
        {firstTime && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-6 border-l-2 border-[#f25c27]/30 pl-4">
              <Field group label="Do you have previous official releases?">
                <Choice
                  name="previousReleases"
                  options={DEMO_OPTIONS.previousReleases}
                  value={demo.previousReleases}
                  onChange={(v) => set("previousReleases", v)}
                />
              </Field>
              <Field group label="How did you find us?">
                <Choice name="foundUs" options={DEMO_OPTIONS.foundUs} value={demo.foundUs} onChange={(v) => set("foundUs", v)} />
              </Field>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Field
        group
        label="Exclusive"
        help="Has this demo only been sent to us, or are other labels also reviewing it? If you're comparing offers or have already signed the track elsewhere, say so in your message."
      >
        <Choice name="exclusive" options={DEMO_OPTIONS.exclusive} value={demo.exclusive} onChange={(v) => set("exclusive", v)} />
      </Field>

      <Field
        label="Your message"
        help="Tell us about the track, the vibe, or why you chose this label. First time submitting? Introduce yourself briefly."
      >
        <textarea
          required
          rows={5}
          value={demo.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <input
          type="checkbox"
          required
          checked={demo.confirmed}
          onChange={(e) => set("confirmed", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#f25c27]"
        />
        <span className="text-sm leading-relaxed text-white/60">
          <span className="font-medium text-white">My link is private and tested, and I have read the demo guide.</span>{" "}
          Copy the private share link from SoundCloud's Share menu, open it in a private browsing window and
          confirm the tracks play.
        </span>
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
            Sending demo…
          </>
        ) : (
          <>
            Submit demo
            <SendHorizontal size={14} />
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function Demo() {
  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Demo submission"
        title={
          <>
            Send us
            <br />
            your music.
          </>
        }
        intro="Finished progressive house that goes somewhere deeper. We listen to every demo and always reply, even when we pass."
        image={IMAGES.realDlcDecks}
        objectPosition="50% 45%"
        glow="ellipse 46% 56% at 80% 44%"
        height={380}
        meta={
          <div className="flex flex-wrap items-end gap-x-9 gap-y-4">
            {[
              { label: "Format", value: "Private SoundCloud link" },
              { label: "Sound", value: ARTIST.genres[0] },
              { label: "Reply", value: "Every demo" },
            ].map((fact) => (
              <div key={fact.label} className="flex flex-col gap-[5px]">
                <span className="font-mono font-bold uppercase leading-none text-[#f25c27]" style={{ fontSize: "11px" }}>
                  {fact.label}
                </span>
                <span className="whitespace-nowrap font-medium leading-none text-white/80" style={{ fontSize: "11px" }}>
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-16 pb-24 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal direction="right" className="lg:col-span-7">
            <Card className="p-7 md:p-9">
              <h2 className="font-display text-xl font-bold tracking-tight text-white">Demo submission</h2>
              <p className="mb-7 mt-1.5 text-sm text-white/45">
                Every field is required. Read the guide alongside before you send.
              </p>
              <DemoForm />
            </Card>
          </Reveal>

          <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="left" delay={0.08}>
              <Card className="p-7">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  Demo guide · before you submit
                </span>
                <ul className="mt-4 space-y-2.5">
                  {GUIDE.map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/55">
                      <Check size={13} className="mt-1 shrink-0 text-emerald-400" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal direction="left" delay={0.16}>
              <Card className="p-7">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#f25c27]">
                  Not a demo?
                </span>
                <div className="mt-4 space-y-4 text-sm text-white/55">
                  <div className="flex items-start gap-3">
                    <Newspaper size={14} className="mt-0.5 shrink-0 text-white/40" />
                    <div>
                      <p>Press, licensing and general enquiries</p>
                      <a
                        href={`mailto:${ARTIST.pressEmail}`}
                        className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-white transition-colors hover:text-[#f25c27]"
                      >
                        <Mail size={11} />
                        {ARTIST.pressEmail}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarCheck size={14} className="mt-0.5 shrink-0 text-white/40" />
                    <div>
                      <p>Booking a label artist</p>
                      <Link to="/booking" className="mt-1 inline-block text-xs font-medium text-[#f25c27] hover:underline">
                        Use the booking form →
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
