"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "@/lib/projects";

interface ProjectImageStripProps {
  activeIndex: number | null;
  /** Background tone of the active section (for gradient masks blending) */
  bgTone?: string;
}

const GAP_PX = 24;

export interface VideoPlayerProps {
  src: string;
  isActive: boolean;
  poster?: string;
}

export function VideoPlayer({ src, isActive, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Video playback was interrupted or blocked:", err);
      });
    } else {
      video.pause();
    }
  }, [isActive, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={isActive}
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-contain rounded-xl"
      onEnded={(e) => {
        // Enforce infinite looping manually if the browser native loop fails
        e.currentTarget.currentTime = 0;
        e.currentTarget.play().catch(() => {});
      }}
    />
  );
}

export function ProjectImageStrip({ activeIndex, bgTone = "#FAFAF7" }: ProjectImageStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Show/hide the container via `visibility` — NOT opacity.
  //
  // Why: `containerRef` is an ancestor of `.card-3d-wrapper` which has
  // `transformStyle: preserve-3d`. Browsers only promote a 3D-transformed
  // subtree to a GPU compositing layer when that subtree is visible/painted.
  // If the ancestor has `opacity: 0`, the browser skips GPU promotion entirely
  // and falls back to 2D rasterisation. The moment opacity becomes non-zero,
  // the compositor kicks in — but that first painted frame is flat (no 3D
  // transform applied yet), causing the visible "lurus → snap skew" flash.
  //
  // Using `visibility: hidden / visible` instead avoids this: the element is
  // still painted (GPU layer promoted) but just not displayed — so when it
  // switches to visible the 3D perspective is already fully applied.
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.visibility =
      activeIndex === null ? "hidden" : "visible";
  }, [activeIndex]);

  // Set initial position and animate on index changes using dynamic DOM calculations
  useEffect(() => {
    if (!stripRef.current || activeIndex === null) return;

    let rafId: number;

    const measureAndSet = () => {
      if (!stripRef.current || activeIndex === null) return;
      const activeItem = stripRef.current.children[activeIndex] as HTMLElement;
      if (!activeItem) return;

      const offsetHeight = activeItem.offsetHeight;
      if (offsetHeight === 0) {
        // Retry next frame if layout hasn't settled (height is 0)
        rafId = requestAnimationFrame(measureAndSet);
        return;
      }

      const itemCenterInStrip = activeItem.offsetTop + offsetHeight / 2;
      const targetY = window.innerHeight / 2 - itemCenterInStrip;

      if (isFirstRender.current) {
        gsap.set(stripRef.current, { top: targetY });
        isFirstRender.current = false;
      } else {
        gsap.to(stripRef.current, { top: targetY, duration: 0.85, ease: "power3.out" });
      }
    };

    measureAndSet();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [activeIndex]);

  // Animate card scale/opacity using GSAP to avoid browser CSS transform transition flattening bugs
  useEffect(() => {
    if (!stripRef.current) return;
    const cards = Array.from(stripRef.current.children) as HTMLElement[];
    cards.forEach((card, i) => {
      const isActive = activeIndex !== null && i === activeIndex;
      const isAdjacent = activeIndex !== null && Math.abs(i - activeIndex) === 1;

      gsap.to(card, {
        scale: isActive ? 1.0 : 0.85,
        opacity: isActive ? 1 : isAdjacent ? 0.45 : 0,
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, [activeIndex]);

  // Recalculate positions on window resize
  useEffect(() => {
    const onResize = () => {
      if (!stripRef.current || activeIndex === null) return;
      const items = stripRef.current.children;
      const activeItem = items[activeIndex] as HTMLElement;
      if (!activeItem) return;
      const itemCenterInStrip = activeItem.offsetTop + activeItem.offsetHeight / 2;
      const targetY = window.innerHeight / 2 - itemCenterInStrip;
      gsap.set(stripRef.current, { top: targetY });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  return (
    // Outer Static Panel — fills the parent absolute panel and keeps perspective stable
    <div
      className="absolute inset-0 h-screen pointer-events-none"
      style={{
        zIndex: 20,
        overflow: "hidden",
        perspective: "1600px",
        transformStyle: "preserve-3d",
      }}
      aria-hidden="true"
    >
      {/* Top fade overlay */}
      <div
        className="transition-all duration-500"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "22vh",
          backgroundColor: bgTone,
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          zIndex: 30,
          pointerEvents: "none",
          opacity: activeIndex === null ? 0 : 1,
        }}
      />

      {/* Bottom fade overlay */}
      <div
        className="transition-all duration-500"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "22vh",
          backgroundColor: bgTone,
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          zIndex: 30,
          pointerEvents: "none",
          opacity: activeIndex === null ? 0 : 1,
        }}
      />

      {/*
        Stationary & Fade Wrapper.
        Keeping this element at its final 0% position from the start ensures the
        nested card-3d-wrapper is always rendered in its exact 3D skewed state.
        Entering active index states will trigger a pure opacity fade-in.
      */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          transformStyle: "preserve-3d",
          // opacity stays 1 at all times — show/hide is handled via visibility
          // (see useEffect above). This keeps the GPU compositing layer alive
          // so the 3D transform is applied before the element becomes visible.
          opacity: 1,
          visibility: "hidden", // default hidden; toggled to visible by useEffect
        }}
      >
        {/* 3D Rotated Wrapper — rotates the entire strip as a single 3D plane */}
        <div
          className="card-3d-wrapper"
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            // translateZ(0) is prepended to force immediate GPU compositing layer
            // promotion at first paint — before any parent visibility/opacity change.
            // Without it, the browser may defer layer creation and render one flat
            // frame before the 3D perspective snaps in.
            transform: "translateZ(0) rotateX(12deg) rotateY(-26deg) rotateZ(5deg) skewX(-4deg)",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >

        {/* THE STRIP — all project images stacked vertically inside the rotated space */}
        <div
          ref={stripRef}
          className="flex flex-col"
          style={{ position: "relative", width: "100%", gap: GAP_PX, paddingLeft: "6%", paddingRight: "6%", transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => {
            const isActive = activeIndex !== null && i === activeIndex;
            const isAdjacent = activeIndex !== null && Math.abs(i - activeIndex) === 1;

            return (
              <div
                key={project.slug}
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  position: "relative",
                  flexShrink: 0,
                  transformStyle: "preserve-3d",
                  // Set safe static defaults for SSR / initial render; GSAP animates them
                  opacity: activeIndex === null ? 0 : isActive ? 1 : isAdjacent ? 0.45 : 0,
                  transform: activeIndex === null ? "scale(0.85)" : isActive ? "scale(1.0)" : "scale(0.85)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Flat Screenshot Video Container */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backgroundColor: project.previewBgColor,
                      borderRadius: "12px",
                      outline: "1px solid transparent",
                      boxShadow: "0 20px 48px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.05)",
                      filter: isActive
                        ? "none"
                        : isAdjacent
                        ? "grayscale(100%) brightness(0.85)"
                        : "grayscale(100%) brightness(0.6)",
                      transition: mounted
                        ? "filter 0.65s cubic-bezier(0.25, 1, 0.5, 1)"
                        : "none",
                    }}
                  >
                    {project.previewVideo ? (
                      <VideoPlayer
                        src={project.previewVideo}
                        isActive={isActive}
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
            );
          })}
        </div>
      </div>
    </div>
  </div>
  );
}
