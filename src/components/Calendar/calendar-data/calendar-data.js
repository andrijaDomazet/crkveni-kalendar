export const days = [
  "Nedelja",
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
  "Subota",
];
export const monthSerb = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];
export const importantHolidaysPerMonth = [
  ["Božić (7.)", "Bogojavljanje (19.)", "Sveti Sava (27.)"],
  ["Sveti Trifun (14.)", "Sretenje (15.)"],
  ["Mladenci (22.)"],
  ["Blagovesti (7.)"],
  ["Đurđevdan (6.)", "Sveti Vasilije (12.)"],
  ["Vidovdan (28.)"],
  ["Petrovdan (12.)"],
  ["Preobraženje (19.)", "Velika Gospojina (28.)"],
  ["Mala Gospojina (21.)", "Krstovdan (27.)"],
  ["Sveta Petka (27.)", "Sveti Luka (31.)"],
  ["Mitrovdan (8.)", "Aranđelovdan (21.)"],
  ["Vavedenje Presvete Bogorodice (4.)", "Nikoljdan (19.)"],
];
export const zadusniceName = [
  "Zimske",
  "Letnje",
  "Miholjske",
  "Mitrovske (jesenje)",
];
export const idsMonths = [
  [0, 31],
  [31, 59],
  [59, 90], //mart
  [90, 120],
  [120, 151],
  [151, 181],
  [181, 212],
  [212, 243],
  [243, 273],
  [273, 304],
  [304, 334],
  [334, 365],
];

export const redDaysId = [
  7, 8, 9, 14, 19, 20, 27, 43, 46, 97, 126, 132, 144, 154, 179, 188, 193, 214,
  231, 240, 254, 264, 270, 300, 304, 312, 325, 338, 353,
];

export const blackDays = [
  "Sveti Ignjatije Bogonosac",
  "Badnjidan",
  "Krstovdan",
  "Časne verige Svetog apostola Petra",
  "Sveti Atanasije Veliki",
  "Sveti mučenik Trifun",
  "Sveti Simeon i Ana",
  "Sveti sveštenomučenik Haralampije",
  "Prepodobni Simeon Mirotočivi",
  "Sveti velikomučenik Teodor Tiron",
  "Svetih 40 mučenika Sevastijskih - Mladenci",
  "Sveti Aleksije Čovek Božji",
  "Sveti apostol i jevanđelist Marko - Markovdan",
  "Sveti prorok Jeremija",
  "Prenos moštiju Svetog oca Nikolaja",
  "Treće obretenje glave Svetog Jovana Krstitelja",
  "Sveti apostoli Vartolomej i Varnava",
  "Sveti prorok Jelisej",
  "Sveti prorok Amos",
  "Sveti mučenici i besrebrenici Kozma i Damjan",
  "Sveti velikomučenik Prokopije",
  "Ikona Presvete Bogorodice Trojeručice",
  "Sabor Svetog Arhangela Gavrila",
  "Sveta velikomučenica Marina - Ognjena Marija",
  "Sveti prorok Jezekilj",
  "Sveta Marija Magdalina - Blaga Marija",
  "Sveta prepodobnomučenica Paraskeva (Sveta Petka)",
  "Sveti velikomučenik Pantelejmon",
  "Sv. muč. Makaveji",
  "Sveti mučenik Agatonik",
  "Sveti mučenici Adrijan i Natalija",
  "Prenos moštiju svetog Aleksandra Nevskog",
  "Crkvena Nova godina",
  "Prepodobni Simeon Stolpnik",
  "Sveti pravedni bogoroditelji Joakim i Ana",
  "Svete mučenice Vera, Nada i Ljubav i majka im Sofija",
  "Sveti velikomučenik Jevstatije",
  "Začeće Svetog Jovana Preteče i Krstitelja",
  "Sveti apostol i jevanđelist Jovan Bogoslov",
  "Prepodobni Kirijak Otšelnik - Miholjdan",
  "Pokrov Presvete Bogorodice",
  "Sveti apostol Toma - Tomindan",
  "Sveti mučenici Sergije i Vakho - Srđevdan",
  "Sveti apostol i jevanđelist Luka - Lučindan",
  "Sveti apostol Jakov, prvi Episkop Jerusalimski",
  "Prep. Avramije Zatvornik",
  "Sveti Kozma i Damjan - Vračevi",
  "Obnovljenje hrama Svetog velikomučenika Georgija - Đurđic",
  "Sveti velikomučenik Mina",
  "Sveti Jovan Milostivi",
  "Sveti Jovan Zlatousti",
  "Patrijarh carigradski",
  "Sveti apostol Filip",
  "Sveti apostol i jevanđelist Matej",
  "Sveta velikomučenica Ekaterina",
  "Sveti sveštenomučenik Kliment",
  "Prepodobni Alimpije Stolpnik",
  "Sveti apostol Andrej Prvozvani",
  "Sveta velikomučenica Varvara",
  "Prepodobni Sava Osvećeni",
];

