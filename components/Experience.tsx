"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Item = {
  role: string;
  org: string;
  period: string;
  description?: string;
  skills: string;
  isActive: boolean;
};

const items: Item[] = [
  {
    role: "Robotics Engineer",
    org: "Newton School of Technology (ADYPU) — Pune",
    period: "Current",
    description:
      "Designing STEM curricula and conducting hands-on workshops in robotics, PCB design, and IoT for undergraduate engineering students.",
    skills: "ESP32 · PCB Design · IoT · STEM Curriculum · Embedded Systems",
    isActive: true,
  },
  {
    role: "M.Tech — VLSI Design & Microelectronics",
    org: "BITS Pilani (WILP)",
    period: "2026–2028 (ongoing)",
    description:
      "Semester 1: VLSI Design, MOS Devices & Microfabrication, Analog IC Design, CAD for VLSI Design Flow. Target CGPA: 9.5.",
    skills: "VLSI · MOS Devices · Analog IC Design · CAD Flow",
    isActive: true,
  },
  {
    role: "Executive — Product & Curricula",
    org: "BrightCHAMPS",
    period: "Prior",
    description:
      "Developed learning products and curricula for coding and robotics education at scale.",
    skills: "Product Development · Curriculum Design · EdTech",
    isActive: false,
  },
  {
    role: "Teacher",
    org: "Podar International School",
    period: "Prior",
    description:
      "Technology and robotics education at the school level.",
    skills: "Robotics Kits · Classroom Teaching · Science & Tech",
    isActive: false,
  },
  {
    role: "B.E. — Electrical Engineering",
    org: "Undergraduate degree",
    period: "Completed",
    skills: "Control Systems · Electrical Machines · Power Electronics",
    isActive: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          index="04"
          label="Experience"
          title="Engineer · Educator · Researcher"
          subtitle="A path through hardware engineering, classroom teaching, curriculum design, and graduate research."
        />

        <div className="relative ml-2 border-l border-dashed border-[rgba(0,217,163,0.2)] pl-8">
          {items.map((item, i) => (
            <motion.div
              key={`${item.role}-${i}`}
              variants={fadeUp}
              className="relative pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              {item.isActive ? (
                // Active: filled green circle
                <span
                  className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-accent-teal shadow-[0_0_8px_rgba(0,217,163,0.8)] ring-4 ring-accent-teal/20"
                  aria-hidden="true"
                />
              ) : (
                // Past: outlined blue circle
                <span
                  className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full border-2 border-accent-blue bg-bg-primary ring-4 ring-accent-blue/10"
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-heading text-[16px] font-semibold text-text-primary">
                  {item.role}
                </h3>
                {item.isActive && (
                  <span className="inline-flex items-center gap-1 rounded bg-[rgba(0,217,163,0.08)] px-1.5 py-0.5 text-[9px] font-mono font-semibold tracking-wider text-accent-teal border border-[rgba(0,217,163,0.15)] uppercase">
                    NOW
                  </span>
                )}
              </div>

              <div className="mt-1 text-[13px] font-medium text-accent-blue">
                {item.org}
              </div>

              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                {item.period}
              </div>

              {item.description && (
                <p className="mt-2 max-w-2xl text-[13px] leading-[1.7] text-text-secondary">
                  {item.description}
                </p>
              )}

              {/* 1-line skill summary */}
              <div className="mt-2 font-mono text-[11px] text-accent-teal opacity-80">
                <span className="text-text-secondary font-medium">Stack: </span>
                {item.skills}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

