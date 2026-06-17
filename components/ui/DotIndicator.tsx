"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectOverlay } from "./ProjectOverlay";

interface DotIndicatorProps {
  activeIndex: number;
  activeAccentColor: string;
  onNavigate?: (index: number) => void;
}

export function DotIndicator({ activeIndex, activeAccentColor, onNavigate }: DotIndicatorProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDotClick = (i: number) => {
    onNavigate?.(i);
  };

  return (
    <>
      {/* Dots + labels column */}
      <div
        className="fixed right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3.5 items-end"
        onMouseEnter={() => setOverlayOpen(true)}
        onMouseLeave={() => {
          setOverlayOpen(false);
          setHoveredIndex(null);
        }}
        role="navigation"
        aria-label="Project navigation"
      >
        {projects.map((project, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Project name label — slides in on hover */}
            <AnimatePresence>
              {overlayOpen && (
                <motion.span
                  key={`label-${i}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18, delay: i * 0.04 }}
                  className="font-sans text-right whitespace-nowrap select-none font-semibold"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color:
                      i === activeIndex
                        ? activeAccentColor
                        : hoveredIndex === i
                        ? "#1a1a1a"
                        : "#888782",
                    transition: "color 0.5s ease",
                  }}
                >
                  {project.name}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.button
              aria-label={`Go to project ${i + 1}: ${project.name}`}
              onClick={() => handleDotClick(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex items-center justify-center cursor-pointer"
              style={{ width: 24, height: 24 }}
            >
              <motion.div
                className="rounded-full"
                animate={
                  i === activeIndex
                    ? {
                        width: 12,
                        height: 12,
                        backgroundColor: activeAccentColor,
                        boxShadow: `0 0 10px ${activeAccentColor}cc`,
                      }
                    : hoveredIndex === i
                    ? {
                        width: 9,
                        height: 9,
                        backgroundColor: "rgba(0,0,0,0.15)",
                        boxShadow: "none",
                      }
                    : {
                        width: 7,
                        height: 7,
                        backgroundColor: "rgba(0,0,0,0)",
                        boxShadow: "none",
                      }
                }
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{
                  border:
                    i === activeIndex
                      ? "none"
                      : hoveredIndex === i
                      ? "2px solid #333"
                      : "2px solid #a8a29e",
                }}
              />
            </motion.button>
          </div>
        ))}
      </div>

      {/* Project overlay on hover */}
      <AnimatePresence>
        {overlayOpen && (
          <ProjectOverlay
            activeIndex={activeIndex}
            onClose={() => setOverlayOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
