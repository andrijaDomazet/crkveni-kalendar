export const idsMonths = [
  [0, 31],
  [31, 59],
  [59, 90],
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
export const daysIsNotPost = [
  [0, 7],
  // [0, 12],
  // [0, 14],
  [0, 19],
  [1, 16],
  [1, 18],
];
export const daysIsPost = [
  [0, 18],
  [8, 11],
  [8, 27],
];
export const monthSerb = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];
export const calendarYears = [
  {
    item_list: [
      { title: 2022, route: "/crkveni-kalendar/2022" },
      { title: 2023, route: "/crkveni-kalendar/2023" },
      { title: 2024, route: "/crkveni-kalendar/2024" },
      { title: 2025, route: "/crkveni-kalendar/2025" },
      { title: 2026, route: "/crkveni-kalendar/2026" },
      { title: 2027, route: "/crkveni-kalendar/2027" },
      { title: 2028, route: "/crkveni-kalendar/2028" },
    ],
  },
];
export const spisakNedelja = ["Седмица прва – Светла", "Седмица друга – Мироносица", "Седмица трећа – Раслабљеног", "Седмица четврта – Самарјанке", "Седмица пета – Слепога", "Седмица шеста – Светих Отаца Првог васељенског сабора", "Седмица шеста – Светих Отаца Првог васељенског сабора", "Седмица Педесетнице"];
export const details = [
  { title: "Ime i prezime", name: "name" },
  { title: "Kontakt telefon", name: "tel" },
  { title: "Vaša poruka", name: "text" },
];
export const tretmanColors = [
  { tretman: "manastir", color: "#940922" },
  { tretman: "crkva", color: "#b29411" },
  // { tretman: "nega lica", color: "#F7A072" },
  // { tretman: "nega tela", color: "#55C1FF" },
  { tretman: "ostalo", color: "#5F1A37" },
];
export const options = [
  //0
  {
    route: "/",
    title: "Crkveni-kalendar.net",
    social: {
      title: "Crkveni-kalendar.net",
      lead: "Crkveni-kalendar.net - Crkveni kalendar...",
      pics: "/img/test3.jpg",
    },
  },
  //1
  //   { route: "/manastiri", title: "Manastiri" },
  //2
  //   {
  //     route: "/ikone",
  //     title: "Ikone",
  //   },
  //3
  {
    route: "/crkveni-kalendar",
    title: "Crkveni kalendar",
    social: {
      title: "Crkveni kalendar",
      lead: "Crkveni pravoslavni kalendar | Svi praznici, slave i posti u godini na jednom mestu. Srpske crkve i manastiri, posni recepti, molitve | Crkveni kalendar",
      pics: "/img/test3.jpg",
    },
    social2: {
      title: "Crkveni kalendar",
      lead: " | Svi praznici, slave i posti u godini na jednom mestu. Srpske crkve i manastiri, posni recepti, molitve | Crkveni kalendar ",
      pics: "/img/test3.jpg",
    },
  },
  //4
  {
    route: "/ostalo/meseceve-mene",
    title: "Mesečeve mene",
    social: {
      title: "Mesečeve mene",
      lead: "Mesečeve mene i lunarne faze u 2023. godini. MESEČEV KALENDAR. Precizan kalendar faza meseca za kompletnu godinu. Prikaz mesečevih mena za svaki mesec...",
      pics: ["/img/article_img/moon.jpg", "Pexels"],
    },
  },
  // { route: "/molitve", title: "Molitve" },
  //   { route: "/slave", title: "Slave" },
  // { route: "/ostalo", title: "Ostalo" },
];

export const footer = ["O nama", "Marketing", "Pravila korišćenja", "Politika privatnosti"];
