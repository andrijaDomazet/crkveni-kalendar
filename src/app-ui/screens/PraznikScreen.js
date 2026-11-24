"use client";
import ArticleScreen from "../article/ArticleScreen";
import { getPraznik } from "../lib/content";

export default function PraznikScreen({ slug }) {
  return <ArticleScreen article={getPraznik(slug)} showHero />;
}
