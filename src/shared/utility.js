import React from "react";
import Link from "next/link";
import { blackDays } from "../components/Calendar/calendar-data/calendar-data";
import { monthSerb } from "./shared";

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
  extraLabelLink = null,
  separatorSymbol = " ",
  slavaSymbol = false,
  linkClass = "slavaStrong",
  mainClass = "",
  strongClass = "",
}) {
  const normalize = (str) => str.replace(/\s+/g, " ").trim();

  return (
    <>
      {slavaSymbol && (
        <>
          <Link href="/slave/" className="slavaStrong">
            SLAVA
          </Link>{" "}
        </>
      )}
      {Array.isArray(mainTitle) ? (
        mainTitle.map((el, index) => {
          const isBlackDay = blackDays.some(
            (day) => normalize(day) === normalize(el),
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
      {separatorSymbol && <span>{separatorSymbol}</span>}

      {extraLabel &&
        (() => {
          const content = (
            <h2>
              <strong className={strongClass}>{extraLabel}</strong>
            </h2>
          );

          return extraLabelLink ? (
            <Link href={extraLabelLink}>{content}</Link>
          ) : (
            content
          );
        })()}
    </>
  );
}

export const getPreUrlTitle = (item) => {
  return `/${item.category}/${urlTitle2(item.title)}/`;
};

export const getDayMonth = (date) => ({
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
});

export const toMidnightTs = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export const getDaysInMonth = (year, month) => {
  const daysCount = new Date(year, month + 1, 0).getDate();

  return Array.from(
    { length: daysCount },
    (_, i) => new Date(year, month, i + 1),
  );
};

export const getFullCalendar = (year, month) => {
  const firstDayRaw = new Date(year, month, 1).getDay();
  const firstDay = firstDayRaw === 0 ? 6 : firstDayRaw - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendar = [];

  for (let i = firstDay; i > 0; i--) {
    calendar.push({ day: daysInPrevMonth - i + 1, currentMonth: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push({ day: i, currentMonth: true });
  }

  let nextMonthDay = 1;
  while (calendar.length % 7 !== 0) {
    calendar.push({ day: nextMonthDay, currentMonth: false });
    nextMonthDay++;
  }

  return calendar;
};
