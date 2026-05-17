"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import PCBTraces from "./PCBTraces";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 pb-24 md:px-16 lg:px-24"
    >
      <PCBTraces />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue-dim px-3 py-1 text-[11px] text-accent-blue-light">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent-blue" />
            Open to collaborations
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-heading text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block">Yogesh Bawane</span>
          <span className="block">Robotics Engineer</span>
          <span className="block text-accent-blue">&amp; Hardware Educator</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-[14px] leading-[1.7] text-text-secondary"
        >
          Building India&apos;s next generation of hardware engineers — from
          MakerPy boards to CubeSat systems. Researching VLSI &amp;
          Microelectronics at BITS Pilani.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
          <span className="rounded-md border border-accent-blue/30 bg-accent-blue-dim px-3 py-1.5 text-[12px] text-accent-blue-light">
            VLSI Design · BITS Pilani
          </span>
          <span className="rounded-md border border-accent-teal/30 bg-accent-teal-dim px-3 py-1.5 text-[12px] text-accent-teal-light">
            Robotics · Newton School of Technology
          </span>
          <span className="rounded-md border border-accent-amber/30 bg-accent-amber-dim px-3 py-1.5 text-[12px] text-accent-amber-light">
            ImpulseTech · 5.1K subs
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-text-primary px-5 py-2.5 text-[13px] font-medium text-bg-primary transition-transform hover:-translate-y-0.5"
          >
            View Projects
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#research"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 px-5 py-2.5 text-[13px] text-text-primary transition-colors hover:border-white/20 hover:bg-white/[0.03]"
          >
            Read Research
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <ChevronDown
          size={20}
          className="scroll-hint text-text-muted"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
