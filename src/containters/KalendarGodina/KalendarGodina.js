import "./KalendarGodina.scss";
import Calendar from "../../components/Calendar/Calendar";
import CalendarMonthsLinks from "../../components/CalendarMonthsLinks/CalendarMonthsLinks";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { lazy, Suspense } from "react";
// import Widget from "../../UI/Widget/Widget";

const WidgetLazy = lazy(() => import("../../UI/Widget/Widget.js"));

export default function KalendarGodina() {
  return (
    <div className="kalendarGodina">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <div className="kalendarGodina-wrapper">
        <div className="kalendarGodina-left">
          <Calendar soc={false} />
          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>
        </div>
        <div className="kalendarGodina-right">
          <Zadusnice />
          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
          </div>
        </div>
      </div>
      <CalendarMonthsLinks />
      <div className="banner-wrapper">
        <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
      </div>
      <Suspense fallback={<div></div>}>
        <WidgetLazy />
      </Suspense>
      {/* <Widget /> */}
    </div>
  );
}
