"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AboutDotIndicator } from "@/components/ui/AboutDotIndicator";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { label: "LOCATION", value: "Jakarta, Indonesia", hasDot: true, dotColor: "#ff5a36" },
  { label: "DEGREE", value: "D4 Teknik Informatika", hasDot: false },
  { label: "INSTITUTION", value: "Politeknik Negeri Jakarta", hasDot: false },
  { label: "FOCUS AREA", value: "ML - Predictive Systems", hasDot: false },
  { label: "COLLABORATION", value: "PT NTG / Exigen", hasDot: false },
  { label: "STATUS", value: "Active", hasDot: true, dotColor: "#ff5a36" },
];

const TECH_CATEGORIES = [
  {
    title: "AI / MACHINE LEARNING",
    tags: [
      { name: "Python", dot: "#3776AB" },
      { name: "scikit-learn", dot: "#F7931E" },
      { name: "TensorFlow", dot: "#FF6F00" },
      { name: "PaddleOCR", dot: "#00A3FF" },
      { name: "Qwen2.5 - Ollama", dot: "#8B00FF" },
      { name: "Random Forest", dot: "#2496ED" },
      { name: "MLP", dot: "#EE4C2C" },
      { name: "Pandas - NumPy", dot: "#FFC107" },
    ],
  },
  {
    title: "WEB & API",
    tags: [
      { name: "Node.js", dot: "#339933" },
      { name: "Express", dot: "#000000" },
      { name: "Laravel", dot: "#FF2D20" },
      { name: "React", dot: "#61DAFB" },
      { name: "Next.js", dot: "#000000" },
      { name: "REST API", isDarkBadge: true },
    ],
  },
  {
    title: "DATA & INFRASTRUCTURE",
    tags: [
      { name: "PostgreSQL", dot: "#336791" },
      { name: "MySQL", dot: "#00758F" },
      { name: "Matplotlib - Seaborn", dot: "#3776AB" },
      { name: "Docker", dot: "#2496ED" },
      { name: "Git", dot: "#F05032" },
    ],
  },
];

