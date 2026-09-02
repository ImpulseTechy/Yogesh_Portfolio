import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SmokeProps {
  position?: [number, number, number];
  isActive?: boolean;
}

export default function Smoke({ position = [0, -0.15, 0.2], isActive = true }: SmokeProps) {
  const count = 15;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  // Precompute random attributes for the particle pool
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: 0,
      y: Math.random() * 0.4, // start distributed
      z: 0,
      vx: (Math.random() - 0.5) * 0.05,
      vy: 0.16 + Math.random() * 0.1,
      vz: (Math.random() - 0.5) * 0.05,
      life: Math.random(), // 0 to 1
      baseScale: 0.012 + Math.random() * 0.012,
    }));
  }, [count]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    
    particles.forEach((p, idx) => {
      const mesh = meshRefs.current[idx];
      if (!mesh) return;

      p.life += dt * 0.8; // particle lifespan speed
      if (p.life >= 1.0) {
        p.life = 0;
        p.x = 0;
        p.y = 0;
        p.z = 0;
        p.vx = (Math.random() - 0.5) * 0.06;
        p.vy = 0.18 + Math.random() * 0.08;
        p.vz = (Math.random() - 0.5) * 0.06;
      }

      // Move particle
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.z += p.vz * dt;

      // Add a gentle horizontal wind/drift
      const wind = Math.sin(state.clock.elapsedTime * 2.5 + idx) * 0.03 * p.life;
      mesh.position.set(p.x + wind, p.y, p.z);

      // Expand particle size as it climbs
      const currentScale = p.baseScale * (1.0 + p.life * 3.5);
      mesh.scale.set(currentScale, currentScale, currentScale);

      // Fade out based on life cycle, completely invisible if isActive is false
      let targetOpacity = 0;
      if (isActive) {
        // Fade in quickly, then fade out slowly
        targetOpacity = Math.sin(p.life * Math.PI) * 0.28;
      }
      
      if (mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = targetOpacity;
      }
    });
  });

  return (
    <group position={position}>
      {particles.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          castShadow={false}
          receiveShadow={false}
        >
          <sphereGeometry args={[0.5, 6, 6]} />
          <meshBasicMaterial
            color="#cbd5e1"
            transparent
            depthWrite={false}
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}