export const daysIsPost = [
  [0, 18],
  [8, 11],
  [8, 27],
];

export const daysIsNotPost = [
  [0, 7],
  [0, 19],
  // [1, 16],
  // [1, 18],
];
export const manualDateEaster = [
  "4-19",
  "5-2",
  "4-24",
  "4-16", //23
  "5-5", //24
  "4-20", //25
  "4-12", //26
  "5-2",
  "4-16",
];
export const calendarYears = [
  {
    item_list: [
      {
        title: 2022,
        route: "/2022",
        tableNum: [
          [1, 26],
          [5, 11],
          [9, 8],
          [10, 5],
        ],
        zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
      },
      {
        title: 2023,
        route: "/2023",
        tableNum: [
          [1, 18],
          [5, 3],
          [9, 7],
          [10, 4],
        ],
        zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
      },
      {
        title: 2024,
        route: "/2024",
        tableNum: [
          [2, 9],
          [5, 22],
          [9, 5],
          [10, 2],
        ],
        zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
      },
      {
        title: 2025,
        route: "/2025",
        tableNum: [
          [1, 22],
          [5, 7],
          [9, 11],
          [10, 1],
        ],
        zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
      },
      {
        title: 2026,
        route: "/2026",
        tableNum: [
          [1, 14],
          [4, 30],
          [9, 10],
          [10, 7],
        ],
        zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
      },
      {
        title: 2027,
        route: "/2027",
        tableNum: [
          [2, 6],
          [5, 19],
          [9, 9],
          [10, 6],
        ],
        zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
      },
      {
        title: 2028,
        route: "/2028",
        tableNum: [
          [1, 19],
          [5, 3],
          [9, 7],
          [10, 4],
        ],
        zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
      },
      // zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
    ],
    zadusnice: ["zimske", "letnje", "miholjske", "jesenje (mitrovske)"],
  },
  {
    tableNum: [
      [10, 28],
      [5, 3],
      [9, 7],
      [10, 4],
    ],
    zadusnice: [
      "Božićni post",
      "Vaskršnji post",
      "Petrovski post",
      "Gospojinski post",
    ],
  },
];
export const inCalendarArr = [
  "div-gpt-ad-1769765602091-0",
  "div-gpt-ad-1769765622164-0",
  "div-gpt-ad-1769765646981-0",
  "div-gpt-ad-1769765669736-0",
  "div-gpt-ad-1769765520606-0",
];

export const easterDays = [
  "Veliki ponedeljak",
  "Veliki utorak",
  "Velika sreda",
  "Veliki četvrtak (Veliko bdenije)",
  "Veliki petak",
  "Velika subota",
  "V a s k r s - Vaskrsenje Gospoda Isusa Hrista",
  "Vaskrsni  ponedeljak",
  "Vaskrsni utorak",
];

export const odanije = [
  // Odanije Sretenja
  "Prepolovljenje",
  "Odanije Prepolovljenja",
  "Odanije Vaskrsa",
  "Odanije Vaznesenja",
  "Odanije Pedesetnice",
  "Odanije Preobraženja",
  "Odanije Uspenija",
  "danije Rođenja Presvete Bogorodice",
  "Odanije Vozdviženja",
  "Odanije Vavedenja",
];
