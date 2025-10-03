import React from "react";
import { Link } from "react-router-dom";
import { blackDays } from "../components/Calendar/calendar-data/calendar-data";

export function urlTitle2(title) {
  const cyrilic = ["č", "ć", "ž", "š", "đ", ",", ":", "-", "?", "!", "."];
  const replArray = ["c", "c", "z", "s", "dj", "", "", "", "", "", ""];
  let regex = /--/gi;
  let url_title = title
    .toLowerCase()
    .split("")
    .map((x) => {
      return cyrilic.indexOf(x) === -1 ? x : replArray[cyrilic.indexOf(x)];
    })
    .join("")
    .split(" ")
    .join("-")
    .replace(regex, "-");
  return url_title;
}

export function renderTitleSection({
  mainTitle,
  extraLabel,
  separatorSymbol = " ",
  slavaSymbol = false,
  linkClass = "slavaStrong",
  strongClass = "",
}) {
  const normalize = (str) => str.replace(/\s+/g, " ").trim();
  return (
    <>
      {slavaSymbol && (
        <>
          <Link to="/slave/" className="slavaStrong">
            SLAVA
          </Link>{" "}
        </>
      )}
      {/* {Array.isArray(mainTitle)
        ? mainTitle.map((el, index) => (
            <React.Fragment key={index}>
              <h2 className={blackDays.includes(el) ? "blackDay" : ""}>{el}</h2>
              {index !== mainTitle.length - 1 ? "; " : ""}
            </React.Fragment>
          ))
        : mainTitle} */}

      {Array.isArray(mainTitle) ? (
        mainTitle.map((el, index) => {
          const isBlackDay = blackDays.some(
            (day) => normalize(day) === normalize(el)
          );
          // console.log("Func", blackDays.includes(el));

          return (
            <React.Fragment key={index}>
              <h2 className={isBlackDay ? "blackDay" : ""}>{el}</h2>
              {index !== mainTitle.length - 1 && <span>; </span>}
            </React.Fragment>
          );
        })
      ) : (
        <h2 className={blackDays.includes(mainTitle) ? "blackDay" : ""}>
          {mainTitle}
        </h2>
      )}
      {separatorSymbol}
      {extraLabel && (
        <h2>
          {/* PREDEFINISATIIII-------------------------- */}
          <strong className={strongClass}>{extraLabel}</strong>
        </h2>
      )}
    </>
  );
}
