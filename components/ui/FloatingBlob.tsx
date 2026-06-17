"use client";

import { motion, useReducedMotion } from "framer-motion";

export function FloatingBlob() {
  const reduced = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Primary blob — top-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          top: "-10%",
          right: "-8%",
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,90,54,0.12) 0%, rgba(255,90,54,0.04) 55%, transparent 75%)",
          filter: "blur(40px)",
        }}
        animate={
          reduced
            ? {}
            : {
                x: [0, 20, -10, 0],
                y: [0, -15, 10, 0],
                scale: [1, 1.05, 0.97, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary blob — bottom-left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          bottom: "5%",
          left: "-5%",
          background:
            "radial-gradient(circle at 60% 60%, rgba(255,90,54,0.08) 0%, rgba(255,90,54,0.02) 55%, transparent 75%)",
          filter: "blur(32px)",
        }}
        animate={
          reduced
            ? {}
            : {
                x: [0, -12, 8, 0],
                y: [0, 10, -8, 0],
                scale: [1, 0.96, 1.04, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
