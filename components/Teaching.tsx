"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Entry = {
  title: string;
  org?: string;
  meta?: string;
  note?: string;
};

const workshops: Entry[] = [
  {
    title: "PCB Design & Fabrication Workshop",
    org: "Newton School of Technology, ADYPU",
    meta: "EasyEDA · ESP32 Breakout Board · DIY etching",
    note: "19-slide workshop, hands-on fabrication",
  },
  {
    title: "CubeSat Education Workshop",
    org: "IIIT Nagpur",
    meta: "25 students · Space systems overview",
  },
  {
    title: "Online CubeSat Program",
    org: "International (USA, Dubai)",
    meta: "Paid cohort · Level 4 content",
  },
];

const curricula: Entry[] = [
  {
    title: "B2B Robotics Curriculum",
    meta: "3 levels × 12 sessions · Grades 6–9",
  },
  {
    title: "6-Month Robotics Curriculum",
    org: "First-year B.Tech students",
    meta: "Embedded systems → autonomous systems",
  },
  {
    title: "Space Engineering Framework (5 Levels)",
    meta: "L1: MakerPy (Age 8–10) · L2: Mission Critical (10–12) · L3: Autonomous Systems (12–14) · L4: CubeSat (14–15) · L5: Rocketry/Avionics (15+)",
  },
];

function Column({
  heading,
  accent,
  entries,
}: {
  heading: string;
  accent: "blue" | "teal";
  entries: Entry[];
}) {
  const dot =
    accent === "blue" ? "bg-accent-blue" : "bg-accent-teal-light";
  return (
    <motion.div variants={fadeUp}>
      <div className="mb-5 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <h3 className="font-heading text-[16px] text-text-primary">{heading}</h3>
      </div>
      <ul className="space-y-3">
        {entries.map((e) => (
          <li
            key={e.title}
            className="rounded-lg border border-white/5 bg-bg-card p-4 transition-colors hover:border-white/10 hover:bg-bg-card-hover"
          >
            <div className="font-heading text-[14px] text-text-primary">
              {e.title}
            </div>
            {e.org && (
              <div className="mt-0.5 text-[12px] text-accent-teal-light">
                {e.org}
              </div>
            )}
            {e.meta && (
              <div className="mt-1 text-[12px] text-text-secondary">{e.meta}</div>
            )}
            {e.note && (
              <div className="mt-1 text-[11px] italic text-text-muted">
                {e.note}
              </div>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Teaching() {
  return (
    <section id="teaching" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          label="Teaching"
          title="Workshops & Curriculum"
          subtitle="Designing programs that translate hardware engineering into structured, age-appropriate learning."
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          <Column heading="Workshops Conducted" accent="blue" entries={workshops} />
          <Column heading="Curriculum Designed" accent="teal" entries={curricula} />
        </div>
      </motion.div>
    </section>
  );
}
