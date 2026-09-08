"use client";

// Mala SVG ikonica mesečeve mene za red u kalendaru.
// phase: "mlad" | "prva" | "pun" | "poslednja"
export default function MoonPhaseIcon({ phase, size = 14 }) {
  const r = size / 2;

  // p vrednost po tipu faze (0 = mlad, 0.25 = prva, 0.5 = pun, 0.75 = poslednja)
  const pByPhase = { mlad: 0, prva: 0.25, pun: 0.5, poslednja: 0.75 };
  const p = pByPhase[phase];
  if (p === undefined) return null;

  const theta = p * 2 * Math.PI;
  const rx = Math.abs(Math.cos(theta)) * r;
  const outerSweep = p < 0.5 ? 1 : 0;
  const innerSweep = p < 0.25 || p > 0.75 ? 1 - outerSweep : outerSweep;
  const path = `M ${r} 0 A ${r} ${r} 0 0 ${outerSweep} ${r} ${2 * r} A ${rx} ${r} 0 0 ${innerSweep} ${r} 0 Z`;

  const labels = {
    mlad: "Mlad mesec",
    prva: "Prva četvrt",
    pun: "Pun mesec",
    poslednja: "Poslednja četvrt",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="moonPhaseIcon"
      role="img"
      aria-label={labels[phase]}
    >
      <title>{labels[phase]}</title>
      <circle
        cx={r}
        cy={r}
        r={r - 1}
        fill="none"
        stroke="#b8862f"
        strokeWidth="1"
      />
      {p > 0 && p < 1 && <path d={path} fill="#b8862f" />}
      {p === 0 && <circle cx={r} cy={r} r={r - 1} fill="none" />}
    </svg>
  );
}
