import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { lazy, Suspense } from "react";
import Molitva from "../../components/Molitva/Molitva.js";
import molitve from "../../molitve.json";
import NextMonthBox from "../../components/NextMonthBox/NextMonthBox.js";
import { calendarYears } from "../../components/Calendar/calendar-data/calendar-data.js";
import { useIdContext } from "../../shared/IdProvider.js";
import TodayBox from "../../components/TodayBox/TodayBox.js";

const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));
const CalendarMonthsLinksLazy = lazy(() =>
  import("../../components/CalendarMonthsLinks/CalendarMonthsLinks.js")
);

export default function Home() {
  const { yearIndex } = useIdContext();

  return (
    <div className="home">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <section className="home__wrapper">
        <div className="home__wrapper-left">
          <TodayBox />
          <div className="third-element">
            <Zadusnice
              setYear={2026}
              boxTitle={`🕯 Zadušnice u ${2026}. godini`}
              data={calendarYears[0].item_list[yearIndex]}
            />
          </div>

          <div className="banner-wrapper">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750930023966-0"} />
          </div>
          {/* <Zadusnice
            setYear={2026}
            boxTitle={`🍞 Veliki postovi u ${2026}. godini`}
            data={calendarYears[1]}
          /> */}
          {/* <div>
            <div>🍞 Veliki postovi 2026</div>
            <div>Божићни пост — 28.11 - 6.1</div>
            <div>Васкршњи пост — 23.2 - 11.4</div>
            <div>Петровски пост — 8.6 - 11.7</div>
            <div>Богородичин пост — 14.8 - 27.8</div>
          </div> */}
        </div>
        <div className="home__wrapper-center">
          <div className="home__wrapper-center-first">
            <NextMonthBox />
          </div>
          <Calendar shortCal={6} soc={false} />
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
                  <Molitva molitva={molitve[molitve.length - 1]} />
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

        <div className="home__wrapper-right">
          <div className="midBox">
            <div className="midBox-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                stroke-linejoin="round"
                className="star"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <h2>Predstojeći praznici</h2>
            </div>
            <div className="midBox-bodyLine">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  className="star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              </div>
              <div>
                <span>14. januar</span>
                <h2>Sveti Vasilije</h2>
              </div>
            </div>
            <div className="midBox-bodyLine">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  className="star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              </div>
              <div>
                <span>27. januar</span>
                <h2>Sveti Sava</h2>
              </div>
            </div>
            <div className="midBox-bodyLine">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  className="star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              </div>
              <div>
                <span>14. februar</span>
                <h2>Sveti Trifun</h2>
              </div>
            </div>
            <div className="midBox-bodyLine">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  className="star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              </div>
              <div>
                <span>15. februar</span>
                <h2>Sretenje Gospodnje</h2>
              </div>
            </div>
            <div className="midBox-bodyLine">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                     strokeLinecap="round"
                  stroke-linejoin="round"
                  className="star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              </div>
              <div>
                <span>22. mart</span>
                <h2>Mladenci</h2>
              </div>
            </div>
          </div>
          {/* <Zadusnice /> */}
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
