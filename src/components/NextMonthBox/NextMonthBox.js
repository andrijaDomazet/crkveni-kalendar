// components/NextMonthBox/NextMonthBox.js
import React from "react";
import "./NextMonthBox.scss";

export default function NextMonthBox({ month = "januar", year = 2026 }) {
  const today = new Date();
  const day = today.getDate();

  // Odlučujemo klasu na osnovu dana u mesecu
  const boxPosition = day >= 15 ? "next-month-box top" : "next-month-box bottom";

  return (
    <section className={boxPosition}>
      <div className="next-month-box-wrapper">
        ℹ️ Kalendar za naredni mesec:{" "}
        <a href={`/2026/${month}/`} title={`Crkveni kalendar ${month} ${year}`}>
          Pogledajte kalendar za {month} {year}. godine
        </a>
      </div>
    </section>
  );
}
