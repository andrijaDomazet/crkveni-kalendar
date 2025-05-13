import React, { useState } from "react";
import "./Calendar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  daysIsPost,
  daysIsNotPost,
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
  const { id, currentDate, isYear, isMonth, holidays, isEasterDay } =
    useIdContext();
  const location = useGlobalLocation();
  const [dropDownYear, setDropDownYear] = useState(false);
  const navigate = useNavigate();

  const changeMonth = (val) => {
    if (id === undefined) {
      navigate(`/${isYear}/${tableTitle(val)}`);
    } else if (isMonth === 11 && val === 1) {
      navigate(`../${+isYear + 1}/januar`);
    } else if (isMonth === 0 && val === -1) {
      navigate(`../${+isYear - 1}/decembar`);
    } else {
      navigate(`../${isYear}/${tableTitle(val)}`);
    }
  };

  const easterDate = new Date(isEasterDay);
  let test11 = easterDate.setDate(easterDate.getDate() - 1);
  const endEasterDate = new Date(test11);
  let test22 = easterDate.setDate(easterDate.getDate() - 49);
  const startEasterDate = new Date(test22);
  const easterDate2 = new Date(isEasterDay);
  let test33 = easterDate2.setDate(easterDate2.getDate() + 7);
  const endBelaNedelja = new Date(test33);
  const easterDate3 = new Date(isEasterDay);
  let test44 = easterDate3.setDate(easterDate.getDate() + 76);
  const startPetrovskiPost = new Date(test44);
  const easterDate4 = new Date(isYear, 6, 12);
  let test55 = easterDate4.setDate(easterDate.getDate() + 10);
  const endPetrovskiPost = new Date(test55);
  const easterDate5 = new Date(isYear, 6, 19);
  // let test66 = easterDate5.setDate(easterDate.getDate() + 10);
  // const weekAfterPetrovskiPost = new Date(test66);
  console.log("weekAfterPetrovskiPost", easterDate5);
  const startGospojinskiPost = new Date(isYear, 7, 14);
  const endGospojinskiPost = new Date(isYear, 7, 27);
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
    if (id === undefined) {
      if (isMonth + x === 12) {
        return `JANUAR (${+isYear + 1})`;
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

  const rowClasses = (item, zz) => {
    return redDaysId.includes(item.id) ||
      (easterDays.includes(item.title) && zz !== 4 && zz !== 6)
      ? "normalRow"
      : "";
  };

  const todayClass = (x) =>
    x.toDateString() === currentDate.toDateString() ? " today" : "";

  const setPostDays = (dateInfo) => {
    let setDateFromDateInfo = new Date(dateInfo);
    //start - Bozic i Bozicni post
    let bozicniPostStart = new Date(isYear, 10, 28);
    let bozicniPostEnd = new Date(isYear, 0, 6);
    let vikendPosleBozica = new Date(isYear, 0, 17);
    let notPost = daysIsNotPost.map((item) =>
      new Date(isYear, item[0], item[1]).setHours(0, 0, 0, 0)
    );
    let isPost = daysIsPost.map((item) =>
      new Date(isYear, item[0], item[1]).setHours(0, 0, 0, 0)
    );
    let setDateDay = setDateFromDateInfo.getDay();
    if (setDateFromDateInfo >= bozicniPostStart) {
      return "post";
    } else if (setDateFromDateInfo <= bozicniPostEnd) {
      return "post";
    } else if (
      //Uskrsnji post
      setDateFromDateInfo <= endEasterDate &&
      startEasterDate <= setDateFromDateInfo
    ) {
      return "post";
    } else if (
      //Petrovski post
      setDateFromDateInfo <= endPetrovskiPost &&
      startPetrovskiPost <= setDateFromDateInfo
    ) {
      return "post";
    } else if (
      //Gospojinski post
      setDateFromDateInfo <= endGospojinskiPost &&
      startGospojinskiPost <= setDateFromDateInfo
    ) {
      return "post";
    } else if (
      setDateFromDateInfo <= easterDate5 &&
      startGospojinskiPost <= setDateFromDateInfo
    ) {
      return "XXX";
    } else if (setDateFromDateInfo <= vikendPosleBozica) {
      //Bela nedelja
      return "";
    } else if (
      setDateFromDateInfo > easterDate &&
      setDateFromDateInfo <= endBelaNedelja
    ) {
      return "";
    } else if (setDateDay === 3 || setDateDay === 5) {
      if (!notPost.includes(setDateFromDateInfo.setHours(0, 0, 0, 0))) {
        return "post";
      }
    } else if (isPost.includes(setDateFromDateInfo.setHours(0, 0, 0, 0))) {
      return "post";
    } else {
      return "";
    }
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
              to={`/${item.title}/${monthSerb[isMonth]}/`}
              key={index}
              onClick={() => setDropDownYear(false)}
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
          onClick={() => {
            setDropDownYear(true);
          }}
          onMouseLeave={() => {
            setDropDownYear(false);
          }}
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
            let z = new Date(item.date);
            let zz = z.getDay();
            const tdClasses = ["onlyDay", "noDay", "before"];
            nedelje.push(inTextNumber);
            if (zz === 1) {
              inTextNumber++;
            }
            return (
              <React.Fragment key={index}>
                {zz === 1 && (
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
                    rowClasses(item, zz) + todayClass(new Date(item.date))
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
                    <div className="test">
                      {/* <h2>{isRealDay[index].id}</h2> */}
                      {renderTitleSection({
                        mainTitle: item.title,
                        slavaSymbol: item.slava,
                      })}
                    </div>
                  </td>
                  <td>{setPostDays(item.date)}</td>
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
          <div key={offset} className={offset === 0 ? "month-center" : ""}>
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
