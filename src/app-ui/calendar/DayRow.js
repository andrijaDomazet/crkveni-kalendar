"use client";
import { useScriptContext } from "../../shared/ScriptProvider";
import { redDaysId } from "../../components/Calendar/calendar-data/calendar-data";
import { getMoonPhaseForDate } from "../../shared/moonPhaseLookup";
import MoonPhaseIcon from "../../UI/MoonPhaseIcon/MoonPhaseIcon";
import { WEEKDAYS_SHORT, splitTitles } from "../lib/dates";

const isRedDay = (item) =>
  !!item &&
  (redDaysId.includes(item.id) ||
    item.strongClass === "redStrong" ||
    item.mainClass === "mainRedStrong");

// Jedan dan u listi: datum, praznik(i), oznaka posta i faza Meseca.
export default function DayRow({ date, item, isToday = false }) {
  const { cyr } = useScriptContext();
  const { main, others } = splitTitles(item?.title);
  const moon = getMoonPhaseForDate(date);
  const red = isRedDay(item);

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
        <span className="app-week__main">{cyr(main)}</span>
        {others.length > 0 && (
          <span className="app-week__others">{cyr(others.join(" · "))}</span>
        )}
        {item?.extraLabel && (
          <span className="app-week__extra">{cyr(item.extraLabel)}</span>
        )}
      </div>
      <div className="app-week__flags">
        {moon && <MoonPhaseIcon phase={moon} size={16} color="currentColor" />}
        {item?.post === "post" && <span className="app-chip">{cyr("Post")}</span>}
      </div>
    </li>
  );
}
