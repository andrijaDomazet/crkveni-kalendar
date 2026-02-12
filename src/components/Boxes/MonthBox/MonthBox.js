import "./MonthBox.scss";
import { getDayMonth, getFullCalendar } from "../../../shared/utility";
import { useIdContext } from "../../../shared/IdProvider";

export default function MonthBox() {
  let { currentDate, holidays } = useIdContext();
  const currentData = getDayMonth(currentDate);
  const daysMonth = getFullCalendar(currentData.year, currentData.month);
  //   console.log("Holidays", holidays);

  return (
    <div className="monthBox">
      <h2>Februar 2026</h2>
      <div className="monthBox-wrapper">
        {daysMonth.map((item, index) => (
          <div
            key={index}
            className={`calendar-cell ${!item.currentMonth ? "other-month" : ""}`}
          >
            <strong>{item.day}</strong>
            {holidays[item.day - 1]?.post && (
              <strong className="monthBox-post">
                {holidays[item.day - 1].post}
              </strong>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
