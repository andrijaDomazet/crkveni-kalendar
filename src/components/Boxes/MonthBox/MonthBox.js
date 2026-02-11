import React from "react";
import "./MonthBox.scss";
import {
  //   getCalendarDays,
  getDayMonth,
  //   getDaysInMonth,
  getFullCalendar,
} from "../../../shared/utility";
import { useIdContext } from "../../../shared/IdProvider";

export default function MonthBox() {
  let { currentDate } = useIdContext();
  const currentData = getDayMonth(currentDate);
  const daysMonth = getFullCalendar(currentData.year, 2);
  console.log("DaysMonth", daysMonth);

  return (
    <div className="monthBox">
      <h2>Februar 2026</h2>
      {/* <div>{currentData.day}</div>
      <div>{currentData.month}</div>
      <div>{currentData.year}</div> */}
      <div className="monthBox-wrapper">
        {daysMonth.map((item, index) => (
          <div
            key={index}
            className={`calendar-cell ${!item.currentMonth ? "other-month" : ""}`}
          >
            {item.day}
          </div>
        ))}
      </div>
      {/* <div></div> */}
      {/* <div></div> */}
    </div>
  );
}
