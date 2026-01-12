import React, { useState } from "react";
import "./Calendar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  monthSerb,
  calendarYears,
  redDaysId,
  easterDays,
} from "./calendar-data/calendar-data";
import SimpleButton from "../../UI/Buttons/SimpleButton";
import TimeFormat from "../TimeFormat/TimeFormat";
import { useGlobalLocation } from "../../shared/LocationContext";
import { useIdContext } from "../../shared/IdProvider";
import { renderTitleSection } from "../../shared/utility";

export default function Calendar(props) {
  // console.log("Props", props.isMonth2);

  let { id, currentDate, isYear, isMonth, holidays, isEasterDay } =
    useIdContext();
  isMonth = props.isMonth2 ?? isMonth;
  // console.log("IsMonth", isMonth);

  const location = useGlobalLocation();
  const [dropDownYear, setDropDownYear] = useState(false);
  const navigate = useNavigate();

  const changeMonth = (val) => {
    // console.log("ID", id, isYear, isMonth, val);

    if (id === undefined) {
      if (isMonth === 11 && val === 1) {
        navigate(`../${isYear + 1}/januar/`);
      } else if (isMonth === 0 && val === -1) {
        navigate(`../${isYear - 1}/decembar/`);
      } else {
        navigate(`../${isYear}/${monthSerb[isMonth + val]}/`);
      }
    } else if (isMonth === 11 && val === 1) {
      navigate(`../${+isYear + 1}/januar/`);
    } else if (isMonth === 0 && val === -1) {
      navigate(`../${+isYear - 1}/decembar/`);
    } else {
      navigate(`../${isYear}/${tableTitle(val)}/`);
    }
  };

  function setMonth(short) {
    if (short) {
      //short month on home page
      const setShortCal = () => {
        if (currentDate.getDate() < 7) {
          return holidays.slice(0, currentDate.getDate() + short);
        } else {
          return holidays.slice(
            currentDate.getDate() - short,
            currentDate.getDate() + short
          );
        }
      };
      return setShortCal();
    } else {
      return holidays;
    }
  }
  const tableTitle = (x) => {
    // console.log("ID", id, isYear, isMonth, x);
    if (id === undefined) {
      if (isMonth + x === 12) {
        return `Januar (${+isYear + 1})`;
      } else if (isMonth + x === -1) {
        return `${monthSerb[11]} (${+isYear + x})`;
      } else {
        return monthSerb[isMonth + x];
      }
    } else {
      if (isMonth + x === 12) {
        return `${monthSerb[0]} (${+isYear + x})`;
      } else if (isMonth + x === -1) {
        return `${monthSerb[11]} (${+isYear + x})`;
      } else {
        return monthSerb[monthSerb.indexOf(id) + x];
      }
    }
  };

  const rowClasses = (item, eventDay) => {
    return redDaysId.includes(item.id) ||
      (easterDays.includes(item.title) && eventDay !== 4 && eventDay !== 6)
      ? "normalRow"
      : "";
  };

  const setCloseClass = () => {
    if (location.pathname === "/") {
      return " close";
    } else {
      return "";
    }
  };

  //change the calendar year
  const items_list = (items) => {
    return (
      <ul className={getDropDownMenu()}>
        {items.map((item, index) => {
          return (
            <NavLink
              to={`/${item.title}/${monthSerb[0]}/`}
              key={index}
              onClick={() => {
                setTimeout(() => setDropDownYear(false), 100);
              }}
            >
              {item.title}
            </NavLink>
          );
        })}
      </ul>
    );
    // }
  };
  const getDropDownMenu = () => {
    return dropDownYear ? "drop_down_menu" : "drop_down_menu close";
  };
  let inTextNumber = 0;
  const nedelje = [];
  return (
    <div className="calendar">
      {/* ---- Gornje ranfle kalendara ---- */}
      <div className="first">
        <h1>Crkveni pravoslavni kalendar {isYear}</h1>
        <div
          className={`yearBox${setCloseClass()}`}
          onClick={() => setDropDownYear((prev) => !prev)}
        >
          <b>{isYear}</b>
          <i className="fa-solid fa-square-caret-down"></i>
          <div className="botDiv">{items_list(calendarYears[0].item_list)}</div>
        </div>
      </div>
      {/* ---- END Gornje ranfle kalendara ---- */}

      {/* ---- Kalendar ---- */}
      <table className="calendar-table" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {["Dani", "Novi", "Stari"].map((item, index) => {
              return (
                <th key={index}>
                  <span>{item}</span>
                </th>
              );
            })}
            <th>
              <span>{tableTitle(0)}</span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {setMonth(props.shortCal).map((item, index) => {
            let eventDate = new Date(item.date);
            let eventDay = eventDate.getDay();
            const tdClasses = ["onlyDay", "noDay", "before"];
            nedelje.push(inTextNumber);
            // console.log("ITEM calendar", item);

            if (eventDay === 1) {
              inTextNumber++;
            }
            return (
              <React.Fragment key={index}>
                {eventDay === 1 && (
                  <tr className="opisNedelje">
                    <td colSpan={5}>
                      {/* {[1, 2, 3, 4, 5].includes(inTextNumber) && (
                        <div className="banner-wrapper calendar">
                          <AdManagerSlot adUnitPath={location.pathname} slotNumber={inCalendarArr[inTextNumber - 1]} />
                        </div>
                      )} */}
                    </td>
                  </tr>
                )}
                <tr
                  key={index}
                  className={
                    rowClasses(item, eventDay) +
                    (item.today
                      ? ` ${item.today}`
                      : item.mainClass
                      ? ` ${item.mainClass}`
                      : "") +
                    // todayClass(new Date(item.date)) +
                    " dayClass"
                  }
                >
                  {tdClasses.map((x, index) => {
                    return (
                      <td key={index}>
                        <TimeFormat timePost={item.date} classes={x} />
                      </td>
                    );
                  })}
                  <td>
                    <div className="mainTitle">
                      {renderTitleSection({
                        mainTitle: item.title,
                        slavaSymbol: item.slava,
                        extraLabel: item.extraLabel,
                        extraLabelLink: item.extraLabelLink,
                        separatorSymbol: item.separatorSymbol,
                        strongClass: item.strongClass,
                        mainClass: item.mainClass,
                      })}
                    </div>
                  </td>
                  <td>{item.post}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {/* ---- END Kalendar ---- */}

      {/* ---- Donja ranfla kalendara ---- */}
      <div className="calendar-month">
        {[-1, 0, 1].map((offset) => (
          <div key={offset} className={offset === 0 ? "month-center" : ``}>
            <SimpleButton clicked={() => changeMonth(offset)}>
              {offset === -1 && <i className="fa-solid fa-backward"></i>}
              {tableTitle(offset)}
              {offset === 1 && <i className="fa-solid fa-forward"></i>}
            </SimpleButton>
          </div>
        ))}
      </div>
      {/* ---- END Donja ranfla kalendara ---- */}
    </div>
  );
}
