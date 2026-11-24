"use client";
import ScreenTitle from "./ScreenTitle";
import SettingsScreen from "./SettingsScreen";

export default function PodesavanjaScreen() {
  return (
    <div className="app-screen">
      <ScreenTitle title="Podešavanja" lead="Izgled aplikacije i izbor pisma." />
      <SettingsScreen />
    </div>
  );
}
