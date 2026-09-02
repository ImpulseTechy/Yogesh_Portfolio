"use client";

import { motion } from "framer-motion";
import { Youtube, ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

const focusAreas = [
  "Electronics fundamentals",
  "PCB design & fabrication",
  "Robotics and microcontrollers",
  "IoT with ESP32",
  "TinyML on edge hardware",
];

export default function YouTube() {
  return (
    <section id="content" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          index="07"
          label="Content"
          title="ImpulseTech"
          subtitle="Engineering education for Indian students — taught in Hinglish, with real component prices and real builds."
        />

        {/* 3 Telemetry Stat Chips below header */}
        <motion.div
          variants={fadeUp}
          className="mb-10 flex flex-wrap gap-2.5"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-accent-teal/20 bg-accent-teal-dim px-3.5 py-1 text-[11px] font-mono text-accent-teal-light">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
            5.1K+ subscribers
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-accent-blue/20 bg-accent-blue-dim px-3.5 py-1 text-[11px] font-mono text-accent-blue-light">
            <span>🗣</span> Hinglish Medium
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-accent-amber/20 bg-accent-amber-dim px-3.5 py-1 text-[11px] font-mono text-accent-amber-light">
            <span>🎓</span> ECE/EEE Students India
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-[14px] leading-[1.75] text-text-secondary">
              Through ImpulseTech, I bridge the gap between academic theory and practical hardware engineering. The focus is on project-based learning with low-cost, accessible components so that any student in India can design, solder, and program their own systems.
            </p>

            <div className="space-y-3">
              <div className="font-mono text-[11px] uppercase tracking-wider text-accent-blue">
                Focus Areas
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {focusAreas.map((f) => (
                  <li
                    key={f}
                    className="rounded-md border border-border bg-bg-secondary px-2.5 py-1 text-[11px] font-mono text-text-secondary hover:text-accent-teal hover:border-accent-teal/30 transition-colors"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <a
                href="https://www.youtube.com/@ImpulseTech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-accent-teal/20 bg-accent-teal-dim px-4 py-2.5 text-[12px] font-mono text-accent-teal-light hover:bg-accent-teal-dim/80 hover:border-accent-teal/40 transition-all duration-200"
              >
                Visit YouTube Channel <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-accent-teal/20 bg-bg-card shadow-[0_0_20px_rgba(0,217,163,0.04)] transition-all duration-300 hover:border-accent-teal/40 hover:shadow-[0_0_25px_rgba(0,217,163,0.08)]">
              <iframe
                src="https://www.youtube.com/embed/2TzM16c5T7g"
                title="ImpulseTech Featured Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
