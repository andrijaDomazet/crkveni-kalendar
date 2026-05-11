"use client";
import { createContext, useContext, useMemo } from "react";
import { useRouteContext } from "./RouteProvider";
import {
  calendarYears,
  daysIsNotPost,
  daysIsPost,
  easterDays,
  idsMonths,
  manualDateEaster,
  monthSerb,
} from "../components/Calendar/calendar-data/calendar-data";
import news2 from "../components/Calendar/calendar-data/all__news4.json";
import { toMidnightTs } from "./utility";

const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const { pageYear, pageMonth, currentDate } = useRouteContext();
  const yearIndex = useMemo(() => {
    return calendarYears[0].item_list.findIndex(
      (item) => item.title === pageYear,
    );
  }, [pageYear]);
  const toTs = (y, m, d) => new Date(y, m, d).setHours(0, 0, 0, 0);

  const easterDay = useMemo(
    () => new Date(`${pageYear}-${manualDateEaster[pageYear - 2020]}`),
    [pageYear],
  );

  const postLookup = useMemo(() => {
    const bozicniPostStartTs = toTs(pageYear, 10, 28);
    const bozicniPostEndTs = toTs(pageYear, 0, 6);
    const vikendPosleBozicaTs = toTs(pageYear, 0, 17);

    const easterTs = toTs(
      easterDay.getFullYear(),
      easterDay.getMonth(),
      easterDay.getDate(),
    );
    const startEasterTs = toTs(
      easterDay.getFullYear(),
      easterDay.getMonth(),
      easterDay.getDate() - 48,
    );
    const endEasterTs = toTs(
      easterDay.getFullYear(),
      easterDay.getMonth(),
      easterDay.getDate() - 1,
    );

    const notPostSet = new Set(
      daysIsNotPost.map(([m, d]) => toTs(pageYear, m, d)),
    );
    const isPostSet = new Set(daysIsPost.map(([m, d]) => toTs(pageYear, m, d)));

    return {
      bozicniPostStartTs,
      bozicniPostEndTs,
      vikendPosleBozicaTs,
      startEasterTs,
      endEasterTs,
      easterTs,
      notPostSet,
      isPostSet,
    };
  }, [pageYear, easterDay]);
  const getTargetSundayBeforeChristmas = (year) => {
    // broj nedelja (Sunday) u periodu 1–6. januar naredne godine
    const nextYear = pageYear + 1;
    let sundayCount = 0;

    for (let d = 1; d <= 6; d++) {
      const date = new Date(nextYear, 0, d);
      if (date.getDay() === 0) sundayCount++;
    }

    // poslednja i pretposlednja nedelja u decembru tekuće godine
    const lastSundayOfDecember = (() => {
      const d = new Date(pageYear, 11, 31);
      d.setDate(d.getDate() - d.getDay()); // vraća na nedelju
      d.setHours(0, 0, 0, 0);
      return d;
    })();

    if (sundayCount === 1) {
      return lastSundayOfDecember;
    }

    // sundayCount === 0
    const secondLastSunday = new Date(lastSundayOfDecember);
    secondLastSunday.setDate(lastSundayOfDecember.getDate() - 7);
    return secondLastSunday;
  };

  const getSundaysBeforeChristmas = (year) => {
    const result = [];
    const result1 = [];
    const result2 = [];
    const nextYear = pageYear + 1;

    // 1) Nedelja u periodu 1–6. januar tekuce godine
    for (let d = 1; d <= 6; d++) {
      const date = new Date(pageYear, 0, d);
      if (date.getDay() === 0) {
        date.setHours(0, 0, 0, 0);
        result1.push(date);
        break; // može biti samo jedna
      }
    }

    // 1) Nedelja u periodu 1–6. januar naredne godine
    for (let d = 1; d <= 6; d++) {
      const date = new Date(nextYear, 0, d);
      if (date.getDay() === 0) {
        date.setHours(0, 0, 0, 0);
        result2.push(date);
        break; // može biti samo jedna
      }
    }

    // 2) Poslednja nedelja u decembru tekuće godine
    const lastSunday = new Date(pageYear, 11, 31);
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    lastSunday.setHours(0, 0, 0, 0);

    //ako postoji januarska u tekucoj → dodaj
    if (result1.length !== 0) {
      result.push(result1[0]);
      return result;
    }

    // ako ne postoji januarska u narednoj → dodaj poslednju
    if (result2.length === 0) {
      result.push(lastSunday);
      return result;
    }
    return result;
  };

  const setPostDays = (dateInfo) => {
    const ts =
      typeof dateInfo === "number"
        ? dateInfo
        : new Date(dateInfo).setHours(0, 0, 0, 0);
    const {
      bozicniPostStartTs,
      bozicniPostEndTs,
      startEasterTs,
      endEasterTs,
      notPostSet,
      isPostSet,
    } = postLookup;

    if (ts >= bozicniPostStartTs || ts <= bozicniPostEndTs) return "post";
    if (ts >= startEasterTs && ts <= endEasterTs) return "post";

    const day = new Date(ts).getDay();
    if ((day === 3 || day === 5) && !notPostSet.has(ts)) return "post";
    if (isPostSet.has(ts)) return "post";

    return "";
  };
  // console.time("holidays calc");
  // console.time("holidays calc");
  // 1. holidays useMemo
  const holidays = useMemo(() => {
    if (pageMonth === undefined || pageMonth < 0 || !idsMonths[pageMonth]) {
      return [];
    }
    return filterHolidays();
  }, [pageYear, pageMonth, currentDate]);
  // console.timeEnd("holidays calc");
  function filterHolidays() {
    const secondSundayBeforeChristmas =
      getTargetSundayBeforeChristmas(pageYear);
    const sundaysBeforeChristmas = getSundaysBeforeChristmas(pageYear);

    let yearIndex = calendarYears[0].item_list.findIndex(
      (item) => item.title == pageYear,
    );
    //zadusnice-------------------------------------------------------------
    let zadusniceIndex = calendarYears[0].item_list[
      yearIndex
    ].tableNum.findIndex((item) => item[0] == pageMonth);

    let zadusniceDate = calendarYears[0].item_list[yearIndex].tableNum.find(
      (item) => item[0] === pageMonth,
    );
    //end---------------------------------------------------------------------

    //uskrs-------------------------------------------------------------------
    let setHol = news2
      .slice(idsMonths[pageMonth][0], idsMonths[pageMonth][1])
      .map((item) => ({ ...item })); // shallow copy po itemu
    //end---------------------------------------------------------------------

    // Dodavanje 29. februara za prestupnu godinu
    const isLeap =
      (pageYear % 4 === 0 && pageYear % 100 !== 0) || pageYear % 400 === 0;

    if (pageMonth === 1 && isLeap) {
      // Ubacujemo na poziciju 28 (29. dan)
      setHol.splice(28, 0, {
        title: ["Sveti mučenici Pamfil", "Porfirije i drugih deset mučenika"],
      });
    }

    let setHolTest = setHol.map((item, index) => {
      item.title = Array.isArray(item.title)
        ? item.title.map((item) => item)
        : [item.title];
      let date1 = new Date(pageYear, pageMonth, index + 1);
      item.date = date1;
      let currentDay2 = date1.getDay();
      let diffInDays = Math.round((easterDay - date1) / (1000 * 60 * 60 * 24)); // Razlika u danima

      if (zadusniceDate && zadusniceDate[1] === index + 1) {
        item.mainTitle = item.title;
        item.extraLabel = `Zadušnice ${calendarYears[0].zadusnice[zadusniceIndex]}`;
        item.extraLabelLink = "/zadusnice/";
        item.strongClass = "zadusniceStrong";
        item.separatorSymbol = " - ";
      }

      if (diffInDays >= -2 && diffInDays <= 6) {
        item.title = easterDays[easterDays.length - 3 - diffInDays];
        item.strongClass =
          currentDay2 === 3 || currentDay2 === 5
            ? "blackStrong"
            : diffInDays < 4
              ? "redStrong"
              : "blackStrong";
      } else if (diffInDays == -24) {
        item.mainTitle = item.title;
        item.extraLabel = "(Prepolovljenje)";
        item.strongClass = "blackStrong";
      } else if (diffInDays == -31) {
        item.mainTitle = item.title;
        item.extraLabel = "(Odanije Prepolovljenja)";
      } else if (diffInDays == -38) {
        item.mainTitle = item.title;
        item.extraLabel = "(Odanije Vaskrsa)";
      } else if (diffInDays == -39) {
        item.mainTitle = false;
        item.strongClass = "redStrong";
        item.extraLabel = "Vaznesenje Gospodnje - Spasovdan";
        item.separatorSymbol = "; ";
      } else if (diffInDays == -47) {
        item.mainTitle = item.title;
        item.extraLabel = "(Odanije Vaznesenja)";
      } else if (diffInDays == -49) {
        item.mainTitle = false;
        item.strongClass = "redStrong";
        item.extraLabel =
          "Silazak Svetog Duha na apostole - Pedesetnica - Trojice";
      } else if (diffInDays == -50) {
        item.mainTitle = false;
        item.strongClass = "redStrong";
        item.extraLabel = "Duhovski ponedeljak";
        item.separatorSymbol = "; ";
      } else if (diffInDays == -51) {
        item.mainTitle = false;
        item.strongClass = "redStrong";
        item.extraLabel = "Duhovski utorak";
        item.separatorSymbol = "; ";
      } else if (diffInDays == -55) {
        item.mainTitle = item.title;
        item.extraLabel = "(Odanije Pedesetnice)";
      } else if (diffInDays == -56) {
        item.mainTitle = item.title;
        item.extraLabel = "(Petrovske poklade)";
      } else if (diffInDays == -57) {
        item.mainTitle = item.title;
        item.extraLabel = "(Početak Petrovskog posta)";
      } else if (diffInDays == 48) {
        item.mainTitle = item.title;
        item.extraLabel = "(Početak Vaskršnjeg posta)";
      } else if (currentDay2 === 6 && diffInDays > 5 && diffInDays < 10) {
        item.mainTitle = item.title;
        item.extraLabel = "Lazareva subota (Vrbica)";
        item.separatorSymbol = "- ";
        item.slava = true;
      } else if (currentDay2 == 0 && diffInDays > 5 && diffInDays < 10) {
        item.title = "Ulazak Gospoda Isusa Hrista u Jerusalim - Cveti";
        item.slava = true;
        item.mainClass = "mainRedStrong";
        item.strongClass = "redStrong";
      } else if (currentDay2 === 3 && diffInDays > 15 && diffInDays < 20) {
        item.mainTitle = item.title;
        item.extraLabel = "(Prvo bdenije)";
      } else if (currentDay2 === 5 && diffInDays > 15 && diffInDays < 20) {
        item.mainTitle = item.title;
        item.extraLabel = "(Drugo bdenije)";
      } else if (currentDay2 === 1 && diffInDays > -10 && diffInDays < 0) {
        item.mainTitle = item.title;
        item.extraLabel = "Pobusani ponedeljak";
        item.separatorSymbol = "; ";
      } else if (currentDay2 === 5 && diffInDays > -8 && diffInDays < 2) {
        item.mainTitle = item.title;
        item.extraLabel = "Istočni petak";
        item.separatorSymbol = "; ";
      } else if (currentDay2 === 6 && diffInDays < 50 && diffInDays > 40) {
        item.mainTitle = item.title;
        item.extraLabel = "Teodorova subota";
        item.separatorSymbol = "; ";
      } else if (currentDay2 === 0 && diffInDays < 60 && diffInDays > 50) {
        item.mainTitle = item.title;
        item.extraLabel = "(Mesne poklade)";
        item.strongClass = "blackStrong";
        item.separatorSymbol = " ";
      } else if (currentDay2 === 0 && diffInDays < 50 && diffInDays > 45) {
        item.mainTitle = item.title;
        item.extraLabel = "(Bele poklade)";
        item.strongClass = "blackStrong";
        item.separatorSymbol = " ";
      }

      //Materice, Oci
      if (
        toMidnightTs(item.date) === toMidnightTs(secondSundayBeforeChristmas)
      ) {
        item.mainTitle = item.title;
        item.extraLabel = "Materice";
        item.strongClass = "blackStrong";
        item.separatorSymbol = " - ";
      }
      // Nedelja pred Božić
      if (
        sundaysBeforeChristmas.some((d) => d.getTime() === item.date.getTime())
      ) {
        item.mainTitle = item.title;
        item.extraLabel = "Oci (Paterice)";
        item.strongClass = "blackStrong";
        item.separatorSymbol = " - ";
      }
      item.post = setPostDays(item.date.getTime());
      if (
        currentDate &&
        toMidnightTs(item.date) === toMidnightTs(currentDate)
      ) {
        item.today = " today";
      }
      return item;
    });

    return setHolTest;
  }

  // 3. todayHoliday — null check
  const todayHoliday = useMemo(
    () =>
      currentDate
        ? holidays.find(
            (h) => toMidnightTs(h.date) === toMidnightTs(currentDate),
          )
        : null,
    [holidays, currentDate],
  );

  return (
    <CalendarContext.Provider
      value={{
        yearIndex,
        easterDay,
        holidays,
        postLookup,
        setPostDays,
        todayHoliday,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