const PHILOSOPHIES = [
  {
    num: "01",
    title: "Local First",
    desc: "Pipeline ML dan AI dijalankan secara lokal bila memungkinkan. Privasi, kecepatan, dan kontrol penuh ada di tangan tim.",
  },
  {
    num: "02",
    title: "Problem-Driven",
    desc: "Tools dipilih berdasarkan masalah yang harus diselesaikan, bukan popularitasnya. Tren bukan kompas.",
  },
  {
    num: "03",
    title: "Research ↔ Product",
    desc: "Riset akademik harus bisa diimplementasikan. Kolaborasi dengan industri adalah cara terbaik membuktikannya.",
  },
  {
    num: "04",
    title: "Predict, Don't React",
    desc: "Sistem terbaik adalah yang memberitahu masalah sebelum masalah itu datang — bukan setelah kerusakan terjadi.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const sections = gsap.utils.toArray<HTMLElement>(".about-section-wrapper");

      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          scroller: container, // Sync with scroll-snap custom container
          start: "top 50%",
          end: "bottom 50%",
          id: `about-trigger-${i}`,
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: containerRef }
  );

  const scrollToSection = (idx: number) => {
    const el = document.getElementById(`about-section-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-[#FAFAF7] bg-grid-pattern relative scroll-smooth hide-scrollbar"
    >
      {/* ── Slide 1: Intro ── */}
      <section
        id="about-section-0"
        className="about-section-wrapper snap-start w-full h-screen flex flex-col justify-center items-center px-12 sm:px-24 text-center select-none"
      >
        <div className="max-w-2xl flex flex-col items-center gap-6">
          <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-stone-400 font-sans font-medium">
            Jakarta, Indonesia
          </p>

          <h1 className="font-serif leading-[0.9] text-[#1a1a1a] flex flex-col items-center">
            <span className="font-extrabold uppercase text-[clamp(44px,8vw,110px)] font-sans tracking-tight">
              ABOUT
            </span>
            <span className="font-black italic uppercase text-[clamp(52px,10vw,130px)] text-[#ff5a36] -mt-2">
              RYAMA
            </span>
          </h1>

          <h2 className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.25em] text-[#6b6b6b] font-sans uppercase">
            AI ENGINEER &amp; FULLSTACK DEVELOPER
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-lg mt-2">
            Membangun sistem yang memprediksi, mengotomatisasi, dan berkomunikasi — sehingga tim bisa fokus pada hal yang benar-benar penting.
          </p>

          <button
            onClick={() => scrollToSection(1)}
            className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#ff5a36] text-white font-bold tracking-widest uppercase text-[11px] transition-all duration-300 rounded-lg font-sans shadow-lg hover:shadow-[0_8px_30px_rgba(255,90,54,0.3)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer mt-4"
            style={{ padding: "16px 40px" }}
          >
            Read More →
          </button>
        </div>
      </section>

      {/* ── Slide 2: Who I Am ── */}
      <section
        id="about-section-1"
        className="about-section-wrapper snap-start w-full h-screen flex items-center justify-center px-12 sm:px-24 lg:px-32"
      >
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left Side: Bio text */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <p className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-[#ff5a36] mb-3 font-sans">
              WHO I AM
            </p>
            <h2 className="text-[clamp(32px,4.5vw,72px)] font-black uppercase leading-[0.9] text-[#ff5a36] font-sans tracking-tighter">
              MUHAMMAD<br />
              ARYA<br />
              MAULANA
            </h2>
            <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed font-sans mt-6 mb-6">
              Mahasiswa Teknik Informatika di Politeknik Negeri Jakarta. Saya hidup di persimpangan kecerdasan buatan dan rekayasa perangkat lunak — dari prediksi kegagalan mesin hingga pipeline pemrosesan dokumen lokal.
            </p>
            <a
              href="https://github.com/nazeeraalthea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ff5a36] hover:text-[#e04524] tracking-widest uppercase transition-colors font-sans no-underline w-fit"
            >
              github.com/nazeeraalthea →
            </a>
          </div>

          {/* Right Side: Profile Card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[500px] bg-[#121212] text-white rounded-[24px] border border-stone-800/80 shadow-2xl flex flex-col"
              style={{ padding: "40px" }}
            >
              <p className="text-[9px] tracking-[0.25em] text-stone-500 uppercase font-sans font-semibold mb-2">
                DEVELOPER PROFILE - 2026
              </p>
              <h3 className="text-3xl font-extrabold tracking-wide uppercase text-white font-sans">
                ARYA MAULANA
              </h3>
              <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase font-sans mt-1">
                AI ENGINEER - FULLSTACK DEVELOPER
              </p>

              <div className="border-t border-stone-800/80 my-5" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6" style={{ gap: "20px 24px" }}>
                {SPECS.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1.5">
                    <span className="text-[9px] tracking-wider text-stone-500 font-bold uppercase font-sans">
                      {spec.label}
                    </span>
                    <span className="text-sm font-medium text-stone-200 font-sans flex items-center">
                      {spec.hasDot && (
                        <span
                          className="w-2 h-2 rounded-full mr-2 shrink-0 animate-pulse"
                          style={{ backgroundColor: spec.dotColor }}
                        />
                      )}
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Slide 3: Tech Stack ── */}
      <section
        id="about-section-2"
        className="about-section-wrapper snap-start w-full h-screen flex items-center justify-center px-12 sm:px-24 lg:px-32"
      >
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left Side: Tag list */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            {TECH_CATEGORIES.map((cat) => (
              <div key={cat.title} className="flex flex-col gap-2.5">
                <span className="text-[10px] tracking-widest text-stone-400 font-bold uppercase font-sans">
                  {cat.title}
                </span>
                <div className="flex flex-wrap" style={{ gap: "18px 14px" }}>
                  {cat.tags.map((tag) =>
                    tag.isDarkBadge ? (
                      <span
                        key={tag.name}
                        className="bg-black text-white rounded-full text-[11px] font-extrabold uppercase tracking-widest font-sans select-none shadow-sm"
                        style={{ padding: "10px 20px" }}
                      >
                        {tag.name}
                      </span>
                    ) : (
                      <span
                        key={tag.name}
                        className="rounded-full border border-stone-200 text-stone-700 bg-white text-xs font-semibold font-sans tracking-wide inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all select-none"
                        style={{ padding: "10px 20px" }}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: tag.dot }}
                        />
                        {tag.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Header text */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <p className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-stone-400 mb-3 font-sans">
              TECHNOLOGY
            </p>
            <h2 className="text-[clamp(42px,6.5vw,95px)] font-black uppercase leading-[0.9] text-[#0052FF] font-sans tracking-tighter">
              TECH<br />
              STACK
            </h2>
            <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed font-sans mt-6">
              Tools dipilih berdasarkan masalah, bukan tren. ML pipeline lokal, API yang ringan, dan frontend yang jelas.
            </p>
          </div>
        </div>
      </section>

      {/* ── Slide 4: Education ── */}
      <section
        id="about-section-3"
        className="about-section-wrapper snap-start w-full h-screen flex items-center justify-center px-12 sm:px-24 lg:px-32"
      >
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left Side: Education Text */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <p className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-stone-400 mb-3 font-sans">
              EDUCATION
            </p>
            <h2 className="text-[clamp(38px,6vw,90px)] font-black uppercase leading-[0.9] text-[#00A86B] font-sans tracking-tighter">
              POLTEK<br />
              NEGERI<br />
              JAKARTA
            </h2>
            <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed font-sans mt-6 mb-6">
              Jurusan Teknik Informatika. Membangun fondasi antara teori dan implementasi industri nyata.
            </p>
            <a
              href="https://pnj.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00A86B] hover:text-[#008f5a] tracking-widest uppercase transition-colors font-sans no-underline w-fit"
            >
              pnj.ac.id →
            </a>
          </div>

          {/* Right Side: Education Card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[550px] bg-[#f4f3ef] border border-[#e5e4e0] rounded-[24px] shadow-xl relative flex flex-col"
              style={{ padding: "40px" }}
            >
              {/* Badge */}
              <div className="bg-[#00A86B] text-white text-[9px] tracking-widest font-bold px-3.5 py-1.5 rounded-full uppercase inline-block w-fit mb-5 font-sans">
                ● ACTIVE STUDENT
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-wide uppercase text-stone-900 font-sans">
                POLITEKNIK NEGERI JAKARTA
              </h3>
              <p className="text-[10px] tracking-[0.15em] text-stone-500 uppercase font-sans mt-1 mb-5">
                D4 Teknik Informatika - Jurusan Teknik Informatika. Depok, Jawa Barat
              </p>

              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li className="flex gap-3 text-stone-700 text-xs sm:text-[13px] leading-relaxed font-sans align-top">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 mt-1.5" />
                  <span>
                    Riset akademik komparatif: <strong>Random Forest vs. Multi-Layer Perceptron</strong> untuk prediksi Remaining Useful Life (RUL) pada predictive maintenance fasilitas gedung.
                  </span>
                </li>
                <li className="flex gap-3 text-stone-700 text-xs sm:text-[13px] leading-relaxed font-sans align-top">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 mt-1.5" />
                  <span>
                    Kolaborasi industri dengan <strong>PT NTG</strong> dalam framework <strong>Exigen Smart Maintenance</strong> — menjembatani riset kampus ke implementasi produksi nyata.
                  </span>
                </li>
                <li className="flex gap-3 text-stone-700 text-xs sm:text-[13px] leading-relaxed font-sans align-top">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] shrink-0 mt-1.5" />
                  <span>
                    Pengembangan letter reader lokal menggunakan <strong>PaddleOCR + Qwen2.5 via Ollama</strong> — pipeline pemrosesan surat yang sepenuhnya berjalan offline tanpa cloud API.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Slide 5: Philosophy ── */}
      <section
        id="about-section-4"
        className="about-section-wrapper snap-start w-full h-screen flex items-center justify-center px-12 sm:px-24 lg:px-32"
      >
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left Side: Philosophy Text */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <p className="text-[10px] tracking-[0.2em] font-extrabold uppercase text-stone-400 mb-3 font-sans">
              PHILOSOPHY
            </p>
            <h2 className="text-[clamp(42px,6.5vw,95px)] font-black uppercase leading-[0.9] text-[#8B00FF] font-sans tracking-tighter">
              HOW I<br />
              WORK
            </h2>
            <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed font-sans mt-6">
              Prinsip yang memandu setiap keputusan teknis — dari arsitektur sistem hingga satu baris kode.
            </p>
          </div>

          {/* Right Side: 2x2 grid of Cards */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[550px]">
              {PHILOSOPHIES.map((p) => (
                <div
                  key={p.num}
                  className="bg-[#f4f3ef] border border-[#e5e4e0] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-2 select-none"
                  style={{ padding: "28px" }}
                >
                  <span className="text-[16px] font-black tracking-wide text-[#8B00FF] font-sans">
                    {p.num}
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-sans">
                    {p.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-stone-600 font-sans">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Slide 6: Get in Touch ── */}
      <section
        id="about-section-5"
        className="about-section-wrapper snap-start w-full h-screen flex flex-col justify-center items-center px-12 sm:px-24 text-center select-none"
      >
        <div className="max-w-3xl flex flex-col items-center gap-6">
          <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-stone-400 font-sans font-medium">
            LET'S BUILD SOMETHING
          </p>

          <h2 className="font-serif leading-[0.9] text-[#1a1a1a] font-extrabold uppercase text-[clamp(44px,8vw,110px)] font-sans tracking-tight mb-4">
            GET IN<br />
            TOUCH
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
            {/* Button 1: GitHub */}
            <a
              href="https://github.com/nazeeraalthea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#ff5a36] text-white font-bold tracking-widest uppercase text-[10px] sm:text-[11px] transition-all duration-300 border border-[#1a1a1a] hover:border-[#ff5a36] rounded-none font-sans no-underline cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
              style={{ padding: "16px 32px" }}
            >
              <span>↗ GITHUB</span>
            </a>

            {/* Button 2: LinkedIn */}
            <a
              href="https://linkedin.com/in/muhammad-arya-maulana/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-900 hover:text-[#ff5a36] font-bold tracking-widest uppercase text-[10px] sm:text-[11px] transition-all duration-300 border border-stone-200 hover:border-[#ff5a36] rounded-none font-sans no-underline cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
              style={{ padding: "16px 32px" }}
            >
              <span>↗ LINKEDIN</span>
            </a>

            {/* Button 3: Instagram */}
            <a
              href="https://instagram.com/ay.rya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-900 hover:text-[#ff5a36] font-bold tracking-widest uppercase text-[10px] sm:text-[11px] transition-all duration-300 border border-stone-200 hover:border-[#ff5a36] rounded-none font-sans no-underline cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
              style={{ padding: "16px 32px" }}
            >
              <span>↗ INSTAGRAM</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Slide Indicator Navigation ── */}
      <AboutDotIndicator
        activeIndex={activeIndex}
        onNavigate={(idx) => scrollToSection(idx)}
      />
    </div>
  );
}
