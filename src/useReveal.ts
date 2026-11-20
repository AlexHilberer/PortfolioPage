import { useEffect } from "react";

/** Elements that fade in once as they scroll into view. */
// Headings and story steps are deliberately not faded: they carry the spine
// nodes, which must always sit solid in the foreground above the line.
const TARGETS = [
  ".section-intro",
  ".about__intro",
  ".about__personal",
  ".principles-list",
  ".exploring",
  ".work-now",
  ".project-entry",
  ".credentials-more",
  ".cert-card",
  ".contact__intro",
  ".contact__links"
].join(",");

/**
 * Progressive enhancement: the markup is fully visible without JavaScript
 * (and in the prerendered HTML). After hydration, elements that are still
 * below the fold are hidden by CSS and revealed as they come into view.
 * Skipped entirely for visitors who prefer reduced motion.
 */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const elements = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    elements.forEach((element, index) => {
      // Anything already on screen stays put: no flash on load.
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      element.style.transitionDelay = `${Math.min(siblings.indexOf(element), 5) * 70}ms`;
      element.classList.add("reveal");
      observer.observe(element);
      void index;
    });
    document.documentElement.classList.add("js-reveal");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);
}
