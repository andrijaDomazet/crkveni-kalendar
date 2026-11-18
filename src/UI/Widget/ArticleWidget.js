import React from "react";
import "./ArticleWidget.scss";
import { useScriptContext } from "../../shared/ScriptProvider";
export default function ArticleWidget(props) {
  const { data, classes } = props;
  const { cyr } = useScriptContext();
  if (!data) return null;
  return (
    <div className="articleWidget-wrap">
      <a target="_blank" className={classes} href={data.testUrl}>
        <div className="box-wrapper">
          <img src={data.pics[0]} alt="" />
          <div className="box-content">
            <strong>{cyr(`${data.title_2 || data.title}`)}</strong>
            <span className="box-content-3">
              {cyr(`${data.category}`)} <span className="box-arrow">→</span>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
