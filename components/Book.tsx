"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { books } from "@/lib/books";

export default function Book() {
  return (
    <section id="book" className="px-6 py-20 md:px-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-6xl"
      >
        <SectionHeader
          index="03"
          label="Book"
          title="I wrote the book I wish I'd had."
          subtitle="A hands-on electronics book for engineering students — every circuit built and measured on a real breadboard."
        />

        {books.map((b) => (
          <motion.article
            key={b.amazonUrl}
            variants={fadeUp}
            className="grid grid-cols-1 gap-10 rounded-xl border border-border bg-bg-card p-6 md:grid-cols-[minmax(0,260px)_1fr] md:p-10"
          >
            <a
              href={b.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto block w-full max-w-[260px]"
            >
              <div className="relative aspect-[5/8] overflow-hidden rounded-r-md rounded-l-sm shadow-[0_20px_50px_-12px_var(--shadow),0_0_0_1px_var(--border)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                <Image
                  src={b.cover}
                  alt={`Cover of ${b.title}, ${b.volume}`}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
                <span className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/30 to-transparent" />
              </div>
            </a>

            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent-amber-light">
                <span>{b.volume}</span>
                <span className="text-text-muted">·</span>
                <span className="text-text-secondary">
                  {b.format} · {b.published}
                </span>
              </div>
              <h3 className="mt-3 font-heading text-2xl leading-tight text-text-primary md:text-3xl">
                {b.title}
              </h3>
              <p className="mt-2 text-[14px] text-text-secondary">{b.subtitle}</p>

              <p className="mt-5 text-[14px] leading-[1.75] text-text-secondary">{b.summary}</p>

              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-4">
                {b.facts.map((f) => (
                  <div key={f.label} className="font-mono text-[12px]">
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <span className="font-semibold text-accent-teal">{f.value}</span>{" "}
                      <span className="text-text-secondary">{f.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <div className="label-caps">What&apos;s inside</div>
                <ul className="mt-3 space-y-2">
                  {b.parts.map((p) => (
                    <li key={p.name} className="grid grid-cols-[88px_1fr] gap-3 text-[13px] leading-[1.6]">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-accent-blue">
                        {p.name}
                      </span>
                      <span className="text-text-secondary">{p.topics}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <div className="label-caps">Every chapter, same eight steps</div>
                <ol className="mt-3 flex flex-wrap gap-1.5">
                  {b.method.map((step, i) => (
                    <li
                      key={step}
                      className="rounded-md border border-border bg-bg-primary/40 px-2.5 py-1 font-mono text-[11px] text-text-secondary"
                    >
                      <span className="text-accent-teal">{i + 1}.</span> {step}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-6 text-[13px] leading-[1.7] text-text-secondary">
                <span className="text-text-primary">Who it&apos;s for: </span>
                {b.audience}
              </p>

              <a
                href={b.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-md bg-text-primary px-5 py-2.5 text-[13px] font-medium text-bg-primary transition-transform hover:-translate-y-0.5"
              >
                Get it on Amazon
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
