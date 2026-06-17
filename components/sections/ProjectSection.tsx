"use client";

import { ScrollCTA } from "@/components/ui/ScrollCTA";
import { Project } from "@/lib/projects";

interface ProjectSectionProps {
  project: Project;
  index: number;
}

export function ProjectSection({ project, index }: ProjectSectionProps) {
  return (
    <div className="project-text-wrapper flex flex-col w-full py-8 justify-center">
      {/* Project name — extremely large display bold sans-serif with dynamic color */}
      <h2
        className="font-black leading-[1.0] tracking-tighter transition-colors duration-500"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(3.8rem, 7.5vw, 6.2rem)",
          color: project.titleColor || "#1A1A1A",
          marginBottom: "1rem",
        }}
      >
        {project.name}
      </h2>

      {/* Description — single sentence, punchy */}
      <p 
        className="text-[18px] text-stone-600 leading-relaxed font-normal max-w-[480px]"
        style={{
          fontFamily: "var(--font-inter)",
          marginBottom: "1.25rem",
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
