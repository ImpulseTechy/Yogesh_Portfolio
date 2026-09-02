"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function About() {
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
          index="01"
          label="About"
          title="Hardware, taught hands-on."
        />

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          <div className="space-y-5 text-[14px] leading-[1.8] text-text-secondary md:col-span-2">
            <p>
              I&apos;m a robotics engineer at{" "}
              <span className="text-text-primary">Newton School of Technology</span>{" "}
              in Pune, where I design hands-on curricula in PCB design, embedded
              systems, and IoT for undergraduate engineers. Alongside that, I
              run <span className="text-text-primary">ImpulseTech</span> — a
              YouTube channel reaching 5,100+ learners across India who want to
              build hardware, not just read about it.
            </p>
            <p>
              My path into hardware education started in classrooms — first as
              a technology teacher at Podar International School, then designing
              learning products at BrightCHAMPS. Working with thousands of
              students convinced me hardware education in India needs better
              materials more than it needs more lectures. So I started building
              them: MakerPy boards, a CubeSat education kit, and project-based
              programs students can actually solder, debug, and ship.
            </p>
            <p>
              I&apos;m currently pursuing an{" "}
              <span className="text-text-primary">M.Tech in VLSI Design &amp; Microelectronics</span>{" "}
              at BITS Pilani (WILP), and working on a research framework for
              using CubeSat hardware in undergraduate space-engineering
              classrooms. Open to research collaborations, curriculum
              consulting, and workshop invitations.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-bg-card p-5">
              <div className="label-caps">Currently</div>
              <div className="mt-2 text-[13px] text-text-primary">
                Robotics Engineer · NST Pune
              </div>
              <div className="text-[12px] text-text-secondary">
                M.Tech VLSI · BITS Pilani
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-5">
              <div className="label-caps">Based in</div>
              <div className="mt-2 text-[13px] text-text-primary">
                Pune, Maharashtra
              </div>
              <div className="text-[12px] text-text-secondary">
                Open to remote collaborations
              </div>
            </div>
            <div className="rounded-xl border border-border bg-bg-card p-5">
              <div className="label-caps">Focus</div>
              <div className="mt-2 text-[13px] text-text-primary">
                Hardware education · CubeSat · VLSI research
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
