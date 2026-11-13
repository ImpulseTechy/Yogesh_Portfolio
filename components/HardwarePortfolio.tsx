"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import ProjectIcon from "./ProjectIcon";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { projects } from "@/lib/projects";

const heroProduct = projects.find((p) => p.featured)!;
const otherProducts = projects.filter((p) => !p.featured);

export default function HardwarePortfolio() {
  const heroCover = heroProduct.images[0];

  return (
    <section id="projects" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          index="02"
          label="Hardware Portfolio"
          title="Products I've Built"
          subtitle="From classroom teaching boards to CubeSat education kits — each product solves a real learning gap."
        />

        <motion.div variants={fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="mb-8">
          <Link
            href={`/projects/${heroProduct.slug}`}
            className={`group grid overflow-hidden rounded-xl border border-[rgba(0,217,163,0.4)] bg-bg-card shadow-[0_0_20px_rgba(0,217,163,0.06)] transition-all hover:border-[rgba(0,217,163,0.6)] hover:bg-bg-card-hover ${
              heroCover ? "md:grid-cols-5" : ""
            }`}
          >
            {heroCover && (
              <div className="relative aspect-[4/3] md:col-span-2 md:aspect-auto">
                <Image
                  src={heroCover.src}
                  alt={heroCover.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className={`p-6 md:p-8 ${heroCover ? "md:col-span-3" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[rgba(0,217,163,0.1)] border border-[rgba(0,217,163,0.2)]">
                    <ProjectIcon name={heroProduct.icon} size={22} className="text-accent-teal" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent-teal">
                      Featured Project
                    </span>
                    <h3 className="font-heading text-xl font-bold text-text-primary md:text-2xl">
                      {heroProduct.title}
                    </h3>
                  </div>
                </div>
                <span className="rounded bg-[rgba(0,217,163,0.08)] border border-[rgba(0,217,163,0.2)] px-2.5 py-1 text-[10px] font-mono tracking-wider text-accent-teal">
                  {heroProduct.status}
                </span>
              </div>

              <p className="mt-4 text-[14px] leading-[1.7] text-text-secondary max-w-3xl">
                {heroProduct.summary}
              </p>

              {heroProduct.stats && (
                <div className="mt-6 grid grid-cols-2 gap-4 border-y border-[rgba(0,217,163,0.1)] py-4 sm:flex sm:flex-wrap sm:gap-8">
                  {heroProduct.stats.map((stat) => (
                    <div key={stat.label} className="font-mono text-[12px]">
                      <span className="font-semibold text-accent-teal">{stat.value}</span>{" "}
                      <span className="text-text-secondary">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {heroProduct.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[rgba(0,217,163,0.1)] bg-[rgba(0,217,163,0.02)] px-2.5 py-1 text-[11px] font-mono text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-accent-teal">
                  Read case study
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherProducts.map((p) => {
            const isTeal = p.accent === "teal";
            const borderCol = isTeal ? "hover:border-accent-teal/40" : "hover:border-accent-blue/40";
            const topBarBg = isTeal ? "bg-accent-teal" : "bg-accent-blue";
            const iconBg = isTeal
              ? "bg-[rgba(0,217,163,0.06)] text-accent-teal border-[rgba(0,217,163,0.15)]"
              : "bg-[rgba(74,158,255,0.06)] text-accent-blue border-[rgba(74,158,255,0.15)]";
            const linkCol = isTeal ? "text-accent-teal" : "text-accent-blue";
            const cover = p.images[0];
            return (
              <motion.article
                key={p.slug}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-fg/5 bg-bg-card transition-all ${borderCol} hover:bg-bg-card-hover`}
                >
                  <div className={`absolute left-0 right-0 top-0 z-10 h-[2px] ${topBarBg}`} />

                  {cover && (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3 pt-2">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${iconBg}`}>
                        <ProjectIcon name={p.icon} />
                      </div>
                      <span className="font-mono text-[9px] tracking-widest text-text-secondary">
                        {p.status}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-[16px] font-semibold text-text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.6] text-text-secondary line-clamp-4">
                      {p.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-fg/[0.02] border border-fg/5 px-2 py-0.5 text-[10px] text-text-secondary font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className={`mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[11px] ${linkCol}`}>
                      Details
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
