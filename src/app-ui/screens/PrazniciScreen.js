"use client";
import DateLinkList from "./DateLinkList";
import ScreenTitle from "./ScreenTitle";
import { useRouteContext } from "../../shared/RouteProvider";
import { getPraznici, slugOf } from "../lib/content";

const DAY_MS = 24 * 60 * 60 * 1000;
const YEAR_MS = 366 * DAY_MS;

// Praznici se redaju po tome koji nastupa prvi od danas (godina 2000 je prestupna).
const dayOfYearTs = (month, day) => new Date(2000, month, day).getTime();

export default function PrazniciScreen() {
  const { currentDate } = useRouteContext();
  const now = currentDate ?? new Date();
  const todayTs = dayOfYearTs(now.getMonth(), now.getDate());

  const items = getPraznici()
    .map((praznik) => {
      const [month, day] = praznik.holidayDate ?? [0, 1];
      return {
        distance: (dayOfYearTs(month, day) - todayTs + YEAR_MS) % YEAR_MS,
        href: `/app/praznici/${slugOf(praznik.title)}/`,
        title: praznik.title,
        day,
        month,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="app-screen">
      <ScreenTitle
        title="Praznici"
        lead="Veliki pravoslavni praznici, njihovo poreklo i narodni običaji."
      />
      <DateLinkList items={items} />
    </div>
  );
}
