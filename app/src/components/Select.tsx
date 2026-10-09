import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * A dark dropdown that looks the same in every browser.
 *
 * Native <select> lists are drawn by the browser, and Chrome on Windows can
 * ignore option colours, so the open list showed white text on white. This is
 * a listbox instead: button + popup, with arrow keys, Home/End, Enter/Space,
 * Escape and type-ahead, and the usual ARIA roles.
 */
export default function Select({
  value,
  onChange,
  options,
  label,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Accessible name, usually the field's visible label. */
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [active, setActive] = useState(selectedIndex);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const id = useId();

  // Close on any click outside.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the highlighted option in view while arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const last = options.length - 1;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        // Type-ahead: jump to the first option starting with what was typed.
        if (e.key.length === 1) {
          const now = Date.now();
          typed.current.text = (now - typed.current.at > 600 ? "" : typed.current.text) + e.key.toLowerCase();
          typed.current.at = now;
          const match = options.findIndex((option) => option.label.toLowerCase().startsWith(typed.current.text));
          if (match >= 0) setActive(match);
        }
    }
  };

  const current = options[selectedIndex];

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${label}: ${current?.label ?? ""}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-3 text-left ${className} ${
          open ? "border-[#f25c27]/60 bg-white/[0.05]" : ""
        }`}
      >
        <span className="truncate">{current?.label}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            aria-label={label}
            aria-activedescendant={`${id}-opt-${active}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            // Inside a <label>, a click would re-activate the button and reopen the list.
            onClick={(e) => e.preventDefault()}
            className="absolute left-0 right-0 z-50 mt-1.5 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#16171c] p-1.5 shadow-2xl shadow-black/60"
          >
            {options.map((option, i) => {
              const selected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(i)}
                  // pointerdown, not click — keeps focus on the button so the list
                  // doesn't close before the choice registers.
                  onPointerDown={(e) => {
                    e.preventDefault();
                    choose(i);
                  }}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    i === active ? "bg-white/[0.07] text-white" : "text-white/70"
                  } ${selected ? "text-[#f25c27]" : ""}`}
                >
                  <span className="truncate">{option.label}</span>
                  {selected && <Check size={14} className="shrink-0 text-[#f25c27]" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
