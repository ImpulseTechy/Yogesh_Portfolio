"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      const elements = document.querySelectorAll(".reveal-item");
      elements.forEach((el) => observer.observe(el));

      return observer;
    };

    // Initial run
    let observer = observeElements();

    // Since Next.js uses client-side navigation or elements might load asynchronously,
    // we also setup a MutationObserver to watch for dynamically added elements.
    const mutationObserver = new MutationObserver(() => {
      if (observer) observer.disconnect();
      observer = observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
