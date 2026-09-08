import { moonPhases } from "../moonPhases.js";

// pravi mapu "YYYY-MM-DD" (Beograd) -> tip faze, jednom pri učitavanju modula
const phaseByDay = {};

moonPhases.forEach((ph) => {
  const d = new Date(ph.date);
  const key = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Belgrade",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d); // YYYY-MM-DD
  phaseByDay[key] = ph.type;
});

export function getMoonPhaseForDate(isoOrDateString) {
  const d = new Date(isoOrDateString);
  const key = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Belgrade",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  return phaseByDay[key] || null;
}