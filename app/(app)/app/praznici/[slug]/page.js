import PraznikScreen from "../../../../../src/app-ui/screens/PraznikScreen";
import { getPraznici, slugOf } from "../../../../../src/app-ui/lib/content";

export const metadata = { title: "Praznik | Crkveni kalendar" };

export function generateStaticParams() {
  return getPraznici().map((praznik) => ({ slug: slugOf(praznik.title) }));
}

export default async function AppHolidayPage({ params }) {
  const { slug } = await params;
  return <PraznikScreen slug={slug} />;
}
