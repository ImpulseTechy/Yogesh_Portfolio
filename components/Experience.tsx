"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Dot = "blue" | "teal" | "amber" | "muted";

type Item = {
  role: string;
  org: string;
  period: string;
  description?: string;
  dot: Dot;
};

const items: Item[] = [
  {
    role: "Robotics Engineer",
    org: "Newton School of Technology (ADYPU) — Pune",
    period: "Current",
    description:
      "Designing STEM curricula and conducting hands-on workshops in robotics, PCB design, and IoT for undergraduate engineering students.",
    dot: "blue",
  },
  {
    role: "M.Tech — VLSI Design & Microelectronics",
    org: "BITS Pilani (WILP)",
    period: "2026–2028 (ongoing)",
    description:
      "Semester 1: VLSI Design, MOS Devices & Microfabrication, Analog IC Design, CAD for VLSI Design Flow. Target CGPA: 9.5.",
    dot: "teal",
  },
  {
    role: "Executive — Product & Curricula",
    org: "BrightCHAMPS",
    period: "Prior",
    description:
      "Developed learning products and curricula for coding and robotics education at scale.",
    dot: "amber",
  },
  {
    role: "Teacher",
    org: "Podar International School",
    period: "Prior",
    description:
      "Technology and robotics education at the school level.",
    dot: "muted",
  },
  {
    role: "B.E. — Electrical Engineering",
    org: "Undergraduate degree",
    period: "Completed",
    dot: "muted",
  },
];

const dotColor: Record<Dot, string> = {
  blue: "bg-accent-blue ring-accent-blue/30",
  teal: "bg-accent-teal-light ring-accent-teal/30",
  amber: "bg-accent-amber-light ring-accent-amber/30",
  muted: "bg-text-muted ring-white/10",
};

export default function Experience() {
  return (
    <section id="about" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          label="Experience"
          title="Engineer · Educator · Researcher"
          subtitle="A path through hardware engineering, classroom teaching, curriculum design, and graduate research."
        />

        <ol className="relative ml-2 border-l border-white/5 pl-8">
          {items.map((item, i) => (
            <motion.li
              key={`${item.role}-${i}`}
              variants={fadeUp}
              className="relative pb-9 last:pb-0"
            >
              <span
                className={`absolute -left-[37px] top-1 h-3 w-3 rounded-full ring-4 ${dotColor[item.dot]}`}
                aria-hidden="true"
              />
              <h3 className="font-heading text-[16px] text-text-primary">
                {item.role}
              </h3>
              <div className="mt-0.5 text-[13px] text-accent-teal-light">
                {item.org}
              </div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-text-muted">
                {item.period}
              </div>
              {item.description && (
                <p className="mt-2 max-w-2xl text-[13px] leading-[1.7] text-text-secondary">
                  {item.description}
                </p>
              )}
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
