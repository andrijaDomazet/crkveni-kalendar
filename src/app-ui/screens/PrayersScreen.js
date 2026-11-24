"use client";
import LinkList from "./LinkList";
import ScreenTitle from "./ScreenTitle";
import { getPrayers, slugOf } from "../lib/content";

export default function PrayersScreen() {
  const items = getPrayers().map((prayer) => ({
    href: `/app/molitve/${slugOf(prayer.title)}/`,
    title: prayer.title,
  }));

  return (
    <div className="app-screen">
      <ScreenTitle title="Molitvenik" lead="Molitve za svaki dan i za različite prilike." />
      <LinkList items={items} />
    </div>
  );
}
