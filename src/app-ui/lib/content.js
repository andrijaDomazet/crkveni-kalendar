import news from "../../all__news.json";
import prayers from "../../molitve.json";
import { urlTitle2 } from "../../shared/utility";

export const slugOf = urlTitle2;

export const getPageArticle = (slug) =>
  news.find((item) => !item.type && urlTitle2(item.title) === slug);

export const getPraznici = () =>
  news.filter((item) => item.type === "praznik" && item.published !== false);

export const getPraznik = (slug) =>
  getPraznici().find((item) => urlTitle2(item.title) === slug);

export const getPrayers = () => prayers.filter((item) => item.published);

export const getPrayer = (slug) =>
  getPrayers().find((item) => urlTitle2(item.title) === slug);

export const displayTitle = (item) => item.title_2 || item.title;

export const CALENDAR_YEARS = [2024, 2025, 2026, 2027, 2028];

export const INFO_SLUGS = ["o-nama", "pravila-koriscenja", "politika-privatnosti"];
