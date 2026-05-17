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
    <section className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          label="Content"
          title="ImpulseTech"
          subtitle="Engineering education for Indian students — taught in Hinglish, with real component prices and real builds."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div variants={fadeUp}>
            <p className="text-[14px] leading-[1.75] text-text-secondary">
              ImpulseTech is an engineering education channel for Indian
              students — taught in Hinglish, with real component prices from
              Robu.in and Quartzcomponents.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-lg border border-white/5 bg-bg-card px-4 py-3">
                <div className="font-heading text-xl text-accent-amber-light">
                  5,100+
                </div>
                <div className="text-[11px] text-text-secondary">subscribers</div>
              </div>
              <div className="rounded-lg border border-white/5 bg-bg-card px-4 py-3">
                <div className="font-heading text-xl text-accent-blue">381</div>
                <div className="text-[11px] text-text-secondary">videos</div>
              </div>
            </div>

            <div className="mt-7">
              <div className="label-caps mb-3">Focus Areas</div>
              <ul className="flex flex-wrap gap-1.5">
                {focusAreas.map((f) => (
                  <li
                    key={f}
                    className="rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 text-[12px] text-text-secondary"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-7 max-w-md text-[12px] italic text-text-muted">
              All content in Hinglish — making electronics accessible to every
              Indian engineering student.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <a
              href="https://www.youtube.com/@ImpulseTech"
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-xl border border-white/5 bg-bg-card transition-colors hover:border-white/10 hover:bg-bg-card-hover"
            >
              <div className="relative aspect-video w-full bg-gradient-to-br from-bg-secondary to-[#1a0f12]">
                {/* PHOTO: Add channel banner image to /public/impulsetech-banner.jpg */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-[#FF0033]/90 shadow-lg shadow-red-900/30 transition-transform group-hover:scale-105">
                    <Youtube size={28} className="text-white" />
                  </div>
                </div>
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md bg-black/40 px-2 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">
                  YouTube
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-heading text-[17px] text-text-primary">
                      ImpulseTech
                    </div>
                    <div className="mt-1 text-[12px] text-text-secondary">
                      Electronics &amp; robotics education in Hinglish.
                      Indian component pricing, real projects.
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-text-muted transition-colors group-hover:text-accent-blue-light"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full border border-accent-amber/30 bg-accent-amber-dim px-2.5 py-0.5 text-[11px] font-medium text-accent-amber-light">
                    5,100+ subscribers · YouTube
                  </span>
                  <span className="text-[12px] text-accent-blue-light">
                    Visit Channel →
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
