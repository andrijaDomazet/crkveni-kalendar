"use client";
import { RouteProvider } from "./RouteProvider";
import { CalendarProvider } from "./CalendarProvider";
import { ScriptProvider } from "./ScriptProvider";

export default function Providers({ children }) {
  return (
    <ScriptProvider>
      <RouteProvider>
        <CalendarProvider>{children}</CalendarProvider>
      </RouteProvider>
    </ScriptProvider>
  );
}
