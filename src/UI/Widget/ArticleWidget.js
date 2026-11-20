import React from "react";
import "./ArticleWidget.scss";
import { useScriptContext } from "../../shared/ScriptProvider";
import { formatArticleDate } from "../../shared/utility.js";

const CATEGORY_COLORS = [
  "#4f7942",
  "#2e8b74",
  "#4a6fa5",
  "#b5651d",
  "#8e5572",
  "#6b4f3b",
  "#a13d3d",
  "#c08a2e",
];

function categoryColor(category) {
  if (!category) return CATEGORY_COLORS[0];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CATEGORY_COLORS[Math.abs(hash) % CATEGORY_COLORS.length];
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4c-8.5 0-14 5.5-14 13 0 1 .1 1.7.2 2.3C12.5 17.8 17 13.2 19 9c-3 3.4-7.6 7.3-13.6 9.6C5.2 19 5 18.2 5 17 5 9.5 10.5 4 18 4h2z" />
    </svg>
  );
}

export default function ArticleWidget(props) {
  const { data, size = "small" } = props;
  const { cyr } = useScriptContext();
  if (!data) return null;
  const color = categoryColor(data.category);
  const title = cyr(`${data.title_2 || data.title}`);
  const category = cyr(`${data.category}`);

  if (size === "large") {
    const lead = cyr(`${data.lead_2 || data.lead || ""}`);
    const date = formatArticleDate(data.time2);
    return (
      <div className="articleWidget-wrap">
        <a target="_blank" className="wBox large" href={data.testUrl}>
          <img src={data.pics[0]} alt="" />
          <div className="hero-content">
            <div className="hero-meta">
              <span className="hero-category" style={{ color }}>
                <LeafIcon />
                {category}
              </span>
              {date && <span className="hero-date">{date}</span>}
            </div>
            <strong>{title}</strong>
            {lead && <p className="hero-lead">{lead}</p>}
            <span className="hero-btn">
              {cyr(`Pročitaj više`)} <span className="box-arrow">→</span>
            </span>
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className="articleWidget-wrap">
      <a target="_blank" className="wBox small" href={data.testUrl}>
        <div className="box-wrapper">
          <img src={data.pics[0]} alt="" />
          <div className="box-content">
            <span className="box-category" style={{ color }}>
              <LeafIcon />
              {category}
            </span>
            <strong>{title}</strong>
          </div>
        </div>
      </a>
    </div>
  );
}
