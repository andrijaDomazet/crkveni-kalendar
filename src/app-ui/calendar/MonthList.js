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
export default function MonthList() {
  const { currentDate } = useRouteContext();
  const { holidays } = useCalendarContext();
  const listRef = useRef(null);

  useEffect(() => {
    const today = listRef.current?.querySelector("[data-today='true']");
    today?.scrollIntoView({ block: "center" });
  }, [holidays]);

  return (
    <ul ref={listRef} className="app-card app-week__rows app-month">
      {holidays.map((item) => (
        <DayRow
          key={item.date.getTime()}
          date={item.date}
          item={item}
          isToday={!!currentDate && sameDay(item.date, currentDate)}
        />
      ))}
    </ul>
  );
}
