"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface CurvedMeshProps {
  previewImages: string[];
  activeIndex: number;
}

export function CurvedMesh({ previewImages, activeIndex }: CurvedMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  // Load all textures
  const textures = useTexture(previewImages);

  // Ensure textures are correct encoding
  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
    });
  }, [textures]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTextureA: { value: textures[0] ?? null },
      uTextureB: { value: textures[1] ?? null },
      uMix: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uDistortion: { value: 0.4 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textures]
  );

  // Track crossfade target and current value
  const mixTarget = useRef(0);
  const prevIndex = useRef(activeIndex);

  useEffect(() => {
    if (!materialRef.current) return;
    const tex = textures[activeIndex] ?? textures[0];
    if (prevIndex.current !== activeIndex) {
      // Assign current texture to A, new to B, then fade A→B
      materialRef.current.uniforms.uTextureA.value =
        textures[prevIndex.current] ?? textures[0];
      materialRef.current.uniforms.uTextureB.value = tex;
      materialRef.current.uniforms.uMix.value = 0;
      mixTarget.current = 1;
      prevIndex.current = activeIndex;
    }
  }, [activeIndex, textures]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;

      // Smooth mouse-parallax
      const targetX = pointer.x * 0.4;
      const targetY = pointer.y * 0.25;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(targetX, targetY),
        0.05
      );

      // Crossfade
      const current = materialRef.current.uniforms.uMix.value;
      const target = mixTarget.current;
      if (Math.abs(current - target) > 0.001) {
        materialRef.current.uniforms.uMix.value = THREE.MathUtils.lerp(
          current,
          target,
          0.04
        );
        // Once crossfade complete, swap textures for next transition
        if (Math.abs(materialRef.current.uniforms.uMix.value - target) < 0.01) {
          materialRef.current.uniforms.uTextureA.value =
            materialRef.current.uniforms.uTextureB.value;
          materialRef.current.uniforms.uMix.value = 0;
          mixTarget.current = 0;
        }
      }
    }

    if (meshRef.current) {
      // Idle float
      meshRef.current.rotation.y = Math.sin(time * 0.18) * 0.06;
      meshRef.current.rotation.x = Math.cos(time * 0.22) * 0.04;

      // Mouse parallax tilt on top of idle
      if (materialRef.current) {
        const mx = materialRef.current.uniforms.uMouse.value.x;
        const my = materialRef.current.uniforms.uMouse.value.y;
        meshRef.current.rotation.y += mx * 0.15;
        meshRef.current.rotation.x -= my * 0.1;
      }
    }
  });

  // Vertex shader: convex curve along X + subtle wave
  const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uDistortion;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Convex curve along X (bend the plane into a shallow cylinder)
      float radius = 6.0;
      float angle = pos.x / radius;
      pos.z -= radius * (1.0 - cos(angle)) * 0.4;
      pos.x = radius * sin(angle) * (6.0 / radius);

      // Gentle wave
      pos.z += sin(pos.y * 3.5 + uTime * 0.6) * 0.05 * uDistortion;

      // Mouse parallax: tilt mesh surface slightly
      pos.z += uMouse.x * pos.x * 0.04;
      pos.z += uMouse.y * pos.y * 0.04;

      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader: texture crossfade + rim light
  const fragmentShader = /* glsl */ `
    uniform sampler2D uTextureA;
    uniform sampler2D uTextureB;
    uniform float uMix;
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec4 colA = texture2D(uTextureA, vUv);
      vec4 colB = texture2D(uTextureB, vUv);
      vec4 col = mix(colA, colB, uMix);

      // Subtle rim / edge vignette for depth
      float edgeX = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
      float edgeY = smoothstep(0.0, 0.04, vUv.y) * smoothstep(1.0, 0.96, vUv.y);
      float alpha = edgeX * edgeY;

      // Very subtle warm overlay on edges
      vec3 rimColor = vec3(1.0, 0.98, 0.96);
      col.rgb = mix(col.rgb * 0.85, col.rgb, edgeX * edgeY);

      gl_FragColor = vec4(col.rgb, col.a * alpha * 0.96);
    }
  `;

  return (
    <mesh ref={meshRef}>
      {/* High poly count for smooth curve */}
      <planeGeometry args={[5.2, 7.2, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
