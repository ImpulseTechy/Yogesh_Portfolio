import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectIcon from "@/components/ProjectIcon";
import LiteYouTube from "@/components/LiteYouTube";
import Footer from "@/components/Footer";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const cover = project.images[0];
  return {
    title: `${project.title} — Yogesh Bawane`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Yogesh Bawane`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      ...(cover ? { images: [{ url: cover.src, alt: cover.alt }] } : {}),
    },
  };
}

const sectionLabels: { key: "problem" | "approach" | "challenges" | "outcome"; label: string }[] = [
  { key: "problem", label: "The problem" },
  { key: "approach", label: "Design approach" },
  { key: "challenges", label: "What was hard" },
  { key: "outcome", label: "Outcome" },
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const accentText = project.accent === "teal" ? "text-accent-teal" : "text-accent-blue";
  const caseSections = sectionLabels.filter((s) => project.caseStudy?.[s.key]);
  const [cover, ...gallery] = project.images;
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <main id="main" className="min-h-screen bg-bg-primary">
      <article className="mx-auto w-full max-w-4xl px-6 pb-20 pt-10 md:px-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-[12px] text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-card ${accentText}`}>
              <ProjectIcon name={project.icon} size={20} />
            </span>
            <span className={`font-mono text-[11px] uppercase tracking-widest ${accentText}`}>
              {project.status}
            </span>
          </div>
          <h1 className="mt-5 font-heading text-4xl leading-tight tracking-tight text-text-primary md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-text-secondary">
            {project.summary}
          </p>

          {project.stats && (
            <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-4">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className={`font-mono text-2xl ${accentText}`}>{s.value}</dd>
                  <div className="mt-1 text-[12px] text-text-secondary">{s.label}</div>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-bg-card px-2.5 py-1 font-mono text-[11px] text-text-secondary"
              >
                {t}
              </li>
            ))}
          </ul>

          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-[13px] text-text-primary transition-colors hover:bg-bg-card"
                >
                  {l.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          )}
        </header>

        {cover && (
          <figure className="mt-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
              <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
            </div>
            {cover.caption && (
              <figcaption className="mt-3 text-[12px] text-text-muted">{cover.caption}</figcaption>
            )}
          </figure>
        )}

        {caseSections.length > 0 && (
          <div className="mt-14 space-y-10">
            {caseSections.map(({ key, label }) => (
              <section key={key}>
                <h2 className={`font-mono text-[11px] uppercase tracking-widest ${accentText}`}>{label}</h2>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.8] text-text-secondary">
                  {project.caseStudy![key]}
                </p>
              </section>
            ))}
          </div>
        )}

        {gallery.length > 0 && (
          <section className="mt-14">
            <h2 className={`font-mono text-[11px] uppercase tracking-widest ${accentText}`}>Gallery</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gallery.map((img) => (
                <figure key={img.src}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  {img.caption && (
                    <figcaption className="mt-2 text-[12px] text-text-muted">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.video && (
          <section className="mt-14">
            <h2 className={`font-mono text-[11px] uppercase tracking-widest ${accentText}`}>Build video</h2>
            <div className="mt-4">
              <LiteYouTube id={project.video} title={project.title} />
            </div>
          </section>
        )}

        <nav aria-label="Other projects" className="mt-20 border-t border-border pt-8">
          <h2 className="label-caps">More projects</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-bg-card px-4 py-3 text-[14px] text-text-primary transition-colors hover:bg-bg-card-hover"
                >
                  {p.title}
                  <ArrowUpRight size={14} className="text-text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <Footer />
    </main>
  );
}
