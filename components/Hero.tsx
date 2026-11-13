"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, FileText, Mail } from "lucide-react";
import PCBTraces from "./PCBTraces";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { site } from "@/lib/site";
import { mailto, useEmail } from "@/lib/useEmail";

export default function Hero() {
  const email = useEmail();
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
        <div className="max-w-3xl space-y-6">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,217,163,0.3)] bg-[rgba(0,217,163,0.1)] px-3 py-1 text-[11px] font-mono text-accent-teal">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent-teal" />
              Open to collaborations
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block tracking-wide">Yogesh Bawane</span>
            <span className="block">Robotics Engineer</span>
            <span className="block text-accent-blue">&amp; Hardware Educator</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-[14px] leading-[1.7] text-text-secondary"
          >
            Building India&apos;s next generation of hardware engineers — from
            MakerPy boards to CubeSat systems. Researching VLSI &amp;
            Microelectronics at BITS Pilani.
          </motion.p>

          {/* Skill Pills Row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {["ESP32", "PCB Design", "MicroPython", "TinyML", "VLSI", "CubeSat", "ROS 2"].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[rgba(74,158,255,0.25)] bg-transparent px-3 py-1 text-[11px] text-text-secondary transition-colors duration-200 hover:border-accent-blue hover:text-accent-blue"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Personal Ethos Terminal Line */}
          <motion.div
            variants={fadeUp}
            className="font-mono text-[12px] text-accent-teal/70 tracking-[0.05em]"
          >
            Explore: Electronics  ·  Learn: Coding  ·  Innovate: Hardware
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
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
              href={mailto(email, "Workshop invitation") ?? "#contact"}
              className="inline-flex items-center gap-2 rounded-md border border-fg/10 px-5 py-2.5 text-[13px] text-text-primary transition-colors hover:border-fg/20 hover:bg-fg/[0.03]"
            >
              <Mail size={14} />
              Invite me for a workshop
            </a>
            {site.resumeUrl && (
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-fg/10 px-5 py-2.5 text-[13px] text-text-primary transition-colors hover:border-fg/20 hover:bg-fg/[0.03]"
              >
                <FileText size={14} />
                Résumé
              </a>
            )}
          </motion.div>
        </div>
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
