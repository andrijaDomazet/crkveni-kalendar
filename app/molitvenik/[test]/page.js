
import SinglePost2 from "../../../src/containters/SinglePost/SinglePost2";
import molitve from "../../../src/molitve.json";

function urlTitle2(title) {
  const cyrilic = ["č", "ć", "ž", "š", "đ", ",", ":", "-", "?", "!", "."];
  const replArray = ["c", "c", "z", "s", "dj", "", "", "", "", "", ""];
  return title
    .toLowerCase()
    .split("")
    .map((x) => (cyrilic.indexOf(x) === -1 ? x : replArray[cyrilic.indexOf(x)]))
    .join("")
    .split(" ")
    .join("-")
    .replace(/--/gi, "-");
}

export function generateStaticParams() {
  return molitve.map((item) => ({ test: urlTitle2(item.title) }));
}

export function generateMetadata({ params }) {
  const { test } = params;
  const prayer = molitve.find((item) => urlTitle2(item.title) === test);
  if (!prayer) return { title: "Molitvenik | crkveni-kalendar.net" };
  const title = prayer.title_2 || prayer.title;
  return {
    title,
    description: `${title}, tekst molitve: ${prayer.lead}`,
    alternates: { canonical: `/molitvenik/${test}/` },
    openGraph: {
      locale: "sr-RS",
      type: "article",
      title,
      siteName: "crkveni-kalendar.net",
      images: [{ url: prayer.pics?.[0], width: 640, height: 480 }],
      description: `${title}, tekst molitve: ${prayer.lead}`,
    },
  };
}

export default function MolitvaPage() {
  return <SinglePost2 />;
}
