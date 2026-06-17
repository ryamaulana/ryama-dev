"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

interface CurvedMeshCanvasProps {
  imageSrc: string;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Inner Mesh Component (compiled only when inside a R3F Canvas)
// ─────────────────────────────────────────────────────────────────────────────
function InnerCurvedMesh({ imageSrc }: { imageSrc: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();
  const [isHovered, setIsHovered] = useState(false);

  // Load the texture using drei
  const texture = useTexture(imageSrc);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  // Track target curve and cursor-parallax coordinates
  const curveValRef = useRef(0.12);
  const targetCurveRef = useRef(0.12);

  const uniforms = useRef({
    uTexture: { value: texture },
    uCurve: { value: 0.12 },
  });

  // Keep uniforms texture in sync with the loaded texture
  if (uniforms.current.uTexture.value !== texture) {
    uniforms.current.uTexture.value = texture;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Update curve target on hover
    targetCurveRef.current = isHovered ? 0.22 : 0.12;
    curveValRef.current = THREE.MathUtils.lerp(
      curveValRef.current,
      targetCurveRef.current,
      0.08
    );

    if (materialRef.current) {
      materialRef.current.uniforms.uCurve.value = curveValRef.current;
    }

    if (meshRef.current) {
      // Gentle idle float rotation
      const idleY = Math.sin(time * 0.2) * 0.04;
      const idleX = Math.cos(time * 0.25) * 0.03;

      // Pointer parallax target (max ~6-8 degrees -> ~0.1-0.14 radians)
      const targetRotY = pointer.x * 0.12 + idleY;
      const targetRotX = -pointer.y * 0.08 + idleX;

      // Smooth damped lerping
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.06);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.06);
    }
  });

  const vertexShader = /* glsl */ `
    uniform float uCurve;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      // Symmetric bend along the horizontal axis (uv.x: 0 -> 1)
      pos.z += sin(uv.x * 3.14159265) * uCurve;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      // Crop tighter to focus on key charts/content and reduce visual noise (zoom in by ~24%)
      vec2 croppedUv = vUv * 0.76 + vec2(0.12, 0.12);
      vec4 texColor = texture2D(uTexture, croppedUv);
      
      // Subtle edge fade vignette to blend naturally
      float edgeX = smoothstep(0.0, 0.04, vUv.x) * smoothstep(1.0, 0.96, vUv.x);
      float edgeY = smoothstep(0.0, 0.04, vUv.y) * smoothstep(1.0, 0.96, vUv.y);
      float alpha = edgeX * edgeY;
      
      gl_FragColor = vec4(texColor.rgb, texColor.a * alpha * 0.98);
    }
  `;

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <planeGeometry args={[5.2, 7.2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Container (Includes WebGL availability detection & Fallback)
// ─────────────────────────────────────────────────────────────────────────────
export default function CurvedMeshCanvas({ imageSrc, className = "" }: CurvedMeshCanvasProps) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const isAvailable = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setHasWebGL(isAvailable);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  // WebGL Fallback layout with structured CSS 3D perspective and skew skewing
  if (!hasWebGL) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div 
          className="relative w-[340px] h-[470px] rounded-3xl overflow-hidden shadow-xl"
          style={{
            transform: "perspective(1000px) rotateY(-12deg) rotateX(4deg) skewY(1deg)",
            transition: "transform 0.5s ease",
          }}
        >
          <Image
            src={imageSrc}
            alt="Project Preview Fallback"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 9.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <Suspense fallback={null}>
          <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
            <InnerCurvedMesh imageSrc={imageSrc} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
