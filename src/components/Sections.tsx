import { useTranslation } from "react-i18next";
import { certifications, type Certification } from "../data/certifications";
import { experience } from "../data/experience";
import { education, profile } from "../data/profile";
import { projects } from "../data/projects";
import type { LangCode } from "../i18n/config";
import {
  GithubIcon,
  GradIcon,
  IssuerIcon,
  LinkedinIcon,
  MailIcon,
  PinIcon
} from "./Icons";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

function formatMonth(value: string, lang: LangCode): string {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(lang, {
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function Hero({ lang }: { lang: LangCode }) {
  const { t } = useTranslation();
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__role">{t("hero.role")}</p>
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
    </section>
  );
}

export function About() {
  const { t } = useTranslation();
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
          <dl className="about__list">
            <div>
              <dt>{t("about.educationHeading")}</dt>
              {education.map((item) => (
                <dd className="about__degree" key={item.id}>
                  <span className="about__degree-main">
                    <GradIcon />
                    <span>{t(`about.${item.id}`)}</span>
                  </span>
                  <span className="about__degree-years">{item.years}</span>
                </dd>
              ))}
            </div>
          </dl>
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
              <h3 className="project-entry__title">{project.title}</h3>
              <span className="project-entry__environment">
                <IssuerIcon name={project.environment} />
                <span>{t(`projects.environments.${project.environment}`)}</span>
              </span>
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
              <a className="project-entry__link" href={project.link} target="_blank" rel="noopener noreferrer">
                {t("projects.linkLabel")} -&gt;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience({ lang }: { lang: LangCode }) {
  const { t } = useTranslation();
  const tx = (key: string) => t(key as never) as string;
  return (
    <section id="experience">
      <div className="container">
        <h2 className="section-heading">{t("experience.heading")}</h2>
        <ul className="experience-list">
          {[...experience].sort(byOrder).map((job) => (
            <li className="experience-item" key={job.id}>
              <div className="experience-item__header">
                <span className="experience-item__role">
                  {tx(`experience.${job.id}.role`)} - {job.company}
                </span>
              </div>
              <div className="experience-item__meta">
                <span className="experience-item__dates">
                  <IssuerIcon name="calendar" />
                  <span>
                    {formatMonth(job.startDate, lang)} -{" "}
                    {job.endDate ? formatMonth(job.endDate, lang) : t("experience.present")}
                  </span>
                </span>
                <span className="experience-item__location">{tx(`experience.${job.id}.location`)}</span>
              </div>
              <p className="experience-item__description">{tx(`experience.${job.id}.description`)}</p>
            </li>
          ))}
        </ul>
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
        <p>{t("contact.intro")}</p>
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
      <div className="container footer" style={{ border: "none", padding: 0 }}>
        <span>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {profile.name}
        </span>
      </div>
    </footer>
  );
}
