"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ProjectImageStrip, VideoPlayer } from "@/components/ui/ProjectImageStrip";
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
      const mm = gsap.matchMedia();

      mm.add("(orientation: landscape)", () => {
        // --- LANDSCAPE ANIMATION & SCROLLTRIGGERS (original behavior) ---
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

        // Track scroll direction globally in landscape
        ScrollTrigger.create({
          trigger: containerRef.current,
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
            }
          });

          // Incoming (animates in when this section is pinned)
          if (i > 0) {
            tl.fromTo(textBlock, 
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out", duration: 0.4 }, 
              0
            )
            .fromTo(mockupEl, 
              { scale: 0.88, opacity: 0 },
              { scale: 0.95, opacity: 1, ease: "power2.out", duration: 0.4 }, 
              0
            );
          }

          // Outgoing (this section scrolls out)
          tl.to(textBlock, {
            y: -40,
            opacity: 0,
            ease: "power2.in",
            duration: 0.4
          }, 0.6)
          .to(mockupEl, {
            scale: 0.88,
            opacity: 0,
            ease: "power2.in",
            duration: 0.4
          }, 0.6);
        });

        // Track scroll direction globally in portrait
        ScrollTrigger.create({
          trigger: containerRef.current,
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
      className="relative w-full min-h-screen transition-colors duration-500 pt-16"
      style={{
        backgroundColor: activeBgTone,
        "--project-accent-color": activeAccentColor,
        "--color-accent": activeAccentColor,
      } as React.CSSProperties}
    >
      {/* ── Centered layout container (Landscape) ── */}
      <div
        className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1550px] pointer-events-none z-30 flex items-center sm:justify-between h-screen portrait:hidden"
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        {/* Left Side: Fixed text panel — full-width on mobile, 35% on sm+ */}
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

        {/* Right Side: Mockup Image/Video Strip — hidden on mobile, visible sm+ */}
        <div className="hidden sm:block sm:w-[62%] h-screen relative pointer-events-none">
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

      {/* ── 1. Projects scroll trigger areas (empty spacers for landscape, content-rich for portrait) ── */}
      <div className="projects-scroll-container w-full relative">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            id={`project-${i}`}
            className="project-section-wrapper w-full h-screen portrait:h-[100svh] relative bg-transparent"
            style={{
              zIndex: 10 + i,
            }}
          >
            {/* Portrait Specific Section Content */}
            <div className="hidden portrait:flex flex-col h-[100svh] w-full portrait-content-inner">
              {/* Top half (50svh) */}
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

              {/* Bottom half (50svh) */}
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
