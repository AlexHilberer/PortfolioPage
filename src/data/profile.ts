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

/** Current position, shown in the "Today" card. Proper nouns, not translated. */
export const currentRole = {
  role: "BI & Data Science Consultant",
  company: "PREVISIONZ",
  city: "Saarbrücken",
  since: "2025-10",
  focus: ["agentic", "mlops", "recommender", "fabric"],
  tech: ["Azure Machine Learning", "Microsoft Fabric", "Azure Synapse", "Agentic AI"]
} as const;
