import React from "react";

const setTime = (postTime, classes) => {
  var months = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Oktobar",
    "Novembar",
    "Decembar",
  ];
  var days = [
    "Nedelja",
    "Ponedeljak",
    "Utorak",
    "Sreda",
    "Četvrtak",
    "Petak",
    "Subota",
  ];
  let e = new Date(postTime);
  let day = days[e.getDay()];
  let month = months[e.getMonth()];
  let date = e.getDate();
  let year = e.getFullYear();
  if (classes === "noDay") {
    return <>{" " + date}</>;
  } else if (classes === "before") {
    let date = new Date(postTime);
    let beforeDate = date - 1000 * 60 * 60 * 24 * 13;
    beforeDate = new Date(beforeDate);
    let date2 = beforeDate.getDate();
    let month = months[beforeDate.getMonth()];
    return <>{date2}</>;
  } else if (classes === "onlyDay") {
    var date3 = new Date(postTime);
    return days[date3.getDay()].slice(0, 1);
  } else {
    return <>{day + ", " + date + ". " + month + " " + year + "."}</>;
  }
};

export default function TimeFormat(props) {
  return <>{setTime(props.timePost, props.classes)}</>;
}
