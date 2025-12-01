import React from "react";
import "./CalendarMonthsLinks.scss";
import { monthSerb } from "../Calendar/calendar-data/calendar-data";
import { NavLink } from "react-router-dom";
import { useIdContext } from "../../shared/IdProvider";

export default function CalendarMonthsLinks() {
  const { slug, currentYear } = useIdContext();
  const rows = [0, 4, 8]; // Početni indeksi za redove
  return (
    <div className="calendar-allMonths">
      <table className="calendar-allMonths-wrapper">
        <thead>
          <tr>
            <th colSpan="4">
              <h2>
                {/* <img src="/img/line.png" /> */}
                Crkveni kalendar za {slug || currentYear}. godinu po mesecima
                {/* <img src="/img/line.png" /> */}
              </h2>
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((startIndex) => (
            <tr key={startIndex}>
              {monthSerb
                .slice(startIndex, startIndex + 4)
                .map((item, index) => (
                  <td key={index}>
                    <NavLink
                      to={`/${slug || currentYear}/${item}/`}
                      title={`Prikaži kalendar za ${item} ${
                        slug || currentYear
                      }. godine`}
                    >
                      <h3>{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
                    </NavLink>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="ornamet-line">
             <img src="/img/line.png" /> 
      </div> */}
    </div>
  );
}
