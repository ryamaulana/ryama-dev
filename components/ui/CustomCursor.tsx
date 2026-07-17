"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices (pointer: coarse)
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const fineMq = window.matchMedia("(pointer: fine)");
    
    if (coarseMq.matches || !fineMq.matches) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      document.body.classList.add("hide-native-cursor");
    }, 0);

    const onMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check what's under the cursor
      const target = e.target as HTMLElement;
      const interactive = target.closest<HTMLElement>(
        "a, button, [data-cursor], [role='button']"
      );
      setIsHovering(!!interactive);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("hide-native-cursor");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      animate={{
        scale: isHovering ? 1.8 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ willChange: "transform" }}
    >
      <div
        className="rounded-full border border-[#1A1A1A]"
        style={{
          width: 20,
          height: 20,
          transition: "background-color 0.2s ease, border-color 0.2s ease",
          backgroundColor: isHovering ? "rgba(26,26,26,0.05)" : "transparent",
        }}
      />
    </motion.div>
  );
}
