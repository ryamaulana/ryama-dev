"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomCursorProps {
  /** Elements with data-cursor="view" will trigger the VIEW label */
}

export function CustomCursor(_: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices (pointer: coarse)
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const fineMq = window.matchMedia("(pointer: fine)");
    
    if (coarseMq.matches || !fineMq.matches) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    document.body.classList.add("hide-native-cursor");

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check what's under the cursor
      const target = e.target as HTMLElement;
      const interactive = target.closest<HTMLElement>(
        "a, button, [data-cursor], [role='button']"
      );
      if (interactive) {
        setIsHovering(true);
        const label = interactive.getAttribute("data-cursor");
        setCursorLabel(label ?? null);
      } else {
        setIsHovering(false);
        setCursorLabel(null);
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curX}px, ${curY}px)`;
      }
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("hide-native-cursor");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing circle */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-full border border-[#ff5a36] flex items-center justify-center"
          style={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
            background: isHovering ? "rgba(255,90,54,0.08)" : "transparent",
          }}
        >
          <AnimatePresence>
            {cursorLabel && (
              <motion.span
                key="label"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[9px] font-bold tracking-widest text-[#ff5a36] uppercase select-none font-sans"
              >
                {cursorLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Instant dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-[#ff5a36]"
          style={{ opacity: isHovering ? 0 : 1, transition: "opacity 0.15s ease" }}
        />
      </div>
    </>
  );
}
