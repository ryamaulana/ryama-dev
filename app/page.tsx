"use client";

import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#FAFAF7]">
      <div className="hero-section-wrapper w-full">
        <HeroSection />
      </div>
    </main>
  );
}
