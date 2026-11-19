import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLanguage, type LangCode } from "../i18n/config";
import { profile } from "../data/profile";
import { LanguageSwitcher } from "./LanguageSwitcher";

const LINKS = ["about", "work", "projects", "credentials", "contact"] as const;

export function Header({ lang }: { lang: LangCode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

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
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="nav">
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
            <a key={link} href={"#" + link}>
              {t(`nav.${link}`)}
            </a>
          ))}
          <LanguageSwitcher current={lang} />
        </nav>
      </div>
    </header>
  );
}
