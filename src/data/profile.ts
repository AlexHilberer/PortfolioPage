import type { LangCode } from "../i18n/config";

export const profile = {
  name: "Alexander Hilberer",
  githubUrl: "https://github.com/AlexHilberer",
  email: "alexander@hilberer.dev",
  linkedinUrl: "https://www.linkedin.com/in/alexander-hilberer-166413194",
  resume: {
    de: "/assets/resume/Alexander_Hilberer_Lebenslauf.pdf",
    en: "/assets/resume/Alexander_Hilberer_Resume.pdf"
  } satisfies Record<LangCode, string>
};

export const education = [
  { id: "educationMaster", years: "2022 - 2025" },
  { id: "educationBachelor", years: "2018 - 2022" }
] as const;
