"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ProjectImageStrip, VideoPlayer } from "@/components/ui/ProjectImageStrip";
import { DotIndicator } from "@/components/ui/DotIndicator";
import { ScrollCTA } from "@/components/ui/ScrollCTA";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Subtle background tones for project crossfades
const PROJECT_BG_TONES = [
  "#FAFAF7", // Project 1: warm off-white (base)
  "#F7F8FA", // Project 2: very slightly cool blue-gray
  "#F9F7FA", // Project 3: very slightly cool violet
];

// ─────────────────────────────────────────────────────────────
// PHOTO STACK DATA
// ─────────────────────────────────────────────────────────────

// Base photo sizes are defined at ~1.4× the original design pixel values.
// The .photo-stack-scaler CSS class then applies responsive scale() transforms
// so the stack stays proportional at every viewport without recalculating offsets.
const CANDID_PHOTOS = [
  {
    // Back layer — smallest, peeks top-right of front card
    src: "/ragunan.jpeg",
    alt: "Candid photo at Ragunan",
    width: 225,
    height: 295,
    rotate: 10,
    offsetX: 98,   // ≈70 × 1.4 — hard right of front card
    offsetY: -70,  // ≈-50 × 1.4 — up
    z: 1,
    layerClass: "outro-photo-back",
  },
  {
    // Mid layer — medium, peeks left of front card
    src: "/SMK.jpg",
    alt: "Candid photo at SMK",
    width: 294,
    height: 385,
    rotate: -9,
    offsetX: -98,  // ≈-70 × 1.4 — hard left of front card
    offsetY: 42,   // ≈30 × 1.4
    z: 2,
    layerClass: "outro-photo-mid",
  },
  {
    // Front layer — largest, dominant, most upright
    src: "/batik.png",
    alt: "Candid photo in batik",
    width: 322,
    height: 420,
    rotate: 2,
    offsetX: 0,
    offsetY: 0,
    z: 3,
    layerClass: "outro-photo-front",
  },
] as const;

// Parallax range in px per layer (back → front = less → more movement)
const PARALLAX_RANGE = [8, 16, 26] as const;

// Box shadows — deeper for layers closer to viewer
const LAYER_SHADOWS = [
  "0 4px 18px rgba(0,0,0,0.11)",
  "0 10px 32px rgba(0,0,0,0.16)",
  "0 24px 60px rgba(0,0,0,0.24)",
] as const;

// ─────────────────────────────────────────────────────────────
// PhotoLayer — a single grayscale photo in the stack
// ─────────────────────────────────────────────────────────────

interface PhotoLayerProps {
  photo: (typeof CANDID_PHOTOS)[number];
  index: number;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  accentColor: string;
}

