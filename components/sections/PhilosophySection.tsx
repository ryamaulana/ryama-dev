"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHILOSOPHY_CHAIN = [
  {
    order: "01",
    label: "Akar Masalah",
    description: "Sebelum bikin solusi, saya gali dulu apa yang sebenarnya jadi sumber masalah — bukan cuma gejala yang kelihatan di permukaan.",
  },
  {
    order: "02",
    label: "Pencegahan",
    description: "Begitu akar masalahnya ketemu, saya desain sistem yang mencegah dari awal — bukan yang cuma merespon setelah dampaknya kelihatan.",
  },
  {
    order: "03",
    label: "Implementasi Nyata",
    description: "Solusi itu harus benar-benar jalan di kondisi nyata dan dipakai orang — bukan berhenti di demo atau proof-of-concept.",
  },
  {
    order: "04",
    label: "Dampak",
    description: "Ujungnya, semua itu diukur dari satu hal: apakah ini beneran mengubah cara kerja orang jadi lebih baik.",
  },
];

export function PhilosophySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto cycling index every 2.6s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PHILOSOPHY_CHAIN.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // Network Animation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize particles
    const particleCount = 28;
    const particles: {
      x: number;
      y: number;
      ox: number; // original offset from center
      oy: number;
      angle: number;
      speed: number;
      radius: number;
      phase: number;
    }[] = [];

    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 240; // distance from center
      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        ox: Math.cos(angle) * distance,
        oy: Math.sin(angle) * distance,
        angle: angle,
        speed: 0.15 + Math.random() * 0.35,
        radius: 1.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw center focal point
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(26,26,26,0.6)";
      ctx.fill();

      // Update and draw particles & lines
      particles.forEach((p) => {
        // Breathe/Oscillate distance
        p.phase += 0.01;
        const breath = Math.sin(p.phase) * 15;
        const dist = Math.sqrt(p.ox * p.ox + p.oy * p.oy) + breath;
        
        // Calculate dynamic position
        const angle = p.angle + Math.sin(time * p.speed) * 0.2;
        p.x = cx + Math.cos(angle) * dist;
        p.y = cy + Math.sin(angle) * dist;

        // Draw bezier line to center
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        
        // Control point: creates a curved bezier path towards center
        const cpX = (p.x + cx) / 2 + Math.sin(time + p.phase) * 20;
        const cpY = (p.y + cy) / 2 + Math.cos(time + p.phase) * 20;
        ctx.quadraticCurveTo(cpX, cpY, cx, cy);

        ctx.strokeStyle = `rgba(26, 26, 26, ${0.05 + Math.sin(p.phase) * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(26, 26, 26, 0.25)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] flex flex-col justify-center items-center select-none">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Philosophy UI Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col justify-center items-center h-full gap-8 py-10 px-4">
        {/* Chain pills horizontal */}
        <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-2 w-full">
          {PHILOSOPHY_CHAIN.map((p, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div key={p.order} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`px-4 py-2 text-[10px] font-sans font-bold tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#1A1A1A] text-[#EEEDE9] border border-[#1A1A1A]"
                      : "bg-transparent text-stone-500 border border-stone-300 hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                  }`}
                >
                  {p.order} {p.label}
                </button>
                {idx < PHILOSOPHY_CHAIN.length - 1 && (
                  <span className="text-[9px] font-sans font-medium text-stone-400 mx-2 select-none">
                    MENCIPTAKAN →
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Philosophy Details card */}
        <div className="w-full min-h-[160px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="max-w-xl"
            >
              <div
                className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A]/15 mb-2 select-none tabular-nums"
              >
                {PHILOSOPHY_CHAIN[activeIdx].order}
              </div>
              <h3 className="font-serif italic text-2xl text-[#1A1A1A] mb-3">
                {PHILOSOPHY_CHAIN[activeIdx].label}
              </h3>
              <p className="font-sans text-stone-600 text-sm leading-relaxed">
                {PHILOSOPHY_CHAIN[activeIdx].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
