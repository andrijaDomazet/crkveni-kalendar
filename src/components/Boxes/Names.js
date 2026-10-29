// "use client";

// import "./Names.scss";
// import { muskaImena, zenskaImena } from "../../allSerbianNames";
// import { useScriptContext } from "../../shared/ScriptProvider";
// import { latinToCyrillic } from "../../shared/latinToCyrillic";

// const ImenoslovTabela = () => {
//   const { cyr, script } = useScriptContext();
//   const locale = script === "cyrillic" ? "sr-Cyrl" : "sr";

//   // Ako je ćirilica — konvertuj imena pre grupisanja
//   const aktivnaMuska =
//     script === "cyrillic"
//       ? muskaImena.map((ime) => latinToCyrillic(ime))
//       : muskaImena;

//   const aktivnaZenska =
//     script === "cyrillic"
//       ? zenskaImena.map((ime) => latinToCyrillic(ime))
//       : zenskaImena;

//   const imenaPoSlovima = aktivnaMuska.reduce((acc, ime) => {
//     const prvoSlovo = ime[0].toUpperCase();
//     if (!acc[prvoSlovo]) acc[prvoSlovo] = [];
//     acc[prvoSlovo].push(ime);
//     return acc;
//   }, {});

//   const imenaPoSlovima2 = aktivnaZenska.reduce((acc, ime) => {
//     const prvoSlovo = ime[0].toUpperCase();
//     if (!acc[prvoSlovo]) acc[prvoSlovo] = [];
//     acc[prvoSlovo].push(ime);
//     return acc;
//   }, {});

//   const abeceda = Object.keys(imenaPoSlovima).sort((a, b) =>
//     a.localeCompare(b, locale),
//   );
//   const abeceda2 = Object.keys(imenaPoSlovima2).sort((a, b) =>
//     a.localeCompare(b, locale),
//   );

//   return (
//     <div className="names">
//       <table
//         border="1"
//         cellPadding="8"
//         style={{ borderCollapse: "collapse", width: "100%" }}
//       >
//         <thead>
//           <tr>
//             <th>{cyr("Slovo")}</th>
//             <th>{cyr("Muška imena")}</th>
//           </tr>
//         </thead>
//         <tbody>
//           {abeceda.map((slovo) => (
//             <tr key={slovo}>
//               <td
//                 style={{
//                   fontWeight: "bold",
//                   width: "50px",
//                   textAlign: "center",
//                 }}
//               >
//                 {slovo}
//               </td>
//               <td>{imenaPoSlovima[slovo].join(", ")}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <table
//         border="1"
//         cellPadding="8"
//         style={{ borderCollapse: "collapse", width: "100%" }}
//       >
//         <thead>
//           <tr>
//             <th>{cyr("Slovo")}</th>
//             <th>{cyr("Ženska imena")}</th>
//           </tr>
//         </thead>
//         <tbody>
//           {abeceda2.map((slovo) => (
//             <tr key={slovo}>
//               <td
//                 style={{
//                   fontWeight: "bold",
//                   width: "50px",
//                   textAlign: "center",
//                 }}
//               >
//                 {slovo}
//               </td>
//               <td>{imenaPoSlovima2[slovo].join(", ")}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ImenoslovTabela;

"use client";

import "./Names.scss";
import { muskaImena, zenskaImena } from "../../allSerbianNames";
import { useScriptContext } from "../../shared/ScriptProvider";
import { latinToCyrillic } from "../../shared/latinToCyrillic";

const LATINICA = [
  "A",
  "B",
  "C",
  "Č",
  "Ć",
  "D",
  "Dž",
  "Đ",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Lj",
  "M",
  "N",
  "Nj",
  "O",
  "P",
  "R",
  "S",
  "Š",
  "T",
  "U",
  "V",
  "Z",
  "Ž",
];

const CIRILICA = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Ђ",
  "Е",
  "Ж",
  "З",
  "И",
  "Ј",
  "К",
  "Л",
  "Љ",
  "М",
  "Н",
  "Њ",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "Ћ",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Џ",
  "Ш",
];

const getPrvoSlovo = (ime) => {
  const dva = ime.slice(0, 2);
  if (["Lj", "Nj", "Dž"].includes(dva)) return dva;
  return ime[0].toUpperCase();
};

const grupisi = (imena) =>
  imena.reduce((acc, ime) => {
    const slovo = getPrvoSlovo(ime);
    if (!acc[slovo]) acc[slovo] = [];
    acc[slovo].push(ime);
    return acc;
  }, {});

const sortirajSlova = (slova, poredak) =>
  [...slova].sort((a, b) => {
    const ia = poredak.indexOf(a);
    const ib = poredak.indexOf(b);
    // slova kojih nema u azbuci (npr. Q, W, X, Y) idu na kraj
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

const TabelaImena = ({ naslov, grupe, slova, cyr }) => (
  <table
    border="1"
    cellPadding="8"
    style={{ borderCollapse: "collapse", width: "100%" }}
  >
    <thead>
      <tr>
        <th>{cyr("Slovo")}</th>
        <th>{cyr(naslov)}</th>
      </tr>
    </thead>
    <tbody>
      {slova.map((slovo) => (
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
          <td>{grupe[slovo].join(", ")}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ImenoslovTabela = () => {
  const { cyr, script } = useScriptContext();
  const jeCirilica = script === "cyrillic";

  const aktivnaMuska = jeCirilica
    ? muskaImena.map((ime) => latinToCyrillic(ime))
    : muskaImena;

  const aktivnaZenska = jeCirilica
    ? zenskaImena.map((ime) => latinToCyrillic(ime))
    : zenskaImena;

  const poredak = jeCirilica ? CIRILICA : LATINICA;

  const muskaPoSlovima = grupisi(aktivnaMuska);
  const zenskaPoSlovima = grupisi(aktivnaZenska);

  const muskaSlova = sortirajSlova(Object.keys(muskaPoSlovima), poredak);
  const zenskaSlova = sortirajSlova(Object.keys(zenskaPoSlovima), poredak);

  return (
    <div className="names">
      <TabelaImena
        naslov="Muška imena"
        grupe={muskaPoSlovima}
        slova={muskaSlova}
        cyr={cyr}
      />
      <TabelaImena
        naslov="Ženska imena"
        grupe={zenskaPoSlovima}
        slova={zenskaSlova}
        cyr={cyr}
      />
    </div>
  );
};

export default ImenoslovTabela;
