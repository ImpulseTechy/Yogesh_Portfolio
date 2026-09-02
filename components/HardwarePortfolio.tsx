"use client";

import { motion } from "framer-motion";
import { Satellite, Cpu, Zap, BrainCircuit, Blocks } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Product = {
  title: string;
  icon: React.ReactNode;
  accent: "teal" | "blue";
  description: string;
  status: string;
  tags: string[];
};

const heroProduct = {
  title: "CubeSat Education Kit",
  icon: <Satellite size={22} className="text-accent-teal" />,
  description:
    "A complete 48-session space engineering program (Level 4) covering satellite subsystems, ADCS, thermal design, and ground station comms. Deployed at IIIT Nagpur and with international learners across USA and Dubai.",
  status: "Research Paper · In Prep",
  stats: [
    { value: "25", label: "students" },
    { value: "3", label: "countries" },
    { value: "48", label: "sessions" },
    { value: "L4", label: "space engineering" },
  ],
  tags: ["CubeSat", "Space Tech", "Avionics", "Ground Station"],
};

const otherProducts: Product[] = [
  {
    title: "MakerPy",
    icon: <Cpu size={18} />,
    accent: "blue",
    description:
      "A Python learning microcontroller board on Raspberry Pi Pico. Designed for ages 8–10 as Level 1 of the Orbital Explorers program. Makes hardware programming as easy as Scratch.",
    status: "ACTIVE",
    tags: ["Raspberry Pi Pico", "MicroPython", "Ages 8–10"],
  },
  {
    title: "ESP32 IoT Teaching PCB",
    icon: <Zap size={18} />,
    accent: "teal",
    description:
      "A custom 2-layer ESP32 breakout board designed in EasyEDA for IoT workshops. Includes onboard sensors, clean silkscreen for student labeling, and copper pour ground plane.",
    status: "v2 IN PROGRESS",
    tags: ["ESP32", "EasyEDA", "PCB Design"],
  },
  {
    title: "Embedded ML Board",
    icon: <BrainCircuit size={18} />,
    accent: "blue",
    description:
      "Arduino Nano 33 BLE Rev 2-based board for TinyML experiments. Used for gesture recognition and edge AI demonstrations in advanced robotics sessions.",
    status: "ACTIVE",
    tags: ["Arduino", "TinyML", "Edge AI"],
  },
  {
    title: "Micro:bit Learning Board",
    icon: <Blocks size={18} />,
    accent: "teal",
    description:
      "A BBC Micro:bit based learning board designed for younger students. Block-programming friendly with visual feedback sensors for introductory electronics education.",
    status: "ACTIVE",
    tags: ["Micro:bit", "Kids", "Block Programming"],
  },
];

export default function HardwarePortfolio() {
  return (
    <section id="projects" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          index="02"
          label="Hardware Portfolio"
          title="Products I've Built"
          subtitle="From classroom teaching boards to CubeSat education kits — each product solves a real learning gap."
        />

        {/* Hero CubeSat Card */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="mb-8 overflow-hidden rounded-xl border border-[rgba(0,217,163,0.4)] bg-bg-card p-6 md:p-8 shadow-[0_0_20px_rgba(0,217,163,0.06)] transition-all hover:border-[rgba(0,217,163,0.6)] hover:bg-bg-card-hover"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[rgba(0,217,163,0.1)] border border-[rgba(0,217,163,0.2)]">
                {heroProduct.icon}
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent-teal">
                  Featured Project
                </span>
                <h3 className="font-heading text-xl font-bold text-text-primary md:text-2xl">
                  {heroProduct.title}
                </h3>
              </div>
            </div>
            <span className="rounded bg-[rgba(0,217,163,0.08)] border border-[rgba(0,217,163,0.2)] px-2.5 py-1 text-[10px] font-mono tracking-wider text-accent-teal">
              {heroProduct.status}
            </span>
          </div>

          <p className="mt-4 text-[14px] leading-[1.7] text-text-secondary max-w-3xl">
            {heroProduct.description}
          </p>

          {/* Outcome Stats Row */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-y border-[rgba(0,217,163,0.1)] py-4 sm:flex sm:flex-wrap sm:gap-8">
            {heroProduct.stats.map((stat) => (
              <div key={stat.label} className="font-mono text-[12px]">
                <span className="font-semibold text-accent-teal">{stat.value}</span>{" "}
                <span className="text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {heroProduct.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[rgba(0,217,163,0.1)] bg-[rgba(0,217,163,0.02)] px-2.5 py-1 text-[11px] font-mono text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Other Products Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherProducts.map((p) => {
            const isTeal = p.accent === "teal";
            const borderCol = isTeal ? "hover:border-accent-teal/40" : "hover:border-accent-blue/40";
            const topBarBg = isTeal ? "bg-accent-teal" : "bg-accent-blue";
            const iconBg = isTeal ? "bg-[rgba(0,217,163,0.06)] text-accent-teal border-[rgba(0,217,163,0.15)]" : "bg-[rgba(74,158,255,0.06)] text-accent-blue border-[rgba(74,158,255,0.15)]";
            return (
              <motion.article
                key={p.title}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`group relative overflow-hidden rounded-xl border border-white/5 bg-bg-card p-5 transition-all ${borderCol} hover:bg-bg-card-hover`}
              >
                {/* 2px Top Border Accent */}
                <div className={`absolute left-0 right-0 top-0 h-[2px] ${topBarBg}`} />

                <div className="flex items-start justify-between gap-3 pt-2">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${iconBg}`}>
                    {p.icon}
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-text-secondary">
                    {p.status}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-[16px] font-semibold text-text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-text-secondary line-clamp-4">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-white/[0.02] border border-white/5 px-2 py-0.5 text-[10px] text-text-secondary font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

