"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ProjectImageStrip, VideoPlayer } from "@/components/ui/ProjectImageStrip";
import { DotIndicator } from "@/components/ui/DotIndicator";
import { ScrollCTA } from "@/components/ui/ScrollCTA";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Subtle background tones for project crossfades
const PROJECT_BG_TONES = [
  "#FAFAF7", // Project 1: warm off-white (base)
  "#F7F8FA", // Project 2: very slightly cool blue-gray
  "#F9F7FA", // Project 3: very slightly cool violet
];

// ─────────────────────────────────────────────────────────────
// PHOTO STACK DATA
// ─────────────────────────────────────────────────────────────

// Base photo sizes are defined at ~1.4× the original design pixel values.
// The .photo-stack-scaler CSS class then applies responsive scale() transforms
// so the stack stays proportional at every viewport without recalculating offsets.
const CANDID_PHOTOS = [
  {
    // Back layer — smallest, peeks top-right of front card
    src: "/ragunan.jpeg",
    alt: "Candid photo at Ragunan",
    width: 225,
    height: 295,
    rotate: 10,
    offsetX: 98,   // ≈70 × 1.4 — hard right of front card
    offsetY: -70,  // ≈-50 × 1.4 — up
    z: 1,
    layerClass: "outro-photo-back",
  },
  {
    // Mid layer — medium, peeks left of front card
    src: "/SMK.jpg",
    alt: "Candid photo at SMK",
    width: 294,
    height: 385,
    rotate: -9,
    offsetX: -98,  // ≈-70 × 1.4 — hard left of front card
    offsetY: 42,   // ≈30 × 1.4
    z: 2,
    layerClass: "outro-photo-mid",
  },
  {
    // Front layer — largest, dominant, most upright
    src: "/batik.png",
    alt: "Candid photo in batik",
    width: 322,
    height: 420,
    rotate: 2,
    offsetX: 0,
    offsetY: 0,
    z: 3,
    layerClass: "outro-photo-front",
  },
] as const;

// Box shadows — deeper for layers closer to viewer
const LAYER_SHADOWS = [
  "0 4px 18px rgba(0,0,0,0.11)",
  "0 10px 32px rgba(0,0,0,0.16)",
  "0 24px 60px rgba(0,0,0,0.24)",
] as const;

// ─────────────────────────────────────────────────────────────
// PhotoLayer — a single draggable photo card
// ─────────────────────────────────────────────────────────────

interface PhotoLayerProps {
  photo: (typeof CANDID_PHOTOS)[number];
  index: number;
  zIndex: number;
  onPointerDown: () => void;
  onDragStart: () => void;
  hasDragged: boolean;
  accentColor: string;
}

