"use client";

import { motion } from "framer-motion";
import { FileText, Mail, BookOpen, ArrowUpRight, Radio } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

const venues = [
  "IEEE INDISCON 2025",
  "Journal of Engineering Education Transformations (JEET)",
  "IAC 2027 (future target)",
];

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
    href: "https://drive.google.com/file/d/1sf21Eb9wgsRK_3zluIlGOJOO4Lolz_FM/view?usp=sharing",
  },
];

export default function Research() {
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
          label="Research & Writing"
          title="Papers, articles, and field notes."
          subtitle="Turning workshop data into peer-reviewed research, and sharing builds through trade publications."
        />

        <motion.article
          variants={fadeUp}
          className="relative overflow-hidden rounded-xl border border-white/5 bg-bg-card p-6 md:p-8"
        >
          <span
            className="absolute inset-y-0 left-0 w-[3px] bg-accent-teal"
            aria-hidden="true"
          />

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-accent-teal-light">
              <FileText size={16} />
              <span className="label-caps !text-accent-teal-light">
                Featured Paper
              </span>
            </div>
            <span className="rounded-full border border-accent-amber/30 bg-accent-amber-dim px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-amber-light">
              Manuscript In Prep
            </span>
          </div>

          <h3 className="mt-4 font-heading text-2xl leading-snug text-text-primary md:text-3xl">
            CubeSat Education Kit as a Pedagogical Tool: Workshop Outcomes and
            Learning Framework
          </h3>

          <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
            <div>
              <div className="label-caps mb-3">Target Venues</div>
              <ul className="space-y-1.5">
                {venues.map((v) => (
                  <li
                    key={v}
                    className="flex items-start gap-2 text-[13px] text-text-secondary"
                  >
                    <span className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full bg-accent-teal-light" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="label-caps mb-3">Key Data Points</div>
              <ul className="space-y-1.5">
                {dataPoints.map((d) => (
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
          </div>
        </motion.article>

        <motion.article
          variants={fadeUp}
          className="relative mt-4 overflow-hidden rounded-xl border border-border bg-bg-card p-6 md:p-8"
        >
          <span
            className="absolute inset-y-0 left-0 w-[3px] bg-accent-blue"
            aria-hidden="true"
          />

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-accent-blue-light">
              <Radio size={16} />
              <span className="label-caps !text-accent-blue-light">
                IoT Systems Paper
              </span>
            </div>
            <span className="rounded-full border border-accent-amber/30 bg-accent-amber-dim px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-amber-light">
              Submitted · IEEE
            </span>
          </div>

          <h3 className="mt-4 font-heading text-2xl leading-snug text-text-primary md:text-3xl">
            Heartline: An Open-Source, Gesture-Based IoT Interface for
            Expressive Emotional Communication via MQTT
          </h3>

          <div className="mt-2 text-[12px] text-text-secondary">
            Yogesh Bawane, Hemant Yadav · Newton School of Technology, Pune
          </div>

          <p className="mt-5 text-[13px] leading-[1.7] text-text-secondary">
            An open-source IoT system for multi-modal emotional communication
            between two physically-separated users — no smartphone required.
            ESP32 nodes exchange gesture-mapped byte codes over MQTT to trigger
            facial matrix animation, LED lighting, and a haptic buzzer on the
            paired device.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">
            <div>
              <div className="label-caps mb-3">Stack</div>
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
                    <span className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full bg-accent-blue-light" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="label-caps mb-3">Results &amp; Release</div>
              <ul className="space-y-1.5">
                {[
                  "50 evaluation cycles · avg. 142 ms latency",
                  "Source code released to public domain",
                  "Gerber files and EasyEDA schematic open-sourced",
                  "Live demo available",
                ].map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-[13px] text-text-secondary"
                  >
                    <span className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full bg-accent-teal-light" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="https://drive.google.com/file/d/14XOSMFsjLj3ZSvEbdyipnzXc8w_U_-ct/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-border bg-white/[0.02] px-4 py-2 text-[13px] text-text-primary transition-colors hover:border-border-accent hover:bg-bg-card-hover"
            >
              <FileText size={14} className="text-accent-blue-light" />
              View Manuscript (PDF)
              <ArrowUpRight
                size={14}
                className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-blue-light"
              />
            </a>
          </div>
        </motion.article>

        <motion.div variants={fadeUp} className="mt-10">
          <div className="label-caps mb-4">Published Articles</div>
          <ul className="space-y-3">
            {publications.map((p) => (
              <li key={p.title}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-border bg-bg-card p-5 transition-colors hover:border-border-accent hover:bg-bg-card-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-blue-dim text-accent-blue-light">
                        <BookOpen size={16} />
                      </div>
                      <div>
                        <h4 className="font-heading text-[15px] leading-snug text-text-primary md:text-[16px]">
                          {p.title}
                        </h4>
                        <div className="mt-1 text-[12px] text-accent-blue-light">
                          {p.venue}
                          <span className="text-text-muted"> · {p.issue}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-border bg-white/[0.02] px-2 py-0.5 text-[11px] text-text-secondary"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-text-muted transition-colors group-hover:text-accent-blue-light"
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 flex flex-wrap items-center gap-2 text-[13px] text-text-secondary"
        >
          <Mail size={14} className="text-text-muted" />
          Interested in collaborating on space education research?
          <a
            href="mailto:yogeshbawane219@gmail.com"
            className="text-accent-blue-light underline-offset-2 hover:underline"
          >
            Get in touch.
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
