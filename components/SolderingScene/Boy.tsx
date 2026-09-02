import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BoyProps {
  handRTarget: THREE.Vector3;
  handLTarget: THREE.Vector3;
  isSoldering: boolean;
  activeJointPos: THREE.Vector3;
}

export default function Boy({
  handRTarget,
  handLTarget,
  isSoldering,
  activeJointPos,
}: BoyProps) {
  // References for dynamic joint updates
  const headGroupRef = useRef<THREE.Group>(null);
  const eyesGroupRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  
  // Right Arm Meshes
  const upperArmRRef = useRef<THREE.Mesh>(null);
  const forearmRRef = useRef<THREE.Mesh>(null);
  const elbowRRef = useRef<THREE.Mesh>(null);
  const handRRef = useRef<THREE.Mesh>(null);
  const ironGroupRef = useRef<THREE.Group>(null);

  // Left Arm Meshes
  const upperArmLRef = useRef<THREE.Mesh>(null);
  const forearmLRef = useRef<THREE.Mesh>(null);
  const elbowLRef = useRef<THREE.Mesh>(null);
  const handLRef = useRef<THREE.Mesh>(null);
  const wireFeedMeshRef = useRef<THREE.Mesh>(null);

  // Defined static anchor points
  const shoulderR = useMemo(() => new THREE.Vector3(0.42, 0.46, -0.48), []);
  const shoulderL = useMemo(() => new THREE.Vector3(-0.42, 0.46, -0.48), []);

  // Material cache for claymorphism
  const materials = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({ color: "#fbc5a8", roughness: 0.58, metalness: 0.05 }),
      jacket: new THREE.MeshStandardMaterial({ color: "#ea580c", roughness: 0.5, metalness: 0.02 }), // Warm orange jacket
      shirt: new THREE.MeshStandardMaterial({ color: "#f3f4f6", roughness: 0.65 }),
      hair: new THREE.MeshStandardMaterial({ color: "#221a15", roughness: 0.7 }), // Deep dark brown
      jeans: new THREE.MeshStandardMaterial({ color: "#1e3a8a", roughness: 0.75 }),
      chairPlastic: new THREE.MeshStandardMaterial({ color: "#1f2937", roughness: 0.6 }),
      chairMetal: new THREE.MeshStandardMaterial({ color: "#4b5563", metalness: 0.95, roughness: 0.15 }),
      ironMetal: new THREE.MeshStandardMaterial({ color: "#94a3b8", metalness: 0.9, roughness: 0.2 }),
      ironTip: new THREE.MeshStandardMaterial({ color: "#b45309", metalness: 0.9, roughness: 0.2 }),
      solderWire: new THREE.MeshStandardMaterial({ color: "#cbd5e1", metalness: 0.95, roughness: 0.15 }),
      blackPlastic: new THREE.MeshStandardMaterial({ color: "#090d16", roughness: 0.45 }),
      eyes: new THREE.MeshStandardMaterial({ color: "#0a0a0c", roughness: 0.1 }),
    };
  }, []);

  // Lerping helpers for arm animation
  const currentHandR = useMemo(() => new THREE.Vector3(0.3, 0.1, 0.1), []);
  const currentHandL = useMemo(() => new THREE.Vector3(-0.3, 0.1, 0.1), []);

  // Solder iron tip offset relative to right hand
  const tipOffset = useMemo(() => new THREE.Vector3(0, 0, 0.52), []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    // 1. Subtle breathing animation on Torso and Head
    const breath = Math.sin(elapsed * 1.6) * 0.008;
    const microSolderShake = isSoldering
      ? (Math.sin(elapsed * 45) * 0.002) // subtle hand tremor during heat contact
      : 0;

    if (torsoRef.current) {
      torsoRef.current.position.y = 0.18 + breath;
    }

    // 2. Head & Eye tracking looking towards the soldering joint
    if (headGroupRef.current) {
      headGroupRef.current.position.y = 0.58 + breath * 1.2;
      
      // Calculate look direction towards active joint
      const targetLook = activeJointPos.clone();
      const headWorldPos = new THREE.Vector3();
      headGroupRef.current.getWorldPosition(headWorldPos);
      
      const headToJoint = new THREE.Vector3().subVectors(targetLook, headWorldPos).normalize();
      
      // Compute target quaternion for head looking at joint
      const targetRotationY = Math.atan2(headToJoint.x, headToJoint.z) - Math.PI;
      const targetRotationX = -Math.atan2(headToJoint.y, Math.sqrt(headToJoint.x ** 2 + headToJoint.z ** 2)) - 0.2;
      
      // Damp rotation
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, targetRotationY, 0.08);
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, targetRotationX, 0.08);
    }

    // 3. Update Hand Positions (smoothly lerping to target coordinates)
    currentHandR.lerp(handRTarget, 0.08);
    currentHandL.lerp(handLTarget, 0.08);
    
    // Add micro soldering circular motions when active
    if (isSoldering) {
      const radius = 0.012;
      const angle = elapsed * 24;
      currentHandR.x += Math.cos(angle) * radius * 0.15;
      currentHandR.z += Math.sin(angle) * radius * 0.15;
      currentHandR.y += microSolderShake;
    }

    // Update meshes for Hands
    if (handRRef.current) handRRef.current.position.copy(currentHandR);
    if (handLRef.current) handLRef.current.position.copy(currentHandL);

    // 4. Soldering Iron Held in Right Hand
    if (ironGroupRef.current) {
      ironGroupRef.current.position.copy(currentHandR);
      
      // Point iron tip towards the active joint position
      const ironLookTarget = activeJointPos.clone();
      // If resting, point iron down in a holder angle
      if (!isSoldering && currentHandR.distanceTo(handRTarget) < 0.1) {
        ironLookTarget.set(currentHandR.x, currentHandR.y - 0.4, currentHandR.z + 0.35);
      }
      ironGroupRef.current.lookAt(ironLookTarget);
    }

    // 5. Right Arm Inverse Kinematics (Elbow calculations)
    // Shoulder positions are attached to Torso (add breathing offset)
    const activeShoulderR = shoulderR.clone();
    activeShoulderR.y += breath;

    const elbowR = new THREE.Vector3()
      .addVectors(activeShoulderR, currentHandR)
      .multiplyScalar(0.5);
    // Push elbow outwards & slightly upwards
    elbowR.x += 0.22;
    elbowR.y += 0.08;
    elbowR.z -= 0.05;

    if (elbowRRef.current) elbowRRef.current.position.copy(elbowR);

    // Update Right Upper Arm Sleeve (shoulder to elbow)
    if (upperArmRRef.current) {
      upperArmRRef.current.position.copy(activeShoulderR).add(elbowR).multiplyScalar(0.5);
      const dist = activeShoulderR.distanceTo(elbowR);
      upperArmRRef.current.scale.set(1, dist, 1);
      
      const direction = new THREE.Vector3().subVectors(elbowR, activeShoulderR).normalize();
      upperArmRRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    }

    // Update Right Forearm Skin (elbow to hand)
    if (forearmRRef.current) {
      forearmRRef.current.position.copy(elbowR).add(currentHandR).multiplyScalar(0.5);
      const dist = elbowR.distanceTo(currentHandR);
      forearmRRef.current.scale.set(1, dist, 1);
      
      const direction = new THREE.Vector3().subVectors(currentHandR, elbowR).normalize();
      forearmRRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    }

    // 6. Left Arm Inverse Kinematics (Elbow calculations)
    const activeShoulderL = shoulderL.clone();
    activeShoulderL.y += breath;

    const elbowL = new THREE.Vector3()
      .addVectors(activeShoulderL, currentHandL)
      .multiplyScalar(0.5);
    // Push left elbow outwards
    elbowL.x -= 0.22;
    elbowL.y += 0.06;
    elbowL.z -= 0.05;

    if (elbowLRef.current) elbowLRef.current.position.copy(elbowL);

    // Update Left Upper Arm Sleeve
    if (upperArmLRef.current) {
      upperArmLRef.current.position.copy(activeShoulderL).add(elbowL).multiplyScalar(0.5);
      const dist = activeShoulderL.distanceTo(elbowL);
      upperArmLRef.current.scale.set(1, dist, 1);
      
      const direction = new THREE.Vector3().subVectors(elbowL, activeShoulderL).normalize();
      upperArmLRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    }

    // Update Left Forearm Skin
    if (forearmLRef.current) {
      forearmLRef.current.position.copy(elbowL).add(currentHandL).multiplyScalar(0.5);
      const dist = elbowL.distanceTo(currentHandL);
      forearmLRef.current.scale.set(1, dist, 1);
      
      const direction = new THREE.Vector3().subVectors(currentHandL, elbowL).normalize();
      forearmLRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    }

    // 7. Update Solder Wire Feed (extending from Left Hand to joint)
    if (wireFeedMeshRef.current) {
      const wireTipTarget = activeJointPos.clone();
      if (!isSoldering) {
        // Feed target rests on table
        wireTipTarget.set(0.0, -0.11, 0.2);
      }
      wireFeedMeshRef.current.position.copy(currentHandL).add(wireTipTarget).multiplyScalar(0.5);
      const distWire = currentHandL.distanceTo(wireTipTarget);
      wireFeedMeshRef.current.scale.set(1, distWire, 1);
      
      const direction = new THREE.Vector3().subVectors(wireTipTarget, currentHandL).normalize();
      wireFeedMeshRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    }
  });

  return (
    <group position={[0, 0, -0.1]}>
      {/* ========================================================
          A. OFFICE SWIVEL CHAIR (Boy sits on it)
          ======================================================== */}
      <group position={[0, -0.6, -0.65]}>
        {/* Star Wheel Base */}
        <mesh position={[0, -0.36, 0]} receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.03, 8]} />
          <primitive object={materials.chairPlastic} attach="material" />
        </mesh>
        {/* Five Legs (simplified star spokes) */}
        {Array.from({ length: 5 }).map((_, idx) => {
          const angle = (idx * Math.PI * 2) / 5;
          return (
            <mesh
              key={`chair-leg-${idx}`}
              position={[Math.cos(angle) * 0.16, -0.36, Math.sin(angle) * 0.16]}
              rotation={[0, -angle, 0]}
              castShadow
            >
              <boxGeometry args={[0.32, 0.04, 0.06]} />
              <primitive object={materials.chairPlastic} attach="material" />
            </mesh>
          );
        })}
        {/* Metal Cylinder Base Rod */}
        <mesh position={[0, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <primitive object={materials.chairMetal} attach="material" />
        </mesh>
        {/* Seat Cushion (Soft clay styling) */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.36, 0.38, 0.1, 16]} />
          <primitive object={materials.chairPlastic} attach="material" />
        </mesh>
        {/* Chair Backrest Support bar */}
        <mesh position={[0, 0.35, -0.32]} rotation={[0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.45, 0.04]} />
          <primitive object={materials.chairMetal} attach="material" />
        </mesh>
        {/* Backrest Cushion */}
        <mesh position={[0, 0.62, -0.36]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.34, 0.38, 0.07]} />
          <primitive object={materials.chairPlastic} attach="material" />
        </mesh>
      </group>

      {/* ========================================================
          B. CLAYMORPHIC TORSO & JACKET
          ======================================================== */}
      <group ref={torsoRef} position={[0, 0.18, -0.58]}>
        {/* Inner T-Shirt cylinder */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.28, 0.52, 16]} />
          <primitive object={materials.shirt} attach="material" />
        </mesh>
        {/* Orange Jacket Body (covers torso) */}
        <mesh position={[0, 0.0, 0.01]} castShadow>
          <cylinderGeometry args={[0.27, 0.29, 0.44, 16]} />
          <primitive object={materials.jacket} attach="material" />
        </mesh>
        {/* Jacket collar rim (warm orange clay torus) */}
        <mesh position={[0, 0.2, -0.02]} rotation={[Math.PI / 12, 0, 0]}>
          <torusGeometry args={[0.15, 0.05, 12, 24]} />
          <primitive object={materials.jacket} attach="material" />
        </mesh>
        {/* White Hoodie Drawstrings (dangling from collar) */}
        <mesh position={[-0.08, 0.04, 0.14]} rotation={[0.1, 0, -0.05]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.24, 6]} />
          <primitive object={materials.shirt} attach="material" />
        </mesh>
        <mesh position={[0.08, 0.04, 0.14]} rotation={[0.1, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.24, 6]} />
          <primitive object={materials.shirt} attach="material" />
        </mesh>
        {/* Blue Jeans legs sitting down */}
        <group position={[0, -0.22, 0]}>
          {/* Right Thigh */}
          <mesh position={[0.16, -0.06, 0.18]} rotation={[Math.PI / 2.3, 0, 0.06]} castShadow>
            <cylinderGeometry args={[0.11, 0.1, 0.45, 12]} />
            <primitive object={materials.jeans} attach="material" />
          </mesh>
          {/* Left Thigh */}
          <mesh position={[-0.16, -0.06, 0.18]} rotation={[Math.PI / 2.3, 0, -0.06]} castShadow>
            <cylinderGeometry args={[0.11, 0.1, 0.45, 12]} />
            <primitive object={materials.jeans} attach="material" />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          C. CLAYMORPHIC HEAD, HAIR & FACIAL FEATURES
          ======================================================= */}
      <group ref={headGroupRef} position={[0, 0.58, -0.58]}>
        {/* Smooth rounded head base */}
        <mesh castShadow>
          <sphereGeometry args={[0.26, 24, 24]} />
          <primitive object={materials.skin} attach="material" />
        </mesh>

        {/* Big Cartoon Eyes */}
        <group ref={eyesGroupRef} position={[0, 0.02, 0.2]}>
          {/* Left Eye */}
          <group position={[-0.095, 0, 0.05]}>
            <mesh castShadow>
              <sphereGeometry args={[0.038, 12, 12]} />
              <primitive object={materials.eyes} attach="material" />
            </mesh>
            {/* White Reflection catchers */}
            <mesh position={[0.012, 0.012, 0.032]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
          {/* Right Eye */}
          <group position={[0.095, 0, 0.05]}>
            <mesh castShadow>
              <sphereGeometry args={[0.038, 12, 12]} />
              <primitive object={materials.eyes} attach="material" />
            </mesh>
            {/* White Reflection catchers */}
            <mesh position={[0.012, 0.012, 0.032]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>

          {/* Simple Eyebrows */}
          <mesh position={[-0.095, 0.06, 0.03]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[0.07, 0.015, 0.015]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
          <mesh position={[0.095, 0.06, 0.03]} rotation={[0, 0, -0.08]}>
            <boxGeometry args={[0.07, 0.015, 0.015]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
        </group>

        {/* Small Cute Nose */}
        <mesh position={[0, -0.03, 0.25]}>
          <sphereGeometry args={[0.024, 10, 10]} />
          <primitive object={materials.skin} attach="material" />
        </mesh>

        {/* Happy Smug Mouth */}
        <mesh position={[0, -0.09, 0.23]} rotation={[0.05, 0, 0]}>
          <boxGeometry args={[0.06, 0.008, 0.02]} />
          <primitive object={materials.blackPlastic} attach="material" />
        </mesh>

        {/* Left Ear */}
        <mesh position={[-0.27, -0.01, 0.02]} rotation={[0, 0.2, -0.15]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <primitive object={materials.skin} attach="material" />
        </mesh>
        {/* Right Ear */}
        <mesh position={[0.27, -0.01, 0.02]} rotation={[0, -0.2, 0.15]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <primitive object={materials.skin} attach="material" />
        </mesh>

        {/* Round Black Glasses (Torus frames) */}
        <group position={[0, 0.01, 0.21]}>
          {/* Left Frame */}
          <mesh position={[-0.095, 0, 0.04]}>
            <torusGeometry args={[0.065, 0.009, 8, 24]} />
            <primitive object={materials.blackPlastic} attach="material" />
          </mesh>
          {/* Right Frame */}
          <mesh position={[0.095, 0, 0.04]}>
            <torusGeometry args={[0.065, 0.009, 8, 24]} />
            <primitive object={materials.blackPlastic} attach="material" />
          </mesh>
          {/* Center Bridge */}
          <mesh position={[0, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.007, 0.007, 0.08, 6]} />
            <primitive object={materials.blackPlastic} attach="material" />
          </mesh>
          {/* Left Temple arm going back */}
          <group position={[-0.165, 0.01, -0.12]} rotation={[0.05, 0.04, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.26, 6]} />
              <primitive object={materials.blackPlastic} attach="material" />
            </mesh>
          </group>
          {/* Right Temple arm going back */}
          <group position={[0.165, 0.01, -0.12]} rotation={[0.05, -0.04, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.26, 6]} />
              <primitive object={materials.blackPlastic} attach="material" />
            </mesh>
          </group>
        </group>

        {/* Over-Ear Headphones (Headband + Earcups) */}
        <group position={[0, 0.02, -0.04]}>
          {/* Headband arch */}
          <mesh rotation={[0.12, 0, 0]}>
            <torusGeometry args={[0.28, 0.018, 8, 24, Math.PI]} />
            <primitive object={materials.blackPlastic} attach="material" />
          </mesh>
          {/* Left Earcup */}
          <mesh position={[-0.28, -0.04, 0.04]} rotation={[0, 0, Math.PI / 2.2]} castShadow>
            <cylinderGeometry args={[0.075, 0.075, 0.04, 16]} />
            <primitive object={materials.blackPlastic} attach="material" />
          </mesh>
          {/* Right Earcup */}
          <mesh position={[0.28, -0.04, 0.04]} rotation={[0, 0, -Math.PI / 2.2]} castShadow>
            <cylinderGeometry args={[0.075, 0.075, 0.04, 16]} />
            <primitive object={materials.blackPlastic} attach="material" />
          </mesh>
        </group>

        {/* Sculpted layered hairstyle (5-6 intersecting smooth ellipsoids) */}
        <group position={[0, 0.08, -0.06]}>
          {/* Main top volume */}
          <mesh position={[0, 0.16, 0.02]} scale={[1.1, 0.8, 1.1]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
          {/* Left side sideburn hair */}
          <mesh position={[-0.14, 0.06, 0.08]} scale={[0.8, 1.1, 0.8]} castShadow>
            <sphereGeometry args={[0.12, 12, 12]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
          {/* Right side sideburn hair */}
          <mesh position={[0.14, 0.06, 0.08]} scale={[0.8, 1.1, 0.8]} castShadow>
            <sphereGeometry args={[0.12, 12, 12]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
          {/* Back neck hair */}
          <mesh position={[0, 0.0, -0.16]} scale={[1.1, 1.1, 0.7]} castShadow>
            <sphereGeometry args={[0.16, 12, 12]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
          {/* Front bangs sweeps */}
          <mesh position={[-0.04, 0.2, 0.14]} scale={[1.1, 0.7, 0.9]} rotation={[0.2, -0.2, -0.1]} castShadow>
            <sphereGeometry args={[0.14, 12, 12]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
          <mesh position={[0.06, 0.18, 0.15]} scale={[1.0, 0.7, 0.9]} rotation={[0.2, 0.15, 0.15]} castShadow>
            <sphereGeometry args={[0.12, 12, 12]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          D. RIGHT ARM & SOLDERING IRON (Procedural IK updates)
          ======================================================== */}
      {/* Right Upper Arm (Orange sleeve mesh) */}
      <mesh ref={upperArmRRef} castShadow>
        <cylinderGeometry args={[0.055, 0.048, 1.0, 10]} />
        <primitive object={materials.jacket} attach="material" />
      </mesh>
      {/* Right Elbow Joint */}
      <mesh ref={elbowRRef} castShadow>
        <sphereGeometry args={[0.052, 10, 10]} />
        <primitive object={materials.jacket} attach="material" />
      </mesh>
      {/* Right Forearm (Skin tone mesh) */}
      <mesh ref={forearmRRef} castShadow>
        <cylinderGeometry args={[0.038, 0.032, 1.0, 10]} />
        <primitive object={materials.skin} attach="material" />
      </mesh>
      {/* Right Hand holding the iron */}
      <mesh ref={handRRef} castShadow>
        <sphereGeometry args={[0.048, 10, 10]} />
        <primitive object={materials.skin} attach="material" />
      </mesh>

      {/* Soldering Iron Object Group */}
      <group ref={ironGroupRef}>
        {/* Iron Handle (dark grey plastic) */}
        <mesh position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.026, 0.026, 0.32, 8]} />
          <primitive object={materials.blackPlastic} attach="material" />
        </mesh>
        {/* Metal shaft/barrel */}
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.22, 8]} />
          <primitive object={materials.ironMetal} attach="material" />
        </mesh>
        {/* Heating core block */}
        <mesh position={[0, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
          <primitive object={materials.ironMetal} attach="material" />
        </mesh>
        {/* Copper/Brass Hot Tip */}
        <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.015, 0.1, 8]} />
          <primitive object={materials.ironTip} attach="material" />
        </mesh>
        {/* Glowing heating element band */}
        {isSoldering && (
          <mesh position={[0, 0, 0.225]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.021, 0.021, 0.02, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        )}
      </group>

      {/* ========================================================
          E. LEFT ARM & SOLDER WIRE FEED (Procedural IK updates)
          ======================================================== */}
      {/* Left Upper Arm (Orange sleeve mesh) */}
      <mesh ref={upperArmLRef} castShadow>
        <cylinderGeometry args={[0.055, 0.048, 1.0, 10]} />
        <primitive object={materials.jacket} attach="material" />
      </mesh>
      {/* Left Elbow Joint */}
      <mesh ref={elbowLRef} castShadow>
        <sphereGeometry args={[0.052, 10, 10]} />
        <primitive object={materials.jacket} attach="material" />
      </mesh>
      {/* Left Forearm (Skin tone mesh) */}
      <mesh ref={forearmLRef} castShadow>
        <cylinderGeometry args={[0.038, 0.032, 1.0, 10]} />
        <primitive object={materials.skin} attach="material" />
      </mesh>
      {/* Left Hand feeding wire */}
      <mesh ref={handLRef} castShadow>
        <sphereGeometry args={[0.048, 10, 10]} />
        <primitive object={materials.skin} attach="material" />
      </mesh>

      {/* Solder wire feed stick (silver thin cylinder from hand to joint) */}
      <mesh ref={wireFeedMeshRef} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 1.0, 4]} />
        <primitive object={materials.solderWire} attach="material" />
      </mesh>
    </group>
  );
}
