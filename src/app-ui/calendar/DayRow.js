"use client";
import { Fragment } from "react";
import { useScriptContext } from "../../shared/ScriptProvider";
import {
  blackDays,
  easterDays,
  redDaysId,
} from "../../components/Calendar/calendar-data/calendar-data";
import { getMoonPhaseForDate } from "../../shared/moonPhaseLookup";
import MoonPhaseIcon from "../../UI/MoonPhaseIcon/MoonPhaseIcon";
import { WEEKDAYS_SHORT, splitTitles } from "../lib/dates";
import SlavaBadge from "./SlavaBadge";

const THURSDAY = 4;
const SATURDAY = 6;

const normalize = (text) => text.replace(/\s+/g, " ").trim();
const isBlackDay = (title) =>
  blackDays.some((day) => normalize(day) === normalize(title));

// Crveno slovo, isto kao na webu: praznici iz liste crvenih dana i dani Strasne nedelje
// (osim Velikog cetvrtka i Velike subote), kao i Cveti.
function isRedLetter(item, date) {
  if (!item) return false;
  const weekday = date.getDay();
  return (
    redDaysId.includes(item.id) ||
    (easterDays.includes(item.title) &&
      weekday !== THURSDAY &&
      weekday !== SATURDAY) ||
    item.mainClass === "mainRedStrong"
  );
}

const extraClass = (item) =>
  item.strongClass === "redStrong"
    ? " is-red"
    : item.strongClass === "blackStrong"
      ? " is-black"
      : "";

// Jedan dan u listi: datum, praznik(i), oznaka posta i faza Meseca.
export default function DayRow({ date, item, isToday = false }) {
  const { cyr } = useScriptContext();
  const { main, others } = splitTitles(item?.title);
  const moon = getMoonPhaseForDate(date);
  const red = isRedLetter(item, date);

  return (
    <li
      className={`app-week__row${isToday ? " is-today" : ""}${red ? " is-red" : ""}`}
      data-today={isToday ? "true" : undefined}
    >
      <div className="app-week__date">
        <b>{date.getDate()}</b>
        <span>{cyr(WEEKDAYS_SHORT[date.getDay()])}</span>
      </div>
      <div className="app-week__text">
        <span className={`app-week__main${isBlackDay(main) ? " is-black" : ""}`}>
          {item?.slava && <SlavaBadge />}
          {cyr(main)}
        </span>
        {others.length > 0 && (
          <span className="app-week__others">
            {others.map((title, index) => (
              <Fragment key={title}>
                {index > 0 && " · "}
                <span className={isBlackDay(title) ? "is-black" : undefined}>
                  {cyr(title)}
                </span>
              </Fragment>
            ))}
          </span>
        )}
        {item?.extraLabel && (
          <span className={`app-week__extra${extraClass(item)}`}>
            {cyr(item.extraLabel)}
          </span>
        )}
      </div>
      <div className="app-week__flags">
        {moon && <MoonPhaseIcon phase={moon} size={16} color="currentColor" />}
        {item?.post === "post" && <span className="app-chip">{cyr("Post")}</span>}
      </div>
    </li>
  );
}
