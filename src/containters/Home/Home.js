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
import { useScriptContext } from "../../shared/ScriptProvider.js";
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
  const { cyr } = useScriptContext();
  return (
    <div className="home">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <section className="home__wrapper">
        <div className="home__wrapper-center">
          <div className="home__wrapper-center-first">
            <NextMonthBox />
          </div>
          {/* <MonthBox /> */}

          <Calendar shortCal={5} soc={false} />
          <section className="calendar-2026">
            <h2>   {cyr("📅 Crkveni kalendar 2026")}</h2>
            <p>
                 {cyr("Sve važne datume i praznike za 2026. godinu pogledajte klikom na sledeći link:")}{" "}
              <a
                href="https://crkveni-kalendar.net/2026/"
                title="Crkveni kalendar 2026"
              >
                   {cyr("Crkveni kalendar za 2026. godinu")}
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
                <h2>{cyr(`Oče naš - Molitva Gospodnja`)}</h2>
                <div className="home__molitva-wrapper">
                  <Suspense fallback={<div></div>}>
                    <MolitvaLazy molitva={molitve[molitve.length - 1]} />
                  </Suspense>
                </div>
              </div>
            </div>
            <section className="home__molitva">
              <div className="home__links second">
                <h2>{cyr(`Krsne slave`)}</h2>
                <p className="home__molitva-wrapper">
                  {cyr(
                    "Informacije o krsnim slavama (datumi, običaji i značenje) možete pronaći na sledećoj stranici:",
                  )}{" "}
                  <a href="/slave/">{cyr("Krsne slave")}</a>.
                </p>
              </div>
              <img src="/img/line.png" loading="lazy" />
              <div className="home__links second">
                <h2>{cyr(`Molitvenik`)}</h2>
                <p className="home__molitva-wrapper">
                  {cyr(`Molitve za različite prilike možete pronaći na stranici:`)}{" "}
                  <a href="/molitvenik/">{cyr("Molitvenik")}</a>.
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
          <section>
            <Suspense fallback={<div></div>}>
              <SimpleBoxLazy
                classes="green"
                mainTitle="Deset Božijih zapovesti"
                listType="ol"
                mainBody={[
                  "Ja sam Gospod Bog Tvoj, nemoj imati drugih bogova osim mene.",
                  "Ne pravi sebi idola niti kakva lika; nemoj im se klanjati niti im služiti.",
                  "Ne uzimaj uzalud imena Gospoda Boga svojega.",
                  "Sećaj se dana odmora da ga svetkuješ; šest dana radi i svrši sve svoje poslove, a sedmi dan je odmor Gospodu Bogu tvojemu.",
                  "Poštuj oca svojega i mater svoju, da ti dobro bude i da dugo poživiš na zemlji.",
                  "Ne ubij.",
                  "Ne čini preljube.",
                  "Ne kradi.",
                  "Ne svedoči lažno na bližnjega svojega.",
                  "Ne poželi ništa tuđe.",
                ]}
              />
            </Suspense>
          </section>
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
          <Suspense fallback={<div></div>}>
            <SimpleBoxLazy
              classes="green"
              linkText="/2027/maj/"
              mainTitle="Vaskrs 2027."
              mainBody="Vaskrs (Uskrs) u 2027. godini pada na 2. maj po novom kalendaru."
              buttonText="Kalendar za maj 2027. →"
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
