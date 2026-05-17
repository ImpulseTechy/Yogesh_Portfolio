"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
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
          label="Research"
          title="CubeSat Education at Scale"
          subtitle="Turning workshop data into peer-reviewed research."
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

        <motion.p
          variants={fadeUp}
          className="mt-6 flex flex-wrap items-center gap-2 text-[13px] text-text-secondary"
        >
          <Mail size={14} className="text-text-muted" />
          Interested in collaborating on space education research?
          <a
            href="mailto:yogesh@yogeshbawane.in"
            className="text-accent-blue-light underline-offset-2 hover:underline"
          >
            Get in touch.
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
