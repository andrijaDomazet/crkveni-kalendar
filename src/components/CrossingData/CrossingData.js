import React from "react";
import slave from "../Calendar/calendar-data/slave.json";
import { useIdContext } from "../../shared/IdProvider";
import { monthSerb } from "../../shared/shared";
import { Link } from "react-router-dom";
export default function CrossingData() {
  const { slug, currentDate } = useIdContext();
  let currentYear = slug || currentDate.getFullYear();
  return (
    <div className="zadusnice">
      <table>
        <thead>
          <tr>
            <th colSpan="2">{`Srpske slave`}</th>
          </tr>
        </thead>
        <tbody>
          {slave.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  {/* <Link to={`/${currentYear}/${monthSerb[item.date[0]]}`}> */}
                  {item.date[1] + ". " + monthSerb[item.date[0]]}
                  {/* </Link> */}
                </td>
                <td>
                  <Link to={`/${currentYear}/${monthSerb[item.date[0]]}`}>
                    {item.title}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
