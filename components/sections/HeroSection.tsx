"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

// ─── Role words that cycle automatically ────────────────────────────────────
const ROLE_WORDS = ["AI ENGINEER", "FULLSTACK DEVELOPER"];
const CYCLE_INTERVAL_MS = 2800;

// ─── Per-letter kinetic animation ───────────────────────────────────────────
// Rules (Option B — index resets per word):
//   • Index is 1-based, resets for each new word.
//   • Odd index  → exit/enter direction: UP   (translateY negative)
//   • Even index → exit/enter direction: DOWN (translateY positive)
// Space characters count as a slot in the index sequence but are rendered as
// a non-breaking space (\u00A0) with no animation element needed.

const Y_OFFSET = 10; // px magnitude for up/down movement
const LETTER_DURATION = 0.42;
const LETTER_STAGGER = 0.028; // s delay between each letter

function getVariants(isOdd: boolean) {
  const y = isOdd ? -Y_OFFSET : Y_OFFSET;
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y },
  };
}

interface KineticLetterProps {
  char: string;
  /** 1-based position index within the current word */
  charIndex: number;
  /** Unique key per word+position so AnimatePresence detects exit/enter */
  wordKey: string;
}

function KineticLetter({ char, charIndex, wordKey }: KineticLetterProps) {
  const isOdd = charIndex % 2 !== 0;
  const variants = getVariants(isOdd);
  const delay = (charIndex - 1) * LETTER_STAGGER;

  if (char === " ") {
    // Space: occupies index slot but renders as static gap, no animation needed.
    return <span key={`space-${wordKey}-${charIndex}`}>&nbsp;</span>;
  }

  return (
    <motion.span
      key={`${wordKey}-${charIndex}`}
      style={{ display: "inline-block" }}
      initial={variants.initial}
      animate={{ ...variants.animate, transition: { duration: LETTER_DURATION, delay, ease: "easeOut" } }}
      exit={{ ...variants.exit, transition: { duration: LETTER_DURATION * 0.8, delay, ease: "easeIn" } }}
    >
      {char}
    </motion.span>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function HeroSection() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % ROLE_WORDS.length);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const currentWord = ROLE_WORDS[activeWordIndex];

  return (
    <section
      className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden select-none bg-[#FAFAF7]"
      aria-label="Hero"
    >
      {/* ─── CENTER BLOCK: 3-block typographic layout ─── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-0 w-full px-6">

        {/* Block 1 — Location */}
        <p
          className="font-sans font-medium uppercase text-stone-400"
          style={{
            fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
            letterSpacing: "0.28em",
            marginBottom: "clamp(0.75rem, 2vh, 1.5rem)",
          }}
        >
          Jakarta, Indonesia
        </p>

        {/* Block 2 — Name (dominant element) */}
        <h1
          className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-[#1a1a1a] font-sans"
          style={{ fontSize: "clamp(56px, 15vw, 172px)" }}
        >
          RYAMA
        </h1>

        {/* Block 3 — Kinetic role text */}
        <div
          aria-live="polite"
          aria-label={`Role: ${currentWord}`}
          className="font-sans font-medium uppercase text-stone-400 overflow-hidden"
          style={{
            fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
            letterSpacing: "0.28em",
            marginTop: "clamp(0.75rem, 2vh, 1.5rem)",
            height: "1.6em",          // fixed height prevents layout shift on word change
            display: "flex",
            alignItems: "center",
          }}
        >
          {/*
            AnimatePresence mode="popLayout":
            Exit animation of old word overlaps with enter of new word for a
            smooth zig-zag letter swap. Each letter is keyed by wordIndex+charIndex
            so AnimatePresence correctly unmounts old letters and mounts new ones.
          */}
          <AnimatePresence mode="popLayout">
            {currentWord.split("").map((char, idx) => (
              <KineticLetter
                key={`${activeWordIndex}-${idx}`}
                char={char}
                charIndex={idx + 1}
                wordKey={`${activeWordIndex}`}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── SCROLL INDICATOR — bouncing arrow ─── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown
            className="w-5 h-5"
            style={{ color: "rgba(0,0,0,0.25)" }}
            strokeWidth={1.8}
          />
        </motion.div>
      </div>
    </section>
  );
}
