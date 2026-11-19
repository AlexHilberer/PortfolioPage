import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLanguage, type LangCode } from "../i18n/config";
import { profile } from "../data/profile";
import { LanguageSwitcher } from "./LanguageSwitcher";

const LINKS = ["about", "work", "projects", "credentials", "contact"] as const;

export function Header({ lang, linkBase = "" }: { lang: LangCode; linkBase?: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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
            <a key={link} href={linkBase + "#" + link}>
              {t(`nav.${link}`)}
            </a>
          ))}
          <LanguageSwitcher current={lang} />
        </nav>
      </div>
    </header>
  );
}
