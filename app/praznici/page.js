// app/praznici/page.js
import ArticleBox from "../../src/components/Boxes/ArticleBox/ArticleBox";
import data from "../../src/all__news.json";
import "../../src/stylesModules/praznici.scss";
import Zadusnice from "../../src/components/Boxes/Zadusnice/Zadusnice";
import MoonWidgetBox from "../../src/UI/Widget/MoonWidgetBox";
import AdManagerSlot from "../../src/components/AdvModule/AdManagerSlot";

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
    <div>
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
        {/* <div id="onBid_billboard"></div> */}
      </div>
      <div className="content">
        <main className="mainContent">
          <h1 className="mainContent-title">Praznici</h1>
          <p className="mainContent-lead">
            Pregled velikih pravoslavnih praznika, njihovog porekla i narodnih
            običaja.
          </p>

          <div className="praznikBoxes">
            {praznici.map((item, index) => (
              <ArticleBox key={index} n={item} classes="praznikBox" />
            ))}
          </div>
        </main>
        <div className="mainContent-right">
          <Zadusnice />
             <div className="banner-wrapper fix-size-mediumRectangle">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750930023966-0"} />
          </div>
          <MoonWidgetBox />
        </div>
      </div>
    </div>
  );
}
