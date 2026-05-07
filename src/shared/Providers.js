"use client";
import { RouteProvider } from "./RouteProvider";
import { CalendarProvider } from "./CalendarProvider";

export default function Providers({ children }) {
  return (
    <RouteProvider>
      <CalendarProvider>{children}</CalendarProvider>
    </RouteProvider>
  );
}
