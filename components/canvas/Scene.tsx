"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import { Suspense } from "react";
import { CurvedMesh } from "./CurvedMesh";

interface SceneProps {
  /**
   * Full image array: index 0 = hero portrait, indices 1–N = project previews.
   * The activeIndex selects which texture to display (with shader crossfade).
   */
  previewImages: string[];
  activeIndex: number;
  /**
   * When true (Hero / About-end), we're showing the portrait with gentle idle
   * float. When false, we're in project mode showing a project preview.
   */
  showAbstract?: boolean;
}

function FallbackMesh() {
  return (
    <mesh>
      <planeGeometry args={[5, 7, 32, 32]} />
      <meshBasicMaterial color="#e5e4e0" transparent opacity={0.25} />
    </mesh>
  );
}

export function Scene({ previewImages, activeIndex, showAbstract = true }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, -3, 2]} intensity={0.4} color="#fff0ed" />

      <Suspense fallback={<FallbackMesh />}>
        <Float
          speed={showAbstract ? 1.2 : 0.6}
          rotationIntensity={showAbstract ? 0.3 : 0.15}
          floatIntensity={showAbstract ? 0.8 : 0.4}
          floatingRange={showAbstract ? [-0.15, 0.15] : [-0.08, 0.08]}
        >
          <CurvedMesh
            previewImages={previewImages}
            activeIndex={activeIndex}
          />
        </Float>
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
