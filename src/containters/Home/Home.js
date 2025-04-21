import React from "react";
import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import CalendarMonthsLinks from "../../components/CalendarMonthsLinks/CalendarMonthsLinks";

export default function Home() {
  return (
    <div className="home">
      <section className="home__wrapper">
        <div className="home__wrapper-left">
          <Calendar shortCal={6} soc={false} />
          <CalendarMonthsLinks />
        </div>
        <div className="home__wrapper-right">
          <Zadusnice />
        </div>
      </section>
    </div>
  );
}
