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
      {/* Project name — extremely large display bold sans-serif with dynamic color */}
      <h2
        className="font-black leading-[1.05] tracking-tight transition-colors duration-500"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: isPortrait ? "clamp(2.5rem, 10vw, 4rem)" : "clamp(2rem, 7.5vw, 6.2rem)",
          color: project.titleColor || "#1A1A1A",
          marginBottom: "clamp(0.5rem, 1.5vw, 1rem)",
        }}
      >
        {project.name}
      </h2>

      {/* Description — single sentence, punchy */}
      <p
        className="text-stone-600 leading-relaxed font-normal max-w-[480px]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
          marginBottom: "clamp(0.75rem, 2vw, 1.25rem)",
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
        />
      </div>
    </div>
  );
}
