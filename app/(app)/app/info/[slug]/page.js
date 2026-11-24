import InfoScreen from "../../../../../src/app-ui/screens/InfoScreen";
import { INFO_SLUGS } from "../../../../../src/app-ui/lib/content";

export const metadata = { title: "Informacije | Crkveni kalendar" };

export function generateStaticParams() {
  return INFO_SLUGS.map((slug) => ({ slug }));
}

export default async function AppInfoPage({ params }) {
  const { slug } = await params;
  return <InfoScreen slug={slug} />;
}
