// {
//   "date": [1, 27],
//   "title": "Prepodobni Avksentije i Sveti Kiril slovenski – Ćirilovdan (ako pada u Veliki post, pomera se na nedelju siropusnu)"
// },
import React, { useEffect, useState } from "react";
import "./Calendar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import news2 from "./calendar-data/all__news4";
import {
  idsMonths,
  daysIsPost,
  daysIsNotPost,
  monthSerb,
  calendarYears,
  manualDateEaster,
  redDaysId,
  easterDays,
} from "./calendar-data/calendar-data";
import SimpleButton from "../../UI/Buttons/SimpleButton";
import TimeFormat from "../TimeFormat/TimeFormat";
import { useGlobalLocation } from "../../shared/LocationContext";
import { useIdContext } from "../../shared/IdProvider";
import { renderTitleSection } from "../../shared/utility";

export default function Calendar(props) {
  const { id, slug, currentDate, currentYear } = useIdContext();
  const location = useGlobalLocation();
  const [isYear, setIsYear] = useState(() => {
    return slug || currentDate.getFullYear();
  });
  // console.log("isYear", isYear);
  const [isMonth, setIsMonth] = useState(() =>
    id === undefined ? currentDate.getMonth() : monthSerb.indexOf(id)
  );
  const [isEasterDay, setIsEasterDay] = useState("");
  const [isRealDay, setIsRealDay] = useState("");
  useEffect(() => {
    if (slug && id) {
      setIsYear(slug);
      setIsMonth(monthSerb.indexOf(id));
    }

    setHolidays(filterHolidays);
  }, [isYear, isMonth, slug, id]);

  const [holidays, setHolidays] = useState(filterHolidays);
  const [dropDownYear, setDropDownYear] = useState(false);

  function filterHolidays() {
    let yearIndex = calendarYears[0].item_list.findIndex(
      (item) => item.title == isYear
    );
    // console.log("YearIndex", isYear, yearIndex);

    //zadusnice-------------------------------------------------------------
    let zadusniceIndex = calendarYears[0].item_list[
      yearIndex
    ].zadusnice.findIndex((item) => item[0] == isMonth);

    let zadusniceDate = calendarYears[0].item_list[yearIndex].zadusnice.find(
      (item) => item[0] === isMonth
    );
    //end---------------------------------------------------------------------
    //uskrs-------------------------------------------------------------------
    let easter = isYear - 2020;
    let monthData = JSON.parse(JSON.stringify(news2));
    let setHol = monthData.slice(idsMonths[isMonth][0], idsMonths[isMonth][1]);
    //end---------------------------------------------------------------------
    let setHolTest = setHol.map((item, index) => {
      item.title = Array.isArray(item.title)
        ? item.title.map((item) => item)
        : [item.title];

      let setDate = new Date(isYear, isMonth, index);
      let currentDay2 = setDate.getDay();

      if (zadusniceDate && zadusniceDate[1] === index + 1) {
        item.title = (
          <>
            {Array.isArray(item.title)
              ? item.title.map((el, index) => (
                  <>
                    <h2>{el}</h2>
                    {index !== item.title.length - 1 ? "; " : ""}
                  </>
                ))
              : item.title}{" "}
            -{" "}
            <Link to="/zadusnice/" className="zadusniceStrong">
              Zadušnice
            </Link>{" "}
            {calendarYears[0].zadusnice[zadusniceIndex]}
          </>
        );
      }

      let date1 = new Date(isYear, isMonth, index + 1);
      item.date = date1;
      let easterDay = new Date(`${isYear}-${manualDateEaster[easter]}`);
      setIsEasterDay(easterDay);
      let diffInDays = (easterDay - date1) / (1000 * 60 * 60 * 24); // Razlika u danima
      // console.log("item", diffInDays);
      if (diffInDays >= -2 && diffInDays <= 3) {
        item.title = (
          <>
            <h2>
              <strong
                className={
                  currentDay2 === 3 || currentDay2 === 5
                    ? "blackStrong"
                    : "redStrong"
                }
              >
                {easterDays[easterDays.length - 3 - diffInDays]}
              </strong>
            </h2>
          </>
        );
      } else if (diffInDays == -24) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Prepolovljenje)",
        });
      } else if (diffInDays == -31) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Odanije Prepolovljenja)",
        });
      } else if (diffInDays == -38) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Odanije Vaskrsa)",
        });
      } else if (diffInDays == -39) {
        item.title = renderTitleSection({
          mainTitle: false,
          strongClass: "redStrong",
          extraLabel: "Vaznesenje Gospodnje – Spasovdan",
        });
      } else if (diffInDays == -47) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          // strongClass: "redStrong",
          extraLabel: "(Odanije Vaznesenja)",
        });
      } else if (diffInDays == -55) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          // strongClass: "redStrong",
          extraLabel: "(Odanije Pedesetnice)",
        });
      } else if (currentDay2 === 5 && diffInDays > 5 && diffInDays < 10) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "Lazareva subota (Vrbica)",
          separatorSymbol: "- ",
          slavaSymbol: true,
        });
      } else if (currentDay2 == 6 && diffInDays > 5 && diffInDays < 10) {
        item.title = renderTitleSection({
          mainTitle: false,
          extraLabel: "Ulazak Gospoda Isusa Hrista u Jerusalim – Cveti",
          slavaSymbol: true,
          strongClass: "redStrong",
        });
      } else if (currentDay2 === 2 && diffInDays > 15 && diffInDays < 20) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Prvo bdenije)",
        });
      } else if (currentDay2 === 4 && diffInDays > 15 && diffInDays < 20) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Drugo bdenije)",
        });
      } else if (currentDay2 === 0 && diffInDays > -10 && diffInDays < 0) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "Pobusani ponedeljak",
          separatorSymbol: "- ",
        });
      } else if (currentDay2 === 4 && diffInDays > -8 && diffInDays < 2) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "Istočni petak",
          separatorSymbol: "; ",
        });
      }
      return item;
    });
    setIsRealDay(setHolTest);

    return setHolTest;
  }

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
      setDateFromDateInfo <= endEasterDate &&
      startEasterDate <= setDateFromDateInfo
    ) {
      return "post";
    } else if (setDateFromDateInfo <= vikendPosleBozica) {
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
                      {item.slava ? (
                        <>
                          <Link to={"/slave/"} className="slavaStrong">
                            SLAVA
                          </Link>{" "}
                        </>
                      ) : null}
                      {Array.isArray(item.title)
                        ? item.title.map((el, index) => (
                            <>
                              <h2>{el}</h2>
                              {index !== item.title.length - 1 ? "; " : ""}
                            </>
                          ))
                        : item.title}
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
