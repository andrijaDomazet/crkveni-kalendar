// components/NextMonthBox/NextMonthBox.js
import React from "react";
import "./NextMonthBox.scss";
import { useIdContext } from "../../../shared/IdProvider";
import { monthSerb } from "../../../shared/shared";
import { Link } from "react-router-dom";

export default function NextMonthBox() {
  let { pageYear, pageMonth } = useIdContext();

  let pageMonthLoc = pageMonth;
  let pageYearLoc = pageYear;

  // ako je decembar, resetujemo mesec i prelazimo u sledeću godinu
  if (pageMonthLoc === 11) {
    pageMonthLoc = -1;
    ++pageYearLoc;
  }
  let nextMonth = monthSerb[pageMonthLoc + 1];

  const today = new Date();
  const day = today.getDate();

  // Odlučujemo klasu na osnovu dana u mesecu
  const boxPositionClass = day >= 15 ? "next-month-box top" : "next-month-box close";

  return (
    <section className={boxPositionClass}>
      <div className="next-month-box-wrapper">
        ℹ️ Kalendar za naredni mesec:{" "}
        <Link to={`/${pageYearLoc}/${nextMonth}/`} title={`Crkveni kalendar ${nextMonth} ${pageYearLoc}`}>
          Pogledajte kalendar za {nextMonth} {pageYearLoc}. godine
        </Link>
      </div>
    </section>
  );
}
