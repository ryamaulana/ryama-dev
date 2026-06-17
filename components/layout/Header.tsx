"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PersonStanding } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";
  const isHome = pathname === "/";
  const isProjects = pathname === "/projects";

  // Hide logo on home (visible on projects, about, and case study pages)
  const showLogo = !isHome;
  // Show about navigation on all pages
  const showNav = true;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center pointer-events-none">
      <div
        className="max-w-7xl w-full px-6 md:px-12 lg:px-20 flex justify-between items-center relative"
        style={{ paddingTop: "var(--header-pt)", paddingBottom: "var(--header-pb)" }}
      >
        {/* Left Side */}
        {isAbout ? (
          <Link
            href="/projects"
            className="pointer-events-auto font-sans font-semibold uppercase text-[10px] md:text-[11px] tracking-widest text-[#6b6b6b] hover:text-[#1a1a1a] transition-all duration-300 no-underline"
            data-cursor="BACK"
          >
            ← Portfolio
          </Link>
        ) : showLogo ? (
          <Link
            href="/"
            className="pointer-events-auto font-sans font-black uppercase text-xl md:text-2xl tracking-wider text-[#1a1a1a] hover:scale-105 active:scale-95 transition-all duration-300 no-underline"
            data-cursor="HOME"
            aria-label="Home"
          >
            RYAMA
          </Link>
        ) : (
          <div />
        )}

        {/* Center Side (Only visible on About page) */}
        {isAbout ? (
          <Link
            href="/"
            className="pointer-events-auto font-sans font-black uppercase text-lg md:text-xl tracking-widest text-[#1a1a1a] hover:scale-105 active:scale-95 transition-all duration-300 no-underline absolute left-1/2 -translate-x-1/2"
            data-cursor="HOME"
            aria-label="Home"
          >
            RYAMA
          </Link>
        ) : null}

        {/* Right Side */}
        {showNav ? (
          <nav className="pointer-events-auto flex items-center gap-6">
            <Link
              href="/about"
              className={`transition-all duration-300 relative p-3.5 rounded-full border border-stone-200 bg-white hover:border-[#ff5a36] hover:text-[#ff5a36] hover:scale-105 active:scale-95 flex items-center justify-center shadow-md hover:shadow-lg ${
                isAbout ? "text-[#ff5a36] border-[#ff5a36] ring-2 ring-[#ff5a36]/20" : "text-[#6b6b6b]"
              }`}
              style={{ textDecoration: "none" }}
              data-cursor="ABOUT"
              aria-label="About"
            >
              <PersonStanding className="w-8 h-8" strokeWidth={2.2} />
            </Link>
          </nav>
        ) : (
          <div />
        )}
      </div>
    </header>
  );
}

