"use client";
import React, { lazy, Suspense, useState } from "react";
import "./Calendar.scss";
import { useRouter, usePathname } from "next/navigation";
import NavLink from "../../UI/NavLink/NavLink";
import {
  monthSerb,
  calendarYears,
  redDaysId,
  easterDays,
  inCalendarArr,
} from "./calendar-data/calendar-data";
import SimpleButton from "../../UI/Buttons/SimpleButton";
import TimeFormat from "../TimeFormat/TimeFormat";
import { renderTitleSection } from "../../shared/utility";
import AdManagerSlot from "../AdvModule/AdManagerSlot";
import { useRouteContext } from "../../shared/RouteProvider.js";
import { useCalendarContext } from "../../shared/CalendarProvider.js";
import { useScriptContext } from "../../shared/ScriptProvider.js";

const StickyAdLazy = lazy(() => import("../AdvModule/StickyAd.js"));

export default function Calendar(props) {
  let { id, currentDate, pageYear, pageMonth } = useRouteContext();
  let { holidays } = useCalendarContext();
  const { cyr } = useScriptContext();

  pageMonth = props.isMonth2 ?? pageMonth;

  const pathname = usePathname();
  const router = useRouter();
  const [dropDownYear, setDropDownYear] = useState(false);

  const changeMonth = (val) => {
    let newYear = pageYear;
    let newMonth = pageMonth + val;

    if (newMonth === 12) {
      newMonth = 0;
      newYear = pageYear + 1;
    } else if (newMonth === -1) {
      newMonth = 11;
      newYear = pageYear - 1;
    }

    router.push(`/${newYear}/${monthSerb[newMonth]}/`);
  };

  function setMonth(short) {
    if (short && currentDate) {
      const setShortCal = () => {
        if (currentDate.getDate() < 7) {
          return holidays.slice(0, currentDate.getDate() + short);
        } else {
          return holidays.slice(
            currentDate.getDate() - short,
            currentDate.getDate() + short,
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
      if (pageMonth + x === 12) {
        return `Januar (${+pageYear + 1})`;
      } else if (pageMonth + x === -1) {
        return `${monthSerb[11]} (${+pageYear + x})`;
      } else {
        return monthSerb[pageMonth + x];
      }
    } else {
      if (pageMonth + x === 12) {
        return `${monthSerb[0]} (${+pageYear + x})`;
      } else if (pageMonth + x === -1) {
        return `${monthSerb[11]} (${+pageYear + x})`;
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
    if (pathname === "/") {
      return " close";
    } else {
      return "";
    }
  };

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
  };

  const getDropDownMenu = () => {
    return dropDownYear ? "drop_down_menu" : "drop_down_menu close";
  };

  let inTextNumber = 0;
  const nedelje = [];
  let classsesButtons = ["left", "month-center", "right"];

  return (
    <div className="calendar">
      <div className="first">
        <h1>{cyr(`Crkveni pravoslavni kalendar ${pageYear}`)}</h1>
        <div
          className={`yearBox${setCloseClass()}`}
          onClick={() => setDropDownYear((prev) => !prev)}
        >
          <b>{pageYear}</b>
          <i className="fa-solid fa-square-caret-down"></i>
          <div className="botDiv">{items_list(calendarYears[0].item_list)}</div>
        </div>
      </div>

      <table className="calendar-table" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            {["Dani", "Novi", "Stari"].map((item, index) => {
              return (
                <th key={index}>
                  <span>{cyr(`${item}`)}</span>
                </th>
              );
            })}
            <th>
              <span>{cyr(`${tableTitle(0)}`)}</span>
            </th>
            <th>
              <span>{cyr(`Post`)}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {setMonth(props.shortCal).map((item, index) => {
            let eventDate = new Date(item.date);
            let eventDay = eventDate.getDay();
            const tdClasses = ["onlyDay", "noDay", "before"];
            nedelje.push(inTextNumber);

            if (eventDay === 1) {
              inTextNumber++;
            }
            return (
              <React.Fragment key={index}>
                {eventDay === 1 && (
                  <tr className="opisNedelje">
                    <td colSpan={5}>
                      {[1, 2, 3, 4, 5].includes(inTextNumber) && (
                        <div className="banner-wrapper inCalendar">
                          <AdManagerSlot
                            slotNumber={inCalendarArr[inTextNumber - 1]}
                          />
                        </div>
                      )}
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
                  <td>{cyr(`${item.post}`)}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <div className="calendar-month">
        {[-1, 0, 1].map((offset) => (
          <div key={offset} className={classsesButtons[offset + 1]}>
            <SimpleButton clicked={() => changeMonth(offset)}>
              {offset === -1 && <i className="fa-solid fa-backward"></i>}
              {cyr(`${tableTitle(offset)}`)}
              {offset === 1 && <i className="fa-solid fa-forward"></i>}
            </SimpleButton>
          </div>
        ))}
      </div>

      <Suspense fallback={<div></div>}>
        <StickyAdLazy slotNumber={"div-gpt-ad-1768472077826-0"} />
      </Suspense>
    </div>
  );
}
