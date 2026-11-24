"use client";
import Link from "next/link";
import { useRouteContext } from "../../shared/RouteProvider";
import { useCalendarContext } from "../../shared/CalendarProvider";
import { useScriptContext } from "../../shared/ScriptProvider";
import { ChevronRightIcon } from "../icons/AppIcons";
import WithMonthData from "../lib/WithMonthData";
import DayRow from "../calendar/DayRow";
import { addDays } from "../lib/dates";

const COUNT = 5;

function UpcomingList({ currentDate, byMonth }) {
  const { cyr } = useScriptContext();
  const rows = Array.from({ length: COUNT }, (_, i) => {
    const date = addDays(currentDate, i);
    const item = byMonth[date.getMonth()]?.[date.getDate() - 1];
    return { date, item, isToday: i === 0 };
  });

  return (
    <article className="app-card app-week">
      <div className="app-week__head">
        <h3>{cyr("Narednih pet dana")}</h3>
        <Link href="/app/kalendar/" className="app-week__more">
          {cyr("Kalendar")}
          <ChevronRightIcon className="app-icon app-icon--sm" />
        </Link>
      </div>
      <ul className="app-week__rows">
        {rows.map(({ date, item, isToday }) => (
          <DayRow key={date.getTime()} date={date} item={item} isToday={isToday} />
        ))}
      </ul>
    </article>
  );
}

function NextMonthBridge({ currentDate, currentHolidays }) {
  const { holidays: nextHolidays } = useCalendarContext();
  const nextMonth = addDays(currentDate, COUNT - 1).getMonth();
  return (
    <UpcomingList
      currentDate={currentDate}
      byMonth={{
        [currentDate.getMonth()]: currentHolidays,
        [nextMonth]: nextHolidays,
      }}
    />
  );
}

export default function UpcomingCard() {
  const { currentDate } = useRouteContext();
  const { holidays } = useCalendarContext();

  const lastDay = addDays(currentDate, COUNT - 1);
  if (lastDay.getMonth() === currentDate.getMonth()) {
    return (
      <UpcomingList
        currentDate={currentDate}
        byMonth={{ [currentDate.getMonth()]: holidays }}
      />
    );
  }

  return (
    <WithMonthData year={lastDay.getFullYear()} month={lastDay.getMonth()}>
      <NextMonthBridge currentDate={currentDate} currentHolidays={holidays} />
    </WithMonthData>
  );
}
