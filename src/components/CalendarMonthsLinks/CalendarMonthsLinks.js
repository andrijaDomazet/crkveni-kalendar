import "./CalendarMonthsLinks.scss";
import { monthSerb } from "../Calendar/calendar-data/calendar-data";
import { NavLink } from "react-router-dom";
import { useIdContext } from "../../shared/IdProvider";

export default function CalendarMonthsLinks() {
  const { slug, currentYear } = useIdContext();

  return (
    <section className="calendar-allMonths">
      <h2 className="calendar-title">
        Crkveni kalendar za {slug || currentYear}. godinu po mesecima
      </h2>

      <div className="calendar-monthsGrid">
        {monthSerb.map((item) => (
          <NavLink
            key={item}
            to={`/${slug || currentYear}/${item}/`}
            title={`Prikaži kalendar za ${item} ${slug || currentYear}. godine`}
            className="calendar-month"
          >
            {/* <h3> */}
            {item.charAt(0).toUpperCase() + item.slice(1)}
            {/* </h3> */}
          </NavLink>
        ))}
      </div>
    </section>
  );
}
