import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Platform } from "../types";

interface EmbedPlayerProps {
  title: string;
  platform: Platform;
  embedUrl: string;
  url: string;
  artwork: string;
  meta?: string;
  /** Player chrome height once loaded — Bandcamp needs more room than a waveform. */
  height?: number;
  ratio?: string;
}

/**
 * Click-to-load facade. The platform iframe is only mounted once the visitor
 * asks for it, so a page full of sets costs nothing until someone presses play.
 */
export default function EmbedPlayer({
  title,
  platform,
  embedUrl,
  url,
  artwork,
  meta,
  height = 180,
  ratio = "16 / 10",
}: EmbedPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d0e10]">
      {loaded ? (
        <motion.iframe
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          title={`${title} — ${platform} player`}
          src={embedUrl}
          height={height}
          width="100%"
          allow="autoplay; encrypted-media; fullscreen"
          loading="lazy"
          className="block w-full border-0 bg-[#0d0e10]"
        />
      ) : (
        <motion.button
          onClick={() => setLoaded(true)}
          whileTap={reduce ? undefined : { scale: 0.985 }}
          data-cursor="play"
          className="group relative block w-full overflow-hidden text-left"
          style={{ aspectRatio: ratio }}
          aria-label={`Play ${title} on ${platform}`}
        >
          <img
            src={artwork}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          />
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,9,11,0.94) 0%, rgba(8,9,11,0.55) 45%, rgba(8,9,11,0.25) 100%)",
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#f25c27] text-white shadow-lg shadow-[#f25c27]/30 transition-transform duration-300 group-hover:scale-110">
              {/* Ring that keeps pulsing so the tile reads as playable */}
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-[#f25c27]"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <Play size={20} fill="currentColor" className="ml-0.5" />
            </span>
          </span>
          <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/55">
              {meta ? `${meta} · ` : ""}
              {platform}
            </span>
          </span>
        </motion.button>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-white/[0.05] px-4 py-3">
        <p className="truncate font-display text-sm font-semibold text-white">{title}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          data-cursor="open"
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:text-[#f25c27]"
        >
          {platform}
          <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}
