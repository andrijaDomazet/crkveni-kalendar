import React from "react";
import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import CalendarMonthsLinks from "../../components/CalendarMonthsLinks/CalendarMonthsLinks";

export default function Home() {
  return (
    <div className="home__1">
      <section className="home__box__4">
        <div className="home__box__4-left">
          <Calendar shortCal={6} soc={false} />
          <CalendarMonthsLinks />
        </div>
        <div className="home__box__4-right">
          <Zadusnice />
        </div>
      </section>
    </div>
  );
}
