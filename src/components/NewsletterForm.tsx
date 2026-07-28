import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

/**
 * Sitewide email capture. Owning the list is the point — see the architecture
 * doc: platform followers are rented, an inbox is not.
 *
 * TODO: point `subscribe` at the real list provider (Mailchimp / Buttondown /
 * Resend). Everything else here can stay as-is.
 */
async function subscribe(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, email };
}

export default function NewsletterForm({ variant = "band" }: { variant?: "band" | "compact" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || state === "sending") return;
    setState("sending");
    await subscribe(email);
    setState("done");
  };

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className={`flex items-center gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-3.5 ${
          variant === "band" ? "justify-center" : ""
        }`}
      >
        <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
        <p className="text-sm text-white/70">
          You're on the list. Tour dates and new music, nothing else.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full gap-2.5 ${variant === "band" ? "flex-col sm:flex-row sm:max-w-md" : "flex-col"}`}
    >
      <label className="sr-only" htmlFor={`newsletter-${variant}`}>
        Email address
      </label>
      <input
        id={`newsletter-${variant}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full rounded-full border border-white/8 bg-white/[0.03] px-5 py-3 font-sans text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#f25c27]/60 focus:bg-white/[0.05]"
      />
      <motion.button
        type="submit"
        disabled={state === "sending"}
        whileHover={state === "sending" ? undefined : { scale: 1.04 }}
        whileTap={state === "sending" ? undefined : { scale: 0.96 }}
        className="shrink-0 rounded-full bg-[#f25c27] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff6d3a] disabled:opacity-50"
      >
        {state === "sending" ? "Adding…" : "Sign up"}
      </motion.button>
    </form>
  );
}
