import "./KalendarGodina.scss";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { lazy, Suspense } from "react";
import {
  calendarYears,
  importantHolidaysPerMonth,
  monthSerb,
} from "../../components/Calendar/calendar-data/calendar-data.js";
import SimpleBox from "../../components/Boxes/SimpleBox/SimpleBox.js";
import TodayBox from "../../components/Boxes/TodayBox/TodayBox.js";
import { getDayMonth } from "../../shared/utility.js";
import MidBox from "../../components/Boxes/MidBox/MidBox.js";
import { useRouteContext } from "../../shared/RouteProvider.js";
import { useCalendarContext } from "../../shared/CalendarProvider.js";

const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));
const ZadusniceLazy = lazy(
  () => import("../../components/Boxes/Zadusnice/Zadusnice.js"),
);

export default function KalendarGodina() {
  const { pageYear } = useRouteContext();

  const {
    petrovPostStartDate,
    yearIndex,
    easterDay,
    startEasterTs,
    endEasterTs,
  } = useCalendarContext();
  // const pageYear = currentYear;
  console.log("Page year", pageYear);

  const years = [2026, 2027, 2028];
  const otherYears = years.filter((y) => y !== pageYear);
  const buttonText = otherYears.map((year) => [
    `/${year}/`,
    `Kalendar ${year}. →`,
  ]);
  const date = new Date(easterDay);
  const day = date.getDate();
  const month = monthSerb[date.getMonth()];

  const startEaster = getDayMonth(new Date(startEasterTs));
  const endEaster = getDayMonth(new Date(endEasterTs));
  const petrovPost = getDayMonth(new Date(petrovPostStartDate));

  return (
    <div className="kalendarGodina">
      <div className="banner-wrapper bilbord">
        {/* <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} /> */}
        <div id="onBid_billboard"></div>
      </div>
      <div className="kalendarGodina-wrapper">
        <div className="kalendarGodina-center">
          <div className="kalendarGodina-title">
            <h1>Pravoslavni kalendar {pageYear}.</h1>
            <h2>
              Kompletan pregled svih meseci, velikih praznika, posnih dana i
              zadušnica za {pageYear}. godinu po crkvenom kalendaru Srpske
              Pravoslavne Crkve.
            </h2>
          </div>
          <div className="monthsGrid">
            {monthSerb.map((item, index) => {
              return (
                <SimpleBox
                  key={index}
                  as="a"
                  textAnchor={`Crkveni kalendar za ${item} ${pageYear}`}
                  href={`/${pageYear}/${item}/`}
                  mainTitleSymbol={true}
                  classes="hoverable"
                  // topNavLink={`/${pageYear}/${item}/`}
                  mainTitle={
                    item.substring(0, 1).toUpperCase() + item.substring(1)
                  }
                  mainBody={importantHolidaysPerMonth[index]}
                />
              );
            })}
          </div>
        </div>
        <div className="kalendarGodina-left">
          <TodayBox />
          <div className="banner-wrapper fix-size-mediumRectangle">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750930023966-0"} />
          </div>

          {/* <MidBox /> */}
          <SimpleBox
            classes="green"
            linkText="/hriscanski-post/"
            mainTitle={`🍞 Veliki postovi ${pageYear}.`}
            mainBody={[
              `Vaskršnji post — ${startEaster.day}. ${startEaster.month + 1}. - ${endEaster.day}. ${endEaster.month + 1}.`,
              `Petrovski post — ${petrovPost.day}.6. - 11.7.`,
              "Gospojinski post — 14.8. - 27.8.",
              "Božićni post — 28.11. - 6.1.",
            ]}
            buttonText="Hrišćanski postovi →"
          />
          <SimpleBox
            classes="orange"
            mainTitle="Ostale godine"
            buttonText={buttonText}
          />
          {/* <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div> */}
        </div>
        <div className="kalendarGodina-right">
          <Suspense fallback={<div></div>}>
            <ZadusniceLazy
              setYear={pageYear}
              boxTitle={`🕯 Zadušnice u ${pageYear}. godini`}
              data={calendarYears[0].item_list[yearIndex]}
            />
          </Suspense>
          <SimpleBox
            classes="green"
            linkText={`/${pageYear}/${month}/`}
            mainTitle={`Vaskrs ${pageYear}.`}
            mainBody={`Vaskrs (Uskrs) u ${pageYear}. godini pada na ${day}. ${month} po novom kalendaru.`}
            buttonText={`Kalendar za ${month} ${pageYear}. →`}
          />

          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
          </div>
        </div>
      </div>
      <div className="banner-wrapper">
        <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
      </div>
      <Suspense fallback={<div></div>}>
        <WidgetLazy />
      </Suspense>
    </div>
  );
}
