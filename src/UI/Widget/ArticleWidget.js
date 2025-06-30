import React from "react";
import "./ArticleWidget.scss";
export default function ArticleWidget(props) {
  const { data, classes } = props;
  return (
    <div>
      <a target="_blank" className={classes} href={data.testUrl}>
        <div className="box-wrapper">
          <img src={data.pics[0]} alt="" />
          <div className="box-content">
            <h2>{data.title_2 || data.title}</h2>
            <h3 className="box-content-3">
              {data.category}
              {/* <span></span> */}
            </h3>
          </div>
        </div>
      </a>
    </div>
  );
}
