"use client";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";
import StickyAd from "../ads/StickyAd";
import { ADS_ENABLED } from "../ads/config";

export default function AppShell({ children }) {
  return (
    <div className="app-root">
      <AppHeader />
      <main className="app-main">{children}</main>
      {ADS_ENABLED && <StickyAd />}
      <BottomNav />
    </div>
  );
}
