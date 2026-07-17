"use client";

import { PhilosophySection } from "@/components/sections/PhilosophySection";

export default function AboutPage() {
  return (
    <main className="w-full max-w-4xl mx-auto px-8 sm:px-16 py-20 min-h-screen bg-[#EEEDE9] flex flex-col gap-[var(--space-4xl)] md:gap-[var(--space-5xl)] lg:gap-[var(--space-6xl)]">
      {/* ── Section 1: Pembuka ── */}
      <section className="w-full pt-[var(--space-4xl)] md:pt-[var(--space-5xl)] lg:pt-[var(--space-6xl)] pb-8 flex flex-col items-start text-left">
        <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-sans font-semibold mb-6">
          Jakarta, Indonesia
        </p>
        <h1 className="max-w-4xl text-left font-normal leading-[1.1] tracking-tight">
          <span className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">Saya </span>
          <span className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">Muhammad </span>
          <span className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">Arya </span>
          <span className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">Maulana</span>
          <span className="font-sans font-medium text-4xl sm:text-6xl md:text-7xl text-stone-400">, </span>
          <br className="hidden md:block" />
          <span className="font-sans font-medium text-4xl sm:text-6xl md:text-7xl text-stone-400">seorang </span>
          <span className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">AI Engineer </span>
          <span className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">&amp; </span>
          <span className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">Fullstack </span>
          <span className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">Developer</span>
          <br className="hidden md:block" />
          <span className="font-sans font-medium text-4xl sm:text-6xl md:text-7xl text-stone-400"> yang fokus pada </span>
          <span className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#1A1A1A]">sistem prediktif </span>
          <span className="font-sans font-normal text-4xl sm:text-6xl md:text-7xl text-stone-400">berbasis data.</span>
        </h1>
      </section>

      {/* ── Section 2: Cerita Personal ── */}
      <section className="w-full max-w-3xl py-4">
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans">
          Ketertarikan saya pada AI and sistem prediktif lahir dari rasa ingin tahu yang mendalam tentang bagaimana data masa lalu bisa digunakan untuk mencegah masalah di masa depan. Saya melihat teknologi bukan sekadar alat untuk membangun fitur, melainkan jembatan untuk mengeliminasi ketidakpastian. Di situlah letak keindahan predictive systems: mendeteksi tanda-tanda kerusakan sebelum sistem itu sendiri menyadari bahwa ia akan gagal.
        </p>
      </section>

      {/* ── Section 3: Bukti Kolaborasi ── */}
      <section className="w-full pt-[var(--space-4xl)] md:pt-[var(--space-5xl)] lg:pt-[var(--space-6xl)] pb-8 border-t border-border">
        <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-sans font-bold mb-3">
          Collaboration
        </p>
        <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#1A1A1A] mb-8">
          Menjembatani Riset &amp; Industri Nyata
        </h2>
        <div className="max-w-3xl flex flex-col gap-6">
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Melalui kurikulum <strong>Project-Based Learning di Politeknik Negeri Jakarta (Sep 2023–Present)</strong>, saya dibekali untuk menyelesaikan tantangan bisnis riil sejak awal studi. Saya tidak memandang proyek akademik sebagai latihan main-main, melainkan sebagai kesempatan memecahkan masalah nyata milik klien yang sebenarnya.
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
            Hal ini dibuktikan melalui kolaborasi saya dengan <strong>PT NTG</strong> dalam mendesain sistem <strong>Exigen Smart Maintenance</strong> untuk memprediksi sisa umur pakai mesin industri. Selain itu, kepemimpinan saya dalam proyek pengembangan platform asesmen wawancara cerdas <strong>Asah</strong> di bawah naungan <strong>Dicoding x Accenture</strong> berhasil dianugerahi penghargaan <strong>Best Capstone Project Award</strong> pada <strong>Januari 2026</strong> karena orisinalitasnya dalam mengikis bias seleksi.
          </p>
        </div>
      </section>

      {/* ── Section 4: Filosofi Kerja ── */}
      <section className="w-full pt-[var(--space-4xl)] md:pt-[var(--space-5xl)] lg:pt-[var(--space-6xl)] pb-8 border-t border-border">
        <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-sans font-bold mb-3">
          Philosophy
        </p>
        <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-[#1A1A1A] mb-8">
          Prinsip Rekayasa Sistem
        </h2>
        <div className="w-full bg-[#f4f3ef] border border-border rounded-[24px] p-6 sm:p-8">
          <PhilosophySection />
        </div>
      </section>

      {/* ── Section 5: Tech Stack Tags ── */}
      <section className="w-full pt-[var(--space-4xl)] md:pt-[var(--space-5xl)] lg:pt-[var(--space-6xl)] pb-8 border-t border-border">
        <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-sans font-bold mb-3">
          Technologies
        </p>
        <h2 className="font-serif italic text-2xl text-[#1A1A1A] mb-8">
          Tech Stack
        </h2>
        <div className="flex flex-col sm:flex-row gap-12">
          <div className="flex-1">
            <h3 className="font-serif italic text-base text-stone-500 mb-4">AI / ML</h3>
            <div className="flex flex-wrap gap-2">
              {["Python", "TensorFlow", "Keras", "MLflow"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs font-sans text-stone-700 border border-[#BEBDB9] rounded-full select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-serif italic text-base text-stone-500 mb-4">Web &amp; API</h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "Laravel", "Supabase", "RESTful API"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs font-sans text-stone-700 border border-[#BEBDB9] rounded-full select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Kontak/Penutup ── */}
      <section className="w-full pt-[var(--space-4xl)] md:pt-[var(--space-5xl)] lg:pt-[var(--space-6xl)] pb-24 border-t border-border">
        <h2 className="font-serif italic font-bold text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] mb-10 leading-tight">
          Mari Mulai<br />Kolaborasi Baru.
        </h2>
        
        <div className="flex items-center gap-2.5 mb-10">
          <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-stone-600">
            Available for new projects
          </span>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <a
            href="mailto:ryamaulana2894@gmail.com"
            className="font-sans text-base font-bold text-[#1A1A1A] hover:text-stone-500 transition-colors underline decoration-solid underline-offset-4"
          >
            ryamaulana2894@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/muhammad-arya-maulana/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-base font-bold text-[#1A1A1A] hover:text-stone-500 transition-colors underline decoration-solid underline-offset-4"
          >
            linkedin.com/in/muhammad-arya-maulana
          </a>
          <a
            href="https://github.com/ryamaulana"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-base font-bold text-[#1A1A1A] hover:text-stone-500 transition-colors underline decoration-solid underline-offset-4"
          >
            github.com/ryamaulana
          </a>
        </div>
      </section>
    </main>
  );
}
