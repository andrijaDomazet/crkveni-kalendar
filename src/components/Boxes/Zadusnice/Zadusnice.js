"use client";
import "./Zadusnice.scss";
import { calendarYears } from "../../Calendar/calendar-data/calendar-data.js";
import { monthSerb } from "../../../shared/shared.js";
import Link from "next/link";
import { useRouteContext } from "../../../shared/RouteProvider.js";
import { useScriptContext } from "../../../shared/ScriptProvider.js";

export default function Zadusnice({ setYear, boxTitle, data }) {
    const { cyr } = useScriptContext();
  const { slug, currentDate } = useRouteContext();
  let currentYear =
    setYear || slug || (currentDate?.getFullYear() ?? new Date().getFullYear());
  let yearIndex = calendarYears[0].item_list.findIndex(
    (item) => item.title == currentYear,
  );
  let zadusniceDate = calendarYears[0].item_list[yearIndex];
  // console.log("Data", zadusniceDate);
  let boxTitle2 = boxTitle || `🕯 Zadušnice u ${currentYear}. godini`;
  // let data = data || calendarYears[0].item_list[yearIndex]
  return (
    <div className="zadusnice">
      <table>
        <thead>
          <tr>
            <th colSpan="2">
              <h2>{cyr(`${boxTitle2}`)}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {zadusniceDate.tableNum.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <h3>
                    <Link
                      prefetch={false}
                      href={`/${currentYear}/${monthSerb[item[0]]}/`}
                    >
                      {/* {zadusniceName[index]} */}
                      {/* {data.zadusnice[index].charAt(0).toUpperCase() +
                        data.zadusnice[index].slice(1)} */}
                      {cyr(`${zadusniceDate.zadusnice[index].charAt(0).toUpperCase() +
                        zadusniceDate.zadusnice[index].slice(1)}`)}
                      {/* {item[0]} */}
                    </Link>
                  </h3>
                </td>
                <td>{cyr(`${item[1] + ". " + monthSerb[item[0]]}`)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
