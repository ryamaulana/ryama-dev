import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { caseStudies } from "@/data/case-studies";

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
  const caseStudy = caseStudies[slug];

  if (!project || !caseStudy) notFound();

  return (
    <main className="min-h-screen px-8 md:px-16 lg:px-24 pt-8 md:pt-16 pb-20 canvas-container bg-[#EEEDE9] relative flex flex-col gap-6 z-10">
      {/* Header */}
      <div className="mb-6 mt-4 md:mt-8">
        <h1
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold font-serif leading-tight mb-4"
          style={{ color: project.accentColor }}
        >
          {project.name}
        </h1>
        <p className="text-stone-500 text-lg sm:text-xl font-sans font-medium max-w-3xl leading-relaxed">
          {caseStudy.subtitle}
        </p>
      </div>

      {/* Hero Media Preview */}
      <div
        className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-[#f4f3ef] mb-12 shadow-sm"
      >
        {project.previewVideo ? (
          <video
            src={project.previewVideo}
            poster={project.previewImage}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={project.previewImage}
            alt={`${project.name} overview`}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* Storyteller Sections */}
      <div className="flex flex-col gap-[var(--space-4xl)] md:gap-[var(--space-5xl)] lg:gap-[var(--space-6xl)]">
        
        {/* Section 1: Cerita Awal */}
        <section className="flex flex-col md:flex-row gap-10 items-start">
          {caseStudy.ceritaAwal.visualSlot && caseStudy.ceritaAwal.visualSlot.position !== "skip" && (
            <div className="w-full md:w-[40%] flex-shrink-0 order-1 md:order-2">
              {caseStudy.ceritaAwal.visualSlot.video ? (
                <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border border-border bg-[#f4f3ef] shadow-sm">
                  <video
                    src={caseStudy.ceritaAwal.visualSlot.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : caseStudy.ceritaAwal.visualSlot.image ? (
                <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border border-border bg-[#f4f3ef] shadow-sm">
                  <Image
                    src={caseStudy.ceritaAwal.visualSlot.image}
                    alt={caseStudy.ceritaAwal.visualSlot.text}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              ) : (
                <div className="relative aspect-[3/2] border border-dashed border-stone-400 bg-stone-100/30 rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[160px] font-mono text-[9px] uppercase tracking-wider text-stone-500">
                  <span>[ Visual Slot: {caseStudy.ceritaAwal.visualSlot.text} ]</span>
                </div>
              )}
            </div>
          )}
          <div className={`flex-1 flex flex-col gap-4 order-2 ${caseStudy.ceritaAwal.visualSlot && caseStudy.ceritaAwal.visualSlot.position !== "skip" ? "md:order-1" : ""}`}>
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#1a1a1a]">
              {caseStudy.ceritaAwal.title}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
              {caseStudy.ceritaAwal.text}
            </p>
          </div>
        </section>

        {/* Section 2: Celah */}
        <section className="py-12 border-y border-border text-center max-w-3xl mx-auto w-full">
          <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#1a1a1a] mb-6">
            {caseStudy.celah.title}
          </h2>
          <blockquote className="font-serif italic text-xl sm:text-2xl text-stone-600 leading-relaxed">
            {caseStudy.celah.text}
          </blockquote>
        </section>

        {/* Section 3: Approach */}
        <section className="flex flex-col md:flex-row gap-10 items-start">
          {caseStudy.approach.visualSlot && caseStudy.approach.visualSlot.position !== "skip" && (
            <div
              className={`w-full md:w-[45%] flex-shrink-0 order-1 ${
                caseStudy.approach.visualSlot.position === "left" ? "md:order-1" : "md:order-2"
              }`}
            >
              {caseStudy.approach.visualSlot.video ? (
                <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border border-border bg-[#f4f3ef] shadow-sm">
                  <video
                    src={caseStudy.approach.visualSlot.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : caseStudy.approach.visualSlot.image ? (
                <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border border-border bg-[#f4f3ef] shadow-sm">
                  <Image
                    src={caseStudy.approach.visualSlot.image}
                    alt={caseStudy.approach.visualSlot.text}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              ) : (
                <div className="relative aspect-[3/2] border border-dashed border-stone-400 bg-stone-100/30 rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[160px] font-mono text-[9px] uppercase tracking-wider text-stone-500">
                  <span>[ Visual Slot: {caseStudy.approach.visualSlot.text} ]</span>
                </div>
              )}
            </div>
          )}
          <div
            className={`flex-1 flex flex-col gap-4 order-2 ${
              caseStudy.approach.visualSlot && caseStudy.approach.visualSlot.position === "left" ? "md:order-2" : "md:order-1"
            }`}
          >
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#1a1a1a]">
              {caseStudy.approach.title}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line">
              {caseStudy.approach.text}
            </p>
          </div>
        </section>

        {/* Section 4: Features */}
        <div className="flex flex-col gap-16 pt-8">
          <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-stone-400 uppercase tracking-wider">
            Fitur Utama
          </h2>
          {caseStudy.features.map((feat, index) => {
            const isVisualLeft = feat.visualSlot?.position === "left" || (feat.visualSlot && index % 2 !== 0);
            const isFirst = index === 0;
            return (
              <section key={feat.title} className="flex flex-col md:flex-row gap-10 items-start">
                {feat.visualSlot && (
                  <div
                    className={`w-full ${
                      isFirst ? "md:w-[70%]" : "md:w-[40%]"
                    } flex-shrink-0 order-1 ${
                      isVisualLeft ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    {feat.visualSlot.video ? (
                      <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border border-border bg-[#f4f3ef] shadow-sm">
                        <video
                          src={feat.visualSlot.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : feat.visualSlot.image ? (
                      <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border border-border bg-[#f4f3ef] shadow-sm">
                        <Image
                          src={feat.visualSlot.image}
                          alt={feat.visualSlot.text}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-[3/2] border border-dashed border-stone-400 bg-stone-100/30 rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[180px] font-mono text-[9px] uppercase tracking-wider text-stone-500">
                        <span>[ Visual Slot: {feat.visualSlot.text} ]</span>
                      </div>
                    )}
                  </div>
                )}
                <div
                  className={`flex-1 flex flex-col gap-4 order-2 ${
                    feat.visualSlot && isVisualLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#1a1a1a]">
                    {feat.title}
                  </h3>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                    {feat.text}
                  </p>
                </div>
              </section>
            );
          })}
        </div>

        {/* Section 5: Overall Impact */}
        {caseStudy.overallImpact && (
          <section className="py-12 border-t border-border">
            <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#1a1a1a] mb-4">
              {caseStudy.overallImpact.title}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-4xl">
              {caseStudy.overallImpact.text}
            </p>
          </section>
        )}

      </div>

      {/* Tech Stack Footnote */}
      <footer className="mt-20 pt-10 border-t border-border flex flex-col gap-4 pb-12">
        <h3 className="font-serif italic text-stone-400 uppercase tracking-widest text-xs">
          Technology Stack
        </h3>
        <ul className="flex flex-wrap gap-2 list-none p-0">
          {caseStudy.techStack.map((tech) => (
            <li
              key={tech}
              className="px-4 py-2 text-xs font-sans text-stone-700 border border-[#BEBDB9] rounded-full select-none bg-stone-50/50"
            >
              {tech}
            </li>
          ))}
        </ul>
      </footer>
    </main>
  );
}
