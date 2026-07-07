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
interface KineticWordProps {
  word: string;
}

function KineticWord({ word }: KineticWordProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        x: "-50%",
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      {word.split("").map((char, i) => {
        const isOdd = (i + 1) % 2 !== 0;
        const y = isOdd ? -Y_OFFSET : Y_OFFSET;

        if (char === " ") {
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

        {/*
          Block 2 — RYAMA placeholder.
          The real RYAMA text is rendered as a fixed "flying-ryama" element in
          page.tsx and animated by GSAP ScrollTrigger. This invisible placeholder
          maintains the exact same dimensions so that the flex layout of location +
          RYAMA + role-text remains centred correctly in the hero section.
          id="hero-ryama-placeholder" lets GSAP measure its viewport position to
          know where to start the flying element's journey.
        */}
        <div
          id="hero-ryama-placeholder"
          aria-hidden="true"
          className="font-black uppercase font-sans select-none pointer-events-none"
          style={{
            fontSize: "clamp(56px, 15vw, 172px)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            color: "transparent",    // invisible — flying element renders on top
          }}
        >
          RYAMA
        </div>

        {/* Block 3 — Kinetic role text */}
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
