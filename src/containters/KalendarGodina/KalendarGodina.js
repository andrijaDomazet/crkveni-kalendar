import "./KalendarGodina.scss";
import Calendar from "../../components/Calendar/Calendar";
import CalendarMonthsLinks from "../../components/CalendarMonthsLinks/CalendarMonthsLinks";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import Widget from "../../UI/Widget/Widget";

export default function KalendarGodina() {
  return (
    <div className="kalendarGodina">
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
      <Widget />
    </div>
  );
}
