"use client";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";

export default function AppShell({ children }) {
  return (
    <div className="app-root">
      <AppHeader />
      <main className="app-main">{children}</main>
      <BottomNav />
    </div>
  );
}
