"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ProjectSection } from "./ProjectSection";
import { projects, TOTAL_PROJECTS } from "@/lib/projects";

// Very subtle background tonal shifts per project
// They blend naturally through the opacity animation — no explicit color crossfade needed
const PROJECT_BG_TONES = [
  "#FAFAF7", // Project 0: warm off-white (base)
  "#F7F8FA", // Project 1: very slightly cool
  "#F9F7FA", // Project 2: very slightly violet-cool
] as const;

interface StickyProjectSectionItemProps {
  index: number;
  scrollYProgress: MotionValue<number>;
}

/**
 * One sticky project section.
 *
 * All sections are `position: sticky; top: 0` in ONE container.
 * They all stick immediately when the container enters the viewport.
 * Scroll-driven transforms control the visual: each section slides in
 * from 60vh below (incoming) and drifts up + fades out (outgoing),
 * creating the "card stacking over the previous one" effect.
 *
 * Z-index stacking: higher index = on top → incoming card slides OVER outgoing.
 */
function StickyProjectSectionItem({
  index,
  scrollYProgress,
}: StickyProjectSectionItemProps) {
  const N = TOTAL_PROJECTS;
  const sectionSize = 1 / N;
  const isFirst = index === 0;
  const isLast = index === N - 1;

  // --- Scroll progress windows (slightly overlapping for stacking effect) ---

  // Entry: non-first sections start entering slightly before their "slot" begins
  // to overlap with the outgoing section (the "stacking" overlap window)
  const entryStart = isFirst ? 0 : Math.max(0, index * sectionSize - sectionSize * 0.2);
  const entryEnd = index * sectionSize + sectionSize * 0.28;

  // Exit: last section never exits (stays fully visible → user scrolls to About)
  const exitStart = isLast ? 0.999 : index * sectionSize + sectionSize * 0.62;
  const exitEnd = isLast ? 1.0 : (index + 1) * sectionSize + sectionSize * 0.04;

  // --- Y transform ---
  // First section: already in view (no slide-from-below needed)
  // Other sections: slide up from 60vh below
  const yValues: [string, string, string, string] = isFirst
    ? ["0vh", "0vh", "0vh", isLast ? "0vh" : "-10vh"]
    : ["60vh", "0vh", "0vh", isLast ? "0vh" : "-10vh"];

  const y = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    yValues
  );

  // --- Opacity transform ---
  const opacityValues: [number, number, number, number] = isFirst
    ? [1, 1, 1, isLast ? 1 : 0]
    : [0, 1, 1, isLast ? 1 : 0];

  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    opacityValues
  );

  const project = projects[index];

  return (
    <motion.div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: index + 1,
        y,
        opacity,
        backgroundColor: PROJECT_BG_TONES[index % PROJECT_BG_TONES.length],
        // Clip so the card that slides up doesn't "bleed" above the viewport
        overflow: "hidden",
      }}
      className="flex items-center px-10 md:px-16 lg:px-20 xl:px-24 will-change-transform"
    >
      {/* Bottom-edge gradient shadow — creates "floating card" feel */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.04) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <ProjectSection project={project} index={index} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────

interface StickyProjectsContainerProps {
  scrollYProgress: MotionValue<number>;
}

export function StickyProjectsContainer({
  scrollYProgress,
}: StickyProjectsContainerProps) {
  return (
    <>
      {projects.map((_, i) => (
        <StickyProjectSectionItem
          key={i}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </>
  );
}
