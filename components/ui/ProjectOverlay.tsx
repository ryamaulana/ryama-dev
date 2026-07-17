import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

interface ProjectOverlayProps {
  activeIndex: number;
  onClose: () => void;
}

export function ProjectOverlay({ activeIndex, onClose }: ProjectOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on click-outside (not on the cards themselves)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center px-8"
      style={{ background: "rgba(250,250,247,0.92)", backdropFilter: "blur(16px)" }}
      onMouseLeave={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="All projects"
    >
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-xs tracking-[0.2em] uppercase text-[#6b6b6b] mb-8 font-sans"
        >
          Projects
        </motion.p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={project.caseStudyUrl}
              onClick={onClose}
              className="no-underline block"
              style={{ textDecoration: "none" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
                className="group block relative overflow-hidden rounded-none border border-[#e5e4e0] bg-white cursor-pointer"
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
                data-cursor="VIEW"
                aria-label={`View case study: ${project.name}`}
              >
                {/* Thumbnail */}
                <div
                  className="relative aspect-video overflow-hidden"
                  style={{ backgroundColor: project.previewBgColor }}
                >
                  <Image
                    src={project.previewImage}
                    alt={project.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Card footer */}
                <div className="p-5 flex items-end justify-between">
                  <div>
                    <p
                      className="text-xs text-[#6b6b6b] mb-1 tracking-wider font-sans"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="text-base font-semibold text-[#1a1a1a] leading-snug font-sans"
                    >
                      {project.name}
                    </h3>
                  </div>
                  {/* Active indicator */}
                  {i === activeIndex && (
                    <span 
                      className="w-2 h-2 rounded-full shrink-0 mb-1" 
                      style={{ backgroundColor: project.accentColor }}
                    />
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
