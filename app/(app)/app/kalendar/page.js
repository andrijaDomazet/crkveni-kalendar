import { Suspense } from "react";
import KalendarScreen from "../../../../src/app-ui/calendar/KalendarScreen";

export const metadata = { title: "Kalendar | Crkveni kalendar" };

export default function AppCalendarPage() {
  return (
    <Suspense fallback={null}>
      <KalendarScreen />
    </Suspense>
  );
}
