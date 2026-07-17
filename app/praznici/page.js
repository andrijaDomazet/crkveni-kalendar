// app/praznici/page.js
import ArticleBox from "../../src/components/Boxes/ArticleBox/ArticleBox";
import data from "../../src/all__news.json";
import "../../src/stylesModules/praznici.scss";

export function generateMetadata() {
  return {
    title: "Praznici | crkveni-kalendar.net",
    description:
      "Pregled velikih pravoslavnih praznika, njihovog porekla i narodnih običaja.",
    alternates: { canonical: "/praznici/" },
    openGraph: {
      locale: "sr-RS",
      type: "website",
      title: "Praznici | crkveni-kalendar.net",
      siteName: "crkveni-kalendar.net",
      description:
        "Pregled velikih pravoslavnih praznika, njihovog porekla i narodnih običaja.",
    },
  };
}

export default function PraznicPage() {
  const praznici = data.filter(
    (item) => item.type === "praznik" && item.published !== false,
  );

  return (
    <div className="content">
      <main className="mainContent">
        <h1 className="mainContent-title">Praznici</h1>
        <p className="mainContent-lead">
          Pregled velikih pravoslavnih praznika, njihovog porekla i narodnih
          običaja.
        </p>

        <div className="praznikBoxes">
          {praznici.map((item, index) => (
            <ArticleBox key={index} n={item} classes="boxWrapper topNews" />
          ))}
        </div>
      </main>
    </div>
  );
}
