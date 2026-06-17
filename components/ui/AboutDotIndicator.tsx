"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutDotIndicatorProps {
  activeIndex: number;
  onNavigate?: (index: number) => void;
}

const SECTIONS = [
  { name: "Intro", color: "#ff5a36" },
  { name: "Profile", color: "#ff5a36" },
  { name: "Tech Stack", color: "#0052FF" },
  { name: "Education", color: "#00A86B" },
  { name: "Philosophy", color: "#8B00FF" },
  { name: "Contact", color: "#1a1a1a" },
];

export function AboutDotIndicator({ activeIndex, onNavigate }: AboutDotIndicatorProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeColor = SECTIONS[activeIndex]?.color || "#ff5a36";

  return (
    <div
      className="fixed right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3.5 items-end pointer-events-auto"
      onMouseEnter={() => setOverlayOpen(true)}
      onMouseLeave={() => {
        setOverlayOpen(false);
        setHoveredIndex(null);
      }}
      role="navigation"
      aria-label="About sections navigation"
    >
      {SECTIONS.map((sec, i) => (
        <div key={i} className="flex items-center gap-3">
          {/* Section name label — slides in on hover */}
          <AnimatePresence>
            {overlayOpen && (
              <motion.span
                key={`label-${i}`}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
                className="font-sans text-right whitespace-nowrap select-none font-semibold text-[10px] tracking-[0.2em] uppercase"
                style={{
                  color:
                    i === activeIndex
                      ? activeColor
                      : hoveredIndex === i
                      ? "#1a1a1a"
                      : "#888782",
                  transition: "color 0.4s ease",
                  cursor: "pointer",
                }}
                onClick={() => onNavigate?.(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {sec.name}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dot Button */}
          <motion.button
            aria-label={`Go to section ${sec.name}`}
            onClick={() => onNavigate?.(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex items-center justify-center cursor-pointer border-none bg-transparent p-0"
            style={{ width: 24, height: 24 }}
          >
            <motion.div
              className="rounded-full"
              animate={
                i === activeIndex
                  ? {
                      width: 12,
                      height: 12,
                      backgroundColor: activeColor,
                      boxShadow: `0 0 10px ${activeColor}cc`,
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
  );
}
