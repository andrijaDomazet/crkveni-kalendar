import { daysBetween } from "./dates";

// Opisuje stanje posta za dati dan na osnovu postLookup iz CalendarProvider-a.
// Vraca { state: "period" | "weekday" | "none", name, end, next, count }.
function buildPeriods(year, lookup) {
  const ts = (y, m, d) => new Date(y, m, d).getTime();
  return [
    {
      name: "Božićni post",
      start: new Date(ts(year - 1, 10, 28)),
      end: new Date(lookup.bozicniPostEndTs),
    },
    {
      name: "Vaskršnji post",
      start: new Date(lookup.startEasterTs),
      end: new Date(lookup.endEasterTs),
    },
    {
      name: "Petrovski post",
      start: new Date(lookup.petrovPostStartTs),
      end: new Date(lookup.petrovPostEndTs),
    },
    {
      name: "Gospojinski post",
      start: new Date(lookup.gospojinskiPostStartTs),
      end: new Date(lookup.gospojinskiPostEndTs),
    },
    {
      name: "Božićni post",
      start: new Date(lookup.bozicniPostStartTs),
      end: new Date(ts(year + 1, 0, 6)),
    },
  ];
}

export function getFastingInfo(today, lookup, isFastingWeekday) {
  const periods = buildPeriods(today.getFullYear(), lookup);

  const current = periods.find(
    (p) => daysBetween(p.start, today) >= 0 && daysBetween(today, p.end) >= 0,
  );
  if (current) {
    return {
      state: "period",
      name: current.name,
      end: current.end,
      count: daysBetween(today, current.end),
    };
  }

  const next = periods.find((p) => daysBetween(today, p.start) > 0);
  const nextInfo = next
    ? { next, count: daysBetween(today, next.start) }
    : { next: null, count: 0 };

  return {
    state: isFastingWeekday ? "weekday" : "none",
    ...nextInfo,
  };
}
