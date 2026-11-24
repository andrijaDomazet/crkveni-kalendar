"use client";
import Link from "next/link";
import { useRouteContext } from "../../../shared/RouteProvider";
import { useScriptContext } from "../../../shared/ScriptProvider";
import {
  calendarYears,
  monthSerb,
} from "../../../components/Calendar/calendar-data/calendar-data";
import { CALENDAR_YEARS } from "../../lib/content";

export default function ZadusniceList() {
  const { currentDate } = useRouteContext();
  const { cyr } = useScriptContext();

  const findYear = (year) =>
    calendarYears[0].item_list.find((item) => item.title === year);

  // Tekuca godina, a kad su sve njene zadusnice prosle, sledeca.
  const nowYear = currentDate?.getFullYear();
  let year = CALENDAR_YEARS.includes(nowYear) ? nowYear : CALENDAR_YEARS[0];
  const lastOfYear = findYear(year)?.tableNum.at(-1);
  if (
    currentDate &&
    lastOfYear &&
    new Date(year, lastOfYear[0], lastOfYear[1]) < currentDate &&
    CALENDAR_YEARS.includes(year + 1)
  ) {
    year += 1;
  }
  const data = findYear(year);
  if (!data) return null;

  return (
    <section className="app-datalist">
      <h3>{cyr(`Zadušnice u ${year}. godini`)}</h3>
      <ul>
        {data.tableNum.map(([month, day], index) => {
          const name = data.zadusnice[index];
          return (
            <li key={name}>
              <Link href={`/app/kalendar/?g=${year}&m=${monthSerb[month]}`}>
                <span>{cyr(name.charAt(0).toUpperCase() + name.slice(1))}</span>
                <span className="app-datalist__meta">
                  {cyr(`${day}. ${monthSerb[month]}`)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
