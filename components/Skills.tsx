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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <motion.div
              key={g.title}
              variants={fadeUp}
              className="rounded-xl border border-border bg-bg-card p-6 transition-colors duration-300 hover:border-border-accent"
            >
              <h3 className="font-mono text-[12px] uppercase tracking-wider text-accent-blue mb-4">
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-md border border-[#00D9A3]/15 bg-bg-primary/40 px-2.5 py-1 text-[11px] font-mono text-text-secondary hover:text-accent-teal hover:border-accent-teal/40 transition-all duration-200"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
