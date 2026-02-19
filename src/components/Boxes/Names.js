import React from "react";
import "./Names.scss";
import { muskaImena, zenskaImena } from "../../allSerbianNames";

// Ovde ubaciš sve muška ili ženska imena u jedan niz
const svaImena = [
  "Avakum","Avram","Adam","Aksentije","Aleksa","Aleksandar","Alimpije","Anđelko","Andrija","Antonije",
  "Balša","Bane","Batrić","Berislav","Beriša","Berko","Blagoje","Blagomir","Blagota","Blažo",
  "Vajo","Vasilije","Vasilj","Vekoslav","Velibor","Velizar","Velimir","Velisav","Veličko","Veljko"
  // nastavi sa svim ostalim imenima...
];

const ImenoslovTabela = () => {
  // Grupisanje imena po prvom slovu
  const imenaPoSlovima = muskaImena.reduce((acc, ime) => {
    const prvoSlovo = ime[0].toUpperCase();
    if (!acc[prvoSlovo]) acc[prvoSlovo] = [];
    acc[prvoSlovo].push(ime);
    return acc;
  }, {});
  const imenaPoSlovima2 = zenskaImena.reduce((acc, ime) => {
    const prvoSlovo = ime[0].toUpperCase();
    if (!acc[prvoSlovo]) acc[prvoSlovo] = [];
    acc[prvoSlovo].push(ime);
    return acc;
  }, {});

  // Sortiranje abecede po srpskom poretku
  const abeceda = Object.keys(imenaPoSlovima).sort((a, b) => a.localeCompare(b, 'sr'));
  const abeceda2 = Object.keys(imenaPoSlovima2).sort((a, b) => a.localeCompare(b, 'sr'));

  return (
    <div className="names">
      {/* <h1>Imenoslov</h1> */}
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Slovo</th>
            <th>Muška imena</th>
          </tr>
        </thead>
        <tbody>
          {abeceda.map(slovo => (
            <tr key={slovo}>
              <td style={{ fontWeight: "bold", width: "50px", textAlign: "center" }}>{slovo}</td>
              <td>{imenaPoSlovima[slovo].join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Slovo</th>
            <th>Ženska imena</th>
          </tr>
        </thead>
        <tbody>
          {abeceda2.map(slovo => (
            <tr key={slovo}>
              <td style={{ fontWeight: "bold", width: "50px", textAlign: "center" }}>{slovo}</td>
              <td>{imenaPoSlovima2[slovo].join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImenoslovTabela;
