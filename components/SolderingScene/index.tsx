"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

import Environment from "./Environment";
import Lamp from "./Lamp";
import Desk from "./Desk";
import PerfBoard from "./PerfBoard";
import Boy from "./Boy";
import Smoke from "./Smoke";

// Solder joint coordinates relative to table origin
const jointTargets = [
  new THREE.Vector3(-0.15, -0.11, 0.35),
  new THREE.Vector3(0.1, -0.11, 0.1),
  new THREE.Vector3(0.35, -0.11, 0.25),
];

// Hands Rest coordinates on the desk
const restHandPosR = new THREE.Vector3(0.5, 0.25, 0.4);
const restHandPosL = new THREE.Vector3(-0.4, -0.05, 0.4);

// Solder iron tip offset relative to hand
const tipOffset = new THREE.Vector3(0, 0, 0.52);

// Component to handle mouse-move camera parallax
function CameraParallax({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2.3, 4.8));

  useFrame(() => {
    if (!mouse.current) return;
    
    // Smoothly interpolate camera position based on mouse position
    const targetX = mouse.current.x * 0.7;
    const targetY = 2.1 + mouse.current.y * 0.45;
    
    targetPos.current.set(targetX, targetY, 4.8);
    camera.position.lerp(targetPos.current, 0.05);
    
    // Look at center of desk
    camera.lookAt(0, 0.15, 0.1);
  });

  return null;
}

// Controller component to manage the soldering time cycle
function SolderingController({
  setSolderingState,
}: {
  setSolderingState: (state: { isSoldering: boolean; activeJointIndex: number; handRTarget: THREE.Vector3; handLTarget: THREE.Vector3; activeJointPos: THREE.Vector3 }) => void;
}) {
  const cycleTimeRef = useRef(0);
  const activeJointIdxRef = useRef(0);

  useFrame((state, delta) => {
    cycleTimeRef.current += delta;
    
    const cycleDuration = 7.0; // 7 seconds per joint
    const t = cycleTimeRef.current % cycleDuration;
    const activeIdx = activeJointIdxRef.current;
    const jointPos = jointTargets[activeIdx];

    // Compute hand targets
    const handRActive = jointPos.clone().sub(tipOffset);
    const handLActive = jointPos.clone().add(new THREE.Vector3(-0.1, 0.02, 0.02));

    let isSoldering = false;
    let handRTarget = restHandPosR.clone();
    let handLTarget = restHandPosL.clone();

    if (t < 1.5) {
      // 1. Move down: Lerp rest -> active
      const progress = t / 1.5;
      const ease = progress * progress * (3 - 2 * progress); // smoothstep ease
      handRTarget.lerpVectors(restHandPosR, handRActive, ease);
      handLTarget.lerpVectors(restHandPosL, handLActive, ease);
    } else if (t < 3.8) {
      // 2. Solder contact
      handRTarget.copy(handRActive);
      handLTarget.copy(handLActive);
      isSoldering = true;
    } else if (t < 5.0) {
      // 3. Move up: Lerp active -> rest
      const progress = (t - 3.8) / 1.2;
      const ease = progress * progress * (3 - 2 * progress);
      handRTarget.lerpVectors(handRActive, restHandPosR, ease);
      handLTarget.lerpVectors(handLActive, restHandPosL, ease);
    } else {
      // 4. Idle rest
      handRTarget.copy(restHandPosR);
      handLTarget.copy(restHandPosL);
      
      // Advance to next joint target for next cycle
      if (t >= cycleDuration - 0.05 && cycleTimeRef.current > 0.1) {
        activeJointIdxRef.current = (activeIdx + 1) % jointTargets.length;
      }
    }

    setSolderingState({
      isSoldering,
      activeJointIndex: activeIdx,
      handRTarget,
      handLTarget,
      activeJointPos: jointPos,
    });
  });

  return null;
}

export default function SolderingScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  
  // Visibility and Mount states
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Soldering controller states passed as props
  const [solderingState, setSolderingState] = useState({
    isSoldering: false,
    activeJointIndex: 0,
    handRTarget: restHandPosR.clone(),
    handLTarget: restHandPosL.clone(),
    activeJointPos: jointTargets[0].clone(),
  });

  useEffect(() => {
    setIsMounted(true);
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Visibility observer to pause canvas rendering when offscreen
    let observer: IntersectionObserver;
    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(currentContainer);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (observer && currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  if (!isMounted) return <SolderingSkeleton />;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center bg-[#0a0e1a]/20"
      style={{ minHeight: "380px" }}
    >
      {isVisible ? (
        <Suspense fallback={<SolderingSkeleton />}>
          <Canvas
            shadows
            gl={{ antialias: true }}
            camera={{ fov: 36, position: [0, 2.3, 4.8], near: 0.1, far: 50 }}
            dpr={[1, 1.8]} // performance budget caps device pixel ratio at 1.8
          >
            {/* Environment lighting & room panels */}
            <Environment />

            {/* Soldering desk lamp */}
            <Lamp />

            {/* Workbench with laptop, open notebook, coffee mug */}
            <Desk />

            {/* Green perf board layout */}
            <PerfBoard
              isSoldering={solderingState.isSoldering}
              activeJointIndex={solderingState.activeJointIndex}
              jointTargets={jointTargets}
            />

            {/* Claymorphic 3D Boy model */}
            <Boy
              handRTarget={solderingState.handRTarget}
              handLTarget={solderingState.handLTarget}
              isSoldering={solderingState.isSoldering}
              activeJointPos={solderingState.activeJointPos}
            />

            {/* Smoke particles rising from solder tip */}
            <Smoke
              position={[
                solderingState.activeJointPos.x,
                solderingState.activeJointPos.y + 0.02,
                solderingState.activeJointPos.z,
              ]}
              isActive={solderingState.isSoldering}
            />

            {/* Controller updates positions inside R3F lifecycle */}
            <SolderingController setSolderingState={setSolderingState} />

            {/* Mouse-move camera parallax effect */}
            <CameraParallax mouse={mouse} />

            {/* Post-processing Bloom for glowing elements */}
            <EffectComposer>
              <Bloom
                mipmapBlur
                intensity={0.65}
                luminanceThreshold={0.25}
                luminanceSmoothing={0.8}
              />
            </EffectComposer>
          </Canvas>
        </Suspense>
      ) : (
        <div className="text-text-muted font-mono text-[11px]">Scene Paused (Offscreen)</div>
      )}
    </div>
  );
}

// Tech loader skeleton matching the page aesthetic
export function SolderingSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0e1a]/95 text-text-primary p-6 z-20">
      <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
        {/* Glowing circuit neon circle */}
        <div className="absolute inset-0 rounded-full border-2 border-accent-blue/30 border-t-accent-teal animate-spin" />
        <span className="text-[12px] font-mono text-accent-teal">3D</span>
      </div>
      <p className="text-[12px] font-mono text-text-secondary tracking-widest uppercase animate-pulse">
        Initializing Workspace...
      </p>
      <div className="mt-4 flex flex-col gap-1 w-40 text-center font-mono text-[9px] text-text-muted">
        <span>[+] Loading Claymorphic Assets</span>
        <span>[+] Compiling Node Shaders</span>
      </div>
    </div>
  );
}
