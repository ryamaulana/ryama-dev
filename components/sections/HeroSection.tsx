"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const watermarkRef = useRef<HTMLDivElement>(null);
  const ghostTopRef = useRef<HTMLDivElement>(null);
  const ghostBotRef = useRef<HTMLDivElement>(null);

  // Track mouse via ref + rAF — zero re-renders
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2),
        y: (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2),
      };
    };

    const tick = () => {
      const { x, y } = mousePosRef.current;
      if (watermarkRef.current)
        watermarkRef.current.style.transform = `translate(${x * -20}px, ${y * -10}px)`;
      if (ghostTopRef.current)
        ghostTopRef.current.style.transform = `translate(${x * -35}px, ${y * -18}px)`;
      if (ghostBotRef.current)
        ghostBotRef.current.style.transform = `translate(${x * -35}px, ${y * -18}px)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden select-none bg-[#FAFAF7]"
      aria-label="Hero"
    >
      {/* ─── LAYER 0a: RYAMA WATERMARK — centered ─── */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center"
        style={{ transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <span
          className="whitespace-nowrap font-black uppercase tracking-[-0.02em] leading-none font-sans select-none"
          style={{
            fontSize: "clamp(80px, 24vw, 340px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,0,0,0.04)",
          }}
        >
          RYAMA
        </span>
      </div>

      {/* ─── LAYER 0b: GHOST TEXT top — desktop only ─── */}
      <div
        ref={ghostTopRef}
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 z-0 overflow-hidden pointer-events-none items-start hidden sm:flex"
        style={{ transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <span
          className="whitespace-nowrap font-black uppercase tracking-[-0.02em] leading-none font-sans select-none"
          style={{
            fontSize: "clamp(60px, 13vw, 190px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,0,0,0.025)",
            marginTop: "-0.1em",
          }}
        >
          REDEFINING&nbsp;LOGIC
        </span>
      </div>

      {/* ─── LAYER 0b: GHOST TEXT bottom — desktop only ─── */}
      <div
        ref={ghostBotRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden pointer-events-none justify-end items-end hidden sm:flex"
        style={{ transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <span
          className="whitespace-nowrap font-black uppercase tracking-[-0.02em] leading-none font-sans select-none"
          style={{
            fontSize: "clamp(60px, 14vw, 210px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,0,0,0.025)",
            marginBottom: "-0.15em",
          }}
        >
          THROUGH&nbsp;AI
        </span>
      </div>

      {/*
        ─── LAYER 5: ROLE TEXT — absolute on SECTION, not nested inside video.
        Pinned to bottom of section so h-screen overflow:hidden always clips it cleanly.
        z-[5] = behind video (z-10) so the video naturally masks the upper portion.
        Font size: clamp so it never overflows horizontally.
        aria-hidden: purely decorative, not read by screen readers.
      ───*/}
      <div
        aria-hidden="true"
        className="absolute bottom-[3vh] inset-x-0 z-[5] flex flex-col items-center pointer-events-none"
      >
        <span
          className="whitespace-nowrap font-black uppercase font-sans select-none"
          style={{
            fontSize: "clamp(1.1rem, 5.5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "rgba(0,0,0,0.05)",
          }}
        >
          AI&nbsp;ENGINEER
        </span>
        <span
          className="whitespace-nowrap font-black uppercase font-sans select-none"
          style={{
            fontSize: "clamp(1.1rem, 5.5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "rgba(0,0,0,0.05)",
          }}
        >
          FULLSTACK&nbsp;DEV
        </span>
      </div>

      {/* ─── LAYER 20: MAIN CONTENT — vertically centered ─── */}
      <div className="relative z-20 flex flex-col items-center w-full px-6">

        {/* Name + location */}
        <div className="flex flex-col items-center text-center mb-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-sans font-medium mb-3">
            Jakarta, Indonesia
          </p>
          <h1
            className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-[#1a1a1a] font-sans"
            style={{ fontSize: "clamp(56px, 15vw, 172px)" }}
          >
            RYAMA
          </h1>
        </div>

        {/* Video */}
        <div className="w-full sm:max-w-[78vw] md:max-w-[68vw] lg:max-w-[900px]">
          {/*
            Video is z-10. The role text below (z-5, pinned to section bottom)
            partially shows beneath the video's bottom edge for the classic
            "text bleeding out from behind" visual. No overflow occurs because
            both elements are inside h-screen overflow-hidden.
          */}
          <div className="relative z-10 aspect-video overflow-hidden">
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>

      {/* ─── LAYER 30: SCROLL INDICATOR — bouncing down arrow ─── */}
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
