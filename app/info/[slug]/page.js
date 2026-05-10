
import SimplePage from "../../../src/containters/SimplePage/SimplePage";
import { infoText } from "../../../src/shared/shared";

export function generateStaticParams() {
  return ["o-nama", "pravila-koriscenja", "politika-privatnosti"].map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const { slug } = params;
  const validSlugs = ["o-nama", "pravila-koriscenja", "politika-privatnosti"];
  const index = validSlugs.indexOf(slug);
  const title = index !== -1 ? infoText[index][0] : "Crkveni kalendar";
  return {
    title: `${title} | crkveni-kalendar.net`,
    alternates: { canonical: `/info/${slug}/` },
  };
}

export default function InfoPage() {
  return <SimplePage />;
}
