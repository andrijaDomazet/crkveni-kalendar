"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouteContext } from "../../shared/RouteProvider";
import { useScriptContext } from "../../shared/ScriptProvider";
import { monthSerb } from "../../components/Calendar/calendar-data/calendar-data";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons/AppIcons";
import WithMonthData from "../lib/WithMonthData";
import { CALENDAR_YEARS } from "../lib/content";
import MonthList from "./MonthList";

const FIRST_YEAR = CALENDAR_YEARS[0];
const LAST_YEAR = CALENDAR_YEARS[CALENDAR_YEARS.length - 1];

// Pocetni mesec: iz linka (?g=2027&m=maj, opciono &d=2 za dan) ili tekuci.
function initialView(params, today) {
  const year = Number(params.get("g"));
  const month = monthSerb.indexOf(params.get("m"));
  if (CALENDAR_YEARS.includes(year)) {
    const fallback = year === today.getFullYear() ? today.getMonth() : 0;
    const day = Number(params.get("d")) || null;
    return { year, month: month >= 0 ? month : fallback, day };
  }
  return { year: today.getFullYear(), month: today.getMonth() };
}

const shift = ({ year, month }, step) => {
  const index = year * 12 + month + step;
  return { year: Math.floor(index / 12), month: index % 12 };
};

const inRange = ({ year }) => year >= FIRST_YEAR && year <= LAST_YEAR;

export default function KalendarScreen() {
  const params = useSearchParams();
  const { currentDate } = useRouteContext();
  const { cyr } = useScriptContext();
  const [view, setView] = useState(null);

  const queryKey = params.toString();
  useEffect(() => {
    if (currentDate) setView(initialView(new URLSearchParams(queryKey), currentDate));
  }, [currentDate, queryKey]);

  if (!view) {
    return (
      <div className="app-screen" aria-busy="true">
        <div className="app-card app-skeleton app-skeleton--tall" />
      </div>
    );
  }

  const prev = shift(view, -1);
  const next = shift(view, 1);

  return (
    <div className="app-screen">
      <div className="app-month-nav">
        <button
          type="button"
          className="app-month-nav__btn"
          aria-label={cyr("Prethodni mesec")}
          disabled={!inRange(prev)}
          onClick={() => setView(prev)}
        >
          <ChevronLeftIcon />
        </button>
        <div className="app-month-nav__title">
          <h1>{cyr(monthSerb[view.month])}</h1>
          <select
            id="app-year-select"
            aria-label={cyr("Godina")}
            value={view.year}
            onChange={(e) =>
              setView({ month: view.month, year: Number(e.target.value) })
            }
          >
            {CALENDAR_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}.
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="app-month-nav__btn"
          aria-label={cyr("Sledeći mesec")}
          disabled={!inRange(next)}
          onClick={() => setView(next)}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <WithMonthData key={`${view.year}-${view.month}`} year={view.year} month={view.month}>
        <MonthList focusDay={view.day} />
      </WithMonthData>
    </div>
  );
}
