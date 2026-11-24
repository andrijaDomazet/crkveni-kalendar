"use client";
import ArticleScreen from "./ArticleScreen";
import { getPageArticle } from "../lib/content";

// Clanak koji se u app-u nalazi na svojoj ruti (postovi, zadusnice, mesec...).
export default function PageArticleScreen({ slug, children }) {
  return <ArticleScreen article={getPageArticle(slug)}>{children}</ArticleScreen>;
}
