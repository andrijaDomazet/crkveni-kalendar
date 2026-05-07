"use client";
import React, { useEffect, useState } from "react";
import ArticleWidget from "./ArticleWidget.js";
import "./Widget.scss";

export default function Widget() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://agroweb.rs/filteredData.json").then((response) =>
      response
        .json()
        .then((data) => setData(data))
        .catch((error) => console.log("Error fetching data:", error))
    );
  }, []);
  return (
    <section className="widget__box">
      <div className="widget__title">
        <a href="https://agroweb.rs/" target="_blank">
          Agroweb.rs
        </a>
      </div>
      {/* <div className="widget__container"> */}
      {data && (
        <div className="widget__container">
          <ArticleWidget data={data[0]} classes="wBox" />
          <ArticleWidget data={data[1]} classes="wBox" />
          <ArticleWidget data={data[2]} classes="wBox" />
          {/* <ArticleWidget data={data[3]} classes="wBox" /> */}
        </div>
      )}
      {/* </div> */}
      {/* <div className="box3__right"></div> */}
    </section>
  );
}
