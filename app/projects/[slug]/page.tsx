  import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — Case Study | ryama`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen px-8 md:px-16 lg:px-24 py-16 max-w-4xl mx-auto">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors mb-16 group font-sans no-underline"
      >
        <ArrowLeft
          className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        Back to projects
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight mb-6 font-serif"
          style={{ color: project.titleColor || "#1a1a1a" }}
        >
          {project.name}
        </h1>
        <p
          className="text-lg text-[#6b6b6b] font-light leading-relaxed max-w-2xl font-sans"
        >
          {project.description}
        </p>
      </div>

      {/* Metrics */}
      <div className="flex gap-10 mb-12 pb-12 border-b border-[#e5e4e0]">
        {project.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <span
              className="text-[10px] uppercase tracking-wider text-[#6b6b6b] font-medium font-sans"
            >
              {m.label}
            </span>
            <span
              className="text-2xl font-bold text-[#1a1a1a] font-serif"
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Preview image */}
      <div
        className="relative aspect-video w-full rounded-none overflow-hidden border border-[#e5e4e0] mb-12"
        style={{ backgroundColor: project.previewBgColor }}
      >
        <Image
          src={project.previewImage}
          alt={`${project.name} preview`}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      {/* Placeholder content */}
      <div
        className="text-base text-[#6b6b6b] font-light leading-relaxed space-y-4 font-sans"
      >
        <p>
          Full case study coming soon. The detailed write-up will cover the
          architecture decisions, training pipeline, deployment infrastructure,
          and key learnings from this project.
        </p>
        <p>
          In the meantime, feel free to{" "}
          <a
            href="mailto:hello@ryama.dev"
            className="text-[#ff5a36] hover:underline"
          >
            reach out
          </a>{" "}
          if you have questions.
        </p>
      </div>
    </main>
  );
}
