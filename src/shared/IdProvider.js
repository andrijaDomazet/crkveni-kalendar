// {
//   "date": [1, 27],
//   "title": "Prepodobni Avksentije i Sveti Kiril slovenski – Ćirilovdan (ako pada u Veliki post, pomera se na nedelju siropusnu)"
// },
import React, { useMemo } from "react";
import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
// import data from "../all__news";
import {
  calendarYears,
  daysIsNotPost,
  daysIsPost,
  easterDays,
  idsMonths,
  manualDateEaster,
  monthSerb,
  days,
} from "../components/Calendar/calendar-data/calendar-data";
import news2 from "../components/Calendar/calendar-data/all__news4.json";
import { toMidnightTs } from "./utility";
const IdContext = createContext();

export const useIdContext = () => useContext(IdContext);

export const IdProvider = ({ children }) => {
  const currentDate = new Date();
  // console.log("currentDate", currentDate);

  let currentDay = currentDate.getDate();
  // console.log("currentDay", currentDay);

  let dayName = days[currentDate.getDay()];
  const monthName = monthSerb[currentDate.getMonth()];
  // let todayHoliday;

  // // --- AUTO RELOAD KADA SE PROMENI DAN ---
  // React.useEffect(() => {
  //   const today = new Date().toISOString().slice(0, 10);

  //   // Inicijalno postavljanje ako ne postoji
  //   const last = localStorage.getItem("lastReloadDay");
  //   if (!last) {
  //     localStorage.setItem("lastReloadDay", today);
  //   }

  //   const check = () => {
  //     if (document.visibilityState !== "visible") return;

  //     const now = new Date().toISOString().slice(0, 10);
  //     const stored = localStorage.getItem("lastReloadDay");

  //     if (now !== stored) {
  //       localStorage.setItem("lastReloadDay", now);
  //       window.location.reload();
  //     }
  //   };

  //   document.addEventListener("visibilitychange", check);
  //   const interval = setInterval(check, 30000);

  //   return () => {
  //     document.removeEventListener("visibilitychange", check);
  //     clearInterval(interval);
  //   };
  // }, []);
  // // --- END AUTO RELOAD ---

  const currentYear = currentDate.getFullYear();

  const { slug, id } = useParams();
  const pageYear = Number(slug) || currentDate.getFullYear();
  let yearIndex = calendarYears[0].item_list.findIndex(
    (item) => item.title == pageYear,
  );
  const pageMonth = id ? monthSerb.indexOf(id) : currentDate.getMonth();

  const easterDay = useMemo(
    () => new Date(`${pageYear}-${manualDateEaster[pageYear - 2020]}`),
    [pageYear],
  );
  const petrovPostStartDate = useMemo(() => {
    const d = new Date(easterDay);
    d.setDate(d.getDate() + 57);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [easterDay]);

  const easterDate = new Date(easterDay);
  const endEasterDate = new Date(easterDate);
  endEasterDate.setDate(easterDate.getDate() - 1);
  const startEasterDate = new Date(easterDate);
  startEasterDate.setDate(easterDate.getDate() - 48);
  console.log("Start", startEasterDate);

  // helper koji vrati timestamp u ponoć
  const toTs = (y, m, d) => new Date(y, m, d).setHours(0, 0, 0, 0);

  const postLookup = useMemo(() => {
    // fiksne granice
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
    let e = new Date(startEasterDate);
    // console.log("startEasterTs", postLookup);

    const endEasterTs = toTs(
      easterDay.getFullYear(),
      easterDay.getMonth(),
      easterDay.getDate() - 1,
    );

    // set-ovi za eksplicitne datume iz daysIsNotPost i daysIsPost
    const notPostSet = new Set(
      daysIsNotPost.map(([m, d]) => toTs(pageYear, m, d)),
    );
    const isPostSet = new Set(daysIsPost.map(([m, d]) => toTs(pageYear, m, d)));

    // Petrovski post granice ts
    const startPetrovskiPostTs = (() => {
      const d = new Date(easterTs);
      d.setDate(d.getDate() + 57);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })();
    const endPetrovskiPostTs = toTs(pageYear, 6, 12);

    // Gospojinski post
    const startGospojinskiPostTs = toTs(pageYear, 7, 14);
    const endGospojinskiPostTs = toTs(pageYear, 7, 27);

    // Nedelja bludnog sin (pre poceka Uskrsnjeg posta)
    const startNedeljaBludnogSinaTs = (() => {
      const d = new Date(easterTs);
      d.setDate(d.getDate() - 70);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })();
    const endNedeljaBludnogSinaTs = (() => {
      const d = new Date(easterTs);
      d.setDate(d.getDate() - 63);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })();

    // Bela nedelja (posle Uskrsa)
    const endBelaNedeljaTs = (() => {
      const d = new Date(easterTs);
      d.setDate(d.getDate() + 7);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })();

    return {
      bozicniPostStartTs,
      bozicniPostEndTs,
      vikendPosleBozicaTs,
      startNedeljaBludnogSinaTs,
      endNedeljaBludnogSinaTs,
      easterTs,
      startEasterTs: startEasterTs,
      endEasterTs: endEasterTs,
      endBelaNedeljaTs,
      startPetrovskiPostTs,
      endPetrovskiPostTs,
      startGospojinskiPostTs,
      endGospojinskiPostTs,
      notPostSet,
      isPostSet,
    };
  }, [pageYear, easterDay]);
  // console.log("startEasterTs", postLookup.startEasterTs);
  const setPostDays = (dateInfo) => {
    // Pretvori ulaz u timestamp ponoć
    const ts =
      typeof dateInfo === "number"
        ? dateInfo
        : new Date(dateInfo).setHours(0, 0, 0, 0);

    const {
      bozicniPostStartTs,
      bozicniPostEndTs,
      vikendPosleBozicaTs,
      startNedeljaBludnogSinaTs,
      endNedeljaBludnogSinaTs,
      easterTs,
      startEasterTs,
      endEasterTs,
      endBelaNedeljaTs,
      startPetrovskiPostTs,
      endPetrovskiPostTs,
      startGospojinskiPostTs,
      endGospojinskiPostTs,
      notPostSet,
      isPostSet,
    } = postLookup;

    // 1) Božićni post (zima)
    if (ts >= bozicniPostStartTs || ts <= bozicniPostEndTs) return "post";
    // 2) Uskršnji post
    if (ts >= startEasterTs && ts <= endEasterTs) return "post";
    // 3) Petrovski post
    if (ts >= startPetrovskiPostTs && ts < endPetrovskiPostTs) return "post";
    // 4) Gospojinski post
    if (ts >= startGospojinskiPostTs && ts <= endGospojinskiPostTs)
      return "post";
    // 5) Bela nedelja (posle Uskrsa) i vikend posle Božića -> ne-post
    if (ts <= vikendPosleBozicaTs) return "";
    if (ts > startNedeljaBludnogSinaTs && ts <= endNedeljaBludnogSinaTs)
      return "";
    if (ts > easterTs && ts <= endBelaNedeljaTs) return "";

    // 6) Sreda ili petak (3 ili 5) osim ako je u notPostSet
    const day = new Date(ts).getDay();
    if ((day === 3 || day === 5) && !notPostSet.has(ts)) return "post";
    // 7) Datumi iz isPostSet
    if (isPostSet.has(ts)) return "post";
    // 8) Default
    return "";
  };
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

  const holidays = useMemo(() => filterHolidays(), [pageYear, pageMonth]);

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
      if (toMidnightTs(item.date) === toMidnightTs(currentDate)) {
        item.today = " today";
      }
      return item;
    });

    return setHolTest;
  }
  const todayTs = new Date().setHours(0, 0, 0, 0);

  const todayHoliday = useMemo(() => {
    return holidays?.find(
      (item) =>
        item?.date && new Date(item.date).setHours(0, 0, 0, 0) === todayTs,
    );
  }, [holidays]);

  return (
    <IdContext.Provider
      value={{
        //IdProvider
        id,
        slug,
        currentDate,
        pageYear,
        pageMonth,
        holidays,

        //Other
        dayName,
        currentDay,
        monthName,
        currentYear,
        easterDay,
        startEasterTs: postLookup.startEasterTs,
        endEasterTs: postLookup.endEasterTs,
        yearIndex,
        todayHoliday,
        petrovPostStartDate,
      }}
    >
      {children}
    </IdContext.Provider>
  );
};
