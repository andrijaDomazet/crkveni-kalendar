import "./TodayBox.scss";
import { getDayMonth } from "../../../shared/utility";
import { monthSerb } from "../../Calendar/calendar-data/calendar-data";
import { useRouteContext } from "../../../shared/RouteProvider";
import { useCalendarContext } from "../../../shared/CalendarProvider";

export default function TodayBox({ classes = false }) {
  const { currentDate, pageYear } = useRouteContext();
  const { dayName, todayHoliday } = useCalendarContext();
  // const { dayName, currentDate, pageYear, todayHoliday } = useIdContext();

  //set details from currentDate
  let todayDetails = getDayMonth(currentDate);

  //check is curentYear some other year then current
  if (todayDetails.year !== pageYear) {
    return;
  }

  return (
    <div className={`today__box ${classes}`}>
      <div className="today-border"></div>
      <div className="today__box-wrapper">
        <div className="corners-leftTop"></div>
        <div className="corners-leftBotom"></div>
        <div className="corners-rightTop"></div>
        <div className="corners-rightBottom"></div>
        <div>
          <span className="today-day">{dayName}</span>
          <p className="today-dayNum">{todayDetails.day}</p>
          <p className="today-month">{`${monthSerb[todayDetails.month]} ${todayDetails.year}`}</p>
        </div>
        <div>
          <div className="today-center">
            <div className="line"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              stroke-linejoin="round"
              className="lucide lucide-cross w-6 h-6 text-gold"
            >
              <path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"></path>
            </svg>
            <div className="line right"></div>
          </div>
          <h2 className="today-title">{todayHoliday.title[0]}</h2>
          {todayHoliday.post && (
            <div className="today-post">
              <div className="today-post-wrapper">
                <div className="circle"></div>
                <span>Posni dan</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
