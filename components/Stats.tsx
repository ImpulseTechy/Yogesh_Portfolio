"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "5.1K+", label: "YouTube subscribers" },
  { value: "500+", label: "Students taught" },
  { value: "5", label: "Hardware products" },
  { value: "4", label: "Countries reached" },
];

export default function Stats() {
  return (
    <section className="px-6 py-16 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 md:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="rounded-xl border border-fg/5 bg-bg-card p-5"
          >
            <div className="font-mono text-[28px] font-semibold text-accent-teal leading-tight">
              {s.value}
            </div>
            <div className="mt-1 text-[11px] font-normal text-text-secondary">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

