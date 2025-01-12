import React from "react";
import "./CalendarMonthsLinks.scss";
import { monthSerb } from "../Calendar/calendar-data/calendar-data";
import { NavLink } from "react-router-dom";
import { useIdContext } from "../../shared/IdProvider";

export default function CalendarMonthsLinks() {
  const { slug, currentYear } = useIdContext();
  return (
    <table className="calendar-allMonths">
      <thead>
        <tr>
          <th colSpan="4">
            <h2>Crkveni kalendar 2025. godinu po mesecima:</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {monthSerb.slice(0, 4).map((item, index) => {
            return (
              <td key={index}>
                <NavLink to={`/${slug || currentYear}/${item}`}><h3>{item.substring(0, 1).toUpperCase() + item.substring(1)}</h3></NavLink>
              </td>
            );
          })}
        </tr>
        <tr>
          {monthSerb.slice(4, 8).map((item, index) => {
            return (
              <td key={index}>
                <NavLink to={`/${slug || currentYear}/${item}`}><h3>{item.substring(0, 1).toUpperCase() + item.substring(1)}</h3></NavLink>
              </td>
            );
          })}
        </tr>
        <tr>
          {monthSerb.slice(8, 12).map((item, index) => {
            return (
              <td key={index}>
                <NavLink to={`/${slug || currentYear}/${item}`}><h3>{item.substring(0, 1).toUpperCase() + item.substring(1)}</h3></NavLink>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}
