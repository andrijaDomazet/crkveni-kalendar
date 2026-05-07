export const dynamic = "force-dynamic";
import Calendar from "../../src/components/Calendar/Calendar";

export const metadata = {
  title: "Crkveni kalendar - widget",
  robots: { index: false },
};

export default function WidgetPage() {
  return <Calendar />;
}
