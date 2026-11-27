"use client";
import Link from "next/link";
import { useRouteContext } from "../../shared/RouteProvider";
import { useScriptContext } from "../../shared/ScriptProvider";
import { monthSerb } from "../../components/Calendar/calendar-data/calendar-data";
import { ChevronRightIcon } from "../icons/AppIcons";
import { WEEKDAYS, dayWord, daysBetween } from "../lib/dates";
import { getUpcomingZadusnice } from "../lib/zadusnice";

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const shortDate = (date) => `${date.getDate()}. ${monthSerb[date.getMonth()]}`;

export default function ZadusniceCard() {
  const { currentDate } = useRouteContext();
  const { cyr } = useScriptContext();

  const [next, ...later] = getUpcomingZadusnice(currentDate);
  if (!next) return null;

  const days = daysBetween(currentDate, next.date);
  const fullDate = `${WEEKDAYS[next.date.getDay()].toLowerCase()}, ${shortDate(next.date)} ${next.date.getFullYear()}.`;

  return (
    <article className="app-card app-zad">
      <div className="app-week__head">
        <h3>{cyr("Zadušnice")}</h3>
        <Link href="/app/zadusnice/" className="app-week__more">
          {cyr("Više")}
          <ChevronRightIcon className="app-icon app-icon--sm" />
        </Link>
      </div>

      <div className="app-zad__next">
        <div className="app-zad__info">
          <strong>{cyr(`${capitalize(next.name)} zadušnice`)}</strong>
          <small>{cyr(fullDate)}</small>
        </div>
        <div className="app-zad__count">
          {days === 0 ? (
            <b>{cyr("Danas")}</b>
          ) : (
            <>
              <small>{cyr("za")}</small>
              <b>{days}</b>
              <small>{cyr(dayWord(days))}</small>
            </>
          )}
        </div>
      </div>

      <ul className="app-zad__later">
        {later.map((item) => (
          <li key={item.date.getTime()}>
            <span>{cyr(capitalize(item.name))}</span>
            <span>{cyr(shortDate(item.date))}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
