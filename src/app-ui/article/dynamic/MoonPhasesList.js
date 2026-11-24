"use client";
import { useScriptContext } from "../../../shared/ScriptProvider";
import { moonPhases } from "../../../moonPhases";
import { monthSerb } from "../../../components/Calendar/calendar-data/calendar-data";
import MoonPhaseIcon from "../../../UI/MoonPhaseIcon/MoonPhaseIcon";

const LABELS = {
  pun: "Pun mesec",
  mlad: "Mlad mesec",
  prva: "Prva četvrt",
  poslednja: "Poslednja četvrt",
};

const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Belgrade",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hourCycle: "h23",
});

function parts(iso) {
  const get = (type) =>
    formatter.formatToParts(new Date(iso)).find((p) => p.type === type)?.value;
  return {
    year: get("year"),
    month: Number(get("month")) - 1,
    day: String(Number(get("day"))),
    time: `${get("hour")}:${get("minute")}`,
  };
}

export default function MoonPhasesList() {
  const { cyr } = useScriptContext();

  const groups = [];
  moonPhases.forEach((phase) => {
    const p = parts(phase.date);
    const key = `${p.year}-${p.month}`;
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, year: p.year, month: p.month, items: [] };
      groups.push(group);
    }
    group.items.push({ type: phase.type, ...p });
  });

  return (
    <div className="app-moonlist">
      {groups.map((group) => (
        <section key={group.key} className="app-datalist">
          <h3>{cyr(`${monthSerb[group.month]} ${group.year}.`)}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item.type + item.day}>
                <div className="app-datalist__row">
                  <span className="app-datalist__label">
                    <MoonPhaseIcon phase={item.type} size={16} color="currentColor" />
                    {cyr(LABELS[item.type])}
                  </span>
                  <span className="app-datalist__meta">
                    {cyr(`${item.day}. ${monthSerb[item.month]}`)}, {item.time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
