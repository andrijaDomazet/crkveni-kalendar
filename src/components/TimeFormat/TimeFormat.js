import React from "react";
import { useScriptContext } from "../../shared/ScriptProvider";

const months = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Jun",
  "Jul",
  "Avgust",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
];
const days = [
  "Nedelja",
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
  "Subota",
];

export default function TimeFormat({ timePost, classes }) {
  const { cyr } = useScriptContext();

  const e = new Date(timePost);
  const day = days[e.getDay()];
  const month = months[e.getMonth()];
  const date = e.getDate();
  const year = e.getFullYear();

  if (classes === "noDay") {
    return <>{" " + date}</>;
  } else if (classes === "before") {
    const beforeDate = new Date(new Date(timePost) - 1000 * 60 * 60 * 24 * 13);
    return <>{beforeDate.getDate()}</>;
  } else if (classes === "onlyDay") {
    return <>{cyr(days[new Date(timePost).getDay()].slice(0, 1))}</>;
  } else {
    return <>{cyr(`${day}, ${date}. ${month} ${year}.`)}</>;
  }
}
