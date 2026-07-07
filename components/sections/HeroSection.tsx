"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

// ─── Config ─────────────────────────────────────────────────────────────────
const ROLE_WORDS = ["AI ENGINEER", "FULLSTACK DEVELOPER"];
const CYCLE_INTERVAL_MS = 2800;
const Y_OFFSET = 10;         // px magnitude for up / down
const ENTER_DURATION = 0.42; // seconds per letter — enter
const EXIT_DURATION  = 0.22; // seconds per letter — exit (faster, snappier)
const STAGGER_S      = 0.028; // seconds delay between consecutive letters

// ─── Kinetic word component ──────────────────────────────────────────────────
// Renders a single word as a row of individually-animated letters.
// Wrapped in AnimatePresence so the previous word's letters play their exit
// animation before (or while) the new word's letters enter.

interface KineticWordProps {
  word: string;
}

function KineticWord({ word }: KineticWordProps) {
  return (
    /*
      absolute + left-50% + translateX(-50%) centres the word without affecting
      the outer container's layout — so when words of different lengths swap,
      the outer div never resizes and there is no positional jump.
    */
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        x: "-50%",      // Framer Motion shorthand for translateX
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      {word.split("").map((char, i) => {
        // Index is 1-based, resets per word (as per spec Option B)
        const isOdd = (i + 1) % 2 !== 0;
        const y = isOdd ? -Y_OFFSET : Y_OFFSET;

        if (char === " ") {
          // Spaces occupy an index slot but need no animation element.
          return (
            <span key={`space-${i}`} style={{ display: "inline-block" }}>
              &nbsp;
            </span>
          );
        }

        return (
          <motion.span
            key={i}
            style={{ display: "inline-block" }}
            // ─── initial / animate / exit ────────────────────────────────
            // transition is a TOP-LEVEL PROP here, not nested inside animate/exit.
            // FM ignores transition if placed inside the animate object values.
            initial={{ opacity: 0, y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y }}
            transition={{
              duration: ENTER_DURATION,
              delay: i * STAGGER_S,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
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
      <div className="relative z-10 flex flex-col items-center text-center w-full px-6">

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

        {/* Block 2 — Name */}
        <h1
          className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-[#1a1a1a] font-sans"
          style={{ fontSize: "clamp(56px, 15vw, 172px)" }}
        >
          RYAMA
        </h1>

        {/* Block 3 — Kinetic role text */}
        {/*
          Outer div: fixed height prevents layout shift on word swap.
          position:relative is required so the inner absolute word div
          can centre itself inside without escaping the flow.
          overflow:hidden clips letters that are mid-translate.
        */}
        <div
          aria-live="polite"
          aria-label={`Role: ${currentWord}`}
          className="font-sans font-medium uppercase text-stone-400"
          style={{
            fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
            letterSpacing: "0.28em",
            marginTop: "clamp(0.75rem, 2vh, 1.5rem)",
            position: "relative",
            height: "1.6em",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {/*
            mode="sync": old word exits while new word enters simultaneously.
            Each letter has its own stagger delay, creating the zig-zag wave.
            The absolute-positioned KineticWord prevents any container layout
            recalculation when word length changes — zero position jumps.
          */}
          <AnimatePresence mode="sync">
            <KineticWord key={activeWordIndex} word={currentWord} />
          </AnimatePresence>
        </div>
      </div>

      {/* ─── SCROLL INDICATOR ─── */}
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
