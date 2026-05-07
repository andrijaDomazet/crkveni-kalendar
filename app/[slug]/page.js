export const dynamic = "force-dynamic";
import KalendarGodina from "../../src/containters/KalendarGodina/KalendarGodina";
import { options } from "../../src/shared/shared";

export function generateMetadata({ params }) {
  const { slug } = params;
  const pics = options[0].social.pics;
  const title = `Crkveni pravoslavni kalendar - ${slug}.`;
  const description = `Crkveni pravoslavni kalendar - ${slug} | Svi praznici, slave i posti u godini na jednom mestu. | Pravoslavni kalendar ${slug}.`;
  return {
    title,
    description,
    alternates: { canonical: `/${slug}/` },
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
