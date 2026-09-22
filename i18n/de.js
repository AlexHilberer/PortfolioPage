window.APP = window.APP || { data: {}, i18n: {} };

APP.i18n.de = {
  meta: {
    htmlLang: "de",
    title: "Alexander Hilberer | Data & AI Systems Engineer",
    description: "Alex Hilberer baut Daten- und KI-Systeme: Datenplattformen, MLOps, agentische KI und ein ausgeprägtes Self-Hosting-Hobby. Aus dem Saarland, Deutschland."
  },
  nav: {
    brand: "Alexander Hilberer",
    langToggleAria: "Sprache wählen",
    menuToggleAria: "Menü öffnen",
    menuCloseAria: "Menü schließen",
    about: "Über mich",
    projects: "Projekte",
    work: "Hintergrund",
    credentials: "Zertifizierungen",
    contact: "Kontakt"
  },
  hero: {
    role: "Data & AI Systems Engineer",
    location: "Saarland, Deutschland",
    tagline: "Ich baue Daten- und KI-Systeme, vor allem Datenplattformen, MLOps und agentische Infrastruktur, mit einem Hang dazu, mehr davon selbst zu hosten als eigentlich nötig wäre.",
    ctaProjects: "Projekte entdecken",
    ctaContact: "Kontakt aufnehmen",
    ctaResume: "Lebenslauf herunterladen"
  },
  about: {
    heading: "Über mich",
    intro: "Mir geht es nicht nur darum, dass ein System funktioniert, sondern dass ich wirklich verstehe, wie es funktioniert: wo die Daten herkommen, wohin sie fließen und was passiert, wenn sich etwas ändert.",
    personal: "Die meisten meiner Nebenprojekte starten mit derselben Frage: Könnte ich das komplett selbst betreiben? Meistens ja, mit ein paar schmerzhaften Umwegen dazwischen. Mich mit Daten zu beschäftigen und Systeme zu bauen macht mir einfach Spaß. Angefangen hat das schon im Bachelor, und seitdem ist es eher mehr als weniger geworden. Den Ausgleich dazu finde ich beim Schwimmen und Wandern, am liebsten so oft wie möglich.",
    principleOne: "Wenn etwas kaputtgeht, will ich das sofort sehen, nicht drei Wochen später in einem Log entdecken.",
    principleTwo: "Zugriffe und Governance denke ich von Anfang an mit, nicht als Nachtrag, wenn es schon zu spät ist.",
    principleThree: "Ich probiere neue Tools gerne aus, aber im Projekt landen nur die, die ein echtes Problem lösen.",
    exploring: {
      heading: "Womit ich mich gerade beschäftige",
      dataplatforms: {
        title: "Datenplattformen",
        description: "Spark, Iceberg, Airflow, Trino und die semantischen Schichten obendrauf."
      },
      aisystems: {
        title: "KI-Systeme",
        description: "Agenten, MCP und genau so viel Zugriff auf Unternehmensdaten wie nötig, nicht mehr."
      },
      mlops: {
        title: "MLOps",
        description: "Deployment, Monitoring, Retraining und Explainability, nicht nur das Modell."
      },
      selfhosting: {
        title: "Self-Hosting",
        description: "Weil ein Dutzend Container zuhause offenbar als Hobby zählt."
      },
      cloudiac: {
        title: "Cloud & IaC",
        description: "Vor allem Azure, Fabric und Terraform, reproduzierbar oder gar nicht."
      }
    }
  },
  work: {
    heading: "Wo ich herkomme",
    story1: "Angefangen hat das alles ziemlich planlos. Ich habe Wirtschaftsinformatik im Bachelor studiert, vor allem weil ich meine wirtschaftliche Vorbildung nicht komplett aufgeben wollte, aber gleichzeitig schon immer an Computern hängen geblieben bin. Von Data Science hatte ich zu dem Zeitpunkt keine Ahnung. Irgendwann saß ich in einer Statistik-Vorlesung und war zum ersten Mal richtig fasziniert, ausgerechnet von einer linearen Regression.",
    story2: "Von da an ging es eher schleichend weiter. Ich habe mir zusätzliche Vorlesungen wie Advanced Business Analytics, Klassifikationsverfahren im Data Mining oder Maschinelles Lernen reingezogen, einfach weil mich das Thema nicht mehr losgelassen hat. Ein IT-Praktikum und meine Bachelorarbeit haben mir dann noch klarer gezeigt, wie viel es in der Informatik zu entdecken gibt und wie wenig ich eigentlich wusste, also habe ich mich für den Master in Artificial Intelligence & Data Science entschieden, quasi ein Fachwechsel von Wirtschaft zu Informatik.",
    story3: "Am Anfang bin ich damit ziemlich auf die Nase gefallen, die Mathematik war deutlich härter als gedacht, aber mit ein paar zu vielen durchgemachten Nächten habe ich die Lücken aufgeholt.",
    story4: "Parallel dazu bin ich als Werkstudent bei PREVISIONZ eingestiegen und habe dort zum ersten Mal gesehen, wie Datenplattformen auf Enterprise-Niveau wirklich aussehen. Irgendwann kam der Gedanke: Wenn das in der Cloud funktioniert, bekomme ich das eigentlich auch selbst hin, mit Open Source und eigener Hardware. Genau daraus sind meine ersten eigenen Projekte entstanden.",
    outro: "Heute arbeite ich Vollzeit als BI & Data Science Consultant bei PREVISIONZ in Saarbrücken und baue für Kunden Cloud-Plattformen und ML-Workflows.",
    resumeLinkLabel: "Vollständiger Lebenslauf ->"
  },
  certifications: {
    heading: "Zertifizierungen",
    intro: "Aktuelle Zertifizierungen ergänzen meine praktische Arbeit.",
    supportingHeading: "Weitere Zertifizierungen",
    retiredHeading: "Zurückgezogene Zertifizierungen",
    verifyLabel: "Nachweis"
  },
  projects: {
    heading: "Projekte",
    intro: "Ein paar Dinge, die ich gebaut habe, um herauszufinden, wie sie wirklich funktionieren, nicht nur, wie sie funktionieren sollen.",
    linkLabel: "Repository öffnen",
    environments: {
      onprem: "Self-hosted",
      azure: "Azure"
    },
    "onprem-data-lakehouse": {
      description: "Ich wollte wissen, wie viel von einer enterprise-tauglichen Datenplattform ich selbst betreiben kann, also habe ich ein komplettes Lakehouse für Retaildaten auf einer einzigen Maschine gebaut: Batch-Verarbeitung, offene Tabellenformate, rollenbasierte Zugriffe und Analytics, ganz ohne Cloud.",
      highlights: {
        identity: "LDAP-Rollen und Ranger-Policies sorgen dafür, dass der Trino-Zugriff eng begrenzt bleibt, statt offen für alle.",
        orchestration: "Airflow und Spark orchestrieren Bronze-, Silver- und Gold-Transformationen inklusive Data-Quality-Checks.",
        analytics: "Trino, Cube und Superset stellen die kuratierten Daten bereit."
      }
    },
    "onprem-agentic-bi": {
      description: "Der interessante Teil, wenn man einem KI-Agenten Zugriff auf Business-Daten gibt, war nie das Chat-Fenster. Er lag darin, sicherzustellen, dass der Agent wirklich nur sieht, was die Person dahinter sehen darf, also verbindet dieses Projekt Identität und Berechtigungen konsequent über Agent, MCP und semantische Schicht.",
      highlights: {
        access: "LDAP, Authentik OIDC/OAuth und ein eigenes Cube-MCP-Gateway regeln, wer reinkommt.",
        governance: "MCP-Abfragen tragen die angemeldete Identität, inklusive rollenbasierter PII-Maskierung auf diesem Pfad.",
        tools: "Agentenabfragen und Dashboard-Zugriff bleiben bewusst getrennt, das Dashboard läuft über eine eigene Service-Identität."
      }
    },
    "onprem-mlops": {
      description: "Ein Modell zu trainieren ist der einfache Teil. Dieses Projekt baut alles drumherum: Tracking, Batch-Inferenz, Monitoring, Drift-Erkennung, Explainability und Retraining, für ein Klassifikationsproblem, das wirklich produktiv laufen sollte, nicht nur im Notebook.",
      highlights: {
        lifecycle: "Airflow-DAGs verbinden Batch-Inferenz, Monitoring und Retraining, MLflow trackt jeden Lauf.",
        monitoring: "Klassifikationsmetriken, Feature-Drift und SHAP-Erklärungen laufen als wiederholbare, automatisierte Checks.",
        delivery: "Challenger-Modelle werden per Cross-Validation verglichen, jede Promotion-Entscheidung wird protokolliert."
      }
    },
    "fabric-agentic-analytics": {
      description: "Ein Experiment darin, eine Microsoft-Fabric-Umgebung wie Software zu behandeln statt wie etwas, das man sich manuell zusammenklickt. Infrastruktur, Medallion-Pipeline, semantisches Modell und Power-BI-Reports werden über Terraform und fabric-cicd reproduzierbar bereitgestellt, mit einer optionalen KI-Schicht obendrauf.",
      highlights: {
        infrastructure: "Terraform stellt die Azure-Basisinfrastruktur und den Fabric-Workspace bereit.",
        analytics: "Medallion-Pipeline, semantisches Modell und Power-BI-Report werden reproduzierbar veröffentlicht, ganz ohne manuelles Klicken.",
        integration: "Die lokale KI-Chat-Schicht und die Realtime-Erweiterung bleiben separate, optionale Module obendrauf."
      }
    }
  },
  contact: {
    heading: "Kontakt",
    intro: "Wenn du dich austauschen oder einfach Kontakt aufnehmen möchtest, freue ich mich über eine Nachricht."
  }
};