function PhotoLayer({
  photo,
  index,
  zIndex,
  onPointerDown,
  onDragStart,
  hasDragged,
  accentColor,
}: PhotoLayerProps) {
  const isFront = index === CANDID_PHOTOS.length - 1;
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Position calculation in the 680x580 container
  const left = (680 - photo.width) / 2 + photo.offsetX;
  const top = (580 - photo.height) / 2 + photo.offsetY;

  // Local drag boundaries relative to the initial top/left position
  const minX = -left;
  const maxX = 680 - left - photo.width;
  const minY = -top;
  const maxY = 580 - top - photo.height;

  // ── Periodic nudge ──────────────────────────────────────────────────────
  const nudgeControls = useAnimationControls();

  useEffect(() => {
    if (!isFront || hasDragged) return;

    const run = () => {
      nudgeControls.start({
        rotate: [photo.rotate, photo.rotate - 3, photo.rotate + 2, photo.rotate],
        x:      [0, -5, 4, 0],
        transition: { duration: 0.45, ease: "easeInOut" },
      });
    };

    const id = setInterval(run, 5500);
    return () => clearInterval(id);
  }, [isFront, hasDragged, nudgeControls, photo.rotate]);

  const isColored = isHovered || isDragging;

  return (
    <motion.div
      className={photo.layerClass}
      animate={isFront ? nudgeControls : undefined}
      drag
      dragElastic={0.12}
      dragConstraints={{
        left: minX,
        right: maxX,
        top: minY,
        bottom: maxY,
      }}
      whileDrag={{ scale: 1.04, cursor: "grabbing" }}
      onPointerDown={onPointerDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragStart={() => {
        setIsDragging(true);
        onDragStart();
        if (isFront) nudgeControls.stop();
      }}
      onDragEnd={() => setIsDragging(false)}
      style={{
        position: "absolute",
        width: photo.width,
        height: photo.height,
        rotate: photo.rotate,
        zIndex,
        left,
        top,
        boxShadow: LAYER_SHADOWS[index],
        opacity: 0,       // GSAP animates to 1 on scroll-enter
        borderRadius: 6,
        overflow: "hidden",
        cursor: "grab",
        touchAction: "none",
      }}
    >
      {/* Photo — grayscale at rest, full colour when hovered or dragged */}
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover"
        style={{
          filter: isColored ? "none" : "grayscale(100%)",
          transition: "filter 0.2s ease",
          display: "block",
        }}
        draggable={false}
      />

      {/* Subtle accent-colour tint on hover — front card only */}
      {isFront && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{ backgroundColor: accentColor }}
        />
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PhotoStack — manages drag-to-front z-order + nudge state
// ─────────────────────────────────────────────────────────────

interface PhotoStackProps {
  accentColor: string;
}

function PhotoStack({ accentColor }: PhotoStackProps) {
  const [zOrder, setZOrder] = useState<number[]>([0, 1, 2]);
  const [hasDragged, setHasDragged] = useState(false);

  const bringToFront = (index: number) => {
    setZOrder((prev) => {
      const next = prev.filter((i) => i !== index);
      next.push(index);
      return next;
    });
  };

  return (
    <div
      className="photo-stack-scaler"
      style={{ position: "relative", width: 680, height: 580 }}
    >
      {CANDID_PHOTOS.map((photo, i) => (
        <PhotoLayer
          key={photo.src}
          photo={photo}
          index={i}
          zIndex={zOrder.indexOf(i) + 1}
          onPointerDown={() => bringToFront(i)}
          onDragStart={() => setHasDragged(true)}
          hasDragged={hasDragged}
          accentColor={accentColor}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// OutroSection — two-col closing section
// ─────────────────────────────────────────────────────────────

interface OutroSectionProps {
  accentColor: string;
  bgTone: string;
}

function OutroSection({ accentColor, bgTone }: OutroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="outro-section w-full h-screen portrait:h-auto portrait:min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ zIndex: 100, backgroundColor: bgTone }}
    >
      {/*
        Constrained inner container — max-width keeps both columns close together
        regardless of viewport width. gap-12 (~3rem) is the space between columns.
        portrait: stacks vertically.
      */}
      <div
        className="w-full flex flex-row portrait:flex-col items-center portrait:items-start gap-12 portrait:gap-0 portrait:py-20"
        style={{ maxWidth: "1100px", padding: "0 clamp(1.5rem, 5vw, 4rem)" }}
      >
        {/* ── Left Column — Headline + CTA ── */}
        <div className="flex-shrink-0 flex flex-col justify-center portrait:w-full portrait:mb-12" style={{ width: "340px" }}>
          {/* Headline + CTA */}
          <div className="outro-text opacity-0">
            <h2
              className="font-serif italic font-semibold leading-[1.15] text-[#1a1a1a] mb-8"
              style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", maxWidth: "270px" }}
            >
              There&apos;s more behind this.
            </h2>

            <Link href="/about" className="no-underline inline-block">
              <motion.div
                className="inline-flex items-center justify-center bg-[#1A1A1A] text-white font-sans font-bold tracking-widest uppercase text-[11px] rounded-full py-4 px-8 cursor-pointer shadow-md select-none"
                whileHover={{ x: 3, backgroundColor: accentColor }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Get to know me
              </motion.div>
            </Link>
          </div>
        </div>

        {/* ── Right Column — Draggable Photo Stack ── */}
        <div className="flex-1 portrait:w-full flex items-center justify-center portrait:justify-start">
          <PhotoStack accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    // Refresh ScrollTrigger after a short delay on initial mount to allow layout settling
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const handleOrientationChange = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // This effect runs once on every fresh mount of the home page — including
      // client-side navigation back from another route (e.g. About → Home via
      // the header). On that kind of transition, window.scrollY can still hold
      // the previous page's scroll offset for a frame before Next.js's own
      // scroll-reset runs, which lands *after* this layout effect. If the hero
      // rect below gets measured while that stale offset is in effect,
      // getBoundingClientRect() reports the wrong (often off-screen) position
      // and the flying RYAMA element is pinned there until a later refresh
      // corrects it — the "moves around / disappears" glitch. Forcing scroll to
      // top here, before any measurement happens, removes that race entirely.
      //
      // activeProjectIndex is reset the same way and for the same reason: the
      // hero-leave-trigger ScrollTrigger below fires onLeave/setActiveProjectIndex(0)
      // immediately at creation if it reads the scroll position as already past
      // the hero (which can happen mid-transition, before the scroll-reset above
      // has taken effect). That stale call sets React state that nothing later
      // undoes — GSAP cleanup only tears down GSAP objects, not state already
      // set — so the fixed-position project panel stays stuck rendered on top
      // of the hero even once scroll is correctly back at 0.
      window.scrollTo(0, 0);
      setActiveProjectIndex(null);

      // --- HERO FADE OUT (Global, both orientations) ---
      // Scrub the hero section's opacity from 1→0 as it scrolls away.
      // This ensures there is no visual overlap between hero content and the
      // project strip: by the time the strip becomes visible (hero fully gone),
      // the hero is already transparent.
      gsap.to(".hero-section-wrapper", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // --- FLYING RYAMA — shared element transition hero → header ---
      // The flying-ryama element is a fixed div that starts exactly on top of
      // the hero placeholder (large, centred), then scrolls its position and
      // font-size toward the header RYAMA link as the hero exits.
      //
      // Both positions are measured via getBoundingClientRect(), but as
      // *functions* rather than one-off values captured at setup time — with
      // invalidateOnRefresh, GSAP re-invokes them on every ScrollTrigger.refresh()
      // (which fires automatically on window resize, including browser zoom).
      // Without this, the clamp()-based hero font-size / header position drift
      // out of sync with the tween's cached numbers whenever the viewport changes,
      // making the text jump around or land off-target (appearing to vanish).
      let flyingRyamaCleanup: (() => void) | undefined;
      (() => {
        const flyingEl   = document.getElementById("flying-ryama");
        const heroAnchor = document.getElementById("hero-ryama-placeholder");
        const headerAnchor = document.getElementById("header-ryama-target");
        if (!flyingEl || !heroAnchor || !headerAnchor) return;

        gsap.set(flyingEl, { opacity: 1, visibility: "visible" });

        // Scrub: hero position (large) → header position (small)
        const flyTween = gsap.fromTo(
          flyingEl,
          {
            top:      () => heroAnchor.getBoundingClientRect().top,
            left:     () => heroAnchor.getBoundingClientRect().left,
            width:    () => heroAnchor.getBoundingClientRect().width,
            height:   () => heroAnchor.getBoundingClientRect().height,
            fontSize: () => parseFloat(getComputedStyle(heroAnchor).fontSize),
          },
          {
            top:      () => headerAnchor.getBoundingClientRect().top,
            left:     () => headerAnchor.getBoundingClientRect().left,
            width:    () => headerAnchor.getBoundingClientRect().width,
            height:   () => headerAnchor.getBoundingClientRect().height,
            fontSize: () => parseFloat(getComputedStyle(headerAnchor).fontSize),
            ease:     "none",
            scrollTrigger: {
              trigger: ".hero-section-wrapper",
              start:   "top top",
              end:     "bottom top",
              scrub:   0.25,
              invalidateOnRefresh: true,
            },
          }
        );

        // Handoff: when hero is 100% gone, fade out flying element and let
        // the real header RYAMA (opacity transition in Header.tsx) take over.
        ScrollTrigger.create({
          trigger: ".hero-section-wrapper",
          start:   "bottom top",
          id:      "flying-ryama-handoff",
          onLeave:      () => gsap.set(flyingEl, { opacity: 0 }),
          onEnterBack:  () => gsap.set(flyingEl, { opacity: 1 }),
        });

        // --- HARD PIN while still hero content ---
        // The scrub tween above is intentionally eased (scrub: 0.25) so the
        // hero → header journey feels smooth once the user actually starts
        // scrolling. But that same easing means a viewport-size change (e.g.
        // browser zoom) while still resting at progress 0 makes the element
        // visibly glide to its corrected spot instead of just being there —
        // RYAMA must never move while it's still hero content, full stop.
        // So: whenever the trigger is at rest (progress === 0, i.e. nothing
        // has scrolled yet), a resize snaps the element straight onto the
        // live hero rect with gsap.set — no tween, no lag, no drift. Once the
        // user has actually scrolled past the hero, RYAMA is no longer "hero
        // content" and the eased scrub above is allowed to own its position.
        const snapToHeroIfAtRest = () => {
          const st = flyTween.scrollTrigger;
          if (!st || st.progress !== 0) return;
          gsap.set(flyingEl, {
            top:      heroAnchor.getBoundingClientRect().top,
            left:     heroAnchor.getBoundingClientRect().left,
            width:    heroAnchor.getBoundingClientRect().width,
            height:   heroAnchor.getBoundingClientRect().height,
            fontSize: parseFloat(getComputedStyle(heroAnchor).fontSize),
          });
        };
        window.addEventListener("resize", snapToHeroIfAtRest);
        flyingRyamaCleanup = () => window.removeEventListener("resize", snapToHeroIfAtRest);
      })();

      // --- OUTRO COVER (Global) ---
      // When the outro section starts entering the viewport (its top reaches the
      // bottom edge), immediately hide the project strip + text panel by resetting
      // activeProjectIndex to null. The outro section has z-100 with a solid
      // background, so it visually covers any remaining project elements as it
      // slides up from below — giving a clean "projects exit, outro enters" feel.
      ScrollTrigger.create({
        trigger: ".outro-section",
        start: "top 100%",  // fires the moment outro top hits viewport bottom
        id: "outro-cover-trigger",
        onEnter: () => setActiveProjectIndex(null),
        onLeaveBack: () => setActiveProjectIndex(projects.length - 1),
      });

      // --- OUTRO ENTRANCE ANIMATION (Global) ---
      // Triggered by GSAP ScrollTrigger when the section first enters viewport.
      // Parallax mouse-move uses Framer Motion (handled in OutroSection/PhotoStack).
      ScrollTrigger.create({
        trigger: ".outro-section",
        start: "top 80%",
        id: "outro-entrance-trigger",
        onEnter: () => {
          // Headline + CTA

          gsap.fromTo(
            ".outro-text",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.15 }
          );
          // Photo stack — back layer appears first
          gsap.fromTo(
            ".outro-photo-back",
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out", delay: 0.1 }
          );
          // Mid layer
          gsap.fromTo(
            ".outro-photo-mid",
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out", delay: 0.2 }
          );
          // Front layer
          gsap.fromTo(
            ".outro-photo-front",
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.4)", delay: 0.3 }
          );
        },
        once: true,
      });

      const mm = gsap.matchMedia();

      mm.add("(orientation: landscape)", () => {
        // --- LANDSCAPE ANIMATION & SCROLLTRIGGERS ---
        const sections = gsap.utils.toArray<HTMLElement>(".project-section-wrapper");

        // Fire activeProjectIndex(0) only when hero is COMPLETELY off-screen
        // (its bottom has passed the viewport top). Combined with the hero fade-out
        // scrub above, this gives a true sequential transition:
        //   hero fades out → screen clean → project strip appears
        // No overlap between hero content and the 3D strip.
        ScrollTrigger.create({
          trigger: ".hero-section-wrapper",
          start: "bottom top",  // hero 100% scrolled away
          id: "hero-leave-trigger",
          onLeave: () => setActiveProjectIndex(0),
          onEnterBack: () => setActiveProjectIndex(null),
        });

        sections.forEach((section, i) => {
          const isLast = i === sections.length - 1;

          ScrollTrigger.create({
            trigger: section,
            // project-0's own trigger can now just keep the strip active;
            // no special-cased "top top" — hero-leave-trigger already handled first activation.
            start: "top 50%",
            end: "bottom 50%",
            id: `project-trigger-${i}`,
            onEnter: () => setActiveProjectIndex(i),
            onEnterBack: () => setActiveProjectIndex(i),
            onLeave: () => {
              if (isLast) setActiveProjectIndex(null);
            },
            onLeaveBack: () => {
              if (i === 0) setActiveProjectIndex(null);
            },
          });
        });

        // Track scroll direction globally in landscape
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          id: "global-scroll-dir-landscape",
          onUpdate: (self) => {
            const dir = self.direction === 1 ? "down" : "up";
            setScrollDirection(dir);
          },
        });

        return () => {};
      });


      mm.add("(orientation: portrait)", () => {
        // --- PORTRAIT ANIMATION & SCROLLTRIGGERS ---
        const sections = gsap.utils.toArray<HTMLElement>(".project-section-wrapper");

        sections.forEach((section, i) => {
          const isLast = i === sections.length - 1;
          const textBlock = section.querySelector(".portrait-text-block");
          const mockupEl = section.querySelector(".portrait-mockup-el");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
              id: `project-trigger-portrait-${i}`,
              onEnter: () => setActiveProjectIndex(i),
              onEnterBack: () => setActiveProjectIndex(i),
              onLeave: () => {
                if (isLast) setActiveProjectIndex(null);
              },
              onLeaveBack: () => {
                if (i === 0) setActiveProjectIndex(null);
              },
            },
          });

          // Incoming (animates in when this section is pinned)
          if (i > 0) {
            tl.fromTo(
              textBlock,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out", duration: 0.4 },
              0
            ).fromTo(
              mockupEl,
              { scale: 0.88, opacity: 0 },
              { scale: 0.95, opacity: 1, ease: "power2.out", duration: 0.4 },
              0
            );
          }

          // Outgoing (this section scrolls out)
          tl.to(
            textBlock,
            { y: -40, opacity: 0, ease: "power2.in", duration: 0.4 },
            0.6
          ).to(
            mockupEl,
            { scale: 0.88, opacity: 0, ease: "power2.in", duration: 0.4 },
            0.6
          );
        });

        // Track scroll direction globally in portrait
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          id: "global-scroll-dir-portrait",
          onUpdate: (self) => {
            const dir = self.direction === 1 ? "down" : "up";
            setScrollDirection(dir);
          },
        });

        return () => {};
      });

      return () => {
        mm.revert();
        flyingRyamaCleanup?.();
      };
    },
    { scope: containerRef }
  );

  const activeBgTone =
    activeProjectIndex !== null
      ? PROJECT_BG_TONES[activeProjectIndex % PROJECT_BG_TONES.length]
      : "#FAFAF7";

  const activeAccentColor =
    activeProjectIndex !== null
      ? projects[activeProjectIndex % projects.length].accentColor
      : "#1a1a1a";

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: activeBgTone,
        "--project-accent-color": activeAccentColor,
        "--color-accent": activeAccentColor,
      } as React.CSSProperties}
    >
      {/*
        ── Flying RYAMA ──
        A fixed element that starts centred on the hero (same position as the
        invisible placeholder inside HeroSection) and GSAP-scrubs its way to the
        header logo position as the hero scrolls out.
        Starts as visibility:hidden / opacity:0; GSAP sets both after it measures
        and positions the element, preventing any SSR flash.
      */}
      <div
        id="flying-ryama"
        aria-hidden="true"
        className="font-black uppercase font-sans text-[#1a1a1a] select-none pointer-events-none"
        style={{
          position: "fixed",
          zIndex: 55,         // above header (z-50), below cursor
          top: 0,
          left: 0,
          lineHeight: 0.88,
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Hidden until GSAP measures and positions it (prevents SSR flash)
          opacity: 0,
          visibility: "hidden",
        }}
      >
        RYAMA
      </div>

      {/* ── 0. Hero Section ── */}
      <div className="hero-section-wrapper w-full">
        <HeroSection />
      </div>

      {/* ── Fixed landscape layout container ── */}
      <div
        className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1550px] pointer-events-none z-30 flex items-center sm:justify-between h-screen portrait:hidden"
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
        }}
      >
        {/* Left Side: Fixed text panel */}
        <div className="w-full sm:w-[28%] sm:max-w-[340px] pointer-events-auto flex flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {activeProjectIndex !== null && (
              <motion.div
                key={activeProjectIndex}
                initial={{ opacity: 0, y: scrollDirection === "down" ? 28 : -28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: scrollDirection === "down" ? -28 : 28 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <ProjectSection
                  project={projects[activeProjectIndex]}
                  index={activeProjectIndex}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Mockup Image/Video Strip */}
        <div className="hidden sm:block sm:w-[70%] h-screen relative pointer-events-none">
          <ProjectImageStrip activeIndex={activeProjectIndex} bgTone={activeBgTone} />
        </div>
      </div>

      {/* ── Dot nav (right edge) ── */}
      {activeProjectIndex !== null && (
        <DotIndicator
          activeIndex={activeProjectIndex}
          activeAccentColor={activeAccentColor}
          onNavigate={(idx) => {
            const target = document.getElementById(`project-${idx}`);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}

      {/* ── 1. Projects scroll trigger areas ── */}
      <div className="projects-scroll-container w-full relative">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            id={`project-${i}`}
            className="project-section-wrapper w-full h-screen portrait:h-[100svh] relative bg-transparent"
            style={{ zIndex: 10 + i }}
          >
            {/* Portrait content */}
            <div className="hidden portrait:flex flex-col h-[100svh] w-full portrait-content-inner">
              {/* Top half — text */}
              <div className="h-[50svh] w-full flex items-center justify-center px-6 portrait-text-block">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2
                    className="font-bold leading-[1.1] tracking-tight transition-colors duration-500"
                    style={{
                      fontFamily: "var(--font-playfair-display), serif",
                      fontSize: "clamp(2rem, 7.5vw, 3.2rem)",
                      color: project.accentColor,
                      marginBottom: "clamp(1.25rem, 3.5vw, 2.25rem)",
                    }}
                  >
                    {project.name}
                  </h2>
                  <p
                    className="text-stone-600 leading-relaxed font-normal"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: "clamp(0.875rem, 3.5vw, 1rem)",
                      maxWidth: "280px",
                      marginBottom: "clamp(1.5rem, 4vw, 2.5rem)",
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="flex mt-0">
                    <ScrollCTA
                      label="Open Case Study"
                      href={project.caseStudyUrl}
                      cursorLabel="VIEW"
                      accentColor={project.accentColor}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom half — mockup */}
              <div className="h-[50svh] w-full flex items-center justify-center portrait-mockup-container">
                <div
                  className="portrait-mockup-el rounded-xl overflow-hidden transition-colors duration-500 self-center"
                  style={{
                    width: "min(90vw, 400px)",
                    aspectRatio: "16 / 9",
                    backgroundColor: project.previewBgColor,
                    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
                    margin: "0 auto",
                    transform: "scale(0.95)",
                  }}
                >
                  {project.previewVideo ? (
                    <VideoPlayer
                      src={project.previewVideo}
                      isActive={activeProjectIndex === i}
                      poster={project.previewImage}
                    />
                  ) : (
                    <img
                      src={project.previewImage}
                      alt={project.name}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. Closing outro section ── */}
      <OutroSection
        accentColor={activeAccentColor}
        bgTone={PROJECT_BG_TONES[PROJECT_BG_TONES.length - 1]}
      />
    </div>
  );
}
