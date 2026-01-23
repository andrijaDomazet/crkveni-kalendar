// components/NextMonthBox/NextMonthBox.js
import React from "react";
import "./NextMonthBox.scss";
import { useIdContext } from "../../../shared/IdProvider";
import { monthSerb } from "../../../shared/shared";

//srediti da za 12 mesec daje januar naredne godine!!!!!!!!!!!
export default function NextMonthBox() {
  let { pageYear, pageMonth } = useIdContext();
  let nextMonth = monthSerb[pageMonth + 1];
  const today = new Date();
  const day = today.getDate();

  // Odlučujemo klasu na osnovu dana u mesecu
  const boxPosition = day >= 15 ? "next-month-box top" : "next-month-box close";

  return (
    <section className={boxPosition}>
      <div className="next-month-box-wrapper">
        ℹ️ Kalendar za naredni mesec:{" "}
        <a
          href={`/2026/${nextMonth}/`}
          title={`Crkveni kalendar ${nextMonth} ${pageYear}`}
        >
          Pogledajte kalendar za {nextMonth} {pageYear}. godine
        </a>
      </div>
    </section>
  );
}
