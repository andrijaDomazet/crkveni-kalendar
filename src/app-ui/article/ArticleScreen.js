"use client";
import { useScriptContext } from "../../shared/ScriptProvider";
import { monthSerb } from "../../components/Calendar/calendar-data/calendar-data";
import AppAd from "../ads/AppAd";
import { AD_ARTICLE_END, AD_IN_TEXT } from "../ads/slots";
import ArticleBody from "./ArticleBody";
import { displayTitle } from "../lib/content";

// Prikaz jednog clanka (ili molitve): naslov, uvod, telo, dodatni sadrzaj ispod.
// Hero slika je samo za praznike; na ostalim stranicama je SEO slika koja app-u ne treba.
// Prva reklama ide posle prvog pasusa, druga na kraju clanka.
export default function ArticleScreen({ article, showHero = false, children }) {
  const { cyr } = useScriptContext();

  if (!article) {
    return (
      <div className="app-screen">
        <article className="app-card app-placeholder">
          <h2>{cyr("Sadržaj nije pronađen")}</h2>
        </article>
      </div>
    );
  }

  const [picUrl, picSource] = article.pics ?? [];
  const date = article.holidayDate
    ? `${article.holidayDate[1]}. ${monthSerb[article.holidayDate[0]]}`
    : null;

  return (
    <div className="app-screen">
      <article className="app-card app-article">
        {showHero && picUrl && (
          <figure className="app-article__hero">
            <img src={picUrl} alt="" decoding="async" />
            {picSource && (
              <figcaption>
                {cyr("Foto:")} {picSource}
              </figcaption>
            )}
          </figure>
        )}
        <div className="app-article__head">
          {date && <span className="app-article__date">{cyr(date)}</span>}
          <h1>{cyr(displayTitle(article))}</h1>
          {article.lead && <p className="app-article__lead">{cyr(article.lead)}</p>}
        </div>
        <ArticleBody
          body={article.body}
          afterFirst={<AppAd slot={AD_IN_TEXT} />}
        />
      </article>
      {children}
      <AppAd slot={AD_ARTICLE_END} />
    </div>
  );
}
