import React from "react";
import * as THREE from "three";

export default function Environment() {
  return (
    <>
      {/* 1. Global Ambient & Rim Definition Lights */}
      <ambientLight color="#3a4a6b" intensity={0.25} />
      
      {/* Rim light from upper-back-left to define silhouettes */}
      <directionalLight
        position={[-3, 4, -4]}
        color="#5b7fb8"
        intensity={0.65}
        castShadow={false} // Only the lamp casts shadows
      />

      {/* 2. Room Corner Walls (Low-poly background panels) */}
      {/* Back Wall */}
      <mesh position={[0, 1.5, -3.5]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#0b0f1d" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-3.5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial color="#080c18" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#05070e" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* 3. Background Props */}
      {/* Tech Shelf on Back Wall */}
      <group position={[1.4, 1.8, -3.4]}>
        {/* Shelf plank */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.05, 0.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Supporting brackets */}
        <mesh position={[-0.7, -0.15, -0.1]}>
          <boxGeometry args={[0.04, 0.3, 0.04]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0.7, -0.15, -0.1]}>
          <boxGeometry args={[0.04, 0.3, 0.04]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Shelf items: Box & books */}
        <mesh position={[-0.4, 0.18, 0]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.15, 0]} rotation={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.08, 0.25, 0.25]} />
          <meshStandardMaterial color="#881337" roughness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.15, 0]} rotation={[0, -0.05, 0]} castShadow>
          <boxGeometry args={[0.08, 0.26, 0.25]} />
          <meshStandardMaterial color="#0369a1" roughness={0.8} />
        </mesh>
        <mesh position={[0.4, 0.1, 0]} rotation={[0.4, 0.2, 0.3]} castShadow>
          <boxGeometry args={[0.2, 0.18, 0.2]} />
          <meshStandardMaterial color="#0f766e" roughness={0.7} />
        </mesh>
      </group>

      {/* 4. Glowing Neon Atom Sign (From the Reference Image) */}
      <group position={[-1.8, 1.6, -3.42]} rotation={[0, 0, 0.15]}>
        {/* Blue Neon Rings */}
        <mesh>
          <torusGeometry args={[0.42, 0.016, 8, 36]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[0.42, 0.016, 8, 36]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 3]}>
          <torusGeometry args={[0.42, 0.016, 8, 36]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Orange Nucleus */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
        {/* Faint ambient glow */}
        <pointLight color="#38bdf8" intensity={0.5} distance={2.5} decay={2} />
      </group>

      {/* 5. Window Frame & Moonlight Rim */}
      <group position={[-3.48, 1.4, -0.6]}>
        {/* Faint blue moonlight casting light through window */}
        <pointLight color="#60a5fa" intensity={0.4} distance={4} decay={1.5} />
        {/* Window Panel */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.5, 2.0]} />
          {/* Extremely low-opacity glass/cool blue color */}
          <meshBasicMaterial color="#1d4ed8" transparent opacity={0.06} />
        </mesh>
        {/* Window grid dividers */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.5, 0.04, 0.02]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, Math.PI / 2]}>
          <boxGeometry args={[2.0, 0.04, 0.02]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* 6. Desk Wall Posters */}
      <group position={[0.2, 1.4, -3.45]} rotation={[0, 0, -0.02]}>
        <mesh>
          <planeGeometry args={[0.9, 1.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
        {/* Telemetry text bands (simulating poster content) */}
        <mesh position={[0, 0.4, 0.01]}>
          <planeGeometry args={[0.7, 0.08]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[-0.1, 0.2, 0.01]}>
          <planeGeometry args={[0.5, 0.03]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[0, 0.05, 0.01]}>
          <planeGeometry args={[0.7, 0.03]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[-0.05, -0.1, 0.01]}>
          <planeGeometry args={[0.6, 0.03]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
      </group>
    </>
  );
}
