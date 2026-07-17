"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";


export function Header() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      // Show real header RYAMA only when hero is 100% gone (bottom top threshold).
      // This aligns with the flying RYAMA handoff: flying element fades out at
      // the same scroll position, real header RYAMA fades in — seamless swap.
      setScrolled(window.scrollY >= window.innerHeight - 4);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const showNav = true;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center pointer-events-none">
      <div
        className="canvas-container w-full flex justify-between items-center relative"
        style={{
          paddingTop: "clamp(1.25rem, 4.5vh, 3.5rem)",
          paddingBottom: "clamp(0.75rem, 2.5vh, 2rem)",
          paddingLeft: "clamp(1.25rem, 4.5vw, 5rem)",
          paddingRight: "clamp(1.25rem, 4.5vw, 5rem)",
        }}
      >
        {/* Left Side */}
        {isAbout ? (
          <Link
            href="/"
            className="pointer-events-auto font-inter font-semibold uppercase text-[10px] md:text-[11px] tracking-widest text-[#6b6b6b] hover:text-[#1a1a1a] transition-all duration-300 no-underline"
            data-cursor="BACK"
          >
            ← Portfolio
          </Link>
        ) : (
          /*
            On the home page: the RYAMA link is always in the DOM so that the
            flying-RYAMA GSAP animation can measure its exact target position via
            getBoundingClientRect(). It is visually invisible (opacity 0, pointer-
            events none) while the flying element is doing the journey, then
            becomes visible when the handoff is complete (scrolled = true).

            On other pages (projects, etc.): show normally, no flying element logic.
          */
          <Link
            id="header-ryama-target"
            href="/"
            className="pointer-events-auto font-sans font-black uppercase text-xl md:text-2xl tracking-wider text-[#1a1a1a] hover:scale-105 active:scale-95 transition-transform duration-300 no-underline"
            data-cursor="HOME"
            aria-label="Home"
            style={{
              opacity: isHome ? (scrolled ? 1 : 0) : 1,
              pointerEvents: isHome ? (scrolled ? "auto" : "none") : "auto",
              transition: "opacity 0.15s ease",
            }}
          >
            RYAMA
          </Link>
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
              className={`transition-all duration-300 w-10 h-10 rounded-full border bg-white hover:border-[#1a1a1a] hover:text-[#1a1a1a] hover:scale-105 active:scale-95 flex items-center justify-center shadow-md hover:shadow-lg shrink-0 ${
                isAbout
                  ? "text-[#1a1a1a] border-[#1a1a1a] ring-2 ring-[#1a1a1a]/10"
                  : "text-[#6b6b6b] border-stone-200"
              }`}
              style={{ textDecoration: "none" }}
              data-cursor="ABOUT"
              aria-label="About"
            >
              <span className="font-bold text-[11px] tracking-[0.04em] font-inter leading-none select-none">
                AR
              </span>
            </Link>
          </nav>
        ) : (
          <div />
        )}
      </div>
    </header>
  );
}
