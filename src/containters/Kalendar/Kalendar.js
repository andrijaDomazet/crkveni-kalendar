import { lazy, Suspense } from "react";
import Calendar from "../../components/Calendar/Calendar";
import "./Kalendar.scss";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { calendarYears } from "../../components/Calendar/calendar-data/calendar-data.js";
import { useIdContext } from "../../shared/IdProvider.js";

const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));
const ZadusniceLazy = lazy(() =>
  import("../../components/Boxes/Zadusnice/Zadusnice.js")
);
const CalendarMonthsLinksLazy = lazy(() =>
  import("../../components/CalendarMonthsLinks/CalendarMonthsLinks.js")
);

export default function Kalendar() {
  const { yearIndex } = useIdContext();
  // let yearIndex = calendarYears[0].item_list.findIndex(
  //   (item) => item.title == pageYear
  // );

  return (
    <div className="kalendar">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <div className="kalendar-wrapper">
        <div className="kalendar-left">
          <Calendar />
          <Suspense fallback={<div></div>}>
            <CalendarMonthsLinksLazy />
          </Suspense>
          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>
          {/* <div className="banner-wrapper">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
          </div> */}
        </div>
        <div className="kalendar-right">
          <Suspense fallback={<div></div>}>
            <ZadusniceLazy
              setYear={2026}
              boxTitle={`🕯 Zadušnice u ${2026}. godini`}
              data={calendarYears[0].item_list[yearIndex]}
            />
          </Suspense>

          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
          </div>
          {/* <div className="posni_kalendar">
            <h2>Kalendar posta</h2>
            <div
              style={{
                width: "100%",
                height: "300px",
                border: "1px solid red",
              }}
            >
              Kalendar posta
            </div>
          </div> */}
          {/* <div className="banner-wrapper xl_sticky">
            <AdManagerSlot
              adUnitPath={location.pathname}
              slotNumber={"div-gpt-ad-1723682121612-0"}
            />
          </div> */}
        </div>
      </div>
      {/* <div className="banner-wrapper">
        <AdManagerSlot
          adUnitPath={location.pathname}
          slotNumber={"div-gpt-ad-1724367417806-0"}
        />
      </div> */}
      {/* <ContenExBox /> */}
      {/* <div className="banner-wrapper">
        <AdManagerSlot
          adUnitPath={location.pathname}
          slotNumber={"div-gpt-ad-1735207510691-0"}
        />
      </div> */}
      {/* <Widget /> */}
      <Suspense fallback={<div></div>}>
        <WidgetLazy />
      </Suspense>
    </div>
  );
}
