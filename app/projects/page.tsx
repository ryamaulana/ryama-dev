"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ProjectImageStrip } from "@/components/ui/ProjectImageStrip";
import { DotIndicator } from "@/components/ui/DotIndicator";
import { ScrollCTA } from "@/components/ui/ScrollCTA";
import { projects } from "@/lib/projects";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Subtle background tones for project crossfades
const PROJECT_BG_TONES = [
  "#FAFAF7", // Project 1: warm off-white (base)
  "#F7F8FA", // Project 2: very slightly cool blue-gray
  "#F9F7FA", // Project 3: very slightly cool violet
];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(".project-section-wrapper");

      sections.forEach((section, i) => {
        const isLast = i === sections.length - 1;

        ScrollTrigger.create({
          trigger: section,
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

      // Track scroll direction globally
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const dir = self.direction === 1 ? "down" : "up";
          setScrollDirection(dir);
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
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
      className="relative w-full min-h-screen transition-colors duration-500 pt-16"
      style={{
        backgroundColor: activeBgTone,
        "--project-accent-color": activeAccentColor,
        "--color-accent": activeAccentColor,
      } as React.CSSProperties}
    >
      {/* ── Centered layout container ── */}
      <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1550px] px-8 md:px-16 pointer-events-none z-30 flex items-center justify-between h-screen">
        {/* Left Side: Fixed text panel (now inside the grid column) */}
        <div className="w-[28%] max-w-[380px] pointer-events-auto flex flex-col justify-center">
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

        {/* Right Side: Mockup Image/Video Strip Wrapper */}
        <div className="w-[68%] h-screen relative pointer-events-none">
          <ProjectImageStrip
            activeIndex={activeProjectIndex}
            bgTone={activeBgTone}
          />
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

      {/* ── 1. Projects scroll trigger areas (empty spacers) ── */}
      <div className="projects-scroll-container w-full relative">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            id={`project-${i}`}
            className="project-section-wrapper w-full h-screen relative bg-transparent"
            style={{
              zIndex: 10 + i,
            }}
          />
        ))}
      </div>

      {/* ── 2. Closing section — solid bg prevents fixed layers bleed-through ── */}
      <section
        className="w-full h-screen bg-[#FAFAF7] relative"
        style={{ zIndex: 100 }}
      >
        <div
          className="w-full h-full flex flex-col justify-center"
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            paddingLeft: "clamp(32px, 6vw, 100px)",
            paddingRight: "clamp(32px, 6vw, 100px)",
          }}
        >
          <p
            className="text-[9px] tracking-[0.3em] uppercase mb-6 font-semibold font-sans"
            style={{
              color: "var(--project-accent-color)",
              transition: "color 0.5s ease",
            }}
          >
            End of Showcase
          </p>

          <h2
            className="font-bold italic text-[#1a1a1a] leading-[0.92] font-serif max-w-3xl"
            style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.8rem)", marginBottom: "24px" }}
          >
            Ready to explore the person behind the systems?
          </h2>

          <ScrollCTA label="Get to know me" href="/about" cursorLabel="ABOUT" />
        </div>
      </section>
    </div>
  );
}
