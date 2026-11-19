import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLanguage, type LangCode } from "../i18n/config";
import { profile } from "../data/profile";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./LogoMark";

const LINKS = ["about", "work", "projects", "credentials", "contact"] as const;

/** Highlights the nav entry of the section that is currently in the middle of the screen. */
function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const elements = ["top", ...LINKS]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? null : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Header({ lang, linkBase = "" }: { lang: LangCode; linkBase?: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const active = useActiveSection();

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", open);
    return () => document.body.classList.remove("nav-menu-open");
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        document.getElementById("nav-toggle")?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    // Tapping or clicking anywhere outside the header (the dimmed page) closes the menu.
    const onPointerDown = (event: PointerEvent) => {
      if (open && !headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="nav" ref={headerRef}>
      <div className="container nav__inner">
        <a className="nav__brand" href={getLanguage(lang).path}>
          <LogoMark uid="nav" className="nav__logo" />
          <span>{profile.name}</span>
        </a>
        <button
          id="nav-toggle"
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={t(open ? "nav.menuCloseAria" : "nav.menuToggleAria")}
          onClick={() => setOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          id="nav-links"
          className={"nav__links" + (open ? " is-open" : "")}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          {LINKS.map((link) => (
            <a key={link} href={linkBase + "#" + link} aria-current={active === link ? "location" : undefined}>
              {t(`nav.${link}`)}
            </a>
          ))}
          <LanguageSwitcher current={lang} />
        </nav>
      </div>
    </header>
  );
}
