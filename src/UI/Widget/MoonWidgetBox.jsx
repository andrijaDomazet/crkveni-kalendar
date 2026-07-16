// MoonWidgetBox.jsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { moonPhases } from "../../moonPhases.js";
import "./MoonWidgetBox.scss";

const monthNames = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];

function formatBelgradeShort(isoString) {
  const d = new Date(isoString);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Belgrade",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  return `${get("day")}. ${get("month")}. ${get("year")}. u ${get("hour")}:${get("minute")}`;
}

function pluralize(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function formatAge(days, hours, minutes) {
  const daysWord = pluralize(days, "dan", "dana", "dana");
  const hoursWord = pluralize(hours, "sat", "sata", "sati");
  const minutesWord = pluralize(minutes, "minut", "minuta", "minuta");
  return `${days} ${daysWord}, ${hours} ${hoursWord} i ${minutes} ${minutesWord}`;
}

function phaseLabel(p) {
  const eps = 0.02;
  if (p < eps || p > 1 - eps) return "Mlad mesec";
  if (Math.abs(p - 0.25) < eps) return "Prva četvrt";
  if (Math.abs(p - 0.5) < eps) return "Pun mesec";
  if (Math.abs(p - 0.75) < eps) return "Poslednja četvrt";
  if (p < 0.5) return "Rastući mesec";
  if (p < 0.75) return "Opadajući mesec";
  return "Stari mesec";
}

function phaseLabelItalic(p) {
  const eps = 0.02;
  if (p < eps || p > 1 - eps) return "mlad mesec";
  if (Math.abs(p - 0.25) < eps) return "prva četvrt";
  if (Math.abs(p - 0.5) < eps) return "uštap";
  if (Math.abs(p - 0.75) < eps) return "poslednja četvrt";
  if (p < 0.5) return "rastući srp";
  if (p < 0.75) return "opadajući mesec";
  return "stari srp";
}

function computeMoonState(now) {
  const newMoons = moonPhases
    .filter((ph) => ph.type === "mlad")
    .map((ph) => ({ ...ph, d: new Date(ph.date) }))
    .sort((a, b) => a.d - b.d);

  const lastNewMoon = [...newMoons].reverse().find((ph) => ph.d <= now);
  const nextNewMoon = newMoons.find((ph) => ph.d > now);

  const nextFullMoon = moonPhases
    .filter((ph) => ph.type === "pun")
    .map((ph) => ({ ...ph, d: new Date(ph.date) }))
    .sort((a, b) => a.d - b.d)
    .find((ph) => ph.d > now);

  if (!lastNewMoon) return null;

  const periodMs = nextNewMoon
    ? nextNewMoon.d - lastNewMoon.d
    : 29.530588 * 24 * 60 * 60 * 1000;

  const ageMs = now - lastNewMoon.d;
  const p = Math.min(ageMs / periodMs, 0.999999);

  const totalMinutes = Math.floor(ageMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return {
    p,
    days,
    hours,
    minutes,
    label: phaseLabel(p),
    labelItalic: phaseLabelItalic(p),
    nextFullMoon,
    nextNewMoon,
  };
}

function MoonSvg({ p, size = 130 }) {
  const r = size / 2;
  const theta = p * 2 * Math.PI;
  const rx = Math.abs(Math.cos(theta)) * r;
  const outerSweep = p < 0.5 ? 1 : 0;
  const innerSweep = p < 0.25 || p > 0.75 ? 1 - outerSweep : outerSweep;

  const path = `M ${r} 0 A ${r} ${r} 0 0 ${outerSweep} ${r} ${2 * r} A ${rx} ${r} 0 0 ${innerSweep} ${r} 0 Z`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="moon-widget-box__svg"
    >
      <circle cx={r} cy={r} r={r} fill="#2b2620" />
      <circle cx={r * 0.62} cy={r * 0.55} r={r * 0.09} fill="#3a3428" />
      <circle cx={r * 1.15} cy={r * 1.3} r={r * 0.06} fill="#3a3428" />
      <circle cx={r * 0.75} cy={r * 1.5} r={r * 0.05} fill="#3a3428" />
      <path d={path} fill="#eee0c6" />
      <circle
        cx={r}
        cy={r}
        r={r}
        fill="none"
        stroke="#c9a94f"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function MoonWidgetBox({ layout = "vertical" }) {
  const [state, setState] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setState(computeMoonState(new Date()));
    update();
    const interval = setInterval(update, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const showCta = !pathname?.startsWith("/meseceve-mene");

  const rootClass =
    layout === "horizontal"
      ? "moon-widget-box moon-widget-box--horizontal"
      : "moon-widget-box";

  if (layout === "horizontal") {
    return (
      <div className={rootClass}>
        <div className="moon-widget-box__header">
          <span className="moon-widget-box__icon">☾</span>
          <h2 className="moon-widget-box__title">Mesečeve mene</h2>
        </div>

        <div className="moon-widget-box__row">
          <div className="moon-widget-box__visual">
            {state ? (
              <MoonSvg p={state.p} size={110} />
            ) : (
              <div className="moon-widget-box__placeholder" />
            )}
          </div>

          <div className="moon-widget-box__age-card">
            {state ? (
              <>
                <p className="moon-widget-box__age-label">
                  Mesec je trenutno star:
                </p>
                <p className="moon-widget-box__age-value">
                  {formatAge(state.days, state.hours, state.minutes)}
                </p>
                <p className="moon-widget-box__phase-italic">
                  — {state.labelItalic} —
                </p>
              </>
            ) : (
              <p>&nbsp;</p>
            )}
          </div>

          <div className="moon-widget-box__side-column">
            <div className="moon-widget-box__info-card">
              {state?.nextFullMoon && (
                <>
                  <p className="moon-widget-box__info-label">
                    Pun mesec (uštap) će biti:
                  </p>
                  <p className="moon-widget-box__info-value">
                    {formatBelgradeShort(state.nextFullMoon.date)}
                  </p>
                </>
              )}
            </div>

            <div className="moon-widget-box__info-card">
              {state?.nextNewMoon && (
                <>
                  <p className="moon-widget-box__info-label">
                    Sledeći mlađi mesec biće:
                  </p>
                  <p className="moon-widget-box__info-value">
                    {formatBelgradeShort(state.nextNewMoon.date)}
                  </p>
                </>
              )}
            </div>
          </div>

          {showCta && (
            <a href="/meseceve-mene" className="moon-widget-box__cta">
              <span>Detaljni lunarni kalendar</span>
              <span className="moon-widget-box__cta-arrow">→</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={rootClass}>
      <div className="moon-widget-box__header">
        <span className="moon-widget-box__icon">☾</span>
        <h3 className="moon-widget-box__title">Mesečeve mene</h3>
      </div>

      <div className="moon-widget-box__body">
        <div className="moon-widget-box__age-card">
          {state ? (
            <>
              <p className="moon-widget-box__age-label">
                Mesec je trenutno star:
              </p>
              <p className="moon-widget-box__age-value">
                {formatAge(state.days, state.hours, state.minutes)}
              </p>
              <p className="moon-widget-box__phase-italic">
                — {state.labelItalic} —
              </p>
            </>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>

        <div className="moon-widget-box__visual">
          {state ? (
            <MoonSvg p={state.p} />
          ) : (
            <div className="moon-widget-box__placeholder" />
          )}
        </div>

        {state && (
          <h4 className="moon-widget-box__phase-name">{state.label}</h4>
        )}

        <div className="moon-widget-box__info-card">
          {state?.nextFullMoon && (
            <>
              <p className="moon-widget-box__info-label">
                Pun mesec (uštap) će biti:
              </p>
              <p className="moon-widget-box__info-value">
                {formatBelgradeShort(state.nextFullMoon.date)}
              </p>
            </>
          )}
        </div>

        <div className="moon-widget-box__info-card">
          {state?.nextNewMoon && (
            <>
              <p className="moon-widget-box__info-label">
                Sledeći mlađi mesec biće:
              </p>
              <p className="moon-widget-box__info-value">
                {formatBelgradeShort(state.nextNewMoon.date)}
              </p>
            </>
          )}
        </div>

        {showCta && (
          <a href="/meseceve-mene" className="moon-widget-box__cta">
            <span>Detaljni lunarni kalendar</span>
            <span className="moon-widget-box__cta-arrow">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
