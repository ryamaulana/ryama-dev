"use client";

import { ScrollCTA } from "@/components/ui/ScrollCTA";
import { Project } from "@/lib/projects";

interface ProjectSectionProps {
  project: Project;
  index: number;
  isPortrait?: boolean;
}

export function ProjectSection({ project, index, isPortrait }: ProjectSectionProps) {
  return (
    <div className="project-text-wrapper flex flex-col w-full py-8 justify-center">
      {/* Project name — Serif Playfair Display bold, smaller scale, accent colored */}
      <h2
        className="font-bold leading-[1.1] tracking-tight transition-colors duration-500"
        style={{
          fontFamily: "var(--font-playfair-display), serif",
          fontSize: isPortrait ? "clamp(2.2rem, 8vw, 3.5rem)" : "clamp(1.75rem, 4vw, 3.2rem)",
          color: project.accentColor,
          marginBottom: "clamp(0.85rem, 2.5vw, 1.5rem)",
        }}
      >
        {project.name}
      </h2>

      {/* Description — single sentence, punchy, generous whitespace below */}
      <p
        className="text-stone-600 leading-relaxed font-normal max-w-[480px]"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
          marginBottom: "clamp(1.25rem, 3.5vw, 2.25rem)",
        }}
      >
        {project.description}
      </p>

      {/* CTA */}
      <div className="flex">
        <ScrollCTA
          label="Open Case Study"
          href={project.caseStudyUrl}
          cursorLabel="VIEW"
          accentColor={project.accentColor}
        />
      </div>
    </div>
  );
}
