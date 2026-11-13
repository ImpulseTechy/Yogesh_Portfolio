"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Youtube, Github, Instagram, ArrowUpRight, type LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { site } from "@/lib/site";
import { mailto, useEmail } from "@/lib/useEmail";

const socialLinks = [
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
    href: site.youtube.channelUrl,
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

const cardClass =
  "group flex items-center justify-between gap-4 rounded-xl border border-fg/5 bg-bg-card p-4 transition-colors hover:border-fg/15 hover:bg-bg-card-hover";

function CardBody({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-fg/[0.03] text-text-secondary transition-colors group-hover:bg-accent-blue-dim group-hover:text-accent-blue-light">
          <Icon size={18} />
        </span>
        <div>
          <div className="label-caps">{label}</div>
          <div className="mt-0.5 text-[13px] text-text-primary">{value}</div>
        </div>
      </div>
      <ArrowUpRight size={16} className="text-text-muted transition-colors group-hover:text-accent-blue-light" />
    </>
  );
}

function EmailCard({ index }: { index: number }) {
  const address = useEmail(index);
  return (
    <a href={mailto(address)} className={cardClass}>
      <CardBody icon={Mail} label={site.emails[index].label} value={address ?? "Click to email"} />
    </a>
  );
}

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
          index="09"
          label="Contact"
          title="Workshops, research, curriculum."
          subtitle="Invite me to run a hands-on hardware workshop, collaborate on CubeSat or education research, or design a robotics curriculum for your institution."
        />

        <motion.ul variants={fadeUp} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {site.emails.map((e, i) => (
            <li key={e.label}>
              <EmailCard index={i} />
            </li>
          ))}
          {socialLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                <CardBody icon={l.icon} label={l.label} value={l.value} />
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.p variants={fadeUp} className="mt-8 text-[12px] text-text-muted">
          Based in Pune, Maharashtra. Available for remote collaborations worldwide.
        </motion.p>
      </motion.div>
    </section>
  );
}
