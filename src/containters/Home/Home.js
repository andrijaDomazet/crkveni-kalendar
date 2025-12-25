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

const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));
const CalendarMonthsLinksLazy = lazy(() =>
  import("../../components/CalendarMonthsLinks/CalendarMonthsLinks.js")
);

export default function Home() {
  const {
    slug,
    currentYear,
    yearIndex,
    dayName,
    currentDay,
    todayHoliday,
    monthName,
  } = useIdContext();

  // let currentYear = 2026;
  // let yearIndex = calendarYears[0].item_list.findIndex(
  //   (item) => item.title == currentYear
  // );

  return (
    <div className="home">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <section className="home__wrapper">
        <div className="home__wrapper-left">
          <div className="today__box">
            <div className="today-border"></div>
            <div className="today__box-wrapper">
              <div className="corners-leftTop"></div>
              <div className="corners-leftBotom"></div>
              <div className="corners-rightTop"></div>
              <div className="corners-rightBottom"></div>
              <span className="today-day">{dayName}</span>
              <p className="today-dayNum">{currentDay}</p>
              <p className="today-month">{`${monthName} ${currentYear}`}</p>
              <div className="today-center">
                <div className="line"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-cross w-6 h-6 text-gold"
                >
                  <path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"></path>
                </svg>
                <div className="line right"></div>
              </div>
              {/* <p className="today-head">SVETITELJ DANA</p> */}
              <h2 className="today-title">{todayHoliday.title[0]}</h2>
              {todayHoliday.post && (
                <div className="today-post">
                  <span>Posni dan</span>
                </div>
              )}
              {/* <div className="today-post">
                <span>Posni dan</span>
              </div> */}
            </div>
          </div>
          <Zadusnice
            setYear={2026}
            boxTitle={`🕯 Zadušnice u ${2026}. godini`}
            data={calendarYears[0].item_list[yearIndex]}
          />
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
          <NextMonthBox month="januar" year={2026} />
          <Calendar shortCal={6} soc={false} />
          <section class="calendar-2026">
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
          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>
          <Suspense fallback={<div></div>}>
            <CalendarMonthsLinksLazy />
          </Suspense>
          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-calendar w-5 h-5 text-primary"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <h2>Predstojeći praznici</h2>
            </div>

            <div className="midBox-bodyLine">
              <span>7. januar</span>
              <h2>Božić - Rođenje Hristovo</h2>
            </div>
            <div className="midBox-bodyLine">
              <span>9. januar</span>
              <h2>Sveti Stefan</h2>
            </div>
            <div className="midBox-bodyLine">
              <span>27. januar</span>
              <h2>Sveti Sava</h2>
            </div>
            <div className="midBox-bodyLine">
              <span>14. februar</span>
              <h2>Sveti Trifun</h2>
            </div>
            <div className="midBox-bodyLine">
              <span>15. februar</span>
              <h2>Sretenje Gospodnje</h2>
            </div>
          </div>
          {/* <Zadusnice /> */}
          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
          </div>
          {/* <section class="calendar-2026">
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
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1764593675864-0"} />
      </div>
      <Suspense fallback={<div></div>}>
        <WidgetLazy />
      </Suspense>
    </div>
  );
}
