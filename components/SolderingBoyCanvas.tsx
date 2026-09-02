"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Spark particle interface
interface Spark {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  active: boolean;
}

// Smoke particle interface
interface Smoke {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  active: boolean;
  baseScale: number;
}

export default function SolderingBoyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();
    
    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.8);
    camera.lookAt(0, 0.2, 0);

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.2);
    scene.add(ambientLight);

    // Blue glow directional light
    const dirLight = new THREE.DirectionalLight(0x4a9eff, 1.0);
    dirLight.position.set(3, 5, 2);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Soft teal fill light
    const fillLight = new THREE.DirectionalLight(0x00d9a3, 0.35);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    // Solder Glow Point Light (at the joint contact point)
    const glowLight = new THREE.PointLight(0xff5500, 0, 3);
    glowLight.castShadow = false;
    scene.add(glowLight);

    // 4. Material Definitions
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x0f1528,
      roughness: 0.7,
      metalness: 0.15,
    });
    
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.45,
      metalness: 0.85,
    });

    const greyMetalMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.3,
      metalness: 0.9,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.2,
      metalness: 0.95,
    });

    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b, // Deep circuit green
      roughness: 0.65,
      metalness: 0.2,
    });

    const solderJointMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Shiny solder tin
      roughness: 0.1,
      metalness: 0.95,
    });

    const plasticMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.6,
    });

    const glowVisorMat = new THREE.MeshBasicMaterial({
      color: 0x00d9a3, // Neon green glowing visor
    });

    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf5ebe0, // Peach skin tone
      roughness: 0.6,
    });

    const sleeveMat = new THREE.MeshStandardMaterial({
      color: 0x172554, // Deep blue hoodie color
      roughness: 0.75,
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x27160c, // Dark brown blocky hair
      roughness: 0.85,
    });

    const solderWireMat = new THREE.MeshStandardMaterial({
      color: 0xcbced4, // Silver solder wire
      metalness: 0.95,
      roughness: 0.2,
    });

    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xef4444,
      emissiveIntensity: 1.2,
    });

    const ledGreenMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.8,
    });

    const lampMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.4,
      metalness: 0.8,
    });

    const oscBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
    });

    const oscScreenMat = new THREE.MeshStandardMaterial({
      color: 0x022c22,
      emissive: 0x022c22,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });

    // 5. Procedural 3D Model Building
    
    // A. Workbench / Tech Mat
    const deskGeom = new THREE.BoxGeometry(10, 0.2, 8);
    const desk = new THREE.Mesh(deskGeom, deskMat);
    desk.position.y = -0.9;
    desk.receiveShadow = true;
    scene.add(desk);

    // Grid helper on workbench
    const gridHelper = new THREE.GridHelper(6, 12, 0x00d9a3, 0x1e293b);
    gridHelper.position.y = -0.79;
    scene.add(gridHelper);

    // B. Soldering Station Box
    const stationGeom = new THREE.BoxGeometry(1, 0.7, 1.1);
    const station = new THREE.Mesh(stationGeom, darkMetalMat);
    station.position.set(-2, -0.45, -1.2);
    station.castShadow = true;
    station.receiveShadow = true;
    scene.add(station);

    // Station dials
    const dialGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 8);
    const dial = new THREE.Mesh(dialGeom, brassMat);
    dial.rotation.x = Math.PI / 2;
    dial.position.set(-2.15, -0.35, -0.63);
    scene.add(dial);

    const statusLED = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), ledGreenMat);
    statusLED.position.set(-1.75, -0.3, -0.64);
    scene.add(statusLED);

    // C. Perf Board
    const boardGeom = new THREE.BoxGeometry(1.8, 0.08, 1.4);
    const board = new THREE.Mesh(boardGeom, boardMat);
    board.position.set(0, -0.75, 0.2);
    board.receiveShadow = true;
    scene.add(board);

    // Component: IC Chip
    const icBodyGeom = new THREE.BoxGeometry(0.5, 0.15, 0.25);
    const icBody = new THREE.Mesh(icBodyGeom, plasticMat);
    icBody.position.set(-0.3, -0.65, 0.15);
    icBody.castShadow = true;
    scene.add(icBody);

    // IC Pins
    const pinGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.1, 4);
    for (let i = -2; i <= 2; i++) {
      const pinL = new THREE.Mesh(pinGeom, greyMetalMat);
      pinL.position.set(-0.3 + i * 0.09, -0.72, 0.01);
      scene.add(pinL);

      const pinR = new THREE.Mesh(pinGeom, greyMetalMat);
      pinR.position.set(-0.3 + i * 0.09, -0.72, 0.29);
      scene.add(pinR);
    }

    // Component: Electrolytic Capacitor
    const capGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.35, 8);
    const cap = new THREE.Mesh(capGeom, darkMetalMat);
    cap.position.set(0.4, -0.55, 0.5);
    cap.castShadow = true;
    scene.add(cap);

    const capTopGeom = new THREE.CylinderGeometry(0.11, 0.11, 0.02, 8);
    const capTop = new THREE.Mesh(capTopGeom, greyMetalMat);
    capTop.position.set(0.4, -0.36, 0.5);
    scene.add(capTop);

    // D. Solder Joints on Board
    const jointTargets = [
      new THREE.Vector3(-0.1, -0.7, 0.5),
      new THREE.Vector3(0.1, -0.7, -0.1),
      new THREE.Vector3(0.5, -0.7, 0.1),
    ];

    const jointMeshes: THREE.Mesh[] = [];
    const jointGeom = new THREE.CylinderGeometry(0.06, 0.08, 0.05, 8);
    jointTargets.forEach((pos) => {
      const j = new THREE.Mesh(jointGeom, solderJointMat);
      j.position.copy(pos);
      j.position.y = -0.73;
      scene.add(j);
      jointMeshes.push(j);
    });

    // E. Stylized Low-Poly Boy
    // Torso
    const torsoGeom = new THREE.BoxGeometry(1.4, 1.8, 0.8);
    const torso = new THREE.Mesh(torsoGeom, sleeveMat);
    torso.position.set(0.2, 0.3, -2.4);
    torso.rotation.y = -0.1;
    torso.castShadow = true;
    scene.add(torso);

    // Head Group (helps rotate head + hair + goggles + headphones as one unit)
    const headGroup = new THREE.Group();
    headGroup.position.set(0.2, 1.5, -2.3);
    headGroup.rotation.set(0.25, -0.15, 0); // Looking down and slightly rotated
    scene.add(headGroup);

    // Head Base
    const headGeom = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const head = new THREE.Mesh(headGeom, skinMat);
    head.castShadow = true;
    headGroup.add(head);

    // VR Goggles / Safety Visor
    const visorGeom = new THREE.BoxGeometry(0.62, 0.18, 0.12);
    const visor = new THREE.Mesh(visorGeom, glowVisorMat);
    visor.position.set(0, 0.06, 0.35);
    headGroup.add(visor);

    // Stylized Hair
    const hairTopGeom = new THREE.BoxGeometry(0.74, 0.2, 0.74);
    const hairTop = new THREE.Mesh(hairTopGeom, hairMat);
    hairTop.position.set(0, 0.35, 0);
    headGroup.add(hairTop);

    const hairBackGeom = new THREE.BoxGeometry(0.74, 0.5, 0.15);
    const hairBack = new THREE.Mesh(hairBackGeom, hairMat);
    hairBack.position.set(0, 0, -0.37);
    headGroup.add(hairBack);

    const hairFrontGeom = new THREE.BoxGeometry(0.74, 0.22, 0.2);
    const hairFront = new THREE.Mesh(hairFrontGeom, hairMat);
    hairFront.position.set(0, 0.3, 0.28);
    headGroup.add(hairFront);

    // Headphones Band
    const headphoneBandGeom = new THREE.TorusGeometry(0.42, 0.035, 8, 24, Math.PI);
    const headphoneBand = new THREE.Mesh(headphoneBandGeom, plasticMat);
    headphoneBand.position.set(0, 0.1, 0);
    headphoneBand.rotation.z = Math.PI; // over the head top
    headGroup.add(headphoneBand);

    // Ear Cups
    const earCupGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 8);
    const earCupL = new THREE.Mesh(earCupGeom, darkMetalMat);
    earCupL.position.set(-0.37, 0, 0);
    earCupL.rotation.z = Math.PI / 2;
    headGroup.add(earCupL);

    const earCupR = new THREE.Mesh(earCupGeom, darkMetalMat);
    earCupR.position.set(0.37, 0, 0);
    earCupR.rotation.z = Math.PI / 2;
    headGroup.add(earCupR);

    // F. Right Arm holding the Soldering Iron (Human Skin & Hoodie Sleeve)
    const shoulderPos = new THREE.Vector3(0.7, 0.8, -1.9);
    const shoulderGeom = new THREE.SphereGeometry(0.13, 8, 8);
    const shoulder = new THREE.Mesh(shoulderGeom, sleeveMat);
    shoulder.position.copy(shoulderPos);
    scene.add(shoulder);

    // Right Arm Links
    const upperArmGeom = new THREE.CylinderGeometry(0.07, 0.06, 1, 8);
    const upperArm = new THREE.Mesh(upperArmGeom, sleeveMat);
    upperArm.castShadow = true;
    scene.add(upperArm);

    const forearmGeom = new THREE.CylinderGeometry(0.05, 0.04, 1, 8);
    const forearm = new THREE.Mesh(forearmGeom, skinMat);
    forearm.castShadow = true;
    scene.add(forearm);

    const elbowGeom = new THREE.SphereGeometry(0.09, 8, 8);
    const elbow = new THREE.Mesh(elbowGeom, sleeveMat);
    scene.add(elbow);

    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), skinMat);
    handR.castShadow = true;
    scene.add(handR);

    // G. Left Arm feeding Solder Wire (Human Skin & Hoodie Sleeve)
    const shoulderPosL = new THREE.Vector3(-0.3, 0.8, -1.9);
    const shoulderL = new THREE.Mesh(shoulderGeom, sleeveMat);
    shoulderL.position.copy(shoulderPosL);
    scene.add(shoulderL);

    // Left Arm Links
    const upperArmL = new THREE.Mesh(upperArmGeom, sleeveMat);
    upperArmL.castShadow = true;
    scene.add(upperArmL);

    const forearmL = new THREE.Mesh(forearmGeom, skinMat);
    forearmL.castShadow = true;
    scene.add(forearmL);

    const elbowL = new THREE.Mesh(elbowGeom, sleeveMat);
    scene.add(elbowL);

    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), skinMat);
    handL.castShadow = true;
    scene.add(handL);

    // Solder wire feed mesh (sticking out of left hand pointing to joint)
    const wireFeedGeom = new THREE.CylinderGeometry(0.008, 0.008, 1, 4);
    const wireFeedMesh = new THREE.Mesh(wireFeedGeom, solderWireMat);
    wireFeedMesh.castShadow = true;
    scene.add(wireFeedMesh);

    // H. Soldering Iron
    const ironGroup = new THREE.Group();
    scene.add(ironGroup);

    // Handle
    const handleGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8);
    const handle = new THREE.Mesh(handleGeom, plasticMat);
    handle.rotation.x = Math.PI / 2;
    handle.position.z = -0.3;
    handle.castShadow = true;
    ironGroup.add(handle);

    // Heater element
    const barrelGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.4, 8);
    const barrel = new THREE.Mesh(barrelGeom, greyMetalMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = 0.2;
    barrel.castShadow = true;
    ironGroup.add(barrel);

    // Tip
    const tipGeom = new THREE.CylinderGeometry(0.025, 0.006, 0.15, 8);
    const tip = new THREE.Mesh(tipGeom, brassMat);
    tip.rotation.x = Math.PI / 2;
    tip.position.z = 0.475;
    ironGroup.add(tip);

    // Soldering Iron Power Cord
    const wirePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      wirePoints.push(new THREE.Vector3());
    }
    const wireCurve = new THREE.CatmullRomCurve3(wirePoints);
    const wireGeom = new THREE.TubeGeometry(wireCurve, 20, 0.015, 6, false);
    const wireMesh = new THREE.Mesh(wireGeom, plasticMat);
    scene.add(wireMesh);

    // I. Desk Lamp with Volumetric Warm Shadow Spotlight
    const lampBaseGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 8);
    const lampBase = new THREE.Mesh(lampBaseGeom, lampMat);
    lampBase.position.set(-1.8, -0.78, 1.0);
    lampBase.receiveShadow = true;
    scene.add(lampBase);

    // Lower stem
    const lampLowerGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.9, 6);
    const lampLower = new THREE.Mesh(lampLowerGeom, lampMat);
    lampLower.position.set(-1.8, -0.33, 1.0);
    lampLower.rotation.z = -0.1; // tilt slightly inward
    lampLower.castShadow = true;
    scene.add(lampLower);

    const lampJointGeom = new THREE.SphereGeometry(0.05, 8, 8);
    const lampJoint = new THREE.Mesh(lampJointGeom, darkMetalMat);
    lampJoint.position.set(-1.7, 0.12, 1.0);
    scene.add(lampJoint);

    // Upper stem
    const lampUpperGeom = new THREE.CylinderGeometry(0.028, 0.028, 0.9, 6);
    const lampUpper = new THREE.Mesh(lampUpperGeom, lampMat);
    lampUpper.position.set(-1.4, 0.48, 0.6);
    // Aiming towards center of board
    lampUpper.lookAt(new THREE.Vector3(0, -0.5, 0.2));
    lampUpper.castShadow = true;
    scene.add(lampUpper);

    // Shade
    const lampShadeGeom = new THREE.ConeGeometry(0.2, 0.35, 8);
    const lampShade = new THREE.Mesh(lampShadeGeom, lampMat);
    lampShade.position.set(-1.1, 0.85, 0.4);
    lampShade.lookAt(new THREE.Vector3(0, -0.75, 0.2));
    lampShade.rotateX(Math.PI / 2);
    lampShade.castShadow = true;
    scene.add(lampShade);

    // Spotlight inside shade
    const lampLight = new THREE.SpotLight(0xffea79, 7, 8, Math.PI / 4, 0.4, 1.2);
    lampLight.position.set(-1.1, 0.85, 0.4);
    lampLight.target = board;
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.width = 512;
    lampLight.shadow.mapSize.height = 512;
    lampLight.shadow.bias = -0.002;
    scene.add(lampLight);

    // J. Mini Oscilloscope with Live Sine Wave Screen
    const oscGroup = new THREE.Group();
    oscGroup.position.set(1.8, -0.45, -0.8);
    oscGroup.rotation.y = -0.3; // slightly angled towards the center
    scene.add(oscGroup);

    const oscBodyGeom = new THREE.BoxGeometry(0.9, 0.55, 0.7);
    const oscBody = new THREE.Mesh(oscBodyGeom, oscBodyMat);
    oscBody.castShadow = true;
    oscGroup.add(oscBody);

    const oscScreenGeom = new THREE.BoxGeometry(0.65, 0.38, 0.02);
    const oscScreen = new THREE.Mesh(oscScreenGeom, oscScreenMat);
    oscScreen.position.set(0, 0, 0.36);
    oscGroup.add(oscScreen);

    // Live wave line on screen
    const wavePoints: THREE.Vector3[] = [];
    const numWavePoints = 24;
    for (let i = 0; i < numWavePoints; i++) {
      const x = -0.28 + (i / (numWavePoints - 1)) * 0.56;
      wavePoints.push(new THREE.Vector3(x, 0, 0.38));
    }
    const waveGeom = new THREE.BufferGeometry().setFromPoints(wavePoints);
    const waveMat = new THREE.LineBasicMaterial({ color: 0x00d9a3 }); // Teal match
    const waveLine = new THREE.Line(waveGeom, waveMat);
    oscGroup.add(waveLine);

    // K. Desk Clutter / Extra Components
    // Solder wire spool
    const spoolGroup = new THREE.Group();
    spoolGroup.position.set(-1.1, -0.75, 0.5);
    spoolGroup.rotation.y = 0.5;
    scene.add(spoolGroup);

    const spoolCapGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 8);
    const spoolCapBottom = new THREE.Mesh(spoolCapGeom, darkMetalMat);
    spoolCapBottom.position.y = -0.1;
    spoolGroup.add(spoolCapBottom);

    const spoolCapTop = new THREE.Mesh(spoolCapGeom, darkMetalMat);
    spoolCapTop.position.y = 0.1;
    spoolGroup.add(spoolCapTop);

    const spoolWireGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.18, 8);
    const spoolWire = new THREE.Mesh(spoolWireGeom, solderWireMat);
    spoolGroup.add(spoolWire);

    // Resistor
    const resistorGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.14, 6);
    const resistor = new THREE.Mesh(resistorGeom, new THREE.MeshStandardMaterial({ color: 0xd9b98e, roughness: 0.6 }));
    resistor.position.set(0.8, -0.77, 0.7);
    resistor.rotation.set(0, 0.8, Math.PI / 2);
    resistor.castShadow = true;
    scene.add(resistor);

    // Glowing LED
    const ledDomeGeom = new THREE.SphereGeometry(0.04, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const ledDome = new THREE.Mesh(ledDomeGeom, ledMat);
    ledDome.position.set(0.8, -0.76, 0.9);
    scene.add(ledDome);

    // 6. Particle Systems Setup
    // A. Sparks Pool
    const maxSparks = 25;
    const sparks: Spark[] = [];
    const sparkGeom = new THREE.SphereGeometry(0.015, 4, 4);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

    for (let i = 0; i < maxSparks; i++) {
      const mesh = new THREE.Mesh(sparkGeom, sparkMat);
      mesh.visible = false;
      scene.add(mesh);
      sparks.push({
        mesh,
        velocity: new THREE.Vector3(),
        life: 0,
        maxLife: 0,
        active: false,
      });
    }

    // B. Smoke Pool
    const maxSmoke = 35;
    const smokePool: Smoke[] = [];
    const smokeGeom = new THREE.SphereGeometry(0.035, 6, 6);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      transparent: true,
      opacity: 0,
    });

    for (let i = 0; i < maxSmoke; i++) {
      const mesh = new THREE.Mesh(smokeGeom, smokeMat.clone());
      mesh.visible = false;
      scene.add(mesh);
      smokePool.push({
        mesh,
        velocity: new THREE.Vector3(),
        life: 0,
        maxLife: 0,
        active: false,
        baseScale: 1.0,
      });
    }

    // 7. Spawn Triggers
    const triggerSpark = (pos: THREE.Vector3) => {
      const spark = sparks.find((s) => !s.active);
      if (!spark) return;

      spark.active = true;
      spark.mesh.visible = true;
      spark.mesh.position.copy(pos);
      spark.mesh.position.y += 0.03;
      
      spark.velocity.set(
        (Math.random() - 0.5) * 1.6,
        Math.random() * 1.5 + 0.6,
        (Math.random() - 0.5) * 1.6
      );
      spark.life = 0;
      spark.maxLife = 18 + Math.random() * 12;
    };

    const triggerSmoke = (pos: THREE.Vector3) => {
      const smoke = smokePool.find((s) => !s.active);
      if (!smoke) return;

      smoke.active = true;
      smoke.mesh.visible = true;
      smoke.mesh.position.copy(pos);
      smoke.mesh.position.y += 0.04;
      
      smoke.velocity.set(
        (Math.random() - 0.5) * 0.18,
        Math.random() * 0.35 + 0.25,
        (Math.random() - 0.5) * 0.18
      );
      smoke.life = 0;
      smoke.maxLife = 45 + Math.random() * 25;
      smoke.baseScale = 0.4 + Math.random() * 0.6;
      
      const mat = smoke.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.45;
      mat.color.setHex(Math.random() > 0.45 ? 0xe2e8f0 : 0xa7f3d0); // Silver smoke or teal hue
    };

    // 8. Mouse Tracker for Interactive Parallax
    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 9. Animation States & Chrono Loop
    let cycleTime = 0;
    let targetIndex = 0;
    
    const restHandPos = new THREE.Vector3(-1.1, 0.4, 0.4);
    const activeHandPos = new THREE.Vector3();
    const currentHandPos = restHandPos.clone();
    const currentHandPosL = new THREE.Vector3();
    
    // Left hand rest position on the bench
    const restHandPosL = new THREE.Vector3(-0.5, -0.4, 0.2);
    const activeHandPosL = new THREE.Vector3();

    const tipOffset = new THREE.Vector3(0, 0, 0.55);

    // Visibility Observer to pause loop when out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animFrameId: number;
    setIsLoaded(true);

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      cycleTime += 0.015;

      // Solder Cycle: 7s loop
      // 0.0 - 1.5s: Descend iron to joint & move left arm holding solder wire close
      // 1.5 - 3.5s: Soldering contact (flashes, spark particles, rising smoke, signal spikes)
      // 3.5 - 5.0s: Retract hands
      // 5.0 - 7.0s: Idle rest
      const cycleDuration = 7.0;
      const t = cycleTime % cycleDuration;

      const currentJointTarget = jointTargets[targetIndex];
      
      // Target hand position puts iron tip on joint
      activeHandPos.copy(currentJointTarget).sub(tipOffset);
      
      // Target left hand places the solder wire feed close to the joint
      activeHandPosL.copy(currentJointTarget).add(new THREE.Vector3(-0.12, 0.04, 0.04));

      let contactState = false;

      if (t < 1.5) {
        // Move Down
        const progress = t / 1.5;
        const ease = progress * progress * (3 - 2 * progress);
        currentHandPos.lerpVectors(restHandPos, activeHandPos, ease);
        currentHandPosL.lerpVectors(restHandPosL, activeHandPosL, ease);
      } else if (t < 3.5) {
        // Contact Soldering
        currentHandPos.copy(activeHandPos);
        currentHandPosL.copy(activeHandPosL);
        contactState = true;
        
        // Emissive tip pulsing (soldering iron glowing hot)
        const tipPulse = Math.sin(cycleTime * 20) * 0.15 + 0.85;
        tip.material = new THREE.MeshStandardMaterial({
          color: 0xff3700,
          emissive: 0xff3700,
          emissiveIntensity: tipPulse * 1.8,
          roughness: 0.1,
        });

        // Point Light Glow
        glowLight.position.copy(currentJointTarget);
        glowLight.position.y += 0.05;
        glowLight.intensity = (Math.sin(cycleTime * 28) * 0.35 + 1.15) * 2.2;
        glowLight.color.setHex(0xff5500);

        // Spawn particles
        if (Math.random() < 0.24) {
          triggerSpark(currentJointTarget);
        }
        if (Math.random() < 0.15) {
          triggerSmoke(currentJointTarget);
        }
      } else if (t < 5.0) {
        // Move Up
        const progress = (t - 3.5) / 1.5;
        const ease = progress * progress * (3 - 2 * progress);
        currentHandPos.lerpVectors(activeHandPos, restHandPos, ease);
        currentHandPosL.lerpVectors(activeHandPosL, restHandPosL, ease);
        
        // Reset iron tip
        tip.material = brassMat;
        glowLight.intensity = Math.max(0, glowLight.intensity - 0.12);
      } else {
        // Idle Rest
        currentHandPos.copy(restHandPos);
        currentHandPosL.copy(restHandPosL);
        glowLight.intensity = 0;
        
        if (t >= cycleDuration - 0.02) {
          targetIndex = (targetIndex + 1) % jointTargets.length;
        }
      }

      // 10. Update Right Arm Joints & Gripping Hand
      const handPos = currentHandPos;
      ironGroup.position.copy(handPos);
      handR.position.copy(handPos);
      
      const lookTarget = new THREE.Vector3().copy(handPos).add(tipOffset);
      if (contactState) {
        lookTarget.copy(currentJointTarget);
      } else {
        lookTarget.y -= 0.6;
        lookTarget.z += 0.25;
      }
      ironGroup.lookAt(lookTarget);

      // Right elbow calculations
      const elbowPos = new THREE.Vector3()
        .addVectors(shoulderPos, handPos)
        .multiplyScalar(0.5);
      elbowPos.y += 0.42;
      elbowPos.x += 0.12;
      elbowPos.z -= 0.18;
      elbow.position.copy(elbowPos);

      // Draw right upper arm (shoulder to elbow)
      const distSE = shoulderPos.distanceTo(elbowPos);
      upperArm.position.copy(shoulderPos).add(elbowPos).multiplyScalar(0.5);
      upperArm.scale.set(1, distSE, 1);
      const dirSE = new THREE.Vector3().subVectors(elbowPos, shoulderPos).normalize();
      const quaternionSE = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirSE);
      upperArm.quaternion.copy(quaternionSE);

      // Draw right forearm (elbow to hand)
      const distEH = elbowPos.distanceTo(handPos);
      forearm.position.copy(elbowPos).add(handPos).multiplyScalar(0.5);
      forearm.scale.set(1, distEH, 1);
      const dirEH = new THREE.Vector3().subVectors(handPos, elbowPos).normalize();
      const quaternionEH = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirEH);
      forearm.quaternion.copy(quaternionEH);

      // 11. Update Left Arm Joints & Solder Wire Feed
      handL.position.copy(currentHandPosL);

      // Left elbow calculations
      const elbowPosL = new THREE.Vector3()
        .addVectors(shoulderPosL, currentHandPosL)
        .multiplyScalar(0.5);
      elbowPosL.y += 0.38;
      elbowPosL.x -= 0.16; // bend leftward
      elbowPosL.z -= 0.15;
      elbowL.position.copy(elbowPosL);

      // Draw left upper arm (shoulderL to elbowL)
      const distSEL = shoulderPosL.distanceTo(elbowPosL);
      upperArmL.position.copy(shoulderPosL).add(elbowPosL).multiplyScalar(0.5);
      upperArmL.scale.set(1, distSEL, 1);
      const dirSEL = new THREE.Vector3().subVectors(elbowPosL, shoulderPosL).normalize();
      const quaternionSEL = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirSEL);
      upperArmL.quaternion.copy(quaternionSEL);

      // Draw left forearm (elbowL to handL)
      const distEHL = elbowPosL.distanceTo(currentHandPosL);
      forearmL.position.copy(elbowPosL).add(currentHandPosL).multiplyScalar(0.5);
      forearmL.scale.set(1, distEHL, 1);
      const dirEHL = new THREE.Vector3().subVectors(currentHandPosL, elbowPosL).normalize();
      const quaternionEHL = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirEHL);
      forearmL.quaternion.copy(quaternionEHL);

      // Update Solder Wire Feed (cylinder extending from Left Hand to joint target)
      const wireFeedTarget = contactState ? currentJointTarget : new THREE.Vector3(0, -0.74, 0.2);
      wireFeedMesh.position.copy(currentHandPosL).add(wireFeedTarget).multiplyScalar(0.5);
      const distWire = currentHandPosL.distanceTo(wireFeedTarget);
      wireFeedMesh.scale.set(1, distWire, 1);
      const dirWire = new THREE.Vector3().subVectors(wireFeedTarget, currentHandPosL).normalize();
      const quaternionWire = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirWire);
      wireFeedMesh.quaternion.copy(quaternionWire);

      // 12. Update Soldering Iron Power Cord
      const cordStart = new THREE.Vector3(-2, -0.1, -1.2);
      const cordEnd = new THREE.Vector3().copy(handPos).add(new THREE.Vector3(0, 0, -0.3));
      
      for (let i = 0; i <= 20; i++) {
        const segment = i / 20;
        const pt = new THREE.Vector3().lerpVectors(cordStart, cordEnd, segment);
        const sag = Math.sin(segment * Math.PI) * 0.45;
        pt.y -= sag;
        pt.z += sag * 0.18;
        wirePoints[i].copy(pt);
      }
      wireCurve.points = wirePoints;
      wireMesh.geometry.dispose();
      wireMesh.geometry = new THREE.TubeGeometry(wireCurve, 20, 0.015, 6, false);

      // 13. Update Oscilloscope Screen Wave
      const posAttr = waveGeom.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < numWavePoints; i++) {
        const x = -0.28 + (i / (numWavePoints - 1)) * 0.56;
        let y = 0;
        if (contactState) {
          // Jittery high frequency wave when soldering
          y = Math.sin(cycleTime * 28 + x * 24) * 0.075 + (Math.random() - 0.5) * 0.018;
        } else {
          // Slow harmonic wave when idle
          y = Math.sin(cycleTime * 6 + x * 12) * 0.035;
        }
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;

      // 14. Update Particles
      // Sparks
      sparks.forEach((s) => {
        if (!s.active) return;
        s.mesh.position.add(s.velocity);
        s.velocity.y -= 0.04;
        s.life += 1;
        
        const ratio = 1 - s.life / s.maxLife;
        s.mesh.scale.setScalar(ratio);
        
        if (s.life >= s.maxLife) {
          s.active = false;
          s.mesh.visible = false;
        }
      });

      // Smoke
      smokePool.forEach((sm) => {
        if (!sm.active) return;
        sm.mesh.position.add(sm.velocity);
        sm.life += 1;

        const ratio = sm.life / sm.maxLife;
        const opacity = Math.max(0, 0.4 * (1 - ratio));
        const scaleVal = sm.baseScale * (1 + ratio * 2.3);
        sm.mesh.scale.setScalar(scaleVal);

        const mat = sm.mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = opacity;

        if (sm.life >= sm.maxLife) {
          sm.active = false;
          sm.mesh.visible = false;
        }
      });

      // 15. Subtle Boy Breathing/Head movement
      const breathing = Math.sin(cycleTime * 3) * 0.012;
      torso.position.y = 0.3 + breathing;
      headGroup.position.y = 1.5 + breathing * 1.5;

      // 16. Mouse Camera Parallax (Interactive Tilt)
      const targetCamX = mouse.x * 0.8;
      const targetCamY = 3.2 + mouse.y * 0.45;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.lookAt(0, 0.15, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 17. Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 18. Component Cleanup Lifecycle (Disposing all geometries & materials to prevent leaks)
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();

      // Dispose geometries
      deskGeom.dispose();
      gridHelper.dispose();
      stationGeom.dispose();
      dialGeom.dispose();
      boardGeom.dispose();
      icBodyGeom.dispose();
      pinGeom.dispose();
      capGeom.dispose();
      capTopGeom.dispose();
      jointGeom.dispose();
      torsoGeom.dispose();
      headGeom.dispose();
      visorGeom.dispose();
      hairTopGeom.dispose();
      hairBackGeom.dispose();
      hairFrontGeom.dispose();
      headphoneBandGeom.dispose();
      earCupGeom.dispose();
      shoulderGeom.dispose();
      upperArmGeom.dispose();
      forearmGeom.dispose();
      elbowGeom.dispose();
      wireFeedGeom.dispose();
      handleGeom.dispose();
      barrelGeom.dispose();
      tipGeom.dispose();
      wireGeom.dispose();
      lampBaseGeom.dispose();
      lampLowerGeom.dispose();
      lampJointGeom.dispose();
      lampUpperGeom.dispose();
      lampShadeGeom.dispose();
      oscBodyGeom.dispose();
      oscScreenGeom.dispose();
      waveGeom.dispose();
      spoolCapGeom.dispose();
      spoolWireGeom.dispose();
      resistorGeom.dispose();
      ledDomeGeom.dispose();
      sparkGeom.dispose();
      smokeGeom.dispose();

      // Dispose materials
      deskMat.dispose();
      darkMetalMat.dispose();
      greyMetalMat.dispose();
      brassMat.dispose();
      boardMat.dispose();
      solderJointMat.dispose();
      plasticMat.dispose();
      glowVisorMat.dispose();
      skinMat.dispose();
      sleeveMat.dispose();
      hairMat.dispose();
      solderWireMat.dispose();
      ledMat.dispose();
      ledGreenMat.dispose();
      lampMat.dispose();
      oscBodyMat.dispose();
      oscScreenMat.dispose();
      waveMat.dispose();
      sparkMat.dispose();
      smokeMat.dispose();

      sparks.forEach((s) => s.mesh.geometry.dispose());
      smokePool.forEach((sm) => {
        sm.mesh.geometry.dispose();
        (sm.mesh.material as THREE.Material).dispose();
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full relative transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ minHeight: "350px" }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent-teal border-t-transparent" />
            <span className="font-mono text-[11px] text-text-secondary uppercase tracking-widest">
              Initializing 3D Telemetry...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
