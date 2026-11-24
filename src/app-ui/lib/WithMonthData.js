"use client";
import { useMemo } from "react";
import { RouteContext, useRouteContext } from "../../shared/RouteProvider";
import { CalendarProvider } from "../../shared/CalendarProvider";

// Daje deci podatke kalendara za proizvoljan mesec (npr. sledeci), nezavisno od rute.
export default function WithMonthData({ year, month, children }) {
  const route = useRouteContext();
  const value = useMemo(
    () => ({ ...route, pageYear: year, pageMonth: month }),
    [route, year, month],
  );
  return (
    <RouteContext.Provider value={value}>
      <CalendarProvider>{children}</CalendarProvider>
    </RouteContext.Provider>
  );
}
