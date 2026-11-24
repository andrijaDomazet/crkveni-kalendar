import PrayerScreen from "../../../../../src/app-ui/screens/PrayerScreen";
import { getPrayers, slugOf } from "../../../../../src/app-ui/lib/content";

export const metadata = { title: "Molitva | Crkveni kalendar" };

export function generateStaticParams() {
  return getPrayers().map((prayer) => ({ slug: slugOf(prayer.title) }));
}

export default async function AppPrayerPage({ params }) {
  const { slug } = await params;
  return <PrayerScreen slug={slug} />;
}
