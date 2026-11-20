import { useEffect } from "react";

const HALF_WAVE = 24; // px, same rhythm as the logo-style wave
const STROKE = 2.5;
const PAD = STROKE / 2 + 0.25; // room for the round caps inside the image

/** An S-wave of `halves` half-waves, starting and ending on the midline with round caps. */
function waveImage(halves: number): { url: string; width: number } {
  const width = halves * HALF_WAVE + PAD * 2;
  let d = `M${PAD} 7`;
  for (let i = 0; i < halves; i++) {
    const x = PAD + (i + 1) * HALF_WAVE;
    const peak = i % 2 === 0 ? 1 : 13;
    d += i === 0 ? `C${PAD + 8} ${peak} ${PAD + 16} ${peak} ${x} 7` : `S${x - 8} ${peak} ${x} 7`;
  }
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='14' viewBox='0 0 ${width} 14'>` +
    `<path d='${d}' fill='none' stroke='#45b6a8' stroke-width='${STROKE}' stroke-linecap='round'/></svg>`;
  return { url: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, width };
}

/**
 * Draws each heading's wave underline as one path exactly as long as the
 * heading (whole half-waves), with a round cap at both ends. Without
 * JavaScript the CSS fallback (a long wave cut to the heading width) stays.
 */
export function useUnderlines() {
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>(".section-heading"));
    if (headings.length === 0) return;

    const draw = () => {
      for (const heading of headings) {
        const after = getComputedStyle(heading, "::after");
        const available = heading.clientWidth - parseFloat(after.marginLeft || "0");
        const halves = Math.max(2, Math.floor((available - PAD * 2) / HALF_WAVE));
        const { url, width } = waveImage(halves);
        heading.style.setProperty("--ul-img", url);
        heading.style.setProperty("--ul-w", `${width}px`);
      }
    };

    draw();
    const resize = new ResizeObserver(draw);
    headings.forEach((heading) => resize.observe(heading));
    void document.fonts?.ready.then(draw);
    return () => resize.disconnect();
  }, []);
}
