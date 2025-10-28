// {
//   "date": [1, 27],
//   "title": "Prepodobni Avksentije i Sveti Kiril slovenski – Ćirilovdan (ako pada u Veliki post, pomera se na nedelju siropusnu)"
// },
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import data from "../all__news";
import { calendarYears, daysIsNotPost, daysIsPost, easterDays, idsMonths, manualDateEaster, monthSerb } from "../components/Calendar/calendar-data/calendar-data";
import { renderTitleSection } from "./utility";
import news2 from "../components/Calendar/calendar-data/all__news4.json";
const IdContext = createContext();

export const useIdContext = () => useContext(IdContext);

export const IdProvider = ({ children }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const { slug, id } = useParams();

  const isYear = Number(slug) || currentDate.getFullYear();
  const isMonth = id ? monthSerb.indexOf(id) : currentDate.getMonth();
  const [isEasterDay, setIsEasterDay] = useState("");

  useEffect(() => {
    setHolidays(filterHolidays);
  }, [isYear, isMonth, slug, id]);

  let easter = isYear - 2020;
  let easterDay = new Date(`${isYear}-${manualDateEaster[easter]}`);
  const easterDate = new Date(easterDay);
  const endEasterDate = new Date(easterDate);
  endEasterDate.setDate(easterDate.getDate() - 1);

  const startEasterDate = new Date(easterDate);
  startEasterDate.setDate(easterDate.getDate() - 49);

  const endBelaNedelja = new Date(easterDate);
  endBelaNedelja.setDate(easterDate.getDate() + 7);

  const startPetrovskiPost = new Date(easterDate);
  startPetrovskiPost.setDate(easterDate.getDate() + 57);

  const endPetrovskiPost = new Date(isYear, 6, 12);

  const startGospojinskiPost = new Date(isYear, 7, 14);
  const endGospojinskiPost = new Date(isYear, 7, 27);

  const setPostDays = (dateInfo, diffInDays) => {
    // console.log("ITEM calendar", dateInfo.date);
    let setDateFromDateInfo = new Date(dateInfo);
    //start - Bozic i Bozicni post
    let bozicniPostStart = new Date(isYear, 10, 28);
    let bozicniPostEnd = new Date(isYear, 0, 6);
    let vikendPosleBozica = new Date(isYear, 0, 17);
    let notPost = daysIsNotPost.map((item) => new Date(isYear, item[0], item[1]).setHours(0, 0, 0, 0));
    let isPost = daysIsPost.map((item) => new Date(isYear, item[0], item[1]).setHours(0, 0, 0, 0));
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
      setDateFromDateInfo < endPetrovskiPost &&
      startPetrovskiPost <= setDateFromDateInfo
    ) {
      return "post";
    } else if (
      //Gospojinski post
      setDateFromDateInfo <= endGospojinskiPost &&
      startGospojinskiPost <= setDateFromDateInfo
    ) {
      return "post";
    } else if (setDateFromDateInfo <= vikendPosleBozica) {
      //Bela nedelja
      return "";
    } else if (setDateFromDateInfo > easterDate && setDateFromDateInfo <= endBelaNedelja) {
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

  const [holidays, setHolidays] = useState(filterHolidays);

  function filterHolidays() {
    let yearIndex = calendarYears[0].item_list.findIndex((item) => item.title == isYear);
    //zadusnice-------------------------------------------------------------
    let zadusniceIndex = calendarYears[0].item_list[yearIndex].zadusnice.findIndex((item) => item[0] == isMonth);

    let zadusniceDate = calendarYears[0].item_list[yearIndex].zadusnice.find((item) => item[0] === isMonth);
    //end---------------------------------------------------------------------
    //uskrs-------------------------------------------------------------------
    let easter = isYear - 2020;
    let monthData = JSON.parse(JSON.stringify(news2));
    let setHol = monthData.slice(idsMonths[isMonth][0], idsMonths[isMonth][1]);
    //end---------------------------------------------------------------------
    let setHolTest = setHol.map((item, index) => {
      item.title = Array.isArray(item.title) ? item.title.map((item) => item) : [item.title];
      let setDate = new Date(isYear, isMonth, index);
      let currentDay2 = setDate.getDay();

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
            <strong style={{ color: "black", fontWeight: 600 }}>{calendarYears[0].zadusnice[zadusniceIndex]}</strong>
          </>
        );
      }

      let date1 = new Date(isYear, isMonth, index + 1);
      item.date = date1;
      let easterDay = new Date(`${isYear}-${manualDateEaster[easter]}`);
      setIsEasterDay(easterDay);
      let diffInDays = (easterDay - date1) / (1000 * 60 * 60 * 24); // Razlika u danima

      if (diffInDays >= -2 && diffInDays <= 6) {
        item.title = renderTitleSection({
          extraLabel: easterDays[easterDays.length - 3 - diffInDays],
          strongClass: currentDay2 === 3 || currentDay2 === 5 ? "blackStrong" : diffInDays < 4 ? "redStrong" : "blackStrong",
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
          extraLabel: "Vaznesenje Gospodnje – Spasovdan",
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
      item.post = setPostDays(item.date, diffInDays);
      return item;
    });

    return setHolTest;
  }

  return (
    <IdContext.Provider
      value={{
        data,
        id,
        slug,
        currentDate,
        currentYear,
        easterDay,
        isYear,
        isMonth,
        holidays,
        isEasterDay,
      }}
    >
      {children}
    </IdContext.Provider>
  );
};
