import { useEffect } from "react";

export const INTRO_STORAGE_KEY = "site:intro";
const DURATION = 2200; // full sequence (ms), matches the logo-intro-* keyframes in logo.css
const GLIDE_START = 1450; // the logo starts moving into the hero while the ring opens
const REVEAL_START = 1550; // page content fades in

// Guards against React StrictMode running the effect twice in development.
let started = false;

/**
 * Startup animation, once per browser session, home pages only.
 *
 * The inline script in index.html decides before the first paint and marks
 * <html> with `intro-pending` (the page stays hidden; it has a failsafe that
 * shows the page if this code never runs). This hook then animates the real
 * hero logo: it starts large in the centre of the screen, plays the boot
 * sequence and glides into its normal place, so the hand-over is seamless.
 * Any scroll, tap, click or key press skips it.
 */
export function useIntro() {
  useEffect(() => {
    const root = document.documentElement;
    if (started || !root.classList.contains("intro-pending")) return;
    started = true;

    const art = document.querySelector<HTMLElement>(".hero__art");
    const logo = art?.querySelector<SVGSVGElement>(".logo");
    if (!art || !logo) {
      root.classList.remove("intro-pending");
      return;
    }

    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      /* storage unavailable: the intro may simply play again */
    }
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Start position: the same logo at its normal size, centred on screen.
    const box = art.getBoundingClientRect();
    const dx = window.innerWidth / 2 - (box.left + box.width / 2);
    const dy = window.innerHeight / 2 - (box.top + box.height / 2);
    const from = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;

    art.style.transform = from;
    logo.classList.add("logo--intro");
    root.classList.add("intro");
    root.classList.remove("intro-pending");

    const glide = art.animate([{ transform: from }, { transform: "none" }], {
      duration: DURATION - GLIDE_START,
      delay: GLIDE_START,
      easing: "cubic-bezier(0.65, 0, 0.3, 1)",
      fill: "forwards"
    });
    const revealTimer = window.setTimeout(() => root.classList.add("intro-reveal"), REVEAL_START);
    const endTimer = window.setTimeout(() => finish(), DURATION);

    const skipEvents = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    let done = false;
    function finish() {
      if (done) return;
      done = true;
      window.clearTimeout(revealTimer);
      window.clearTimeout(endTimer);
      skipEvents.forEach((type) => window.removeEventListener(type, finish));
      glide.cancel();
      art!.style.transform = "";
      // Removing the intro class restarts the normal logo loop from its first frame.
      logo!.classList.remove("logo--intro");
      root.classList.add("intro-reveal");
      window.setTimeout(() => root.classList.remove("intro", "intro-reveal"), 750);
      window.dispatchEvent(new Event("introend"));
    }
    skipEvents.forEach((type) => window.addEventListener(type, finish, { passive: true }));
    // No cleanup on purpose: the sequence ends by itself (see `started`).
  }, []);
}
