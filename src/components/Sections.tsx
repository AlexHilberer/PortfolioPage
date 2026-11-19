import { useTranslation } from "react-i18next";
import { certifications, type Certification } from "../data/certifications";
import { exploring } from "../data/exploring";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import type { LangCode } from "../i18n/config";
import {
  ArrowIcon,
  GithubIcon,
  IssuerIcon,
  LinkedinIcon,
  MailIcon,
  PinIcon
} from "./Icons";
import { LogoMark } from "./LogoMark";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export function Hero({ lang }: { lang: LangCode }) {
  const { t } = useTranslation();
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__role">{t("hero.role")}</p>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__location">
            <PinIcon />
            <span>{t("hero.location")}</span>
          </p>
          <p className="hero__tagline">{t("hero.tagline")}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#projects">{t("hero.ctaProjects")}</a>
            <a className="button button--secondary" href="#contact">{t("hero.ctaContact")}</a>
            <a
              className="button button--secondary"
              href={profile.resume[lang]}
              download
              target="_blank"
              rel="noopener"
            >
              {t("hero.ctaResume")}
            </a>
          </div>
        </div>
        <div className="hero__art">
          <LogoMark uid="hero" animated glow decor label={profile.name} />
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { t } = useTranslation();
  const tx = (key: string) => t(key as never) as string;
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-heading">{t("about.heading")}</h2>
        <div className="about-grid">
          <div>
            <p className="about__intro">{t("about.intro")}</p>
            <p className="about__personal">{t("about.personal")}</p>
            <ul className="principles-list">
              <li>{t("about.principleOne")}</li>
              <li>{t("about.principleTwo")}</li>
              <li>{t("about.principleThree")}</li>
            </ul>
          </div>
          <div className="exploring">
            <h3 className="exploring__heading">{t("about.exploring.heading")}</h3>
            <ul className="exploring-list">
              {[...exploring].sort(byOrder).map((item) => (
                <li className="exploring-item" key={item.id}>
                  <span className="exploring-item__icon">
                    <IssuerIcon name={item.icon} bare />
                  </span>
                  <span className="exploring-item__text">
                    <span className="exploring-item__title">{tx(`about.exploring.${item.id}.title`)}</span>
                    <span className="exploring-item__description">{tx(`about.exploring.${item.id}.description`)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const STORY = ["story1", "story2", "story3", "story4"] as const;

export function Work({ lang }: { lang: LangCode }) {
  const { t } = useTranslation();
  return (
    <section id="work">
      <div className="container">
        <h2 className="section-heading">{t("work.heading")}</h2>
        <div className="work-steps">
          {STORY.map((key) => (
            <p className="work-step" key={key}>{t(`work.${key}`)}</p>
          ))}
          <div className="work-step work-step--now">
            <p>{t("work.outro")}</p>
            <a className="text-link" href={profile.resume[lang]} download target="_blank" rel="noopener">
              {t("work.resumeLinkLabel")}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const { t } = useTranslation();
  // Keys combine a project id with its own highlight ids, so they are validated
  // at runtime by scripts/check-build.ts rather than by the compiler.
  const tx = (key: string) => t(key as never) as string;
  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-heading">{t("projects.heading")}</h2>
        <p className="section-intro">{t("projects.intro")}</p>
        <div className="projects-grid">
          {[...projects].sort(byOrder).map((project) => (
            <article className="project-entry" key={project.id}>
              <span className="project-entry__environment">
                <IssuerIcon name={project.environment} />
                <span>{t(`projects.environments.${project.environment}`)}</span>
              </span>
              <h3 className="project-entry__title">{project.title}</h3>
              <p className="project-entry__description">{tx(`projects.${project.id}.description`)}</p>
              <ul className="project-entry__highlights">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{tx(`projects.${project.id}.highlights.${highlight}`)}</li>
                ))}
              </ul>
              <ul className="tag-list">
                {project.tech.map((tech) => (
                  <li className="tag" key={tech}>{tech}</li>
                ))}
              </ul>
              <a className="text-link project-entry__link" href={project.link} target="_blank" rel="noopener noreferrer">
                {t("projects.linkLabel")}
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertGrid({ items, modifier }: { items: Certification[]; modifier?: string }) {
  const { t } = useTranslation();
  return (
    <div className={"certifications-grid" + (modifier ? " certifications-grid--" + modifier : "")}>
      {items.map((cert) => (
        <div className="card cert-card" key={cert.id}>
          <span className="cert-card__name">{cert.name}</span>
          <span className="cert-card__code">{cert.code}</span>
          <div className="cert-card__footer">
            <span className="cert-issuer">
              <IssuerIcon name={cert.issuerIcon} />
              <span>{cert.issuer}</span>
            </span>
            <a className="cert-card__verify-link" href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
              {t("certifications.verifyLabel")}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Credentials() {
  const { t } = useTranslation();
  const sorted = [...certifications].sort(byOrder);
  const active = sorted.filter((cert) => cert.status === "active");
  const primary = active.filter((cert) => cert.group !== "supporting");
  const supporting = active.filter((cert) => cert.group === "supporting");
  const retired = sorted.filter((cert) => cert.status === "retired");
  return (
    <section id="credentials">
      <div className="container">
        <h2 className="section-heading">{t("certifications.heading")}</h2>
        <p className="section-intro">{t("certifications.intro")}</p>
        <CertGrid items={primary} />
        {supporting.length > 0 && (
          <details className="credentials-more">
            <summary>{t("certifications.supportingHeading")}</summary>
            <CertGrid items={supporting} modifier="supporting" />
          </details>
        )}
        {retired.length > 0 && (
          <details className="credentials-more">
            <summary>{t("certifications.retiredHeading")}</summary>
            <CertGrid items={retired} modifier="retired" />
          </details>
        )}
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-heading">{t("contact.heading")}</h2>
        <p className="contact__intro">{t("contact.intro")}</p>
        <div className="contact__links">
          <a className="contact__link" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            <span className="contact__link-icon"><GithubIcon /></span>
            <span>{t("contact.github")}</span>
          </a>
          <a className="contact__link" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
            <span className="contact__link-icon"><LinkedinIcon /></span>
            <span>{t("contact.linkedin")}</span>
          </a>
          <a className="contact__link" href={"mailto:" + profile.email}>
            <span className="contact__link-icon"><MailIcon /></span>
            <span>{profile.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <LogoMark uid="foot" className="footer__logo" />
        <span>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.name}
        </span>
      </div>
    </footer>
  );
}
