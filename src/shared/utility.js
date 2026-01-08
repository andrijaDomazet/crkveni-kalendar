import React from "react";
import { Link } from "react-router-dom";
import { blackDays } from "../components/Calendar/calendar-data/calendar-data";

export function urlTitle2(title) {
  // console.log("TITLE", title);
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
  mainClass = "",
  strongClass = "",
}) {
  const normalize = (str) => str.replace(/\s+/g, " ").trim();
  // console.log("Element", mainTitle);

  return (
    <>
      {slavaSymbol && (
        <>
          <Link to="/slave/" className="slavaStrong">
            SLAVA
          </Link>{" "}
        </>
      )}
      {Array.isArray(mainTitle) ? (
        mainTitle.map((el, index) => {
          const isBlackDay = blackDays.some(
            (day) => normalize(day) === normalize(el)
          );
          return (
            <React.Fragment key={index} className={mainClass}>
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
          {/* {extraLabel} */}
          <strong className={strongClass}>{extraLabel}</strong>
        </h2>
      )}
    </>
  );
}

export const getPreUrlTitle = (item) => {
  // console.log("TEST", allC);

  // if (!item || !Array.isArray(allC)) return "";

  // const found = allC.find(
  //   (e) => urlTitle2(e.title) === urlTitle2(item.category)
  // );
  // console.log("Found", found);

  // const route = found?.route;
  // return route ? `${route}${cat ? "" : urlTitle2(item.title) + "/"}` : "";
  return `/${item.category}/${urlTitle2(item.title)}/`;
};
