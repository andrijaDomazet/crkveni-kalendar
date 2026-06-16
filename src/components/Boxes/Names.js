import React from "react";
import "./Names.scss";
import { muskaImena, zenskaImena } from "../../allSerbianNames";
import { useScriptContext } from "../../shared/ScriptProvider";
import { latinToCyrillic } from "../../shared/latinToCyrillic";

const ImenoslovTabela = () => {
  const { cyr, cyrHtml, script } = useScriptContext();
  const locale = script === "cyrillic" ? "sr-Cyrl" : "sr";

  // Ako je ćirilica — konvertuj imena pre grupisanja
  const aktivnaMuska =
    script === "cyrillic"
      ? muskaImena.map((ime) => latinToCyrillic(ime))
      : muskaImena;

  const aktivnaZenska =
    script === "cyrillic"
      ? zenskaImena.map((ime) => latinToCyrillic(ime))
      : zenskaImena;

  const imenaPoSlovima = aktivnaMuska.reduce((acc, ime) => {
    const prvoSlovo = ime[0].toUpperCase();
    if (!acc[prvoSlovo]) acc[prvoSlovo] = [];
    acc[prvoSlovo].push(ime);
    return acc;
  }, {});

  const imenaPoSlovima2 = aktivnaZenska.reduce((acc, ime) => {
    const prvoSlovo = ime[0].toUpperCase();
    if (!acc[prvoSlovo]) acc[prvoSlovo] = [];
    acc[prvoSlovo].push(ime);
    return acc;
  }, {});

  const abeceda = Object.keys(imenaPoSlovima).sort((a, b) =>
    a.localeCompare(b, locale),
  );
  const abeceda2 = Object.keys(imenaPoSlovima2).sort((a, b) =>
    a.localeCompare(b, locale),
  );

  return (
    <div className="names">
      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>{cyr("Slovo")}</th>
            <th>{cyr("Muška imena")}</th>
          </tr>
        </thead>
        <tbody>
          {abeceda.map((slovo) => (
            <tr key={slovo}>
              <td
                style={{
                  fontWeight: "bold",
                  width: "50px",
                  textAlign: "center",
                }}
              >
                {slovo}
              </td>
              <td>{imenaPoSlovima[slovo].join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>{cyr("Slovo")}</th>
            <th>{cyr("Ženska imena")}</th>
          </tr>
        </thead>
        <tbody>
          {abeceda2.map((slovo) => (
            <tr key={slovo}>
              <td
                style={{
                  fontWeight: "bold",
                  width: "50px",
                  textAlign: "center",
                }}
              >
                {slovo}
              </td>
              <td>{imenaPoSlovima2[slovo].join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImenoslovTabela;
