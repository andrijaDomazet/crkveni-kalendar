import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import news2 from "../../all__news4.json";
import { useGlobalLocation } from "../../shared/LocationContext";
import { idsMonths, daysIsPost, daysIsNotPost, monthSerb, calendarYears } from "../../shared/shared";
import SimpleButton from "../../UI/Buttons/SimpleButton";
// import AdManagerSlot from "../AdvModule/AdManagerSlot";
import TimeFormat from "../TimeFormat/TimeFormat";
import "./Calendar.scss";

export default function Calendar(props) {
  const manualDateEaster = ["4-19", "5-2", "4-24", "4-16", "5-5", "4-20", "4-12", "5-2", "4-16", "4-8", "4-28", "4-13", "5-2"];
  const currentDate = new Date();
  let { id } = useParams();
  const location = useGlobalLocation();
  const [isYear, setIsYear] = useState(test());
  const easter = isYear - 2020;
  const [isMonth, setIsMonth] = useState(() => {
    if (id === undefined) {
      return currentDate.getMonth();
    } else {
      return monthSerb.indexOf(id);
    }
  });
  const [holidays, setHolidays] = useState(filterHolidays);

  function test() {
    let test11 = currentDate.getFullYear();
    return test11;
  }

  const [dropDownYear, setDropDownYear] = useState(false);
  function filterHolidays() {
    // console.log("Item before", news2);
    const easterDays = ["Veliki četvrtak (Veliko bdenije)", "Veliki petak", "Velika subota", "V a s k r s – Vaskrsenje Gospoda Isusa Hrista"];
    let setHol = news2.slice(idsMonths[isMonth][0], idsMonths[isMonth][1]);
    let setHolTest = setHol.map((item, index) => {
      let date1 = new Date(isYear, isMonth, index + 1);
      item.date = date1;
      let date2 = new Date(`${isYear}-${manualDateEaster[easter]}`);
      if (date2.toDateString() === date1.toDateString()) {
        item.title = easterDays[easterDays.length - 1];
      }
      return item;
    });
    // console.log("Set hol", setHolTest);
    return setHolTest;
  }

  useEffect(() => {
    setHolidays(filterHolidays);
  }, [isYear, isMonth]);

  const navigate = useNavigate();
  const changeMonth = (val) => {
    if (id === undefined) {
      navigate(`/crkveni-kalendar/${isYear}/${tableTitle(val)}`);
    } else {
      navigate(`../crkveni-kalendar/${isYear}/${tableTitle(val)}`);
    }
    if (isMonth === 11 && val === 1) {
      setIsMonth(0);
      setIsYear(isYear + 1);
      navigate(`../crkveni-kalendar/${isYear + 1}/januar`);
    } else if (isMonth === 0 && val === -1) {
      setIsMonth(11);
      setIsYear(isYear - 1);
      navigate(`../crkveni-kalendar/${isYear - 1}/decembar`);
    } else {
      setIsMonth(isMonth + val);
    }
  };

  function setMonth(short) {
    if (short) {
      //short month on home page
      const setShortCal = () => {
        if (currentDate.getDate() < 7) {
          return holidays.slice(0, currentDate.getDate() + short);
        } else {
          return holidays.slice(currentDate.getDate() - short, currentDate.getDate() + short);
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
        return `JANUAR (${isYear + 1})`;
      } else if (isMonth + x === -1) {
        return `${monthSerb[11]} (${isYear + x})`;
      } else {
        return monthSerb[isMonth + x];
      }
    } else {
      if (isMonth + x === 12) {
        return `${monthSerb[0]} (${isYear + x})`;
      } else if (isMonth + x === -1) {
        return `${monthSerb[11]} (${isYear + x})`;
      } else {
        return monthSerb[monthSerb.indexOf(id) + x];
      }
    }
  };

  const rowClasses = (index) => {
    const redDaysId = [7, 8, 9, 14, 19, 20, 27, 46, 153, 154, 163, 164, 165, 188, 193, 214, 231, 240, 254, 264, 270, 300, 304, 312, 325, 338, 353];
    return redDaysId.includes(index) ? "normalRow" : "";
  };

  const todayClass = (x) => {
    if (x.getDate() === currentDate.getDate() && x.getMonth() === currentDate.getMonth()) {
      return " today";
    } else {
      return "";
    }
  };
  const setPostDays = (dateInfo) => {
    let setDateFromDateInfo = new Date(dateInfo);

    //start - Bozic i Bozicni post
    let bozicniPostStart = new Date(isYear, 10, 28);
    let bozicniPostEnd = new Date(isYear, 0, 6);

    let test3 = new Date(2023, 0, 17);
    // let vaskrs=new Date(2022,3,24)
    let notPost = daysIsNotPost.map((item) => {
      return new Date(isYear, item[0], item[1]).setHours(0, 0, 0, 0);
    });
    let isPost = daysIsPost.map((item) => {
      return new Date(isYear, item[0], item[1]).setHours(0, 0, 0, 0);
    });
    let setDateDay = setDateFromDateInfo.getDay();
    if (setDateFromDateInfo >= bozicniPostStart) {
      return "post";
    } else if (setDateFromDateInfo <= bozicniPostEnd) {
      return "post";
    } else if (setDateFromDateInfo <= test3) {
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

  const setButttonClass = (x) => {
    if (x === "right" && isMonth > 10) {
      // return "closeButton";
    } else if (x === "left" && isMonth < 1) {
      // return "closeButton";
    }
  };
  const setCloseClass = () => {
    // if (location.pathname === "/") {
    //   return " close";
    // } else {
    //   return "";
    // }
  };

  //change the calendar year
  const items_list = (items) => {
    return (
      <ul className={getDropDownMenu()}>
        {items.map((item, index) => {
          return (
            <NavLink
              to={`/crkveni-kalendar/${item.title}/${monthSerb[isMonth]}`}
              key={index}
              onClick={() => {
                setIsYear(item.title);
                setDropDownYear(false);
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
  const screenWidth = window.scrollX;
  return (
    <div className="calendar">
      {/* ---- Gornje ranfle kalendara ---- */}
      <div className="first">
        <h1>Crkveni pravoslavni kalendar</h1>
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
          <i class="fa-solid fa-square-caret-down"></i>
          <div className="botDiv">{items_list(calendarYears[0].item_list)}</div>
        </div>
      </div>
      <div className={`calendar-month${setCloseClass()}`}>
        <div>
          <SimpleButton
            // classes={setButttonClass("left")}
            clicked={() => changeMonth(-1)}
          >
            <i className="fa-solid fa-backward"></i>
            {tableTitle(-1)}
          </SimpleButton>
        </div>
        <div className="month-center"></div>
        <div>
          <SimpleButton
            // classes={setButttonClass("right")}
            clicked={() => changeMonth(1)}
          >
            {tableTitle(1)}
            <i className="fa-solid fa-forward"></i>
          </SimpleButton>
        </div>
      </div>
      {/* ---- END Gornje ranfle kalendara ---- */}

      {/* ---- Kalendar ---- */}
      <table className="calendar-table" cellspacing="0" cellpadding="0">
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
              <h2>
                {tableTitle(0)} {isYear}
              </h2>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {setMonth(props.shortCal).map((item, index) => {
            // console.log("Index calendar", index);
            let z = new Date(item.date);
            let zz = z.getDay();
            const tdClasses = ["onlyDay", "noDay", "before"];
            if (zz === 1) {
              nedelje.push(inTextNumber);
              inTextNumber++;
              console.log("Nedelje", nedelje);
              let inCalendarArr = ["div-gpt-ad-1724672473185-0", "div-gpt-ad-1724680335213-0", "div-gpt-ad-1724680376368-0", "div-gpt-ad-1724680398271-0", "div-gpt-ad-1724680417311-0"];
              return (
                <>
                  <tr className="opisNedelje">
                    <td colSpan={5}>
                      {/* {inTextNumber} */}
                      {[1, 2, 3, 4, 5].includes(inTextNumber) && <div className="banner-wrapper calendar">{/* <AdManagerSlot adUnitPath={location.pathname} slotNumber={inCalendarArr[inTextNumber - 1]} /> */}</div>}
                    </td>
                  </tr>
                  <tr key={index} className={rowClasses(item.id) + todayClass(new Date(item.date))}>
                    {tdClasses.map((x, index) => {
                      return (
                        <td key={index}>
                          <TimeFormat timePost={item.date} classes={x} />
                        </td>
                      );
                    })}
                    <td>
                      <div className="test">
                        <h3>{item.title}</h3>
                      </div>
                    </td>
                    <td>{setPostDays(item.date)}</td>
                    {/* <td>{setVaskrsTest(item.date)}</td> */}
                  </tr>
                </>
              );
            } else {
              return (
                <tr key={index} className={rowClasses(item.id) + todayClass(new Date(item.date))}>
                  {tdClasses.map((x, index) => {
                    return (
                      <td key={index}>
                        <TimeFormat timePost={item.date} classes={x} />
                      </td>
                    );
                  })}
                  <td>
                    <div className="test">
                      <h3>{item.title}</h3>
                    </div>
                  </td>
                  <td>{setPostDays(item.date)}</td>
                  {/* <td>{setVaskrsTest(item.date)}</td> */}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      {/* ---- END Kalendar ---- */}

      {/* ---- Donja ranfla kalendara ---- */}
      <div className="calendar-month">
        <div>
          <SimpleButton classes={setButttonClass("left")} clicked={() => changeMonth(-1)}>
            <i className="fa-solid fa-backward"></i>
            {tableTitle(-1)}
          </SimpleButton>
        </div>
        <div className="month-center">
          <SimpleButton clicked={() => changeMonth(0)}>{tableTitle(0)}</SimpleButton>
        </div>
        <div>
          <SimpleButton classes={setButttonClass("right")} clicked={() => changeMonth(1)}>
            {tableTitle(1)}
            <i className="fa-solid fa-forward"></i>
          </SimpleButton>
        </div>
      </div>
      {/* ---- END Donja ranfla kalendara ---- */}
    </div>
  );
}
