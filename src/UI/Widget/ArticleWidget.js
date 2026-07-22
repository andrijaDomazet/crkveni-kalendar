import React from "react";
import "./ArticleWidget.scss";
import { useScriptContext } from "../../shared/ScriptProvider";
export default function ArticleWidget(props) {
  const { data, classes } = props;
    const { cyr } = useScriptContext();
  if (!data) return null;

  return (
    <div>
      <a target="_blank" className={classes} href={data.testUrl}>
        <div className="box-wrapper">
          <img src={data.pics[0]} alt="" />
          <div className="box-content">
            <img className="ornament-line" src="/img/line.png" loading="lazy" />
            <strong>{cyr(`${data.title_2 || data.title}`)}</strong>
            <span className="box-content-3">{cyr(`${data.category}`)}</span>
          </div>
        </div>
      </a>
    </div>
  );
}
