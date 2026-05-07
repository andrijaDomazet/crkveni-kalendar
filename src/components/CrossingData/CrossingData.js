"use client";
import "./CrossingData.scss";
import slave from "../Calendar/calendar-data/slave.json";
import { monthSerb } from "../../shared/shared";
import Link from "next/link";
import React from "react";
import { useRouteContext } from "../../shared/RouteProvider";

export default function CrossingData() {
  const { slug, currentDate } = useRouteContext();
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
                    <td colSpan="2" style={{ fontWeight: "bold" }}>
                      <h2>
                        <Link href={`/${currentYear}/${monthName}/`}>
                          {monthName}
                        </Link>
                      </h2>
                    </td>
                  </tr>
                )}
                <tr>
                  <td>{`${day}. ${monthName}`}</td>
                  <td>
                    <h3>{item.title}</h3>
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
