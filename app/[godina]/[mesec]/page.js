import Kalendar from "../../../src/containters/Kalendar/Kalendar";
import { options } from "../../../src/shared/shared";

export function generateStaticParams() {
  const months = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];
  const years = ["2024", "2025", "2026", "2027"];
  const params = [];
  years.forEach((godina) => {
    months.forEach((mesec) => {
      params.push({ godina, mesec });
    });
  });
  return params;
}

export function generateMetadata({ params }) {
  const { godina, mesec } = params;
  const post = options[1].social2;
  const title = `Crkveni pravoslavni kalendar - ${mesec.toUpperCase()} ${godina}`;
  const description = `Crkveni pravoslavni kalendar - ${mesec.toUpperCase()} ${godina}${post.lead} za ${mesec} ${godina}. godine`;
  return {
    title,
    description,
    alternates: { canonical: `/${godina}/${mesec}/` },
    openGraph: {
      locale: "sr-RS",
      type: "article",
      title,
      siteName: "crkveni-kalendar.net",
      images: [{ url: post.pics, width: 640, height: 480 }],
      description,
    },
  };
}

export default function KalendarPage() {
  return <Kalendar />;
}
