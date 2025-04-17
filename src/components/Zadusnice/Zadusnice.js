import React from "react";
import "./Zadusnice.scss";
import {
  calendarYears,
  zadusniceName,
} from "../Calendar/calendar-data/calendar-data.js";
import { monthSerb } from "../../shared/shared.js";
import { useIdContext } from "../../shared/IdProvider";
import { Link } from "react-router-dom";

export default function Zadusnice() {
  const { slug, currentDate } = useIdContext();
  let currentYear = slug || currentDate.getFullYear();
  let yearIndex = calendarYears[0].item_list.findIndex(
    (item) => item.title == currentYear
  );

  return (
    <div className="zadusnice">
      <table>
        <thead>
          <tr>
            <th colSpan="2">{`Zadušnice u ${currentYear}. godini`}</th>
          </tr>
        </thead>
        <tbody>
          {calendarYears[0].item_list[yearIndex].zadusnice.map(
            (item, index) => {
              return (
                <tr key={index}>
                  <td>
                    {/* <Link to={`/${currentYear}/${monthSerb[item[0]]}`}> */}
                    {item[1] + ". " + monthSerb[item[0]]}
                    {/* </Link> */}
                  </td>
                  <td>
                    <Link to={`/${currentYear}/${monthSerb[item[0]]}`}>
                      {zadusniceName[index]}
                    </Link>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
