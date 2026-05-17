"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Youtube, Github, Instagram, ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "yogesh@yogeshbawane.in",
    href: "mailto:yogesh@yogeshbawane.in",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/yogesh-bawane",
    href: "https://www.linkedin.com/in/yogesh-bawane/",
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "ImpulseTech",
    href: "https://www.youtube.com/@impulsetechy",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ImpulseTechy",
    href: "https://github.com/ImpulseTechy",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@impulsetechy",
    href: "https://www.instagram.com/impulsetechy/",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          label="Contact"
          title="Let's build something."
          subtitle="Open to research collaborations, speaking at workshops, curriculum consulting, and hardware education projects."
        />

        <motion.ul variants={fadeUp} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {links.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-bg-card p-4 transition-colors hover:border-white/15 hover:bg-bg-card-hover"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] text-text-secondary transition-colors group-hover:bg-accent-blue-dim group-hover:text-accent-blue-light">
                    <Icon size={18} />
                  </span>
                  <div>
                    <div className="label-caps">{label}</div>
                    <div className="mt-0.5 text-[13px] text-text-primary">
                      {value}
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-text-muted transition-colors group-hover:text-accent-blue-light"
                />
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-[12px] text-text-muted"
        >
          Based in Pune, Maharashtra. Available for remote collaborations
          worldwide.
        </motion.p>
      </motion.div>
    </section>
  );
}
