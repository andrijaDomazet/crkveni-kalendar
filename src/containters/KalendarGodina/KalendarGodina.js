import "./KalendarGodina.scss";
import Calendar from "../../components/Calendar/Calendar";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { lazy, Suspense } from "react";
import { useIdContext } from "../../shared/IdProvider.js";
// import { useGlobalLocation } from "../../shared/LocationContext.js";
import { calendarYears, importantHolidaysPerMonth, monthSerb } from "../../components/Calendar/calendar-data/calendar-data.js";
import SimpleBox from "../../components/Boxes/SimpleBox/SimpleBox.js";
import TodayBox from "../../components/Boxes/TodayBox/TodayBox.js";

const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));
const CalendarMonthsLinksLazy = lazy(() => import("../../components/CalendarMonthsLinks/CalendarMonthsLinks.js"));
const ZadusniceLazy = lazy(() => import("../../components/Boxes/Zadusnice/Zadusnice.js"));

export default function KalendarGodina() {
  const { yearIndex, easterDay } = useIdContext();

  console.log("ID data", easterDay);
  // const { pathPart } = useGlobalLocation();
  return (
    <div className="kalendarGodina">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <div className="kalendarGodina-wrapper">
   
        <div className="kalendarGodina-center">
          <div className="kalendarGodina-title">
            <h1>Pravoslavni kalendar 2026.</h1>
            <h2>Kompletan pregled svih meseci, velikih praznika, posnih dana i zadušnica za 2026. godinu po crkvenom kalendaru Srpske Pravoslavne Crkve.</h2>
          </div>
          <div className="monthsGrid">
            {monthSerb.map((item, index) => {
              return (
                <SimpleBox
                  // classes="orange"
                  topNavLink={`/2026/${item}/`}
                  // linkText={`/2026/${item}/`}
                  mainTitle={item.substring(0, 1).toUpperCase() + item.substring(1)}
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
          <SimpleBox
            classes="green"
            // linkText="/2026/april/"
            mainTitle="🍞 Veliki postovi 2026."
            mainBody={["Vaskršnji post — 23.2. - 11.4.", "Petrovski post — 8.6. - 11.7.", "Gospojinski post — 14.8. - 27.8.", "Božićni post — 28.11. - 6.1."]}
            // buttonText="Hrišćanski postovi u 2026. godini →"
          />
          {/* <Calendar soc={false} isMonth2={0} /> */}
          {/* <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div> */}
        </div>
        <div className="kalendarGodina-right">
          <Suspense fallback={<div></div>}>
            <ZadusniceLazy setYear={2026} boxTitle={`🕯 Zadušnice u ${2026}. godini`} data={calendarYears[0].item_list[yearIndex]} />
          </Suspense>
          <SimpleBox classes="green" linkText="/2026/april/" mainTitle="Vaskrs 2026." mainBody="Vaskrs (Uskrs) u 2026. godini pada na 12. april po novom kalendaru." buttonText="Kalendar za april 2026. →" />
          <SimpleBox
            classes="orange"
            linkText="/2026/april/"
            mainTitle="Ostale godine"
            // mainBody="Vaskrs (Uskrs) u 2026. godini pada na 12. april po novom kalendaru."
            buttonText={[
              ["/2025/", "Kalendar 2025. →"],
              ["/2027/", "Kalendar 2027. →"],
            ]}
          />
          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
          </div>
        </div>
      </div>
      {/* <Suspense fallback={<div></div>}>
        <CalendarMonthsLinksLazy />
      </Suspense> */}
      <div className="banner-wrapper">
        <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
      </div>
      <Suspense fallback={<div></div>}>
        <WidgetLazy />
      </Suspense>
    </div>
  );
}
