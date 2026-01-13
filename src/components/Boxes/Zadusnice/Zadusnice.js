import "./Zadusnice.scss";
import { calendarYears } from "../../Calendar/calendar-data/calendar-data.js";
import { monthSerb } from "../../../shared/shared.js";
import { useIdContext } from "../../../shared/IdProvider.js";
import { Link } from "react-router-dom";

export default function Zadusnice({ setYear, boxTitle, data }) {
  const { slug, currentDate } = useIdContext();
  let currentYear = setYear || slug || currentDate.getFullYear();
  let yearIndex = calendarYears[0].item_list.findIndex(
    (item) => item.title == currentYear
  );
  let zadusniceDate = calendarYears[0].item_list[yearIndex];

  return (
    <div className="zadusnice">
      <table>
        <thead>
          <tr>
            <th colSpan="2">
              <h2>{boxTitle}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {zadusniceDate.tableNum.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <h3>
                    <Link to={`/${currentYear}/${monthSerb[item[0]]}/`}>
                      {/* {zadusniceName[index]} */}
                      {data.zadusnice[index].charAt(0).toUpperCase() +
                        data.zadusnice[index].slice(1)}
                    </Link>
                  </h3>
                </td>
                <td>{item[1] + ". " + monthSerb[item[0]]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
