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
        .catch((error) => console.log("Error fetching data:", error)),
    );
  }, []);
  return (
    <section className="widget__box">
      <div className="widget__title">
        <a href="https://agroweb.rs/" target="_blank">
          Agroweb.rs
        </a>
        <span className="widget__title-line"></span>
      </div>
      {data && data.length >= 6 && (
        <>
          <div className="widget__container widget__container--mobile">
            <ArticleWidget data={data[0]} size="large" />
            <ArticleWidget data={data[1]} size="large" />
            {data.slice(2, 6).map((item, index) => (
              <ArticleWidget key={index} data={item} size="small" />
            ))}
          </div>
          <div className="widget__container widget__container--desktop">
            <div className="widget__row widget__row--featured">
              <ArticleWidget data={data[0]} size="large" />
              <div className="widget__stack">
                {data.slice(1, 6).map((item, index) => (
                  <ArticleWidget key={index} data={item} size="small" />
                ))}
              </div>
            </div>
          </div>
          <div className="widget__more">
            <div className="line"></div>
            <a
              href="https://agroweb.rs/"
              target="_blank"
              className="widget__more-btn"
            >
              Više vesti <span className="widget__arrow">→</span>
            </a>
            <div className="line right"></div>
          </div>
        </>
      )}
    </section>
  );
}
