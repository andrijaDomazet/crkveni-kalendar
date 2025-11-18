import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { lazy, Suspense } from "react";
import Molitva from "../../components/Molitva/Molitva.js";
import molitve from "../../molitve.json";

const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));
const CalendarMonthsLinksLazy = lazy(() =>
  import("../../components/CalendarMonthsLinks/CalendarMonthsLinks.js")
);

export default function Home() {
  return (
    <div className="home">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <section className="home__wrapper">
        <div className="home__wrapper-left">
          <Calendar shortCal={6} soc={false} />
          <section class="calendar-2026">
            <h2>📅 Crkveni kalendar 2026</h2>
            <p>
              Ovde je već dostupan i{" "}
              <a
                href="https://crkveni-kalendar.net/2026/"
                title="Crkveni kalendar 2026"
              >
                crkveni kalendar za 2026. godinu
              </a>{" "}
              sa svim važnim praznicima.
            </p>
          </section>

          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>
          <Suspense fallback={<div></div>}>
            <CalendarMonthsLinksLazy />
          </Suspense>

          <div className="banner-wrapper">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
          </div>
          <div className="home-afterZone">
            <div className="home__molitva">
              <h2>Oče naš - Molitva Gospodnja</h2>
              <div className="home__molitva-wrapper">
                <Molitva molitva={molitve[molitve.length - 1]} />
              </div>
            </div>
            <section className="home__links-wrapper">
              <div className="home__links">
                <h2>Krsne slave</h2>
                Sve informacije o krsnim slavama – datumi, običaji i značenje -
                dostupne su na stranici <a href="/slave/">Krsne slave</a>.
              </div>
              <div className="home__links second">
                <h2>Molitvenik</h2>
                Molitve za različite prilike možete pronaći na stranici{" "}
                <a href="/molitvenik/">Molitvenik</a>.
              </div>
              <div className="banner-wrapper">
                <AdManagerSlot slotNumber={"div-gpt-ad-1763130338013-0"} />
              </div>
            </section>
          </div>
        </div>
        <div className="home__wrapper-right">
          <Zadusnice />
          <section class="calendar-2026">
            <p>
              Pregled <strong>Zadušnica za 2026. godinu</strong> dostupan je{" "}
              <a
                href="https://crkveni-kalendar.net/zadusnice/"
                title="Zadušnice 2026"
              >
                ovde
              </a>
              .
            </p>
          </section>
          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
          </div>
        </div>
      </section>
      <Suspense fallback={<div></div>}>
        <WidgetLazy />
      </Suspense>
    </div>
  );
}
