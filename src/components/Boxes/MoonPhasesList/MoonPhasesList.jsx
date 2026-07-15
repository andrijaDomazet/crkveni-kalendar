// MoonPhasesList.jsx
import { moonPhases } from "../../../moonPhases.js";
import "./MoonPhasesList.scss";

const typeLabels = {
  pun: "Pun mesec",
  mlad: "Mlad mesec",
  prva: "Prva četvrt",
  poslednja: "Poslednja četvrt",
};

const monthNames = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Jun",
  "Jul",
  "Avgust",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
];

function formatPhase(isoString) {
  const d = new Date(isoString);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Belgrade",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);

  const get = (type) => parts.find((p) => p.type === type)?.value;
  const day = get("day");
  const month = Number(get("month"));
  const year = get("year");
  const hour = get("hour");
  const minute = get("minute");

  return {
    monthIndex: month - 1,
    label: `${day}. ${monthNames[month - 1].toLowerCase()} ${year}. ${hour}:${minute}`,
  };
}

export default function MoonPhasesList() {
  const grouped = {};
  moonPhases.forEach((phase) => {
    const { monthIndex, label } = formatPhase(phase.date);
    if (!grouped[monthIndex]) grouped[monthIndex] = [];
    grouped[monthIndex].push({ type: phase.type, label });
  });

  return (
    <div className="moon-phases-list">
      {Object.keys(grouped)
        .sort((a, b) => a - b)
        .map((monthIndex) => (
          <div key={monthIndex} className="moon-phases-month">
            <h3>{monthNames[monthIndex]} 2026.</h3>
            <ul>
              {grouped[monthIndex].map((item, i) => (
                <li key={i}>
                  {typeLabels[item.type]} - {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
