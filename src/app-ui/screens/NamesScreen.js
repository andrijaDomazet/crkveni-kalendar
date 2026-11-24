"use client";
import { useMemo, useState } from "react";
import PageArticleScreen from "../article/PageArticleScreen";
import SegmentedControl from "./SegmentedControl";
import { muskaImena, zenskaImena } from "../../allSerbianNames";
import { useScriptContext } from "../../shared/ScriptProvider";

const ORDER = [
  "A", "B", "V", "G", "D", "Đ", "E", "Ž", "Z", "I", "J", "K", "L", "Lj", "M",
  "N", "Nj", "O", "P", "R", "S", "T", "Ć", "U", "F", "H", "C", "Č", "Dž", "Š",
];

const firstLetter = (name) =>
  ["Lj", "Nj", "Dž"].includes(name.slice(0, 2))
    ? name.slice(0, 2)
    : name[0].toUpperCase();

const rank = (letter) => {
  const index = ORDER.indexOf(letter);
  return index === -1 ? 999 : index;
};

function groupNames(names) {
  const groups = {};
  names.forEach((name) => {
    (groups[firstLetter(name)] ??= []).push(name);
  });
  return Object.keys(groups)
    .sort((a, b) => rank(a) - rank(b))
    .map((letter) => ({ letter, names: groups[letter] }));
}

function NamesList() {
  const { cyr } = useScriptContext();
  const [kind, setKind] = useState("male");

  const male = useMemo(() => groupNames(muskaImena), []);
  const female = useMemo(() => groupNames(zenskaImena), []);
  const groups = kind === "male" ? male : female;

  return (
    <div className="app-names">
      <SegmentedControl
        label={cyr("Imena")}
        value={kind}
        onChange={setKind}
        options={[
          { value: "male", label: cyr("Muška imena") },
          { value: "female", label: cyr("Ženska imena") },
        ]}
      />
      {groups.map((group) => (
        <section key={group.letter} className="app-datalist">
          <h3>{cyr(group.letter)}</h3>
          <p className="app-names__list">
            {group.names.map((name) => cyr(name)).join(", ")}
          </p>
        </section>
      ))}
    </div>
  );
}

export default function NamesScreen() {
  return (
    <PageArticleScreen slug="imenoslov">
      <NamesList />
    </PageArticleScreen>
  );
}
