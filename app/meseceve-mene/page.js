export const dynamic = "force-dynamic";
import SinglePost from "../../src/containters/SinglePost/SinglePost";
import data from "../../src/all__news.json";

function findArticle(slug) {
  return data.find((item) => {
    const t = item.title.toLowerCase().replace(/[čćžšđ,:\-?!.]/g, (c) =>
      ({ č: "c", ć: "c", ž: "z", š: "s", đ: "dj" }[c] || "")
    ).split(" ").join("-").replace(/--/g, "-");
    return t === slug;
  });
}

export function generateMetadata() {
  const article = findArticle("meseceve-mene");
  if (!article) return { title: "Mesečeve mene | crkveni-kalendar.net" };
  const title = article.title_2 || article.title;
  return {
    title,
    description: article.lead,
    alternates: { canonical: "/meseceve-mene/" },
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

export default function MesecevenMenePage() {
  return <SinglePost />;
}
