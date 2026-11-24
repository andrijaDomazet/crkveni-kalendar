// Jednobojne linijske ikonice; boju preuzimaju iz currentColor.
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

const make = (children) =>
  function Icon({ className = "app-icon", ...rest }) {
    return (
      <svg {...base} className={className} {...rest}>
        {children}
      </svg>
    );
  };

export const HomeIcon = make(
  <>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10.2V20h13V10.2" />
    <path d="M10 20v-5.5h4V20" />
  </>,
);

export const CalendarIcon = make(
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </>,
);

export const CandleIcon = make(
  <>
    <path d="M12 2.8c1.7 2.1 2.2 3.5 0 5.4-2.2-1.9-1.7-3.3 0-5.4Z" />
    <rect x="9" y="10" width="6" height="10.5" rx="1" />
    <path d="M12 8.2V10" />
  </>,
);

export const BookIcon = make(
  <>
    <path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Z" />
    <path d="M12 6.5v13" />
  </>,
);

export const MoreIcon = make(
  <>
    <circle cx="5.5" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="18.5" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </>,
);

export const CrossIcon = make(<path d="M12 2.5v19M9 5.5h6M6.5 10h11M9.5 18l5-2.6" />);

export const BowlIcon = make(
  <>
    <path d="M3.5 11h17a8.5 8.5 0 0 1-17 0Z" />
    <path d="M8.5 7.5c0-1.6 1-1.6 1-3.3M13.5 7.5c0-1.6 1-1.6 1-3.3" />
  </>,
);

export const ChevronRightIcon = make(<path d="m9 5 7 7-7 7" />);

export const ChevronLeftIcon = make(<path d="m15 5-7 7 7 7" />);
