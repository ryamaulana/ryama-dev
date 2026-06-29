"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track mouse coordinates relative to viewport center (-1 to 1)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="w-full min-h-screen relative flex flex-col justify-center items-center overflow-hidden select-none bg-[#FAFAF7]">

      {/* ─── LAYER 0a: RYAMA WATERMARK — centered, all breakpoints incl. mobile ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -10}px)`,
          transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
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

      {/* ─── LAYER 0b: GHOST TEXT — desktop-only accent (sm+) ─── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 z-0 overflow-hidden pointer-events-none items-start hidden sm:flex"
        style={{
          transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -18}px)`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
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

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden pointer-events-none justify-end items-end hidden sm:flex"
        style={{
          transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -18}px)`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
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

      {/* ─── LAYER 20: MAIN CONTENT ─── */}
      <div className="relative z-20 flex flex-col items-center w-full px-6 py-16 sm:py-20">

        {/* 1. INFO BAR — Location (email omitted per codebase constraint) */}
        <div className="flex flex-col items-center text-center mb-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-sans font-medium mb-3">
            Jakarta, Indonesia
          </p>

          {/* Big name — unchanged in concept, scaled for tablet */}
          <h1
            className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-[#1a1a1a] font-sans"
            style={{ fontSize: "clamp(56px, 15vw, 172px)" }}
          >
            RYAMA
          </h1>
        </div>

        {/* 2. VIDEO + ROLE TEXT — role text lives INSIDE this group, behind video */}
        <div className="w-full sm:max-w-[78vw] md:max-w-[68vw] lg:max-w-[900px]">

          {/* Anchor: height = video height only. Role text is absolute relative to this. */}
          <div className="relative w-full">

            {/* ── ROLE TEXT — z-0, anchored to video bottom, bleeds upward behind video ── */}
            {/* top: 100% = bottom edge of video. translateY(-30%) pulls up 30% of text height,
                so the top 30% of the text is hidden behind the video (z-10), bottom 70% visible. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 z-0 flex flex-col items-center pointer-events-none"
              style={{ top: "100%", transform: "translateY(clamp(0.75rem, 2vw, 1.25rem))" }}
            >
              <span
                className="whitespace-nowrap font-black uppercase font-sans select-none"
                style={{
                  fontSize: "clamp(1.5rem, 9vw, 6rem)",
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
                  fontSize: "clamp(1.5rem, 9vw, 6rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "rgba(0,0,0,0.05)",
                }}
              >
                FULLSTACK&nbsp;DEV
              </span>
            </div>

            {/* ── VIDEO — z-10, renders on top of role text ── */}
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

          {/* Spacer — occupies the visible portion of role text (≈70% of text height)
              so CTA is pushed below the role text, not overlapping it. */}
          <div aria-hidden="true" style={{ height: "clamp(5rem, 20vw, 13rem)" }} />
        </div>

        {/* 3. CTA — full width on mobile (≤sm), auto on desktop */}
        <div className="w-full max-w-[92vw] sm:w-auto sm:max-w-none mt-4">
          <Link
            href="/projects"
            className="flex sm:inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#1a1a1a] hover:bg-[#ff5a36] text-white font-bold tracking-widest uppercase text-[11px] md:text-[12px] transition-all duration-300 rounded-lg font-sans no-underline pointer-events-auto shadow-lg hover:shadow-[0_8px_30px_rgba(255,90,54,0.4)] hover:scale-[1.03] active:scale-[0.98]"
            style={{
              paddingTop: "clamp(0.875rem, 2vw, 1.25rem)",
              paddingBottom: "clamp(0.875rem, 2vw, 1.25rem)",
              paddingLeft: "clamp(1.75rem, 5vw, 3.5rem)",
              paddingRight: "clamp(1.75rem, 5vw, 3.5rem)",
            }}
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
