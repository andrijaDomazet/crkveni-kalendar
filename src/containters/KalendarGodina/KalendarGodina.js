import React from "react";
import "./KalendarGodina.scss";
import Calendar from "../../components/Calendar/Calendar";
import CalendarMonthsLinks from "../../components/CalendarMonthsLinks/CalendarMonthsLinks";
import Zadusnice from "../../components/Zadusnice/Zadusnice";

export default function KalendarGodina() {
  return (
    <div className="kalendarGodina">
      <div className="kalendarGodina-wrapper">
        <div className="kalendarGodina-left">
          <Calendar soc={false} />
        </div>
        <div className="kalendarGodina-right">
          <Zadusnice />
        </div>
      </div>
      <CalendarMonthsLinks />
    </div>
  );
}
