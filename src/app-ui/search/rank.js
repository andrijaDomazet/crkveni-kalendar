import { normalizeText } from "./normalize";

// Rangiranje preuzeto iz ikone.rs: 1) naslov pocinje upitom, 2) sadrzi ga kao frazu,
// 3) sadrzi sve reci iz upita bilo kojim redom. Unutar nivoa ostaje redosled indeksa.
export function rankMatches(items, query, limit = 40) {
  const q = normalizeText(query);
  if (q.length < 2) return { results: [], total: 0 };
  const words = q.split(" ");

  const startsWith = [];
  const contains = [];
  const scattered = [];
  items.forEach((item) => {
    if (!words.every((word) => item.key.includes(word))) return;
    if (item.key.startsWith(q)) startsWith.push(item);
    else if (item.key.includes(q)) contains.push(item);
    else scattered.push(item);
  });

  const sorted = [...startsWith, ...contains, ...scattered];
  return { results: sorted.slice(0, limit), total: sorted.length };
}
