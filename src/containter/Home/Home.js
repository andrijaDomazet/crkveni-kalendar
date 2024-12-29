import React from "react";
import Calendar from "../../components/Calendar/Calendar";

export default function Home() {
  return (
    <div className="home__1">
      <section className="home__box__4">
        <div className="home__box__4-left">
          <Calendar shortCal={6} soc={false} />
        </div>
        <div className="home__box__4-right"></div>
      </section>
    </div>
  );
}
