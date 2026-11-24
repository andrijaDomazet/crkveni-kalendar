"use client";
import { useRouteContext } from "../../shared/RouteProvider";
import TodayCard from "./TodayCard";
import FastingCard from "./FastingCard";
import UpcomingCard from "./UpcomingCard";
import AppAd from "./AppAd";

const BANNER_SLOT = "div-gpt-ad-1761641124263-0";

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
      <AppAd slot={BANNER_SLOT} />
      <FastingCard />
      <UpcomingCard />
    </div>
  );
}
