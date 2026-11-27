"use client";
import { useRouteContext } from "../../shared/RouteProvider";
import { useCalendarContext } from "../../shared/CalendarProvider";
import { useScriptContext } from "../../shared/ScriptProvider";
import { monthSerb } from "../../components/Calendar/calendar-data/calendar-data";
import { getMoonPhaseForDate } from "../../shared/moonPhaseLookup";
import MoonPhaseIcon from "../../UI/MoonPhaseIcon/MoonPhaseIcon";
import { CrossIcon } from "../icons/AppIcons";
import SlavaBadge from "../calendar/SlavaBadge";
import { WEEKDAYS, julianOf, splitTitles } from "../lib/dates";

const MOON_LABELS = {
  mlad: "Mlad mesec",
  prva: "Prva četvrt",
  pun: "Pun mesec",
  poslednja: "Poslednja četvrt",
};

export default function TodayCard() {
  const { currentDate } = useRouteContext();
  const { todayHoliday } = useCalendarContext();
  const { cyr } = useScriptContext();

  const old = julianOf(currentDate);
  const { main, others } = splitTitles(todayHoliday?.title);
  const moon = getMoonPhaseForDate(currentDate);

  return (
    <article className="app-card app-today">
      <div className="app-today__dow">{cyr(WEEKDAYS[currentDate.getDay()])}</div>
      <div className="app-today__day">{currentDate.getDate()}</div>
      <div className="app-today__month">
        {cyr(`${monthSerb[currentDate.getMonth()]} ${currentDate.getFullYear()}.`)}
      </div>
      <div className="app-today__old">
        {cyr(`${old.getDate()}. ${monthSerb[old.getMonth()]} po starom kalendaru`)}
      </div>

      <div className="app-today__rule">
        <CrossIcon />
      </div>

      {todayHoliday?.slava && <SlavaBadge className="app-slava--today" />}
      {main && <h2 className="app-today__saint">{cyr(main)}</h2>}
      {others.length > 0 && (
        <ul className="app-today__others">
          {others.map((title) => (
            <li key={title}>{cyr(title)}</li>
          ))}
        </ul>
      )}

      {moon && (
        <div className="app-today__moon">
          <MoonPhaseIcon phase={moon} size={18} color="currentColor" />
          {cyr(MOON_LABELS[moon])}
        </div>
      )}
    </article>
  );
}
