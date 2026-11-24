"use client";
import ArticleScreen from "../article/ArticleScreen";
import { getPrayer } from "../lib/content";

export default function PrayerScreen({ slug }) {
  return <ArticleScreen article={getPrayer(slug)} />;
}
