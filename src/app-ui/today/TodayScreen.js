"use client";
import { useRouteContext } from "../../shared/RouteProvider";
import TodayCard from "./TodayCard";
import FastingCard from "./FastingCard";
import UpcomingCard from "./UpcomingCard";
import ZadusniceCard from "./ZadusniceCard";

export default function TodayScreen() {
  const { currentDate } = useRouteContext();

  // Datum se zna tek posle hidratacije; do tada prikazujemo prazne kartice.
  if (!currentDate) {
    return (
      <div className="app-screen" aria-busy="true">
        <div className="app-card app-skeleton app-skeleton--tall" />
        <div className="app-card app-skeleton" />
        <div className="app-card app-skeleton app-skeleton--tall" />
      </div>
    );
  }

  return (
    <div className="app-screen">
      <TodayCard />
      <FastingCard />
      <UpcomingCard />
      <ZadusniceCard />
    </div>
  );
}
