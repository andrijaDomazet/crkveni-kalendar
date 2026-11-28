"use client";
import { useEffect, useRef } from "react";
import { useRouteContext } from "../../shared/RouteProvider";
import { useCalendarContext } from "../../shared/CalendarProvider";
import DayRow from "./DayRow";

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// Dani meseca koji je trenutno u CalendarProvider-u (vidi WithMonthData).
// focusDay: dan iz pretrage na koji se skroluje i koji se uokviri (inace danasnji).
export default function MonthList({ focusDay = null }) {
  const { currentDate } = useRouteContext();
  const { holidays } = useCalendarContext();
  const listRef = useRef(null);

  useEffect(() => {
    const selector = focusDay ? "[data-focus='true']" : "[data-today='true']";
    listRef.current?.querySelector(selector)?.scrollIntoView({ block: "center" });
  }, [holidays, focusDay]);

  return (
    <ul ref={listRef} className="app-card app-week__rows app-month">
      {holidays.map((item) => (
        <DayRow
          key={item.date.getTime()}
          date={item.date}
          item={item}
          isToday={!!currentDate && sameDay(item.date, currentDate)}
          isFocus={item.date.getDate() === focusDay}
        />
      ))}
    </ul>
  );
}
