"use client";

import { motion } from "framer-motion";
import { FileText, Mail, BookOpen, Radio } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { mailto, useEmail } from "@/lib/useEmail";

const dataPoints = [
  "25-student workshop at IIIT Nagpur",
  "International learners from USA and Dubai",
  "48-session structured curriculum (L4 Space Engineering)",
  "Measurable outcomes across satellite subsystem understanding",
];

type Publication = {
  title: string;
  venue: string;
  issue: string;
  tags: string[];
  href: string;
};

const publications: Publication[] = [
  {
    title:
      "IoT Fall Detection System Using MPU6050, ESP32, and Blynk — Safeguard Your Loved Ones!",
    venue: "Electronics For You Magazine",
    issue: "January 2024 issue",
    tags: ["IoT", "ESP32", "MPU6050", "Blynk"],
    href: "https://www.electronicsforu.com/electronics-projects/fall-detection-system",
  },
];

export default function Research() {
  const email = useEmail();
  return (
    <section id="research" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          index="06"
          label="Research & Writing"
          title="Papers, articles, and field notes."
          subtitle="Turning workshop data into peer-reviewed research, and sharing builds through trade publications."
        />

        {/* Paper 1: CubeSat */}
        <motion.article
          variants={fadeUp}
          className="relative overflow-hidden rounded-xl border border-fg/5 bg-bg-card p-6 md:p-8 border-l-2 border-accent-blue"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-accent-blue">
              <FileText size={16} />
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-accent-blue">
                Featured Paper
              </span>
            </div>
            <span className="rounded bg-[rgba(0,217,163,0.08)] border border-[rgba(0,217,163,0.15)] px-2 py-0.5 text-[9px] font-mono tracking-widest text-accent-teal uppercase">
              Manuscript In Prep
            </span>
          </div>

          <h3 className="mt-4 font-heading text-2xl font-semibold leading-snug text-text-primary md:text-3xl">
            CubeSat Education Kit as a Pedagogical Tool: Workshop Outcomes and
            Learning Framework
          </h3>

          <div className="mt-4 font-mono text-[11px] text-accent-blue tracking-wide">
            Target Venues: <span className="font-semibold">→ IEEE INDISCON 2026 · JEET · IAC 2027</span>
          </div>

          <div className="mt-6">
            <div className="font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-3">Key Data Points</div>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {dataPoints.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2 text-[13px] text-text-secondary"
                >
                  <span className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full bg-accent-teal" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        {/* Paper 2: Heartline */}
        <motion.article
          variants={fadeUp}
          className="relative mt-6 overflow-hidden rounded-xl border border-fg/5 bg-bg-card p-6 md:p-8 border-l-2 border-accent-blue"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-accent-blue">
              <Radio size={16} />
              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-accent-blue">
                IoT Systems Paper
              </span>
            </div>
            <span className="rounded bg-[rgba(74,158,255,0.08)] border border-[rgba(74,158,255,0.15)] px-2 py-0.5 text-[9px] font-mono tracking-widest text-accent-blue uppercase">
              Submitted · IEEE
            </span>
          </div>

          <h3 className="mt-4 font-heading text-2xl font-semibold leading-snug text-text-primary md:text-3xl">
            Heartline: An Open-Source, Gesture-Based IoT Interface for
            Expressive Emotional Communication via MQTT
          </h3>

          <div className="mt-2 font-mono text-[11px] text-text-secondary">
            Yogesh Bawane, Hemant Yadav · Newton School of Technology, Pune
          </div>

          <p className="mt-4 text-[13px] leading-[1.7] text-text-secondary">
            An open-source IoT system for multi-modal emotional communication
            between two physically-separated users — no smartphone required.
            ESP32 nodes exchange gesture-mapped byte codes over MQTT to trigger
            facial matrix animation, LED lighting, and a haptic buzzer on the
            paired device.
          </p>

          {/* Key Metrics Teal Row */}
          <div className="mt-5 border-y border-fg/5 py-3 font-mono text-[11px] text-accent-teal flex flex-wrap gap-x-4 gap-y-1">
            <div><span className="text-text-secondary">Latency:</span> 142 ms avg latency</div>
            <div className="text-fg/10 hidden sm:block">·</div>
            <div><span className="text-text-secondary">Evaluation:</span> 50 cycles</div>
            <div className="text-fg/10 hidden sm:block">·</div>
            <div><span className="text-text-secondary">Code:</span> Public Domain</div>
            <div className="text-fg/10 hidden sm:block">·</div>
            <div><span className="text-text-secondary">Hardware:</span> Open Source</div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-2">Stack</div>
              <ul className="space-y-1.5">
                {[
                  "ESP32 microcontrollers",
                  "MQTT lightweight messaging",
                  "LED matrix + haptic buzzer output",
                  "EasyEDA schematic + custom PCB",
                ].map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-[13px] text-text-secondary"
                  >
                    <span className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full bg-accent-blue" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-end">
              <a
                href="https://drive.google.com/file/d/14XOSMFsjLj3ZSvEbdyipnzXc8w_U_-ct/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-md border border-[rgba(74,158,255,0.2)] bg-[rgba(74,158,255,0.03)] px-5 py-2.5 text-[12px] font-mono font-medium text-accent-blue hover:bg-[rgba(74,158,255,0.08)] hover:border-[rgba(74,158,255,0.4)] transition-all w-full sm:w-auto"
              >
                View Manuscript (PDF)
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>
          </div>
        </motion.article>

        {/* Published Articles */}
        <motion.div variants={fadeUp} className="mt-12">
          <div className="font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-4">Published Articles</div>
          <ul className="space-y-3">
            {publications.map((p) => (
              <li key={p.title}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-fg/5 bg-bg-card p-5 hover:border-[rgba(74,158,255,0.25)] hover:bg-bg-card-hover transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(74,158,255,0.06)] border border-[rgba(74,158,255,0.15)] text-accent-blue">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <h4 className="font-heading text-[15px] font-semibold leading-snug text-text-primary md:text-[16px]">
                          {p.title}
                        </h4>
                        <div className="mt-1 font-mono text-[11px] text-accent-blue">
                          {p.venue}
                          <span className="text-text-secondary"> · {p.issue}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded bg-fg/[0.02] border border-fg/5 px-2 py-0.5 text-[10px] text-text-secondary font-mono"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-text-secondary font-mono text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center gap-2 text-[13px] text-text-secondary"
        >
          <Mail size={14} className="text-text-secondary" />
          Interested in collaborating on space education research?
          <a
            href={mailto(email, "Research collaboration") ?? "#contact"}
            className="text-accent-blue hover:text-accent-teal transition-colors underline underline-offset-2"
          >
            Get in touch.
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}

