"use client";

import { motion } from "framer-motion";
import { Satellite, Cpu, Zap, BrainCircuit, Blocks } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Accent = "blue" | "teal" | "amber";

type Product = {
  title: string;
  icon: React.ReactNode;
  accent: Accent;
  description: string;
  status: { label: string; tone: Accent };
  tags: string[];
};

const products: Product[] = [
  {
    title: "CubeSat Education Kit",
    icon: <Satellite size={18} />,
    accent: "teal",
    description:
      "A complete 48-session space engineering program (Level 4) covering satellite subsystems, ADCS, thermal design, and ground station comms. Deployed at IIIT Nagpur and with international learners across USA and Dubai.",
    status: { label: "Research Paper In Progress", tone: "amber" },
    tags: ["CubeSat", "Space Tech", "48 sessions"],
  },
  {
    title: "MakerPy",
    icon: <Cpu size={18} />,
    accent: "blue",
    description:
      "A Python learning microcontroller board on Raspberry Pi Pico. Designed for ages 8–10 as Level 1 of the Orbital Explorers program. Makes hardware programming as easy as Scratch.",
    status: { label: "Active", tone: "teal" },
    tags: ["Raspberry Pi Pico", "MicroPython", "Ages 8–10"],
  },
  {
    title: "ESP32 IoT Teaching PCB",
    icon: <Zap size={18} />,
    accent: "amber",
    description:
      "A custom 2-layer ESP32 breakout board designed in EasyEDA for IoT workshops. Includes onboard sensors, clean silkscreen for student labeling, and copper pour ground plane.",
    status: { label: "v2 In Progress", tone: "amber" },
    tags: ["ESP32", "EasyEDA", "PCB Design"],
  },
  {
    title: "Embedded ML Board",
    icon: <BrainCircuit size={18} />,
    accent: "blue",
    description:
      "Arduino Nano 33 BLE Rev 2-based board for TinyML experiments. Used for gesture recognition and edge AI demonstrations in advanced robotics sessions.",
    status: { label: "Active", tone: "teal" },
    tags: ["Arduino", "TinyML", "Edge AI"],
  },
  {
    title: "Micro:bit Learning Board",
    icon: <Blocks size={18} />,
    accent: "teal",
    description:
      "A BBC Micro:bit based learning board designed for younger students. Block-programming friendly with visual feedback sensors for introductory electronics education.",
    status: { label: "Active", tone: "teal" },
    tags: ["Micro:bit", "Kids", "Block Programming"],
  },
];

const accentMap: Record<
  Accent,
  { border: string; iconBg: string; iconColor: string; pill: string; pillBorder: string }
> = {
  blue: {
    border: "before:bg-accent-blue",
    iconBg: "bg-accent-blue-dim",
    iconColor: "text-accent-blue-light",
    pill: "bg-accent-blue-dim text-accent-blue-light",
    pillBorder: "border-accent-blue/30",
  },
  teal: {
    border: "before:bg-accent-teal",
    iconBg: "bg-accent-teal-dim",
    iconColor: "text-accent-teal-light",
    pill: "bg-accent-teal-dim text-accent-teal-light",
    pillBorder: "border-accent-teal/30",
  },
  amber: {
    border: "before:bg-accent-amber",
    iconBg: "bg-accent-amber-dim",
    iconColor: "text-accent-amber-light",
    pill: "bg-accent-amber-dim text-accent-amber-light",
    pillBorder: "border-accent-amber/30",
  },
};

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
          label="Hardware Portfolio"
          title="Products I've Built"
          subtitle="From classroom teaching boards to CubeSat education kits — each product solves a real learning gap."
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const a = accentMap[p.accent];
            const s = accentMap[p.status.tone];
            return (
              <motion.article
                key={p.title}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`group relative overflow-hidden rounded-xl border border-white/5 bg-bg-card p-5 transition-colors hover:border-white/10 hover:bg-bg-card-hover before:absolute before:inset-x-0 before:top-0 before:h-[2px] ${a.border}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.iconBg} ${a.iconColor}`}
                  >
                    {p.icon}
                  </div>
                  <span
                    className={`rounded-full border ${s.pillBorder} ${s.pill} px-2 py-0.5 text-[10px] font-medium`}
                  >
                    {p.status.label}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-[17px] text-text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.65] text-text-secondary line-clamp-3">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 text-[11px] text-text-secondary"
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
