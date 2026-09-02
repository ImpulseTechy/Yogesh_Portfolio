"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type Props = {
  index?: string;
  label: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ index, label, title, subtitle }: Props) {
  return (
    <motion.div variants={fadeUp} className="mb-10 max-w-2xl">
      <div className="label-caps mb-3 flex items-center gap-1">
        {index && (
          <span className="font-mono text-accent-teal font-medium mr-1">{index} —</span>
        )}
        <span>{label}</span>
      </div>
      <h2 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[14px] leading-[1.7] text-text-secondary">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
