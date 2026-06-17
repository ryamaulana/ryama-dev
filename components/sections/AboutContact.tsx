"use client";

import { motion } from "framer-motion";
import { GitFork, Link2, Mail, ArrowUpRight } from "lucide-react";
import { ScrollCTA } from "@/components/ui/ScrollCTA";

const GRID_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const TECH_STACK = [
  "PyTorch", "TensorFlow", "Python", "C++", "CUDA",
  "Docker", "Next.js", "WebGL", "TensorRT", "ONNX",
];

const LINKS = [
  { icon: GitFork, label: "GitHub", href: "https://github.com" },
  { icon: Link2, label: "LinkedIn", href: "https://linkedin.com/in/" },
  { icon: Mail, label: "Email", href: "mailto:hello@ryama.dev" },
];

export function AboutContact() {
  return (
    <div className="flex flex-col justify-center h-full w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p
          className="text-[10px] tracking-[0.22em] uppercase text-[#6b6b6b] mb-4 font-sans"
        >
          About
        </p>
        <h2
          className="text-[clamp(2rem,5vw,3rem)] font-bold text-[#1a1a1a] leading-tight mb-3 font-serif"
        >
          System Specs
        </h2>
        <p
          className="text-sm text-[#6b6b6b] font-light max-w-xs leading-relaxed font-sans"
        >
          The architecture behind the engineer.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={GRID_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-3 w-full max-w-md"
      >
        {/* Bio box */}
        <motion.div
          variants={ITEM_VARIANTS}
          className="p-6 rounded-2xl border border-[#e5e4e0] bg-white/60 backdrop-blur-sm"
        >
          <p
            className="text-[10px] tracking-[0.18em] uppercase text-[#ff5a36] mb-3 font-semibold font-sans"
          >
            Research Focus
          </p>
          <p
            className="text-sm text-[#3a3a3a] leading-relaxed font-light font-sans"
          >
            Unsupervised representation learning & efficient edge-device
            inference. Reducing the computational overhead of large models
            without sacrificing precision.
          </p>
        </motion.div>

        {/* Stack box */}
        <motion.div
          variants={ITEM_VARIANTS}
          className="p-6 rounded-2xl border border-[#e5e4e0] bg-white/40 backdrop-blur-sm"
        >
          <p
            className="text-[10px] tracking-[0.18em] uppercase text-[#6b6b6b] mb-4 font-semibold font-sans"
          >
            Core Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-[#e5e4e0] text-[#3a3a3a] bg-white font-sans"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Contact box */}
        <motion.div
          variants={ITEM_VARIANTS}
          className="p-6 rounded-2xl border border-[#e5e4e0] bg-white/40 backdrop-blur-sm"
        >
          <p
            className="text-[10px] tracking-[0.18em] uppercase text-[#6b6b6b] mb-4 font-semibold font-sans"
          >
            Contact
          </p>
          <div className="flex flex-col gap-2">
            {LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/70 border border-transparent hover:border-[#e5e4e0] hover:bg-white transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3 text-[#3a3a3a]">
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span
                    className="text-sm font-medium font-sans"
                  >
                    {label}
                  </span>
                </div>
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-[#b0aea8] group-hover:text-[#ff5a36] transition-colors duration-200"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Full About page CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <ScrollCTA label="Full bio" href="/about" cursorLabel="ABOUT" />
      </motion.div>
    </div>
  );
}