function PhotoLayer({ photo, index, smoothX, smoothY, accentColor }: PhotoLayerProps) {
  const range = PARALLAX_RANGE[index];
  const isFront = index === CANDID_PHOTOS.length - 1;
  const baseOffsetX = photo.offsetX;
  const baseOffsetY = photo.offsetY;

  // Combined: static spread offset + dynamic parallax from mouse
  const x = useTransform(smoothX, [0, 1], [baseOffsetX - range / 2, baseOffsetX + range / 2]);
  const y = useTransform(smoothY, [0, 1], [baseOffsetY - range / 2, baseOffsetY + range / 2]);

  return (
    <motion.div
      className={photo.layerClass}
      style={{
        position: "absolute",
        width: photo.width,
        height: photo.height,
        rotate: photo.rotate,
        zIndex: photo.z,
        x,
        y,
        // All layers centered on the container midpoint; offsets above shift from center
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        boxShadow: LAYER_SHADOWS[index],
        opacity: 0, // GSAP brings these in on scroll-enter
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {/* Grayscale photo */}
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover"
        style={{ filter: "grayscale(100%)", display: "block" }}
        draggable={false}
      />

      {/* Accent tint overlay on hover — front photo only */}
      {isFront && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{ backgroundColor: accentColor }}
        />
      )}

      {/* Caption — front photo only */}
      {isFront && (
        <div
          className="absolute bottom-3 right-3 pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.88)",
            background: "rgba(0,0,0,0.48)",
            backdropFilter: "blur(4px)",
            padding: "4px 8px",
            borderRadius: 4,
          }}
        >
          AI Engineer, Jakarta
        </div>
      )}

      {/* Clickable link — front photo only */}
      {isFront && (
        <Link
          href="/about"
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Go to About page"
        />
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PhotoStack — renders all 3 layers inside a fixed-size container
// ─────────────────────────────────────────────────────────────

interface PhotoStackProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  accentColor: string;
}

function PhotoStack({ smoothX, smoothY, accentColor }: PhotoStackProps) {
  return (
    /*
     * .photo-stack-scaler applies responsive CSS transform:scale() breakpoints
     * defined in globals.css. The inner container is sized for the base (1×) design:
     *   - front card: 322×420px centered
     *   - back card:  225×295px, +98px right, -70px up, 10deg
     *   - mid card:   294×385px, -98px left,  +42px down, -9deg
     * 680×580 comfortably contains all three with rotation bleed.
     */
    <div className="photo-stack-scaler" style={{ position: "relative", width: 680, height: 580 }}>
      {CANDID_PHOTOS.map((photo, i) => (
        <PhotoLayer
          key={photo.src}
          photo={photo}
          index={i}
          smoothX={smoothX}
          smoothY={smoothY}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// OutroSection — two-col closing section
// ─────────────────────────────────────────────────────────────

interface OutroSectionProps {
  accentColor: string;
  bgTone: string;
}

function OutroSection({ accentColor, bgTone }: OutroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Raw mouse position within the section, normalised 0→1
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring-smoothed versions passed to PhotoStack
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="outro-section w-full h-screen portrait:h-auto portrait:min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ zIndex: 100, backgroundColor: bgTone }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/*
        Constrained inner container — max-width keeps both columns close together
        regardless of viewport width. gap-12 (~3rem) is the space between columns.
        portrait: stacks vertically.
      */}
      <div
        className="w-full flex flex-row portrait:flex-col items-center portrait:items-start gap-12 portrait:gap-0 portrait:py-20"
        style={{ maxWidth: "1100px", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}
      >
        {/* ── Left Column — Dots + Headline + CTA ── */}
        <div className="flex-shrink-0 flex flex-col justify-center portrait:w-full portrait:mb-12" style={{ width: "340px" }}>

          {/* Progress dot indicator — 3 dots + arrow, no text label */}
          <div className="outro-dots flex items-center gap-[7px] mb-7 opacity-0">
            <span className="block w-2 h-2 rounded-full bg-[#1a1a1a]" style={{ opacity: 0.32 }} />
            <span className="block w-2 h-2 rounded-full bg-[#1a1a1a]" style={{ opacity: 0.32 }} />
            <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            <ArrowRight
              className="w-3.5 h-3.5 ml-1.5 shrink-0"
              style={{ color: "#1a1a1a", opacity: 0.5 }}
              strokeWidth={2.5}
            />
          </div>

          {/* Headline + CTA */}
          <div className="outro-text opacity-0">
            <h2
              className="font-serif italic font-semibold leading-[1.15] text-[#1a1a1a] mb-8"
              style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", maxWidth: "270px" }}
            >
              Meet the person behind it.
            </h2>

            <Link href="/about" className="no-underline inline-block">
              <motion.div
                className="inline-flex items-center justify-center bg-[#1A1A1A] text-white font-sans font-bold tracking-widest uppercase text-[11px] rounded-full py-4 px-8 cursor-pointer shadow-md select-none"
                whileHover={{ x: 3, backgroundColor: accentColor }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Get to know me
              </motion.div>
            </Link>
          </div>
        </div>

        {/* ── Right Column — Layered Photo Stack ── */}
        <div className="flex-1 portrait:w-full flex items-center justify-center portrait:justify-start">
          <PhotoStack smoothX={smoothX} smoothY={smoothY} accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    // Refresh ScrollTrigger after a short delay on initial mount to allow layout settling
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const handleOrientationChange = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // --- OUTRO ENTRANCE ANIMATION (Global) ---
      // Triggered by GSAP ScrollTrigger when the section first enters viewport.
      // Parallax mouse-move uses Framer Motion (handled in OutroSection/PhotoStack).
      ScrollTrigger.create({
        trigger: ".outro-section",
        start: "top 80%",
        id: "outro-entrance-trigger",
        onEnter: () => {
          // Dot indicator fades in first — draws attention immediately
          gsap.fromTo(
            ".outro-dots",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
          // Headline + CTA
          gsap.fromTo(
            ".outro-text",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.15 }
          );
          // Photo stack — back layer appears first
          gsap.fromTo(
            ".outro-photo-back",
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out", delay: 0.1 }
          );
          // Mid layer
          gsap.fromTo(
            ".outro-photo-mid",
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out", delay: 0.2 }
          );
          // Front layer — "peek scale" micro-animation from 0.95 → 1.0
          gsap.fromTo(
            ".outro-photo-front",
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.4)", delay: 0.3 }
          );
        },
        once: true,
      });

      const mm = gsap.matchMedia();

      mm.add("(orientation: landscape)", () => {
        // --- LANDSCAPE ANIMATION & SCROLLTRIGGERS ---
        const sections = gsap.utils.toArray<HTMLElement>(".project-section-wrapper");

        // Fire activeProjectIndex(0) the MOMENT the hero leaves the viewport,
        // so the 3D-skewed strip is already in place before project-0 is reached.
        // onEnterBack resets to null so the hero is clean when scrolling back up.
        ScrollTrigger.create({
          trigger: ".hero-section-wrapper",
          start: "bottom 90%", // fires just before hero bottom exits viewport
          id: "hero-leave-trigger",
          onLeave: () => setActiveProjectIndex(0),
          onEnterBack: () => setActiveProjectIndex(null),
        });

        sections.forEach((section, i) => {
          const isLast = i === sections.length - 1;

          ScrollTrigger.create({
            trigger: section,
            // project-0's own trigger can now just keep the strip active;
            // no special-cased "top top" — hero-leave-trigger already handled first activation.
            start: "top 50%",
            end: "bottom 50%",
            id: `project-trigger-${i}`,
            onEnter: () => setActiveProjectIndex(i),
            onEnterBack: () => setActiveProjectIndex(i),
            onLeave: () => {
              if (isLast) setActiveProjectIndex(null);
            },
            onLeaveBack: () => {
              if (i === 0) setActiveProjectIndex(null);
            },
          });
        });

        // Track scroll direction globally in landscape
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          id: "global-scroll-dir-landscape",
          onUpdate: (self) => {
            const dir = self.direction === 1 ? "down" : "up";
            setScrollDirection(dir);
          },
        });

        return () => {};
      });


      mm.add("(orientation: portrait)", () => {
        // --- PORTRAIT ANIMATION & SCROLLTRIGGERS ---
        const sections = gsap.utils.toArray<HTMLElement>(".project-section-wrapper");

        sections.forEach((section, i) => {
          const isLast = i === sections.length - 1;
          const textBlock = section.querySelector(".portrait-text-block");
          const mockupEl = section.querySelector(".portrait-mockup-el");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
              id: `project-trigger-portrait-${i}`,
              onEnter: () => setActiveProjectIndex(i),
              onEnterBack: () => setActiveProjectIndex(i),
              onLeave: () => {
                if (isLast) setActiveProjectIndex(null);
              },
              onLeaveBack: () => {
                if (i === 0) setActiveProjectIndex(null);
              },
            },
          });

          // Incoming (animates in when this section is pinned)
          if (i > 0) {
            tl.fromTo(
              textBlock,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out", duration: 0.4 },
              0
            ).fromTo(
              mockupEl,
              { scale: 0.88, opacity: 0 },
              { scale: 0.95, opacity: 1, ease: "power2.out", duration: 0.4 },
              0
            );
          }

          // Outgoing (this section scrolls out)
          tl.to(
            textBlock,
            { y: -40, opacity: 0, ease: "power2.in", duration: 0.4 },
            0.6
          ).to(
            mockupEl,
            { scale: 0.88, opacity: 0, ease: "power2.in", duration: 0.4 },
            0.6
          );
        });

        // Track scroll direction globally in portrait
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          id: "global-scroll-dir-portrait",
          onUpdate: (self) => {
            const dir = self.direction === 1 ? "down" : "up";
            setScrollDirection(dir);
          },
        });

        return () => {};
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  const activeBgTone =
    activeProjectIndex !== null
      ? PROJECT_BG_TONES[activeProjectIndex % PROJECT_BG_TONES.length]
      : "#FAFAF7";

  const activeAccentColor =
    activeProjectIndex !== null
      ? projects[activeProjectIndex % projects.length].accentColor
      : "#ff5a36";

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: activeBgTone,
        "--project-accent-color": activeAccentColor,
        "--color-accent": activeAccentColor,
      } as React.CSSProperties}
    >
      {/* ── 0. Hero Section ── */}
      <div className="hero-section-wrapper w-full">
        <HeroSection />
      </div>

      {/* ── Fixed landscape layout container ── */}
      <div
        className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1550px] pointer-events-none z-30 flex items-center sm:justify-between h-screen portrait:hidden"
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        {/* Left Side: Fixed text panel */}
        <div className="w-full sm:w-[35%] sm:max-w-[420px] pointer-events-auto flex flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {activeProjectIndex !== null && (
              <motion.div
                key={activeProjectIndex}
                initial={{ opacity: 0, y: scrollDirection === "down" ? 28 : -28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: scrollDirection === "down" ? -28 : 28 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <ProjectSection
                  project={projects[activeProjectIndex]}
                  index={activeProjectIndex}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Mockup Image/Video Strip */}
        <div className="hidden sm:block sm:w-[62%] h-screen relative pointer-events-none">
          <ProjectImageStrip activeIndex={activeProjectIndex} bgTone={activeBgTone} />
        </div>
      </div>

      {/* ── Dot nav (right edge) ── */}
      {activeProjectIndex !== null && (
        <DotIndicator
          activeIndex={activeProjectIndex}
          activeAccentColor={activeAccentColor}
          onNavigate={(idx) => {
            const target = document.getElementById(`project-${idx}`);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}

      {/* ── 1. Projects scroll trigger areas ── */}
      <div className="projects-scroll-container w-full relative">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            id={`project-${i}`}
            className="project-section-wrapper w-full h-screen portrait:h-[100svh] relative bg-transparent"
            style={{ zIndex: 10 + i }}
          >
            {/* Portrait content */}
            <div className="hidden portrait:flex flex-col h-[100svh] w-full portrait-content-inner">
              {/* Top half — text */}
              <div className="h-[50svh] w-full flex items-center justify-center px-6 portrait-text-block">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2
                    className="font-black leading-[1.15] tracking-wide transition-colors duration-500"
                    style={{
                      fontFamily: "var(--font-bebas-neue), sans-serif",
                      fontSize: "clamp(2.5rem, 10vw, 4rem)",
                      color: project.titleColor || "#1A1A1A",
                      marginBottom: "clamp(0.5rem, 1.5vw, 1rem)",
                    }}
                  >
                    {project.name}
                  </h2>
                  <p
                    className="text-stone-600 leading-relaxed font-normal"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: "clamp(0.875rem, 3.5vw, 1rem)",
                      maxWidth: "280px",
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="flex mt-[20px]">
                    <ScrollCTA
                      label="Open Case Study"
                      href={project.caseStudyUrl}
                      cursorLabel="VIEW"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom half — mockup */}
              <div className="h-[50svh] w-full flex items-center justify-center portrait-mockup-container">
                <div
                  className="portrait-mockup-el rounded-xl overflow-hidden transition-colors duration-500 self-center"
                  style={{
                    width: "min(90vw, 400px)",
                    aspectRatio: "16 / 9",
                    backgroundColor: project.previewBgColor,
                    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                    margin: "0 auto",
                    transform: "scale(0.95)",
                  }}
                >
                  {project.previewVideo ? (
                    <VideoPlayer
                      src={project.previewVideo}
                      isActive={activeProjectIndex === i}
                      poster={project.previewImage}
                    />
                  ) : (
                    <img
                      src={project.previewImage}
                      alt={project.name}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. Closing outro section ── */}
      <OutroSection
        accentColor={activeAccentColor}
        bgTone={PROJECT_BG_TONES[PROJECT_BG_TONES.length - 1]}
      />
    </div>
  );
}
