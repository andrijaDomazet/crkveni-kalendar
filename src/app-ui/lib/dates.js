import { toMidnightTs } from "../../shared/utility";

export const WEEKDAYS = [
  "Nedelja",
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
  "Subota",
];

export const WEEKDAYS_SHORT = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];

export const MONTHS_GEN = [
  "januara",
  "februara",
  "marta",
  "aprila",
  "maja",
  "juna",
  "jula",
  "avgusta",
  "septembra",
  "oktobra",
  "novembra",
  "decembra",
];

export const MONTHS_SHORT = [
  "jan",
  "feb",
  "mar",
  "apr",
  "maj",
  "jun",
  "jul",
  "avg",
  "sep",
  "okt",
  "nov",
  "dec",
];

export const dayWord = (n) => (n % 10 === 1 && n % 100 !== 11 ? "dan" : "dana");

const DAY_MS = 24 * 60 * 60 * 1000;
const JULIAN_OFFSET_DAYS = 13;

export const addDays = (date, n) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);

export const julianOf = (date) => addDays(date, -JULIAN_OFFSET_DAYS);

export const daysBetween = (from, to) =>
  Math.round((toMidnightTs(to) - toMidnightTs(from)) / DAY_MS);

// Prvi praznik u nizu je glavni, ostali su pomocni.
export const splitTitles = (title) => {
  const list = (Array.isArray(title) ? title : [title]).filter(Boolean);
  return { main: list[0] ?? "", others: list.slice(1) };
};
