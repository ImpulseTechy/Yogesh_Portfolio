"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Group = {
  title: string;
  accent: "blue" | "teal" | "amber";
  items: string[];
};

const groups: Group[] = [
  {
    title: "Hardware Design",
    accent: "blue",
    items: [
      "ESP32",
      "Raspberry Pi Pico",
      "Arduino Nano 33 BLE",
      "Micro:bit",
      "PCB Layout",
      "Copper Pour",
      "2-layer Boards",
    ],
  },
  {
    title: "PCB & EDA Tools",
    accent: "amber",
    items: ["EasyEDA", "KiCad", "Gerber Files", "Ferric Chloride Etching"],
  },
  {
    title: "Embedded & Firmware",
    accent: "teal",
    items: ["MicroPython", "Arduino C++", "ROS 2 (Humble)", "RTOS Concepts"],
  },
  {
    title: "VLSI & Electronics (M.Tech)",
    accent: "blue",
    items: ["VLSI Design", "MOS Devices", "Analog IC Design", "CAD for VLSI"],
  },
  {
    title: "Education & Curriculum",
    accent: "teal",
    items: [
      "STEM Curriculum Design",
      "Workshop Facilitation",
      "B2B Curriculum",
      "Space Engineering Framework",
      "Competency-based Learning",
    ],
  },
  {
    title: "Platforms & Tools",
    accent: "amber",
    items: ["Python", "Git", "EasyEDA", "Notion", "Linux (Ubuntu)"],
  },
];

const pillByAccent: Record<Group["accent"], string> = {
  blue: "border-accent-blue/20 bg-accent-blue-dim text-accent-blue-light",
  teal: "border-accent-teal/20 bg-accent-teal-dim text-accent-teal-light",
  amber: "border-accent-amber/20 bg-accent-amber-dim text-accent-amber-light",
};

const dotByAccent: Record<Group["accent"], string> = {
  blue: "bg-accent-blue",
  teal: "bg-accent-teal-light",
  amber: "bg-accent-amber-light",
};

export default function Skills() {
  return (
    <section className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          label="Skills"
          title="Toolbox"
          subtitle="Hardware, firmware, EDA, VLSI, and curriculum design — the stack behind every product and program."
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <motion.div
              key={g.title}
              variants={fadeUp}
              className="rounded-xl border border-white/5 bg-bg-card p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${dotByAccent[g.accent]}`} />
                <h3 className="font-heading text-[14px] text-text-primary">
                  {g.title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className={`rounded-md border px-2 py-0.5 text-[11px] ${pillByAccent[g.accent]}`}
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
