import "./KalendarGodina.scss";
import Calendar from "../../components/Calendar/Calendar";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { lazy, Suspense } from "react";
import { useIdContext } from "../../shared/IdProvider.js";
// import { useGlobalLocation } from "../../shared/LocationContext.js";
import { calendarYears } from "../../components/Calendar/calendar-data/calendar-data.js";

const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));
const CalendarMonthsLinksLazy = lazy(() =>
  import("../../components/CalendarMonthsLinks/CalendarMonthsLinks.js")
);
const ZadusniceLazy = lazy(() =>
  import("../../components/Zadusnice/Zadusnice.js")
);

export default function KalendarGodina() {
  const { yearIndex } = useIdContext();
  // const { pathPart } = useGlobalLocation();
  return (
    <div className="kalendarGodina">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <div className="kalendarGodina-wrapper">
        <div className="kalendarGodina-left">
          <Calendar soc={false} isMonth2={0} />
          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>
        </div>
        <div className="kalendarGodina-right">
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
        </div>
      </div>
      <Suspense fallback={<div></div>}>
        <CalendarMonthsLinksLazy />
      </Suspense>
      <div className="banner-wrapper">
        <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
      </div>
      <Suspense fallback={<div></div>}>
        <WidgetLazy />
      </Suspense>
    </div>
  );
}
