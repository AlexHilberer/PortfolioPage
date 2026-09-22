window.APP = window.APP || { data: {}, i18n: {} };

APP.i18n.en = {
  meta: {
    htmlLang: "en",
    title: "Alexander Hilberer | Data & AI Systems Engineer",
    description: "Alex Hilberer builds data and AI systems: data platforms, MLOps, agentic AI and a healthy self-hosting habit. Based in Saarland, Germany."
  },
  nav: {
    brand: "Alexander Hilberer",
    langToggleAria: "Select language",
    menuToggleAria: "Open menu",
    menuCloseAria: "Close menu",
    about: "About",
    projects: "Projects",
    work: "Background",
    credentials: "Credentials",
    contact: "Contact"
  },
  hero: {
    role: "Data & AI Systems Engineer",
    location: "Saarland, Germany",
    tagline: "I build data and AI systems, mostly data platforms, MLOps and agentic infrastructure, with a habit of self-hosting more of it than is strictly necessary.",
    ctaProjects: "Explore projects",
    ctaContact: "Get in touch",
    ctaResume: "Download résumé"
  },
  about: {
    heading: "About",
    intro: "What matters to me is not just that a system works, but that I actually understand how it works: where the data comes from, where it flows, and what happens when something changes.",
    personal: "Most of my side projects start with the same question: could I run the whole thing myself? Usually yes, with a few painful detours along the way. Working with data and building systems is just genuinely fun for me. It started back in my bachelor's degree, and if anything it has only grown since. I balance it out with swimming and hiking, as often as I can manage.",
    principleOne: "If something breaks, I want to see it immediately, not discover it three weeks later buried in a log.",
    principleTwo: "I think about access and governance from day one, not bolted on after the fact once it is already too late.",
    principleThree: "I like trying new tools, but only the ones that solve a real problem actually make it into a project.",
    exploring: {
      heading: "Currently exploring",
      dataplatforms: {
        title: "Data platforms",
        description: "Spark, Iceberg, Airflow, Trino and the semantic layers glued on top."
      },
      aisystems: {
        title: "AI systems",
        description: "Agents, MCP and giving them just enough access to enterprise data, not more."
      },
      mlops: {
        title: "MLOps",
        description: "Deployment, monitoring, retraining and explainability, not just the model."
      },
      selfhosting: {
        title: "Self-hosting",
        description: "Because running a dozen containers at home is apparently a hobby now."
      },
      cloudiac: {
        title: "Cloud & IaC",
        description: "Mostly Azure, Fabric and Terraform, done reproducibly or not at all."
      }
    }
  },
  work: {
    heading: "Where I come from",
    story1: "It started out pretty aimless. I studied Business Informatics for my bachelor's, mostly because I did not want to give up the business background I already had, while still being someone who never really let go of computers. Data science was not on my radar at all at that point. Then one day, in a statistics lecture, I got genuinely hooked, on linear regression of all things.",
    story2: "From there it was more of a slow slide than a decision. I started picking up extra courses like Advanced Business Analytics, classification methods in data mining, and machine learning, mostly because the topic would not let go of me. An IT internship and my bachelor's thesis made it even clearer how much there still was to learn in computer science and how little I actually knew, so I went for a master's in Artificial Intelligence and Data Science, basically switching lanes from business to computer science.",
    story3: "I fell flat on my face early on, the math was a lot harder than I expected, but with a few too many sleepless nights I caught up.",
    story4: "Around the same time I started as a working student at PREVISIONZ and saw for the first time what enterprise-grade data platforms actually look like. At some point it clicked: if this works in the cloud, I can probably pull it off myself too, with open source and my own hardware. That is exactly where my first personal projects came from.",
    outro: "Today I work full time as a BI & Data Science Consultant at PREVISIONZ in Saarbrücken, building cloud platforms and ML workflows for clients.",
    resumeLinkLabel: "Full résumé ->"
  },
  certifications: {
    heading: "Credentials",
    intro: "Current certifications complement my practical work.",
    supportingHeading: "Additional certifications",
    retiredHeading: "Retired certifications",
    verifyLabel: "Verify"
  },
  projects: {
    heading: "Projects",
    intro: "A few things I built to find out how they actually work, not just how they are supposed to work.",
    linkLabel: "Open repository",
    environments: {
      onprem: "Self-hosted",
      azure: "Azure"
    },
    "onprem-data-lakehouse": {
      description: "I wanted to know how much of an enterprise data platform I could actually run myself, so I built a full lakehouse for retail data on a single machine: batch processing, open table formats, role-based access and analytics, no cloud required.",
      highlights: {
        identity: "Modeled LDAP roles and Ranger policies so Trino access stays scoped, not wide open.",
        orchestration: "Airflow and Spark orchestrate bronze, silver and gold transformations, with data quality checks built in.",
        analytics: "Trino, Cube and Superset serve curated data on top."
      }
    },
    "onprem-agentic-bi": {
      description: "The interesting part of letting an AI agent query business data was never the chat window. It was making sure the agent only ever sees what the person behind it is actually allowed to see, so this project wires identity and permissions through the whole agent to MCP to semantic layer path.",
      highlights: {
        access: "LDAP, Authentik OIDC/OAuth and a dedicated Cube MCP gateway handle who gets in.",
        governance: "MCP queries carry the signed-in identity, with role-based PII masking enforced on that path.",
        tools: "Agent queries and dashboard access stay deliberately separate; the dashboard runs on its own service identity."
      }
    },
    "onprem-mlops": {
      description: "Training a model is the easy part. This project builds everything around it too: tracking, batch inference, monitoring, drift detection, explainability and retraining, for a classification problem that needed to actually run in production, not just in a notebook.",
      highlights: {
        lifecycle: "Airflow DAGs tie batch inference, monitoring and retraining together, with MLflow tracking every run.",
        monitoring: "Classification metrics, feature drift and SHAP explanations run as repeatable, automated checks.",
        delivery: "Challenger models get compared through cross-validation, and every promotion decision gets logged."
      }
    },
    "fabric-agentic-analytics": {
      description: "An experiment in treating a Microsoft Fabric environment like software instead of something clicked together by hand. Infrastructure, medallion pipelines, semantic models and Power BI reports all deploy reproducibly through Terraform and fabric-cicd, with an optional AI layer on top.",
      highlights: {
        infrastructure: "Terraform provisions the Azure base infrastructure and the Fabric workspace itself.",
        analytics: "A medallion pipeline, semantic model and Power BI report all publish reproducibly, no manual clicking.",
        integration: "The local AI chat layer and realtime extension stay separate, optional modules on top of the core platform."
      }
    }
  },
  contact: {
    heading: "Contact",
    intro: "If you would like to connect or simply get in touch, I would be glad to hear from you."
  }
};
