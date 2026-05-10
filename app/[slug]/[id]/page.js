
import Kalendar from "../../../src/containters/Kalendar/Kalendar";
import { options } from "../../../src/shared/shared";

export function generateStaticParams() {
  const slugs = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];
  const years = ["2024", "2025", "2026", "2027"];
  const params = [];
  slugs.forEach((slug) => {
    years.forEach((id) => {
      params.push({ slug, id });
    });
  });
  return params;
}

export function generateMetadata({ params }) {
  const { slug, id } = params;
  const post = options[1].social2;
  const title = `Crkveni pravoslavni kalendar - ${id.toUpperCase()} ${slug}`;
  const description = `Crkveni pravoslavni kalendar - ${id.toUpperCase()} ${slug}${post.lead} za ${id} ${slug}. godine`;
  return {
    title,
    description,
    alternates: { canonical: `/${slug}/${id}/` },
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
