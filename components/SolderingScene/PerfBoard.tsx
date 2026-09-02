import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PerfBoardProps {
  isSoldering?: boolean;
  activeJointIndex?: number;
  jointTargets?: THREE.Vector3[];
}

export default function PerfBoard({
  isSoldering = false,
  activeJointIndex = 0,
  jointTargets = [
    new THREE.Vector3(-0.15, -0.11, 0.35),
    new THREE.Vector3(0.1, -0.11, 0.1),
    new THREE.Vector3(0.35, -0.11, 0.25),
  ],
}: PerfBoardProps) {
  const pulseLEDRef = useRef<THREE.Mesh>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const activeJointRef = useRef<THREE.Mesh>(null);

  // Animate the board elements (blinking LED, flickering active joint glow)
  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    // Blinking status LED (Green)
    if (pulseLEDRef.current && pulseLEDRef.current.material) {
      const mat = pulseLEDRef.current.material as THREE.MeshStandardMaterial;
      const pulse = Math.sin(elapsed * 5) * 0.4 + 0.6;
      mat.emissiveIntensity = pulse;
    }

    // Dynamic glow light and active joint heat glow when soldering
    if (isSoldering) {
      const heatFactor = 0.85 + Math.sin(elapsed * 35) * 0.15; // rapid flicker
      if (glowLightRef.current) {
        glowLightRef.current.intensity = 2.5 * heatFactor;
      }
      if (activeJointRef.current && activeJointRef.current.material) {
        const mat = activeJointRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 2.0 * heatFactor;
        mat.color.setHex(0xff3700); // glowing orange/red hot
        mat.emissive.setHex(0xff3700);
      }
    } else {
      if (glowLightRef.current) {
        glowLightRef.current.intensity = 0;
      }
      if (activeJointRef.current && activeJointRef.current.material) {
        const mat = activeJointRef.current.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0;
        mat.color.setHex(0xcbd5e1); // cool silver
        mat.emissive.setHex(0x000000);
      }
    }
  });

  const activeJointPos = jointTargets[activeJointIndex] || new THREE.Vector3(0, -0.11, 0.2);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. PCB Base Board */}
      <mesh position={[0, -0.14, 0.2]} receiveShadow castShadow>
        <boxGeometry args={[1.3, 0.04, 1.0]} />
        <meshStandardMaterial color="#0b533a" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Solder pad copper rings (simulated via tiny toruses on the board) */}
      {/* Grid pattern of solder pads */}
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => {
          const x = -0.45 + c * 0.22;
          const z = -0.15 + r * 0.22;
          // Skip if it overlaps with components
          if ((x < -0.1 && z < 0.25) || (x > 0.15 && z > 0.15)) return null;
          return (
            <mesh key={`pad-${r}-${c}`} position={[x, -0.118, z]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.02, 0.035, 8]} />
              <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
            </mesh>
          );
        })
      )}

      {/* 2. Copper PCB Traces (gold wire tracks running on the board) */}
      <mesh position={[-0.2, -0.118, 0.1]} rotation={[0, Math.PI / 6, 0]}>
        <boxGeometry args={[0.3, 0.002, 0.012]} />
        <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
      </mesh>
      <mesh position={[0.2, -0.118, 0.3]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.25, 0.002, 0.012]} />
        <meshStandardMaterial color="#d4af37" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* 3. Component A: IC Microchip (Black rectangular block with metallic pins) */}
      <group position={[-0.32, -0.1, 0.12]} rotation={[0, -0.1, 0]}>
        {/* IC Body */}
        <mesh castShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[0.42, 0.08, 0.22]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Notch indicator */}
        <mesh position={[-0.2, 0.09, 0]}>
          <boxGeometry args={[0.02, 0.01, 0.06]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* IC Pins (metallic pins bent down into the board) */}
        {[-1.5, -0.5, 0.5, 1.5].map((idx) => {
          const pinX = idx * 0.09;
          return (
            <React.Fragment key={`pins-${idx}`}>
              {/* Left Side Pins */}
              <mesh position={[pinX, 0.01, -0.125]} rotation={[0.1, 0, 0]}>
                <boxGeometry args={[0.025, 0.08, 0.03]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Right Side Pins */}
              <mesh position={[pinX, 0.01, 0.125]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[0.025, 0.08, 0.03]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />
              </mesh>
            </React.Fragment>
          );
        })}
      </group>

      {/* 4. Component B: Electrolytic Capacitors (Blue cylinder with silver top) */}
      <group position={[0.36, -0.12, 0.02]}>
        <mesh castShadow position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.28, 12]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Capacitor silver top with vent stripes */}
        <mesh position={[0, 0.301, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.01, 10]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Stripe details */}
        <mesh position={[0.08, 0.16, 0]}>
          <boxGeometry args={[0.02, 0.28, 0.05]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
        </mesh>
      </group>

      {/* 5. Component C: Resistors (Beige body with color bands) */}
      <group position={[0.15, -0.11, 0.42]} rotation={[0, 0.3, 0]}>
        {/* Lead wires */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.006, 0.006, 0.45, 6]} />
          <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Resistor Body */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.18, 8]} />
          <meshStandardMaterial color="#eab308" roughness={0.7} />
        </mesh>
        {/* Color Bands (Gold, Red, Brown) */}
        <mesh position={[-0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.037, 0.037, 0.018, 8]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.037, 0.037, 0.018, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.7} />
        </mesh>
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.037, 0.037, 0.018, 8]} />
          <meshStandardMaterial color="#d97706" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* 6. Component D: Pulsing Green Status LED */}
      <group position={[-0.45, -0.12, 0.48]}>
        {/* LED Base collar */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.02, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        {/* LED Dome */}
        <mesh position={[0, 0.06, 0]} ref={pulseLEDRef} castShadow>
          <sphereGeometry args={[0.038, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={0.6}
            transparent
            opacity={0.85}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 7. Active Solder Joint (glowing hot when iron touches it, otherwise silver metal) */}
      <group position={activeJointPos}>
        {/* Solder Joint cone */}
        <mesh ref={activeJointRef} position={[0, 0.01, 0]}>
          <coneGeometry args={[0.05, 0.07, 8]} />
          <meshStandardMaterial
            color="#cbd5e1"
            emissive="#000000"
            emissiveIntensity={0}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Local warm point light representing hot thermal radiation on contact */}
        {isSoldering && (
          <pointLight
            ref={glowLightRef}
            color="#ff5500"
            intensity={0}
            distance={1.5}
            decay={2.0}
            castShadow={false}
          />
        )}
      </group>

      {/* Extra finished solder joints */}
      {jointTargets.map((pos, i) => {
        if (i === activeJointIndex) return null; // handled dynamically above
        return (
          <mesh key={`done-joint-${i}`} position={[pos.x, pos.y + 0.01, pos.z]}>
            <coneGeometry args={[0.045, 0.06, 8]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.15} metalness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}
