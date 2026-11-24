"use client";
import { Fragment } from "react";
import { useScriptContext } from "../../shared/ScriptProvider";
import { useInternalLinks } from "../lib/links";
import { cyrHtmlSafe } from "../lib/safeHtml";
import ZadusniceList from "./dynamic/ZadusniceList";
import MoonPhasesList from "./dynamic/MoonPhasesList";

// Web komponente iz podataka koje u app-u imaju svoju verziju (ili ih nema).
const DYNAMIC = {
  Zadusnice: ZadusniceList,
  MoonPhasesList,
};

export default function ArticleBody({ body = [] }) {
  const { cyr, cyrHtml: rawCyrHtml } = useScriptContext();
  const cyrHtml = (html) => cyrHtmlSafe(rawCyrHtml, html);
  const onClick = useInternalLinks();

  return (
    <div className="app-prose" onClick={onClick}>
      {body.map((item, index) => {
        const Dynamic = item.component ? DYNAMIC[item.component] : null;
        return (
          <Fragment key={index}>
            {item.subtitle && <h2>{cyr(item.subtitle)}</h2>}
            {item.subtitle3 && <h3>{cyr(item.subtitle3)}</h3>}
            {item.text && (
              <p dangerouslySetInnerHTML={{ __html: cyrHtml(item.text) }} />
            )}
            {item.imgSrc && (
              <figure className="app-prose__fig">
                <img src={item.imgSrc[0]} alt="" loading="lazy" decoding="async" />
                <figcaption
                  dangerouslySetInnerHTML={{
                    __html: `${cyr("Foto:")} ${cyrHtml(item.imgSrc[1] ?? "")}`,
                  }}
                />
              </figure>
            )}
            {item.textQuote && (
              <div
                className="app-prose__quote"
                dangerouslySetInnerHTML={{ __html: cyrHtml(item.textQuote) }}
              />
            )}
            {Dynamic && <Dynamic />}
          </Fragment>
        );
      })}
    </div>
  );
}
