"use client";

import { motion } from "framer-motion";
import { Terminal, MonitorSmartphone, Wrench, ArrowUpRight, Cpu } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Accent = "blue" | "teal" | "amber";

type Tool = {
  title: string;
  icon: React.ReactNode;
  accent: Accent;
  description: string;
  domain: string;
  href: string;
  tags: string[];
};

const tools: Tool[] = [
  {
    title: "Serial Dash",
    icon: <Terminal size={18} />,
    accent: "blue",
    description:
      "A browser-based serial monitor for Arduino. Read and write to your board over Web Serial — no driver install, no Arduino IDE required.",
    domain: "serial-dash.vercel.app",
    href: "https://serial-dash.vercel.app/",
    tags: ["Arduino", "Web Serial", "Debugging"],
  },
  {
    title: "PixByte",
    icon: <MonitorSmartphone size={18} />,
    accent: "teal",
    description:
      "A visual tool for designing OLED display graphics. Draw frames, export byte arrays, and drop them straight into your firmware.",
    domain: "pixbyte-five.vercel.app",
    href: "https://pixbyte-five.vercel.app/",
    tags: ["OLED", "Bitmap", "Embedded UI"],
  },
  {
    title: "DesiFounderTools",
    icon: <Wrench size={18} />,
    accent: "amber",
    description:
      "A growing toolbox of utilities for Indian founders and indie hackers — practical calculators and helpers built from real founder workflows.",
    domain: "desifoundertools.in",
    href: "https://www.desifoundertools.in/",
    tags: ["Founders", "Web App", "India"],
  },
  {
    title: "MicroLab",
    icon: <Cpu size={18} />,
    accent: "blue",
    description:
      "An IDE for the Raspberry Pi Pico to program in MicroPython directly from your browser.",
    domain: "getmicrolab.com",
    href: "https://www.getmicrolab.com/",
    tags: ["Raspberry Pi Pico", "MicroPython", "IDE"],
  },
];

const accentMap: Record<
  Accent,
  { border: string; iconBg: string; iconColor: string }
> = {
  blue: {
    border: "before:bg-accent-blue",
    iconBg: "bg-accent-blue-dim",
    iconColor: "text-accent-blue-light",
  },
  teal: {
    border: "before:bg-accent-teal",
    iconBg: "bg-accent-teal-dim",
    iconColor: "text-accent-teal-light",
  },
  amber: {
    border: "before:bg-accent-amber",
    iconBg: "bg-accent-amber-dim",
    iconColor: "text-accent-amber-light",
  },
};

export default function Tools() {
  return (
    <section id="tools" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          index="03"
          label="Tools I've Built"
          title="Software for hardware folks."
          subtitle="Small, focused web tools I built to scratch my own itch while teaching and building hardware."
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => {
            const a = accentMap[t.accent];
            return (
              <motion.a
                key={t.title}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`group relative block overflow-hidden rounded-xl border border-border bg-bg-card p-5 transition-colors hover:border-border-accent hover:bg-bg-card-hover before:absolute before:inset-x-0 before:top-0 before:h-[2px] ${a.border}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.iconBg} ${a.iconColor}`}
                  >
                    {t.icon}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-text-muted transition-colors group-hover:text-accent-blue-light"
                  />
                </div>

                <h3 className="mt-4 font-heading text-[17px] text-text-primary">
                  {t.title}
                </h3>
                <div className="mt-1 font-mono text-[11px] text-text-muted">
                  {t.domain}
                </div>
                <p className="mt-3 text-[13px] leading-[1.65] text-text-secondary line-clamp-3">
                  {t.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-fg/[0.02] px-2 py-0.5 text-[11px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
