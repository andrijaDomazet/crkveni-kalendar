"use client";
import { infoText } from "../../shared/shared";
import { useScriptContext } from "../../shared/ScriptProvider";
import { INFO_SLUGS } from "../lib/content";
import { cyrHtmlSafe } from "../lib/safeHtml";

export default function InfoScreen({ slug }) {
  const { cyr, cyrHtml: rawCyrHtml } = useScriptContext();
  const cyrHtml = (html) => cyrHtmlSafe(rawCyrHtml, html);
  const index = INFO_SLUGS.indexOf(slug);
  if (index === -1) return null;
  const [title, html] = infoText[index];

  return (
    <div className="app-screen">
      <article className="app-card app-article">
        <div className="app-article__head">
          <h1>{cyr(title)}</h1>
        </div>
        <div
          className="app-prose"
          dangerouslySetInnerHTML={{ __html: cyrHtml(html) }}
        />
      </article>
    </div>
  );
}
