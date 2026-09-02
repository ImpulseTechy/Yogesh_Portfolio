import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Desk() {
  const laptopScreenRef = useRef<THREE.Mesh>(null);
  const laptopPointLightRef = useRef<THREE.PointLight>(null);

  // State for canvas textures
  const [codeTexture, setCodeTexture] = useState<THREE.CanvasTexture | null>(null);
  const [schematicTexture, setSchematicTexture] = useState<THREE.CanvasTexture | null>(null);
  const [mugTexture, setMugTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    // 1. Generate Laptop Code Texture
    const canvasCode = document.createElement("canvas");
    canvasCode.width = 256;
    canvasCode.height = 256;
    const ctxCode = canvasCode.getContext("2d");
    if (ctxCode) {
      ctxCode.fillStyle = "#0c101f";
      ctxCode.fillRect(0, 0, 256, 256);
      ctxCode.font = "bold 12px monospace";
      ctxCode.fillStyle = "#00d9a3"; // teal accent
      ctxCode.fillText("const engineer = {", 10, 30);
      ctxCode.fillText("  name: 'Yogesh',", 10, 50);
      ctxCode.fillText("  role: 'Hardware',", 10, 70);
      ctxCode.fillText("  status: 'Soldering',", 10, 90);
      ctxCode.fillText("};", 10, 110);
      ctxCode.fillStyle = "#38bdf8"; // blue accent
      ctxCode.fillText("function buildSat() {", 10, 140);
      ctxCode.fillText("  CubeSat.init();", 10, 160);
      ctxCode.fillText("  ESP32.flash();", 10, 180);
      ctxCode.fillText("}", 10, 200);
      ctxCode.fillStyle = "#f43f5e";
      ctxCode.fillText("// 2:00 AM Maker Vibe", 10, 230);
    }
    const texCode = new THREE.CanvasTexture(canvasCode);
    setCodeTexture(texCode);

    // 2. Generate Notebook Schematic Texture
    const canvasSch = document.createElement("canvas");
    canvasSch.width = 512;
    canvasSch.height = 512;
    const ctxSch = canvasSch.getContext("2d");
    if (ctxSch) {
      ctxSch.fillStyle = "#fbfbfa"; // creamy paper
      ctxSch.fillRect(0, 0, 512, 512);

      // Draw paper grids
      ctxSch.strokeStyle = "#e2e8f0";
      ctxSch.lineWidth = 1.5;
      for (let i = 0; i < 512; i += 24) {
        ctxSch.beginPath(); ctxSch.moveTo(i, 0); ctxSch.lineTo(i, 512); ctxSch.stroke();
        ctxSch.beginPath(); ctxSch.moveTo(0, i); ctxSch.lineTo(512, i); ctxSch.stroke();
      }

      // Draw hand-drawn schematic circuit lines
      ctxSch.strokeStyle = "#27272a";
      ctxSch.lineWidth = 4;
      ctxSch.lineCap = "round";
      ctxSch.lineJoin = "round";

      // VCC power rail & resistor
      ctxSch.beginPath();
      ctxSch.moveTo(60, 220);
      ctxSch.lineTo(130, 220);
      // Zigzag resistor
      ctxSch.lineTo(142, 190); ctxSch.lineTo(158, 250);
      ctxSch.lineTo(174, 190); ctxSch.lineTo(190, 250);
      ctxSch.lineTo(206, 190); ctxSch.lineTo(222, 220);
      ctxSch.lineTo(300, 220);
      ctxSch.stroke();

      // Capacitor to ground
      ctxSch.beginPath();
      ctxSch.moveTo(300, 220);
      ctxSch.lineTo(300, 290);
      // Capacitor plates
      ctxSch.moveTo(270, 290); ctxSch.lineTo(330, 290);
      ctxSch.moveTo(270, 302); ctxSch.lineTo(330, 302);
      // Ground connection
      ctxSch.moveTo(300, 302); ctxSch.lineTo(300, 350);
      // Ground stripes
      ctxSch.moveTo(280, 350); ctxSch.lineTo(320, 350);
      ctxSch.moveTo(290, 360); ctxSch.lineTo(310, 360);
      ctxSch.moveTo(295, 370); ctxSch.lineTo(305, 370);
      ctxSch.stroke();

      // Hand-written text notes
      ctxSch.fillStyle = "#1e3a8a";
      ctxSch.font = "bold 26px 'Courier New', monospace";
      ctxSch.fillText("VCC (+3.3V)", 50, 180);
      ctxSch.fillText("10k R", 150, 150);
      ctxSch.fillText("10uF", 340, 310);
      ctxSch.fillText("GPIO_15", 320, 210);

      // Quick doodle of the neon atom symbol
      ctxSch.strokeStyle = "#0891b2";
      ctxSch.lineWidth = 3;
      ctxSch.beginPath();
      ctxSch.ellipse(400, 100, 45, 18, Math.PI / 4, 0, Math.PI * 2);
      ctxSch.ellipse(400, 100, 45, 18, -Math.PI / 4, 0, Math.PI * 2);
      ctxSch.stroke();
    }
    const texSch = new THREE.CanvasTexture(canvasSch);
    setSchematicTexture(texSch);

    // 3. Generate Coffee Mug "EAT SLEEP DESIGN BUILD REPEAT" Texture
    const canvasMug = document.createElement("canvas");
    canvasMug.width = 256;
    canvasMug.height = 256;
    const ctxMug = canvasMug.getContext("2d");
    if (ctxMug) {
      ctxMug.fillStyle = "#18181b"; // matches dark mug base color
      ctxMug.fillRect(0, 0, 256, 256);
      ctxMug.fillStyle = "#ffffff";
      ctxMug.font = "900 24px 'Arial Black', sans-serif";
      ctxMug.textAlign = "center";
      ctxMug.textBaseline = "middle";
      
      const words = ["EAT", "SLEEP", "DESIGN", "BUILD", "REPEAT"];
      words.forEach((word, idx) => {
        ctxMug.fillText(word, 128, 45 + idx * 42);
      });
    }
    const texMug = new THREE.CanvasTexture(canvasMug);
    setMugTexture(texMug);
  }, []);

  // Animating the laptop code offset to simulate text scrolling/flicker
  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    
    // Animate scrolling code screen
    if (codeTexture) {
      codeTexture.offset.y = -(elapsed * 0.04) % 1.0;
    }

    // Screen light pulse/flicker
    if (laptopPointLightRef.current) {
      laptopPointLightRef.current.intensity = 1.0 + Math.sin(elapsed * 12) * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Large Wooden Workbench Top */}
      <mesh position={[0, -0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.08, 2.8]} />
        <meshStandardMaterial color="#6a3f2d" roughness={0.75} metalness={0.1} />
      </mesh>

      {/* Desk Leg Left */}
      <mesh position={[-1.9, -0.6, 0]} castShadow>
        <boxGeometry args={[0.08, 0.7, 2.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>
      {/* Desk Leg Right */}
      <mesh position={[1.9, -0.6, 0]} castShadow>
        <boxGeometry args={[0.08, 0.7, 2.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* 2. Open Laptop (Clay style rounded box shell) */}
      <group position={[-1.2, -0.18, -0.1]} rotation={[0, 0.45, 0]}>
        {/* Keyboard Base */}
        <mesh castShadow position={[0, 0.015, 0]}>
          <boxGeometry args={[0.7, 0.03, 0.52]} />
          <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Screen Hinge & Screen Back Panel */}
        <group position={[0, 0.02, -0.25]} rotation={[-0.32, 0, 0]}>
          <mesh castShadow position={[0, 0.22, -0.01]}>
            <boxGeometry args={[0.7, 0.44, 0.02]} />
            <meshStandardMaterial color="#2d3748" roughness={0.5} metalness={0.6} />
          </mesh>
          {/* LCD Screen Display */}
          <mesh position={[0, 0.22, 0.005]} ref={laptopScreenRef}>
            <planeGeometry args={[0.66, 0.4]} />
            <meshBasicMaterial map={codeTexture || undefined} />
          </mesh>
          {/* Laptop Screen Cyan Glow (casts soft light on the character) */}
          <pointLight
            ref={laptopPointLightRef}
            color="#00d9a3"
            intensity={1.1}
            distance={2.2}
            decay={2.0}
            position={[0, 0.22, 0.1]}
            castShadow={false}
          />
        </group>
      </group>

      {/* 3. Open Circuit Sketchbook / Notebook */}
      <group position={[-0.3, -0.176, 0.76]} rotation={[0, -0.12, 0]}>
        {/* Cover Spine */}
        <mesh castShadow position={[0, 0.002, 0]}>
          <boxGeometry args={[0.62, 0.01, 0.44]} />
          <meshStandardMaterial color="#991b1b" roughness={0.8} />
        </mesh>
        {/* Left Page */}
        <mesh position={[-0.145, 0.009, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.28, 0.4]} />
          <meshStandardMaterial map={schematicTexture || undefined} roughness={0.9} />
        </mesh>
        {/* Right Page */}
        <mesh position={[0.145, 0.009, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.28, 0.4]} />
          <meshStandardMaterial map={schematicTexture || undefined} roughness={0.9} />
        </mesh>
        {/* Schematic pen lying on the book */}
        <group position={[0.12, 0.025, 0.05]} rotation={[0.02, 0.7, -0.04]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.24, 6]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
          {/* Metallic clip */}
          <mesh position={[0, 0.08, 0.01]}>
            <boxGeometry args={[0.005, 0.06, 0.01]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* 4. Coffee Mug (Glossy clay-style custom texture) */}
      <group position={[0.72, -0.07, 0.7]} rotation={[0, -0.8, 0]}>
        {/* Mug Cylinder Body */}
        <mesh castShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.22, 16]} />
          <meshStandardMaterial map={mugTexture || undefined} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Liquid inside */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.008, 12]} />
          <meshStandardMaterial color="#3f2305" roughness={0.1} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[-0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.075, 0.022, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#18181b" roughness={0.3} />
        </mesh>
      </group>

      {/* 5. Multimeter Tool */}
      <group position={[0.85, -0.1, -0.22]} rotation={[0, -0.45, 0]}>
        {/* Multimeter Casing (Yellow rubber safety shield) */}
        <mesh castShadow>
          <boxGeometry args={[0.26, 0.16, 0.4]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
        {/* Dark inner face */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.22, 0.13, 0.36]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        {/* LED Digital Display */}
        <group position={[0, 0.086, -0.09]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <planeGeometry args={[0.18, 0.08]} />
            <meshStandardMaterial color="#022c22" roughness={0.2} />
          </mesh>
          <pointLight color="#22c55e" intensity={0.4} distance={0.5} position={[0, 0, 0.05]} />
          {/* Faint numeric readings */}
          <mesh position={[0, 0, 0.002]}>
            <planeGeometry args={[0.16, 0.06]} />
            <meshBasicMaterial color="#4ade80" transparent opacity={0.8} />
          </mesh>
        </group>
        {/* Control Dial */}
        <mesh position={[0, 0.09, 0.06]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 10]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
      </group>

      {/* 6. Wire Spool for Solder Wire */}
      <group position={[-0.52, -0.13, 0.38]} rotation={[0, 0.1, 0]}>
        {/* Spool Cap Bottom */}
        <mesh position={[0, -0.04, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.015, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        {/* Spool Cap Top */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.015, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        {/* Solder Wire Wrapped Core */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.065, 12]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* 7. Wire Cutters / Pliers (Clay style tools) */}
      <group position={[0.42, -0.17, 0.72]} rotation={[0, 0.6, 0]}>
        {/* Left Pliers arm (Red handle) */}
        <mesh position={[-0.05, 0, -0.06]} rotation={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.022, 0.015, 0.16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        {/* Right Pliers arm (Red handle) */}
        <mesh position={[0.05, 0, -0.06]} rotation={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.022, 0.015, 0.16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        {/* Metallic cutter head */}
        <mesh position={[0, 0.002, 0.05]} castShadow>
          <boxGeometry args={[0.06, 0.01, 0.06]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}
