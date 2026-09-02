import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIdleMotion } from "./hooks/useIdleMotion";

interface LampProps {
  flickerFactor?: number;
}

export default function Lamp({ flickerFactor = 1.0 }: LampProps) {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const bulbRef = useRef<THREE.Mesh>(null);
  const { updateLampFlicker } = useIdleMotion();

  // Animation values
  const baseSpotIntensity = 3.5;
  const basePointIntensity = 1.8;

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    // Update lamp flicker factor (1.0 = normal, fluctuates during flicker)
    const factor = updateLampFlicker(delta, elapsed);

    if (spotLightRef.current) {
      spotLightRef.current.intensity = baseSpotIntensity * factor * flickerFactor;
    }
    if (pointLightRef.current) {
      pointLightRef.current.intensity = basePointIntensity * factor * flickerFactor;
    }
    if (bulbRef.current && bulbRef.current.material) {
      const mat = bulbRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (0.8 + Math.sin(elapsed * 4) * 0.05) * factor;
    }
  });

  return (
    <group position={[-0.9, -0.15, 0.5]}>
      {/* 1. Lamp Base on Table */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.65} metalness={0.8} />
      </mesh>

      {/* 2. Gooseneck Stem Segment 1 (Low-poly Segmented Tube) */}
      <group position={[0, 0.15, 0]} rotation={[0, 0, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
          <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
        </mesh>
        
        {/* Joint 1 */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Stem Segment 2 */}
        <group position={[0, 0.2, 0]} rotation={[0, 0, 0.6]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.016, 0.016, 0.5, 6]} />
            <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
          </mesh>

          {/* Joint 2 */}
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>

          {/* Stem Segment 3 (pointing towards board) */}
          <group position={[0, 0.25, 0]} rotation={[0, 0, 0.7]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.014, 0.014, 0.4, 6]} />
              <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.7} />
            </mesh>

            {/* Lamp Shade (Cone) */}
            <group position={[0, 0.2, 0]} rotation={[0, 0, 0.4]}>
              <mesh castShadow>
                <coneGeometry args={[0.18, 0.3, 10]} />
                <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.8} />
              </mesh>

              {/* Inside Shade Rim (accent color) */}
              <mesh position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.17, 0.01, 8, 16]} />
                <meshBasicMaterial color="#d97706" />
              </mesh>

              {/* 3. The Lightbulb */}
              <mesh position={[0, -0.06, 0]} ref={bulbRef}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial
                  color="#ffd89b"
                  emissive="#ffd89b"
                  emissiveIntensity={1.0}
                  roughness={0.1}
                />
              </mesh>

              {/* 4. Lights */}
              {/* PointLight inside bulb to illuminate character face & desk area */}
              <pointLight
                ref={pointLightRef}
                color="#ffb347"
                intensity={1.8}
                distance={3.5}
                decay={1.6}
                castShadow={false}
              />

              {/* SpotLight projecting downwards onto the board */}
              {/* We rotate the spotlight to face straight down relative to global scene */}
              <spotLight
                ref={spotLightRef}
                color="#ffd89b"
                intensity={3.5}
                angle={Math.PI / 4.8}
                penumbra={0.65}
                distance={6.0}
                decay={1.3}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-bias={-0.0015}
                // Target is at local origin offset representing board
                position={[0, 0, 0]}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
