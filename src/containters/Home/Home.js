"use client";
import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { lazy, Suspense } from "react";
import molitve from "../../molitve.json";
import NextMonthBox from "../../components/Boxes/NextMonthBox/NextMonthBox.js";
import { calendarYears } from "../../components/Calendar/calendar-data/calendar-data.js";
import TodayBox from "../../components/Boxes/TodayBox/TodayBox.js";
import MidBox from "../../components/Boxes/MidBox/MidBox.js";
import MonthBox from "../../components/Boxes/MonthBox/MonthBox.js";
import { useCalendarContext } from "../../shared/CalendarProvider.js";
const ZadusniceLazy = lazy(
  () => import("../../components/Boxes/Zadusnice/Zadusnice.js"),
);
const SimpleBoxLazy = lazy(
  () => import("../../components/Boxes/SimpleBox/SimpleBox.js"),
);
const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));
const CalendarMonthsLinksLazy = lazy(
  () => import("../../components/CalendarMonthsLinks/CalendarMonthsLinks.js"),
);
const MolitvaLazy = lazy(() => import("../../components/Molitva/Molitva.js"));
export default function Home() {
  const { yearIndex } = useCalendarContext();

  return (
    <div className="home">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
        {/* <div id="onBid_billboard"></div> */}
      </div>
      <section className="home__wrapper">
        <div className="home__wrapper-center">
          <div className="home__wrapper-center-first">
            <NextMonthBox />
          </div>
          {/* <MonthBox /> */}

          <Calendar shortCal={5} soc={false} />
          <section className="calendar-2026">
            <h2>📅 Crkveni kalendar 2026</h2>
            <p>
              Sve važne datume i praznike za 2026. godinu pogledajte klikom na
              sledeći link:{" "}
              <a
                href="https://crkveni-kalendar.net/2026/"
                title="Crkveni kalendar 2026"
              >
                Crkveni kalendar za 2026. godinu
              </a>
              .
            </p>
          </section>

          <Suspense fallback={<div></div>}>
            <CalendarMonthsLinksLazy />
          </Suspense>
          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>

          <div className="home-afterZone">
            <div className="home__molitva">
              <div className="home__links second">
                <h2>Oče naš - Molitva Gospodnja</h2>
                <div className="home__molitva-wrapper">
                  <Suspense fallback={<div></div>}>
                    <MolitvaLazy molitva={molitve[molitve.length - 1]} />
                  </Suspense>
                </div>
              </div>
            </div>
            <section className="home__molitva">
              <div className="home__links second">
                <h2>Krsne slave</h2>
                <p className="home__molitva-wrapper">
                  Informacije o krsnim slavama (datumi, običaji i značenje)
                  možete pronaći na sledećoj stranici:{" "}
                  <a href="/slave/">Krsne slave</a>.
                </p>
              </div>
              <img src="/img/line.png" loading="lazy" />
              <div className="home__links second">
                <h2>Molitvenik</h2>
                <p className="home__molitva-wrapper">
                  Molitve za različite prilike možete pronaći na stranici:{" "}
                  <a href="/molitvenik/">Molitvenik</a>.
                </p>
                <img src="/img/line.png" loading="lazy" />
              </div>
              {/* <div className="banner-wrapper">
                <AdManagerSlot slotNumber={"div-gpt-ad-1763130338013-0"} />
              </div> */}
            </section>
          </div>
          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
          </div>
        </div>
        <div className="home__wrapper-left">
          <TodayBox />
          <div className="third-element">
            <Suspense fallback={<div></div>}>
              <ZadusniceLazy
                setYear={2026}
                boxTitle={`🕯 Zadušnice u ${2026}. godini`}
                data={calendarYears[0].item_list[yearIndex]}
              />
            </Suspense>
          </div>
          <div className="banner-wrapper fix-size-mediumRectangle">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750930023966-0"} />
          </div>
          <Suspense fallback={<div></div>}>
            <SimpleBoxLazy
              classes="green"
              linkText="/hriscanski-post/"
              mainTitle="🍞 Veliki postovi 2026."
              mainBody={[
                "Vaskršnji post — 23. 2. - 11. 4.",
                "Petrovski post — 8. 6. - 11. 7.",
                "Gospojinski post — 14. 8. - 27. 8.",
                "Božićni post — 28. 11. - 6. 1.",
              ]}
              buttonText="Hrišćanski postovi →"
            />
          </Suspense>
        </div>
        <div className="home__wrapper-right">
          <MidBox />
          {/* <Zadusnice /> */}
          <Suspense fallback={<div></div>}>
            <SimpleBoxLazy
              classes="green"
              linkText="/2026/april/"
              mainTitle="Vaskrs 2026."
              mainBody="Vaskrs (Uskrs) u 2026. godini pada na 12. april po novom kalendaru."
              buttonText="Kalendar za april 2026. →"
            />
          </Suspense>

          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
          </div>
          {/* <section className="calendar-2026">
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
          </section> */}
        </div>
      </section>
      <Suspense fallback={<div></div>}>
        <WidgetLazy />
      </Suspense>
      {/* <div className="banner-wrapper">
        <AdManagerSlot slotNumber={"div-gpt-ad-1764593675864-0"} />
      </div> */}
    </div>
  );
}
