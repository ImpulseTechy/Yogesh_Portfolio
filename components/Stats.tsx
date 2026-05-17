"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  color: string;
};

const stats: Stat[] = [
  { value: 5.1, suffix: "K+", label: "YouTube subscribers", color: "text-accent-teal-light" },
  { value: 500, suffix: "+", label: "Students taught", color: "text-accent-blue" },
  { value: 5, suffix: "", label: "Hardware products", color: "text-accent-amber-light" },
  { value: 3, suffix: "", label: "Countries reached", color: "text-accent-blue-light" },
];

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const isDecimal = !Number.isInteger(to);
  const rounded = useTransform(count, (latest) =>
    isDecimal ? latest.toFixed(1) : Math.round(latest).toString()
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.4, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, to, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

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
            className="rounded-xl border border-white/5 bg-bg-card p-5"
          >
            <div
              className={`font-heading text-[28px] leading-tight ${s.color}`}
            >
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-[12px] text-text-secondary">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
