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

      {/* ─── LAYER 0: GHOST TEXT — Architectural typography (muted, enormous) ─── */}
      {/* Top ghost — "REDEFINING LOGIC" */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 z-0 overflow-hidden pointer-events-none flex items-start"
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
            WebkitTextStroke: "1px rgba(0,0,0,0.03)",
            marginTop: "-0.1em",
          }}
        >
          REDEFINING&nbsp;LOGIC
        </span>
      </div>

      {/* Bottom ghost — "THROUGH AI" */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden pointer-events-none flex justify-end items-end"
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
            WebkitTextStroke: "1px rgba(0,0,0,0.03)",
            marginBottom: "-0.15em",
          }}
        >
          THROUGH&nbsp;AI
        </span>
      </div>

      {/* ─── LAYER 20: MAIN CONTENT STACK ─── */}
      <div className="relative z-20 flex flex-col items-center w-full px-6 py-20 gap-0">

        {/* 1. SECONDARY FOCUS — Name + Role */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Location metadata */}
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-sans font-medium mb-3">
            Jakarta, Indonesia
          </p>

          {/* Big name — SECONDARY anchor */}
          <h1
            className="font-black uppercase leading-[0.88] tracking-[-0.02em] text-[#1a1a1a] font-sans"
            style={{ fontSize: "clamp(56px, 12vw, 172px)" }}
          >
            RYAMA
          </h1>
        </div>

        {/* 2. PRIMARY FOCUS — Hero video */}
        <div className="relative w-full max-w-[72vw] md:max-w-[64vw] lg:max-w-[900px]">
          <div className="relative aspect-video overflow-hidden">
            {/* Hero video — autoplay, loop, muted */}
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

        {/* 3. TERTIARY — Field Text + CTA */}
        <div className="flex flex-col items-center gap-6 mt-10">
          {/* Field of Expertise */}
          <h2 className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] font-extrabold tracking-[0.18em] sm:tracking-[0.25em] text-[#1a1a1a] font-sans text-center max-w-[90%] uppercase leading-tight mt-4 mb-2">
            AI ENGINEER &amp; FULLSTACK DEVELOPER
          </h2>

          {/* CTA — more visible, filled style */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#ff5a36] text-white font-bold tracking-widest uppercase text-[11px] md:text-[12px] transition-all duration-300 rounded-lg font-sans no-underline pointer-events-auto shadow-lg hover:shadow-[0_8px_30px_rgba(255,90,54,0.4)] hover:scale-[1.03] active:scale-[0.98]"
            style={{ padding: "20px 56px" }}
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
