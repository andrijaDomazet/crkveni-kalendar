"use client";
import { useRouteContext } from "../../shared/RouteProvider";
import { useCalendarContext } from "../../shared/CalendarProvider";
import { useScriptContext } from "../../shared/ScriptProvider";
import { BowlIcon } from "../icons/AppIcons";
import { getFastingInfo } from "../lib/fasting";
import { MONTHS_GEN, dayWord } from "../lib/dates";

const formatDate = (date) => `${date.getDate()}. ${MONTHS_GEN[date.getMonth()]}`;

function describe(info) {
  if (info.state === "period") {
    return {
      title: info.name,
      text: `Traje do ${formatDate(info.end)}.`,
      count: info.count,
    };
  }
  const nextText = info.next
    ? `${info.next.name} počinje ${formatDate(info.next.start)}.`
    : "";
  return {
    title: info.state === "weekday" ? "Danas je posni dan" : "Danas nije post",
    text: nextText,
    count: info.next ? info.count : null,
  };
}

export default function FastingCard() {
  const { currentDate } = useRouteContext();
  const { postLookup, todayHoliday } = useCalendarContext();
  const { cyr } = useScriptContext();

  const info = getFastingInfo(
    currentDate,
    postLookup,
    todayHoliday?.post === "post",
  );
  const { title, text, count } = describe(info);

  return (
    <article className="app-card app-fast">
      <div className="app-fast__icon">
        <BowlIcon />
      </div>
      <div className="app-fast__body">
        <h3>{cyr(title)}</h3>
        {text && <p>{cyr(text)}</p>}
      </div>
      {count !== null && (
        <div className="app-fast__count">
          {count}
          <small>{cyr(dayWord(count))}</small>
        </div>
      )}
    </article>
  );
}
