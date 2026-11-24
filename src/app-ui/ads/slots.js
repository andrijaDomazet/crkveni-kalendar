// Ad Manager slotovi samo za app. Fiksne velicine, bez size mapping-a i bez 1x1.
// Svaki ID sme jednom po stranici.
export const AD_BANNER = "app-ad-baner";
export const AD_IN_TEXT = "app-ad-u-tekstu";
export const AD_ARTICLE_END = "app-ad-kraj-clanka";
export const AD_STICKY = "app-ad-sticky";

const UNIT_PREFIX = "/23098387262/crkveni-kalendar";

// [sirina, visina] prve (jedine) velicine slota.
export const slotSize = (id) =>
  APP_SLOTS.find((slot) => slot.id === id)?.sizes[0] ?? [320, 100];

export const APP_SLOTS = [
  { id: AD_BANNER, path: `${UNIT_PREFIX}/app-baner`, sizes: [[320, 100]] },
  { id: AD_IN_TEXT, path: `${UNIT_PREFIX}/app-u-tekstu`, sizes: [[300, 250]] },
  { id: AD_ARTICLE_END, path: `${UNIT_PREFIX}/app-kraj-clanka`, sizes: [[300, 250]] },
  { id: AD_STICKY, path: `${UNIT_PREFIX}/app-sticky`, sizes: [[320, 100]] },
];
