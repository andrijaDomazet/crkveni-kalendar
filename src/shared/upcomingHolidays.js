import { monthSerb } from "../components/Calendar/calendar-data/calendar-data";

const monthIndexByName = Object.fromEntries(monthSerb.map((m, i) => [m, i]));

function parseEntryDate([dateStr], year) {
  const [dayPart, monthPart] = dateStr.split(". ");
  const day = Number(dayPart);
  const monthIndex = monthIndexByName[monthPart];
  if (!day || monthIndex === undefined) return null;
  return new Date(year, monthIndex, day);
}

// Vraća narednih `count` praznika iz `list` počev od `fromDate` (uključujući
// taj dan), prelazeći u narednu godinu kad lista za tekuću godinu istekne.
// `fromDate` je null do hidratacije (RouteProvider), pa se tad vraća samo
// prvih `count` iz liste — isti ishod na serveru i klijentu, bez flash-a.
export function getUpcomingHolidays(list, fromDate, count = 6) {
  if (!fromDate) return list.slice(0, count);

  const today = new Date(fromDate);
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();

  const withDates = list
    .map((item) => {
      let date = parseEntryDate(item, year);
      if (!date) return null;
      if (date < today) date = parseEntryDate(item, year + 1);
      return { item, date };
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date);

  return withDates.slice(0, count).map((x) => x.item);
}
