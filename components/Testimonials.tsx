"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { site } from "@/lib/site";

export default function Testimonials() {
  if (site.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader index="—" label="Testimonials" title="What students and partners say." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {site.testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="flex flex-col justify-between rounded-xl border border-border bg-bg-card p-6"
            >
              <blockquote className="text-[14px] leading-[1.75] text-text-primary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5">
                <div className="text-[13px] text-text-primary">{t.name}</div>
                <div className="text-[12px] text-text-secondary">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
