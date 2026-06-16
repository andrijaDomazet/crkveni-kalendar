const map = {
  A: "А",
  B: "Б",
  V: "В",
  G: "Г",
  D: "Д",
  Đ: "Ђ",
  E: "Е",
  Ž: "Ж",
  Z: "З",
  I: "И",
  J: "Ј",
  K: "К",
  L: "Л",
  M: "М",
  N: "Н",
  NJ: "Њ",
  O: "О",
  P: "П",
  R: "Р",
  S: "С",
  T: "Т",
  Ć: "Ћ",
  U: "У",
  F: "Ф",
  H: "Х",
  C: "Ц",
  Č: "Ч",
  DŽ: "Џ",
  Š: "Ш",
  LJ: "Љ",
  DJ: "Ђ",
  a: "а",
  b: "б",
  v: "в",
  g: "г",
  d: "д",
  đ: "ђ",
  e: "е",
  ž: "ж",
  z: "з",
  i: "и",
  j: "ј",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  nj: "њ",
  o: "о",
  p: "п",
  r: "р",
  s: "с",
  t: "т",
  ć: "ћ",
  u: "у",
  f: "ф",
  h: "х",
  c: "ц",
  č: "ч",
  dž: "џ",
  š: "ш",
  lj: "љ",
  dj: "ђ",
};

export function latinToCyrillic(str) {
  if (!str || typeof str !== "string") return str;
  let result = "";
  let i = 0;
  while (i < str.length) {
    // Proveri trigrame (dž / Dž)
    const tri = str.slice(i, i + 2).toLowerCase();
    if (tri === "dž" || tri === "lj" || tri === "nj" || tri === "dj") {
      const twoChar = str.slice(i, i + 2);
      if (map[twoChar]) {
        result += map[twoChar];
        i += 2;
        continue;
      }
      // Mixed case: Lj, Nj, Dj, Dž
      const mixed = twoChar[0].toUpperCase() + twoChar[1].toLowerCase();
      if (map[mixed]) {
        result += map[mixed];
        i += 2;
        continue;
      }
    }
    const ch = str[i];
    result += map[ch] ?? ch;
    i++;
  }
  return result;
}

export function cyrillicHtml(html, active) {
  if (!active || !html) return html;
  if (!html.includes("<")) return latinToCyrillic(html);

  // Razbij na delove: tagovi i tekst između njih
  return html.replace(/(<[^>]*>)|([^<]+)/g, (match, tag, text) => {
    if (tag) return tag; // HTML tag — ne diraj
    if (text) return latinToCyrillic(text); // čist tekst — transliteriraj
    return match;
  });
}
