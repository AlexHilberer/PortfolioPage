import { legalContent, type LegalPageId, type Segment } from "../content/legal";
import type { LangCode } from "../i18n/config";

function Text({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((segment, i) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <a
            key={i}
            className="legal__link"
            href={segment.href}
            {...(segment.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {segment.text}
          </a>
        )
      )}
    </>
  );
}

/** Impressum / Datenschutz page (content in src/content/legal.ts). */
export function LegalPage({ lang, page }: { lang: LangCode; page: LegalPageId }) {
  const doc = legalContent[lang][page];
  return (
    <section className="legal">
      <div className="container">
        <h1 className="section-heading">{doc.title}</h1>
        <div className="legal__body">
          {doc.sections.map((section, i) => (
            <div className="legal__section" key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs?.map((segments, j) => (
                <p key={j}>
                  <Text segments={segments} />
                </p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((segments, j) => (
                    <li key={j}>
                      <Text segments={segments} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <p className="legal__updated">{doc.updated}</p>
        </div>
      </div>
    </section>
  );
}
