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
    setMounted(true);
  }, []);

  // Slide the entire panel in/out of the viewport when projects enter/exit
  useEffect(() => {
    if (!containerRef.current) return;

    if (activeIndex === null) {
      gsap.to(containerRef.current, {
        left: "115%",
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(containerRef.current, {
        left: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      });
    }
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
      {/* Top fade overlay: blends scrolling list seamlessly using a transitioning sibling overlay with a mask */}
      <div
        className="transition-colors duration-500"
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
        }}
      />

      {/* Bottom fade overlay */}
      <div
        className="transition-colors duration-500"
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
        }}
      />

      {/* Slide & Fade Wrapper Container — animated via GSAP left to slide in/out */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "100%",
          transformStyle: "preserve-3d",
          left: "115%", // Starts hidden off-screen, animated via GSAP left
          opacity: 0,
        }}
      >
        {/* 3D Rotated Wrapper Container — rotates the entire vertical slide strip as a single plane */}
        <div
          className="card-3d-wrapper"
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
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
                  opacity: isActive ? 1 : isAdjacent ? 0.45 : 0,
                  // Scale is handled directly on the card container
                  transform: isActive ? "scale(1.0)" : "scale(0.85)",
                  transition: mounted
                    ? "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
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
