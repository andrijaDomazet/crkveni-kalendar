import "./CrossingData.scss";
import slave from "../Calendar/calendar-data/slave.json";
import { useIdContext } from "../../shared/IdProvider";
import { monthSerb } from "../../shared/shared";
import { Link } from "react-router-dom";
import React from "react";
export default function CrossingData() {
  const { slug, currentDate } = useIdContext();
  let currentYear = slug || currentDate.getFullYear();
  let currentMonth = null;

  return (
    <div className="zadusnice">
      <table>
        <thead>
          <tr className="mainTitle">
            <th colSpan="2">Lista srpskih slava</th>
          </tr>
        </thead>
        <tbody>
          {slave.map((item, index) => {
            const [monthIndex, day] = item.date;
            const monthName = monthSerb[monthIndex];

            const isNewMonth = monthIndex !== currentMonth;
            currentMonth = monthIndex;

            return (
              <React.Fragment key={index}>
                {isNewMonth && (
                  <tr className="monthTitle">
                    <td
                      colSpan="2"
                      style={{ fontWeight: "bold" }}
                    >
                      {monthName}
                    </td>
                  </tr>
                )}
                <tr>
                  <td>{`${day}. ${monthName}`}</td>
                  <td>
                    <Link to={`/${currentYear}/${monthName}`}>
                      {item.title}
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
