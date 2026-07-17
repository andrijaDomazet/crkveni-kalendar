import SinglePost from "../../../src/containters/SinglePost/SinglePost";
import data from "../../../src/all__news.json";
import { urlTitle2 } from "../../../src/shared/utility";

export function generateStaticParams() {
  return data
    .filter((item) => item.type === "praznik")
    .map((item) => ({ slug: urlTitle2(item.title) }));
}

function findArticle(slug) {
  return data.find(
    (item) => item.type === "praznik" && urlTitle2(item.title) === slug,
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: "Praznik | crkveni-kalendar.net" };

  const title = article.title_2 || article.title;
  return {
    title,
    description: article.lead,
    alternates: { canonical: `/praznici/${slug}/` },
    openGraph: {
      locale: "sr-RS",
      type: "article",
      title,
      siteName: "crkveni-kalendar.net",
      images: [{ url: article.pics?.[0], width: 640, height: 480 }],
      description: article.lead,
    },
  };
}

export default function PraznikPage() {
  return <SinglePost />;
}
