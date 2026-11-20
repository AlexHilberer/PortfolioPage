import { profile } from "../data/profile";
import type { LangCode } from "../i18n/config";

/** A paragraph is plain text and links; `items` renders as a list. */
export type Segment = string | { text: string; href: string };
export type LegalSection = { heading?: string; paragraphs?: Segment[][]; items?: Segment[][] };
export type LegalDoc = { title: string; updated: string; sections: LegalSection[] };
export type LegalPageId = "impressum" | "datenschutz";

const email = { text: profile.email, href: `mailto:${profile.email}` };
const githubPrivacy = {
  text: "GitHub Privacy Statement",
  href: "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
};

/*
 * Only information that is already public on the site is used here (name,
 * region, e-mail). The texts describe what this site actually does: static
 * hosting on GitHub Pages, no cookies, no tracking, self-hosted fonts, and two
 * small browser-storage entries. Keep them in sync when that changes.
 */
export const legalContent: Record<LangCode, Record<LegalPageId, LegalDoc>> = {
  de: {
    impressum: {
      title: "Impressum",
      updated: "Stand: November 2026",
      sections: [
        { heading: "Angaben gemäß § 5 DDG", paragraphs: [[profile.name], ["Saarland, Deutschland"]] },
        { heading: "Kontakt", paragraphs: [["E-Mail: ", email]] },
        { heading: "Verantwortlich für den Inhalt", paragraphs: [[profile.name]] },
        {
          heading: "Haftung für Links",
          paragraphs: [
            [
              "Diese Website enthält Links zu externen Websites, zum Beispiel GitHub und LinkedIn. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich."
            ]
          ]
        }
      ]
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      updated: "Stand: November 2026",
      sections: [
        {
          heading: "Verantwortlicher",
          paragraphs: [[profile.name], ["Saarland, Deutschland"], ["E-Mail: ", email]]
        },
        {
          heading: "Hosting über GitHub Pages",
          paragraphs: [
            [
              "Diese Website ist eine statische Seite und wird über GitHub Pages bereitgestellt, einen Dienst der GitHub, Inc., USA. Wenn Sie die Seite aufrufen, verarbeitet GitHub technisch notwendige Daten, insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Abrufs sowie Angaben zu Browser und Betriebssystem, um die Seite auszuliefern und den Betrieb abzusichern."
            ],
            [
              "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung der Website. Dabei können Daten in die USA übermittelt werden. Wie GitHub diese Übermittlung absichert, zum Beispiel über das EU-US Data Privacy Framework oder EU-Standardvertragsklauseln, steht im ",
              githubPrivacy,
              "."
            ],
            ["Ich selbst habe keinen Zugriff auf diese Server-Logs und werte keine Besucherdaten aus."]
          ]
        },
        {
          heading: "Keine Cookies, kein Tracking",
          paragraphs: [
            [
              "Diese Website setzt keine Cookies und verwendet keine Analyse- oder Tracking-Dienste. Schriftarten werden von dieser Website selbst ausgeliefert; es werden keine externen Schriften, Skripte oder Inhalte von Drittanbietern geladen."
            ]
          ]
        },
        {
          heading: "Speicherung im Browser",
          paragraphs: [
            ["Für zwei Komfortfunktionen speichert die Website kleine Einträge ausschließlich in Ihrem Browser:"]
          ],
          items: [
            ["Ihre Sprachauswahl (Deutsch/Englisch), damit die Seite beim nächsten Besuch in Ihrer Sprache öffnet."],
            ["Ob die Startanimation in diesem Browser-Tab bereits gelaufen ist."]
          ]
        },
        {
          paragraphs: [
            [
              "Diese Einträge verlassen Ihr Gerät nicht und werden nicht an mich oder Dritte übertragen. Sie können sie jederzeit über die Einstellungen Ihres Browsers löschen. Die Speicherung ist für diese von Ihnen genutzten Funktionen erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG)."
            ]
          ]
        },
        {
          heading: "Kontakt per E-Mail",
          paragraphs: [
            [
              "Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre Angaben, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO). Ich lösche die Daten, sobald sie dafür nicht mehr benötigt werden und keine gesetzlichen Aufbewahrungspflichten entgegenstehen."
            ]
          ]
        },
        {
          heading: "Externe Links",
          paragraphs: [
            [
              "Links zu GitHub, LinkedIn, Microsoft Learn oder Credly werden erst geöffnet, wenn Sie sie anklicken. Ab dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters."
            ]
          ]
        },
        {
          heading: "Ihre Rechte",
          paragraphs: [
            [
              "Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Wenden Sie sich dafür einfach per E-Mail an mich."
            ],
            [
              "Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Unabhängigen Datenschutzzentrum Saarland."
            ]
          ]
        }
      ]
    }
  },
  en: {
    impressum: {
      title: "Legal notice",
      updated: "Last updated: November 2026",
      sections: [
        {
          heading: "Information pursuant to § 5 DDG (German Digital Services Act)",
          paragraphs: [[profile.name], ["Saarland, Germany"]]
        },
        { heading: "Contact", paragraphs: [["Email: ", email]] },
        { heading: "Responsible for the content", paragraphs: [[profile.name]] },
        {
          heading: "Links",
          paragraphs: [
            [
              "This website links to external websites such as GitHub and LinkedIn. Their operators are solely responsible for their content."
            ]
          ]
        }
      ]
    },
    datenschutz: {
      title: "Privacy policy",
      updated: "Last updated: November 2026",
      sections: [
        {
          heading: "Controller",
          paragraphs: [[profile.name], ["Saarland, Germany"], ["Email: ", email]]
        },
        {
          heading: "Hosting on GitHub Pages",
          paragraphs: [
            [
              "This website is a static site served by GitHub Pages, a service of GitHub, Inc., USA. When you visit it, GitHub processes technically necessary data, in particular your IP address, the date and time of the request and information about your browser and operating system, to deliver the site and keep it secure."
            ],
            [
              "The legal basis is Art. 6(1)(f) GDPR; my legitimate interest is a secure and reliable website. Data may be transferred to the USA. How GitHub safeguards such transfers, for example through the EU-US Data Privacy Framework or EU standard contractual clauses, is described in the ",
              githubPrivacy,
              "."
            ],
            ["I have no access to these server logs myself and do not analyse visitor data."]
          ]
        },
        {
          heading: "No cookies, no tracking",
          paragraphs: [
            [
              "This website sets no cookies and uses no analytics or tracking services. Fonts are served by this website itself; no external fonts, scripts or third-party content are loaded."
            ]
          ]
        },
        {
          heading: "Storage in your browser",
          paragraphs: [["For two convenience features, the website stores small entries in your browser only:"]],
          items: [
            ["Your language choice (German/English), so the site opens in your language next time."],
            ["Whether the intro animation has already played in this browser tab."]
          ]
        },
        {
          paragraphs: [
            [
              "These entries never leave your device and are not sent to me or anyone else. You can delete them at any time in your browser settings. Storing them is necessary for these features you use (§ 25(2) no. 2 TDDDG)."
            ]
          ]
        },
        {
          heading: "Contact by email",
          paragraphs: [
            [
              "If you email me, I process your details to answer your request (Art. 6(1)(b) or (f) GDPR) and delete them once they are no longer needed, unless legal retention periods apply."
            ]
          ]
        },
        {
          heading: "External links",
          paragraphs: [
            [
              "Links to GitHub, LinkedIn, Microsoft Learn or Credly only open when you click them. From then on, the privacy policy of the respective provider applies."
            ]
          ]
        },
        {
          heading: "Your rights",
          paragraphs: [
            [
              "You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection (Art. 21). Just email me."
            ],
            [
              "You can also lodge a complaint with a data protection supervisory authority, for example the Independent Data Protection Centre Saarland (Unabhängiges Datenschutzzentrum Saarland)."
            ]
          ]
        }
      ]
    }
  }
};
