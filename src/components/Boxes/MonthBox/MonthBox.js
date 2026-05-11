"use client";
import "./MonthBox.scss";
import { getDayMonth, getFullCalendar } from "../../../shared/utility";
import { days } from "../../Calendar/calendar-data/calendar-data";
import { useCalendarContext } from "../../../shared/CalendarProvider";

export default function MonthBox() {
  const { currentDate } = useRouteContext();
  const { holidays } = useCalendarContext();
  if (!currentDate) return null;

  const currentData = getDayMonth(currentDate);
  const daysMonth = getFullCalendar(currentData.year, currentData.month);
  //   console.log("Holidays", holidays);

  return (
    <div className="monthBox">
      <h2>Februar 2026</h2>
      <div className="monthBox-header">
        {days.map((item) => {
          return <span>{item.substring(0, 3)}</span>;
        })}
      </div>
      <div className="monthBox-wrapper">
        {daysMonth.map((item, index) => (
          <div
            key={index}
            className={`calendar-cell ${!item.currentMonth ? "other-month" : ""}`}
          >
            <strong>{item.day}</strong>
            {holidays[item.day - 1]?.post && (
              <span className="monthBox-post">
                {holidays[item.day - 1].post}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
