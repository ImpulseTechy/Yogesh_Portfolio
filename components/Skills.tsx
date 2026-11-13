"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Group = {
  title: string;
  items: string[];
};

const groups: Group[] = [
  {
    title: "Hardware",
    items: [
      "ESP32",
      "Raspberry Pi Pico",
      "Arduino BLE",
      "Micro:bit",
      "2-layer Boards",
      "Multi-layer PCBs",
      "Soldering & Prototyping",
      "Lab Instruments",
    ],
  },
  {
    title: "EDA",
    items: [
      "EasyEDA",
      "KiCad",
      "Gerber Generation",
      "PCB Fabrication",
      "Ferric Chloride Etching",
    ],
  },
  {
    title: "Firmware",
    items: [
      "MicroPython",
      "Arduino C++",
      "ROS 2 (Humble)",
      "RTOS Concepts",
      "Web Serial API",
      "ESP-IDF",
    ],
  },
  {
    title: "VLSI",
    items: [
      "VLSI Design",
      "MOS Devices",
      "Analog IC Design",
      "CAD flow",
      "Verilog HDL",
    ],
  },
  {
    title: "CAD",
    items: [
      "Autodesk Fusion 360",
      "SolidWorks",
      "3D Printing",
      "Enclosure Design",
      "3D Modeling",
    ],
  },
  {
    title: "Education",
    items: [
      "STEM Curriculum Design",
      "Workshop Facilitation",
      "B2B Curriculum",
      "Space Engineering Framework",
      "Competency-based Learning",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          index="08"
          label="Skills"
          title="Toolbox"
          subtitle="Hardware, firmware, EDA, VLSI, and curriculum design — the stack behind every product and program."
        />

        <motion.dl
          variants={fadeUp}
          className="divide-y divide-border rounded-xl border border-border bg-bg-card"
        >
          {groups.map((g) => (
            <div key={g.title} className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[120px_1fr] sm:gap-6">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-accent-blue">
                {g.title}
              </dt>
              <dd className="text-[13px] leading-[1.7] text-text-secondary">
                {g.items.join(" · ")}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
