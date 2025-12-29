// {
//   "date": [1, 27],
//   "title": "Prepodobni Avksentije i Sveti Kiril slovenski – Ćirilovdan (ako pada u Veliki post, pomera se na nedelju siropusnu)"
// },
import React, { useMemo } from "react";
import { createContext, useContext } from "react";
import { Link, useParams } from "react-router-dom";
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
import { renderTitleSection } from "./utility";
import news2 from "../components/Calendar/calendar-data/all__news4.json";
const IdContext = createContext();

export const useIdContext = () => useContext(IdContext);

export const IdProvider = ({ children }) => {
  const currentDate = new Date();
  let currentDay = currentDate.getDate();
  let dayName = days[currentDate.getDay()];
  const monthName = monthSerb[currentDate.getMonth()];
  let todayHoliday;
  // --- AUTO RELOAD KADA SE PROMENI DAN ---
  React.useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    // Inicijalno postavljanje ako ne postoji
    const last = localStorage.getItem("lastReloadDay");
    if (!last) {
      localStorage.setItem("lastReloadDay", today);
    }

    const check = () => {
      if (document.visibilityState !== "visible") return;

      const now = new Date().toISOString().slice(0, 10);
      const stored = localStorage.getItem("lastReloadDay");

      if (now !== stored) {
        localStorage.setItem("lastReloadDay", now);
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", check);
    const interval = setInterval(check, 30000);

    return () => {
      document.removeEventListener("visibilitychange", check);
      clearInterval(interval);
    };
  }, []);
  // --- END AUTO RELOAD ---

  const currentYear = currentDate.getFullYear();

  const { slug, id } = useParams();
  // console.log("Slug2", slug);
  const isYear = Number(slug) || currentDate.getFullYear();
  let yearIndex = calendarYears[0].item_list.findIndex(
    (item) => item.title == isYear
  );
  const isMonth = id ? monthSerb.indexOf(id) : currentDate.getMonth();

  const easterDay = useMemo(
    () => new Date(`${isYear}-${manualDateEaster[isYear - 2020]}`),
    [isYear]
  );

  const easterDate = new Date(easterDay);
  const endEasterDate = new Date(easterDate);
  endEasterDate.setDate(easterDate.getDate() - 1);
  const startEasterDate = new Date(easterDate);
  startEasterDate.setDate(easterDate.getDate() - 48);

  // helper koji vrati timestamp u ponoć
  const toTs = (y, m, d) => new Date(y, m, d).setHours(0, 0, 0, 0);

  const postLookup = useMemo(() => {
    // fiksne granice
    const bozicniPostStartTs = toTs(isYear, 10, 28);
    const bozicniPostEndTs = toTs(isYear, 0, 6);
    const vikendPosleBozicaTs = toTs(isYear, 0, 17);

    const easterTs = toTs(
      easterDay.getFullYear(),
      easterDay.getMonth(),
      easterDay.getDate()
    );
    const startEasterTs = toTs(
      easterDay.getFullYear(),
      easterDay.getMonth(),
      easterDay.getDate() - 48
    );
    const endEasterTs = toTs(
      easterDay.getFullYear(),
      easterDay.getMonth(),
      easterDay.getDate() - 1
    );

    // set-ovi za eksplicitne datume iz daysIsNotPost i daysIsPost
    const notPostSet = new Set(
      daysIsNotPost.map(([m, d]) => toTs(isYear, m, d))
    );
    const isPostSet = new Set(daysIsPost.map(([m, d]) => toTs(isYear, m, d)));

    // Petrovski post granice ts
    const startPetrovskiPostTs = (() => {
      const d = new Date(easterTs);
      d.setDate(d.getDate() + 57);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })();
    const endPetrovskiPostTs = toTs(isYear, 6, 12);

    // Gospojinski post
    const startGospojinskiPostTs = toTs(isYear, 7, 14);
    const endGospojinskiPostTs = toTs(isYear, 7, 27);

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
  }, [isYear, easterDay]);

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
    if (ts > easterTs && ts <= endBelaNedeljaTs) return "";
    // 6) Sreda ili petak (3 ili 5) osim ako je u notPostSet
    const day = new Date(ts).getDay();
    if ((day === 3 || day === 5) && !notPostSet.has(ts)) return "post";
    // 7) Explicitne postovanjske datume iz isPostSet
    if (isPostSet.has(ts)) return "post";
    // 8) Default
    return "";
  };
  const getTargetSundayBeforeChristmas = (year) => {
    // broj nedelja (Sunday) u periodu 1–6. januar naredne godine
    const nextYear = isYear + 1;
    let sundayCount = 0;

    for (let d = 1; d <= 6; d++) {
      const date = new Date(nextYear, 0, d);
      if (date.getDay() === 0) sundayCount++;
    }

    // poslednja i pretposlednja nedelja u decembru tekuće godine
    const lastSundayOfDecember = (() => {
      const d = new Date(isYear, 11, 31);
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
    const nextYear = isYear + 1;

    // 1) Nedelja u periodu 1–6. januar tekuce godine
    for (let d = 1; d <= 6; d++) {
      const date = new Date(isYear, 0, d);
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
    const lastSunday = new Date(isYear, 11, 31);
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

    // ako ne postoji → dodaj pretposlednju
    // const secondLastSunday = new Date(lastSunday);
    // secondLastSunday.setDate(lastSunday.getDate() - 7);
    // secondLastSunday.setHours(0, 0, 0, 0);

    // result.push(secondLastSunday);
    return result;
  };

  const holidays = useMemo(() => filterHolidays(), [isYear, isMonth]);

  function filterHolidays() {
    const secondSundayBeforeChristmas = getTargetSundayBeforeChristmas(isYear);
    const sundaysBeforeChristmas = getSundaysBeforeChristmas(isYear);

    console.log("sundayBeforeChristmas", sundaysBeforeChristmas);

    let yearIndex = calendarYears[0].item_list.findIndex(
      (item) => item.title == isYear
    );
    //zadusnice-------------------------------------------------------------
    let zadusniceIndex = calendarYears[0].item_list[
      yearIndex
    ].tableNum.findIndex((item) => item[0] == isMonth);

    let zadusniceDate = calendarYears[0].item_list[yearIndex].tableNum.find(
      (item) => item[0] === isMonth
    );
    //end---------------------------------------------------------------------

    //uskrs-------------------------------------------------------------------
    // console.log("isMonth idProvider", id, isMonth);
    let setHol = news2
      .slice(idsMonths[isMonth][0], idsMonths[isMonth][1])
      .map((item) => ({ ...item })); // shallow copy po itemu
    //end---------------------------------------------------------------------

    // Dodavanje 29. februara za prestupnu godinu
    const isLeap =
      (isYear % 4 === 0 && isYear % 100 !== 0) || isYear % 400 === 0;

    if (isMonth === 1 && isLeap) {
      // Ubacujemo na poziciju 28 (29. dan)
      setHol.splice(28, 0, {
        title: ["Sveti mučenici Pamfil", "Porfirije i drugih deset mučenika"],
      });
    }

    let setHolTest = setHol.map((item, index) => {
      item.title = Array.isArray(item.title)
        ? item.title.map((item) => item)
        : [item.title];
      let date1 = new Date(isYear, isMonth, index + 1);
      item.date = date1;
      let currentDay2 = date1.getDay();
      let diffInDays = Math.round((easterDay - date1) / (1000 * 60 * 60 * 24)); // Razlika u danima

      // console.log("Sunday", item.date.setHours(0, 0, 0, 0)===targetSunday.setHours(0, 0, 0, 0));

      if (zadusniceDate && zadusniceDate[1] === index + 1) {
        item.title = (
          <>
            {Array.isArray(item.title)
              ? item.title.map((el, index) => (
                  <React.Fragment key={index}>
                    <>{el}</>
                    {index !== item.title.length - 1 ? "; " : ""}
                  </React.Fragment>
                ))
              : item.title}{" "}
            -{" "}
            <Link to="/zadusnice/" className="zadusniceStrong">
              Zadušnice
            </Link>{" "}
            <strong style={{ color: "black", fontWeight: 600 }}>
              {calendarYears[0].zadusnice[zadusniceIndex]}
            </strong>
          </>
        );
      }

      if (diffInDays >= -2 && diffInDays <= 6) {
        item.title = renderTitleSection({
          extraLabel: easterDays[easterDays.length - 3 - diffInDays],
          strongClass:
            currentDay2 === 3 || currentDay2 === 5
              ? "blackStrong"
              : diffInDays < 4
              ? "redStrong"
              : "blackStrong",
        });
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
          extraLabel: "Vaznesenje Gospodnje - Spasovdan",
        });
      } else if (diffInDays == -47) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Odanije Vaznesenja)",
        });
      } else if (diffInDays == -49) {
        item.title = renderTitleSection({
          mainTitle: false,
          strongClass: "redStrong",
          extraLabel: "Silazak Svetog Duha na apostole - Pedesetnica - Trojice",
        });
      } else if (diffInDays == -50) {
        item.title = renderTitleSection({
          mainTitle: false,
          strongClass: "redStrong",
          extraLabel: "Duhovski ponedeljak",
        });
      } else if (diffInDays == -51) {
        item.title = renderTitleSection({
          mainTitle: false,
          strongClass: "redStrong",
          extraLabel: "Duhovski utorak",
        });
      } else if (diffInDays == -55) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Odanije Pedesetnice)",
        });
      } else if (diffInDays == -56) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Petrovske poklade)",
        });
      } else if (diffInDays == -57) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Početak Petrovskog posta)",
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
          extraLabel: "Ulazak Gospoda Isusa Hrista u Jerusalim - Cveti",
          slavaSymbol: true,
          strongClass: "redStrong",
        });
      } else if (currentDay2 === 3 && diffInDays > 15 && diffInDays < 20) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "(Prvo bdenije)",
        });
      } else if (currentDay2 === 5 && diffInDays > 15 && diffInDays < 20) {
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

      // else if (currentDay2 === 0) {
      //   item.title = renderTitleSection({
      //     mainTitle: item.title,
      //     extraLabel: "Istočni petak",
      //     separatorSymbol: "; ",
      //   });
      // }

      if (
        item.date.setHours(0, 0, 0, 0) ===
        secondSundayBeforeChristmas.setHours(0, 0, 0, 0)
      ) {
        console.log("targetSunday", secondSundayBeforeChristmas);
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "Materice",
          strongClass: "blackStrong",
          separatorSymbol: " - ",
        });
      }
      // Nedelja pred Božić
      if (
        sundaysBeforeChristmas.some((d) => d.getTime() === item.date.getTime())
      ) {
        item.title = renderTitleSection({
          mainTitle: item.title,
          extraLabel: "Oci (Paterice)",
          strongClass: "blackStrong",
          separatorSymbol: " - ",
        });
      }

      item.post = setPostDays(item.date.getTime());
      // console.log("Current date",currentDate,item.date);
      if (currentDate.setHours(0, 0, 0, 0) === item.date.setHours(0, 0, 0, 0)) {
        item.today = " today";
        todayHoliday = item;
      }
      return item;
    });

    return setHolTest;
  }
  // console.log("Today holiday", todayHoliday);

  return (
    <IdContext.Provider
      value={{
        // data,
        dayName,
        id,
        slug,
        currentDate,
        currentDay,
        monthName,
        currentYear,
        easterDay,
        isYear,
        yearIndex,
        isMonth,
        holidays,
        todayHoliday,
      }}
    >
      {children}
    </IdContext.Provider>
  );
};
