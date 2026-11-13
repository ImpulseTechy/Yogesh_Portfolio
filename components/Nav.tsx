"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#tools", label: "Tools", id: "tools" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#research", label: "Research", id: "research" },
  { href: "#teaching", label: "Teaching", id: "teaching" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      links.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4 md:py-6 transition-all duration-300">
      <div
        className={`w-full max-w-5xl rounded-full border bg-[var(--nav-bg)] backdrop-blur-[12px] px-6 py-2.5 flex items-center justify-between shadow-lg shadow-[var(--shadow)] transition-all duration-300 ${
          scrolled
            ? "border-[rgba(0,217,163,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "border-[rgba(0,217,163,0.06)]"
        }`}
      >
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-wider text-accent-teal hover:text-accent-blue transition-colors"
          aria-label="Home"
        >
          YB//SATELLITE
        </a>

        <nav className="hidden md:block">
          <ul className="flex gap-6 lg:gap-8 items-center">
            {links.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    className={`text-[12px] font-mono tracking-wider transition-colors py-1 ${
                      isActive
                        ? "text-accent-teal font-medium"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {l.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-[-6px] left-0 right-0 h-[1.5px] rounded-full bg-accent-teal shadow-[0_0_8px_rgba(0,217,163,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-text-secondary hover:text-text-primary md:hidden p-1 rounded-full hover:bg-fg/[0.04]"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute top-20 left-4 right-4 rounded-3xl border border-[rgba(0,217,163,0.15)] bg-[var(--nav-bg-solid)] backdrop-blur-[16px] shadow-2xl p-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => {
              const isActive = activeSection === l.id;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2 text-sm font-mono tracking-wider transition-colors border-b border-fg/[0.03] ${
                      isActive ? "text-accent-teal" : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {isActive ? "> " : ""}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

