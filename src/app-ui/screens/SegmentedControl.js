"use client";

export default function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div className="app-segment" role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={`app-segment__btn${value === option.value ? " is-on" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
