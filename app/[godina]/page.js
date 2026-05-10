import KalendarGodina from "../../src/containters/KalendarGodina/KalendarGodina";
import { options } from "../../src/shared/shared";

export function generateStaticParams() {
  return ["2024", "2025", "2026", "2027"].map((godina) => ({ godina }));
}

export function generateMetadata({ params }) {
  const { godina } = params;
  const pics = options[0].social.pics;
  const title = `Crkveni pravoslavni kalendar - ${godina}.`;
  const description = `Crkveni pravoslavni kalendar - ${godina} | Svi praznici, slave i posti u godini na jednom mestu.`;
  return {
    title,
    description,
    alternates: { canonical: `/${godina}/` },
    openGraph: {
      locale: "sr-RS",
      type: "website",
      title,
      siteName: "crkveni-kalendar.net",
      images: [{ url: pics, width: 640, height: 480 }],
      description,
    },
  };
}

export default function KalendarGodinaPage() {
  return <KalendarGodina />;
}
