"use client";
import "./NextMonthBox.scss";
import { monthSerb } from "../../../shared/shared";
import Link from "next/link";
import { useRouteContext } from "../../../shared/RouteProvider";

export default function NextMonthBox() {
  let { pageYear, pageMonth } = useRouteContext();

  let pageMonthLoc = pageMonth;
  let pageYearLoc = pageYear;

  if (pageMonthLoc === 11) {
    pageMonthLoc = -1;
    ++pageYearLoc;
  }
  let nextMonth = monthSerb[pageMonthLoc + 1];

  const today = new Date();
  const day = today.getDate();

  const boxPositionClass =
    day >= 15 ? "next-month-box top" : "next-month-box close";

  return (
    <section className={boxPositionClass}>
      <div className="next-month-box-wrapper">
        ℹ️ Kalendar za naredni mesec:{" "}
        <Link
          href={`/${pageYearLoc}/${nextMonth}/`}
          title={`Crkveni kalendar ${nextMonth} ${pageYearLoc}`}
        >
          Pogledajte kalendar za {nextMonth} {pageYearLoc}. godine
        </Link>
      </div>
    </section>
  );
}
