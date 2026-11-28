import news from "../../components/Calendar/calendar-data/all__news4.json";
import slave from "../../components/Calendar/calendar-data/slave.json";
import {
  idsMonths,
  manualDateEaster,
  monthSerb,
} from "../../components/Calendar/calendar-data/calendar-data";
import { getPraznici, getPrayers, slugOf } from "../lib/content";
import { getUpcomingZadusnice } from "../lib/zadusnice";
import { addDays, daysBetween } from "../lib/dates";
import { normalizeText } from "./normalize";

// Praznici koji zavise od Vaskrsa (pomeraj u danima).
const MOVABLE = [
  [-8, "Lazareva subota (Vrbica)"],
  [-7, "Cveti"],
  [-2, "Veliki petak"],
  [0, "Vaskrs (Uskrs)"],
  [39, "Spasovdan (Vaznesenje Gospodnje)"],
  [49, "Trojice (Duhovi)"],
];

const dayHref = (year, month, day) =>
  `/app/kalendar/?g=${year}&m=${monthSerb[month]}&d=${day}`;

const entry = (type, title, href, month, day) => ({
  type,
  title,
  href,
  month,
  day,
  key: normalizeText(title),
});

// Godina sledeceg pojavljivanja datuma (danasnji dan se racuna kao sledeci).
const upcomingYear = (today, month, day) => {
  const year = today.getFullYear();
  return daysBetween(today, new Date(year, month, day)) >= 0 ? year : year + 1;
};

const upcomingHref = (today, month, day) =>
  dayHref(upcomingYear(today, month, day), month, day);

function easterOf(year) {
  const value = manualDateEaster[year - 2020];
  if (!value) return null;
  const [month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Pokretni praznici: ovogodisnji datum, a ako je prosao, sledeci.
function movableEntries(today) {
  return MOVABLE.flatMap(([offset, title]) => {
    const date = [today.getFullYear(), today.getFullYear() + 1]
      .map(easterOf)
      .filter(Boolean)
      .map((easter) => addDays(easter, offset))
      .find((candidate) => daysBetween(today, candidate) >= 0);
    if (!date) return [];
    const [month, day] = [date.getMonth(), date.getDate()];
    return [entry("Praznik", title, dayHref(date.getFullYear(), month, day), month, day)];
  });
}

function dayEntries(today) {
  return idsMonths.flatMap(([start, end], month) =>
    news.slice(start, end).flatMap((item, index) =>
      [].concat(item.title).filter(Boolean).map((title) =>
        entry(
          "Kalendar",
          title,
          upcomingHref(today, month, index + 1),
          month,
          index + 1,
        ),
      ),
    ),
  );
}

// Redosled grupa odredjuje redosled rezultata istog ranga.
export function buildSearchIndex(today) {
  return [
    ...slave.map((item) => {
      const [month, day] = item.date;
      return entry("Slava", item.title, upcomingHref(today, month, day), month, day);
    }),
    ...movableEntries(today),
    ...getUpcomingZadusnice(today).map(({ name, date }) =>
      entry(
        "Zadušnice",
        `${name.charAt(0).toUpperCase()}${name.slice(1)} zadušnice`,
        dayHref(date.getFullYear(), date.getMonth(), date.getDate()),
        date.getMonth(),
        date.getDate(),
      ),
    ),
    ...getPraznici().map((item) =>
      entry(
        "Priča o prazniku",
        item.title,
        `/app/praznici/${slugOf(item.title)}/`,
        item.holidayDate?.[0],
        item.holidayDate?.[1],
      ),
    ),
    ...getPrayers().map((item) =>
      entry("Molitva", item.title, `/app/molitve/${slugOf(item.title)}/`),
    ),
    ...dayEntries(today),
  ];
}
