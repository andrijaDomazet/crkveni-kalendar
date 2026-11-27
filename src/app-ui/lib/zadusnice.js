import { calendarYears } from "../../components/Calendar/calendar-data/calendar-data";
import { toMidnightTs } from "../../shared/utility";
import { CALENDAR_YEARS } from "./content";

// Sledece zadusnice od zadatog dana (ukljucujuci taj dan), i preko granice godine.
export function getUpcomingZadusnice(today, count = 4) {
  const all = CALENDAR_YEARS.filter((year) => year >= today.getFullYear()).flatMap(
    (year) => {
      const data = calendarYears[0].item_list.find((item) => item.title === year);
      return (data?.tableNum ?? []).map(([month, day], index) => ({
        name: data.zadusnice[index],
        date: new Date(year, month, day),
      }));
    },
  );

  return all
    .filter((item) => item.date.getTime() >= toMidnightTs(today))
    .slice(0, count);
}
