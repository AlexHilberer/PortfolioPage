import { useEffect } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * The page spine "connects" while you read: the line fills up to the reading
 * position and every node lights up once it has been reached. On wide screens
 * a wave links the hero logo's bottom node to the first node of the spine.
 *
 * Progressive enhancement: without JavaScript the spine is simply fully lit
 * (see the `.js-spine` rules in layout.css).
 */
export function useSpine() {
  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector("main");
    const containers = Array.from(document.querySelectorAll<HTMLElement>("section:not(.hero) > .container, .footer--spine > .container"));
    if (!main || containers.length === 0) return;

    const linkSvg = document.querySelector<SVGSVGElement>(".spine-link");
    const linkPaths = linkSvg ? Array.from(linkSvg.querySelectorAll("path")) : [];
    const linkFill = linkSvg?.querySelector<SVGPathElement>(".spine-link__fill") ?? null;
    const wide = window.matchMedia("(min-width: 901px)");

    type Span = { element: HTMLElement; start: number; length: number };
    let spans: Span[] = [];
    let nodes: { element: Element; y: number }[] = [];
    let link: { start: number; end: number } | null = null;

    const measure = () => {
      const scroll = window.scrollY;
      spans = containers.map((element) => {
        const box = element.getBoundingClientRect();
        const line = getComputedStyle(element, "::before");
        return {
          element,
          start: box.top + scroll + parseFloat(line.top || "0"),
          length: Math.max(1, parseFloat(line.height || "1"))
        };
      });
      nodes = Array.from(document.querySelectorAll(".section-heading, .work-step")).map((element) => {
        const box = element.getBoundingClientRect();
        // Top edge of the node: it lights up the moment the line touches it.
        const offset = element.classList.contains("section-heading")
          ? parseFloat(getComputedStyle(element).fontSize) * 0.3
          : 9;
        return { element, y: box.top + scroll + offset };
      });

      // Wave from the hero logo's bottom node into the first spine node.
      link = null;
      const from = document.querySelector(".hero__art .logo__node--bottom");
      const to = document.querySelector("#about .section-heading");
      const toContainer = to?.closest(".container");
      if (linkSvg && from && to && toContainer && wide.matches) {
        const base = main.getBoundingClientRect();
        const node = from.getBoundingClientRect();
        const x1 = node.left + node.width / 2 - base.left;
        const y1 = node.bottom - base.top;
        const x2 = toContainer.getBoundingClientRect().left + 35 - base.left;
        const y2 = to.getBoundingClientRect().top + parseFloat(getComputedStyle(to).fontSize) * 0.3 + 11 - base.top;
        const bend = (y2 - y1) * 0.6;
        const d = `M${x1.toFixed(1)} ${y1.toFixed(1)} C${x1.toFixed(1)} ${(y1 + bend).toFixed(1)} ${x2.toFixed(1)} ${(y2 - bend).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
        linkPaths.forEach((path) => path.setAttribute("d", d));
        linkSvg.setAttribute("width", String(Math.ceil(base.width)));
        linkSvg.setAttribute("height", String(Math.ceil(y2 + 4)));
        linkSvg.classList.add("is-drawn");
        link = { start: y1 + base.top + scroll, end: y2 + base.top + scroll };
      } else {
        linkSvg?.classList.remove("is-drawn");
      }
      update();
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      // Reading line at 60% of the viewport; over the last stretch of the page it
      // slides down to the bottom edge, so the final node is always reached.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nearEnd = clamp((window.scrollY - (max - 320)) / 320);
      const pen = window.scrollY + window.innerHeight * (0.6 + 0.4 * nearEnd);
      for (const span of spans) {
        span.element.style.setProperty("--fill", clamp((pen - span.start) / span.length).toFixed(4));
      }
      for (const node of nodes) node.element.classList.toggle("is-reached", pen >= node.y);
      if (link && linkFill) {
        // The wave fills over the first part of the scroll, before the spine starts.
        const progress = clamp((pen - link.start) / (link.end - link.start));
        linkFill.style.strokeDashoffset = String(1 - progress);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    root.classList.add("js-spine");
    measure();
    const resize = new ResizeObserver(() => measure());
    resize.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    // The intro moves the hero logo with a transform: measure again once it is in place.
    window.addEventListener("introend", measure);
    void document.fonts?.ready.then(measure);

    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("introend", measure);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("js-spine");
    };
  }, []);
}
